// Vercel serverless function: /api/gemini
// Holds the Gemini API key server-side, in an environment variable, so it
// never ships to the browser and no individual user ever enters their own
// key. Set GEMINI_API_KEY in the Vercel project's Environment Variables.
//
// Model: pinned to "gemini-3.5-flash-lite" -- Google's cheapest/fastest
// current tier ("optimized for...lightweight agentic workflows that
// require fast inference at minimal cost" per Google's own model card).
// Was briefly on the "gemini-flash-latest" alias, which kept resolving to
// the pricier Gemini 3.8 Flash for some calls and ran consumption up.
// Before that, this was hardcoded to "gemini-1.5-flash", which Google has
// since fully shut down (confirmed via their docs, Sept 2026) -- every
// request to it returned 404. If this model name also gets retired later,
// that's the failure mode to check for first: a 404-with-error-body from
// Google, surfaced below instead of hidden.
const MODEL = "gemini-3.5-flash-lite";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "AI service is not configured on the server." });
    return;
  }

  const { prompt } = req.body || {};
  if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
    res.status(400).json({ error: "A prompt is required." });
    return;
  }
  if (prompt.length > 8000) {
    res.status(400).json({ error: "That request is too long." });
    return;
  }

  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=` +
    encodeURIComponent(apiKey);

  try {
    const upstream = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    const data = await upstream.json();

    if (data.error) {
      // Surface Google's actual reason (model name, quota, invalid key, etc.)
      // instead of a generic message. This is not sensitive -- it's the same
      // error Google already shows in their own API explorer -- and it's
      // the difference between a debuggable app and a black box.
      res.status(502).json({
        error: `The AI provider could not complete this request: ${data.error.message || data.error.status || "unknown error"}.`
      });
      return;
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    res.status(200).json({ text });
  } catch (e) {
    res.status(502).json({ error: "The AI provider is unreachable right now." });
  }
}
