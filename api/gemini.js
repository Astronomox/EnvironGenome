// Vercel serverless function: /api/gemini
// Holds the Gemini API key server-side, in an environment variable, so it
// never ships to the browser and no individual user ever enters their own
// key. Set GEMINI_API_KEY in the Vercel project's Environment Variables.
//
// Model: uses the "gemini-flash-latest" alias rather than a pinned version
// (e.g. "gemini-1.5-flash") on purpose. Google retires dated model names on
// a schedule of months, not years -- gemini-1.5-flash was already fully
// shut down (confirmed via Google's own docs, Sept 2026), and every
// gemini-2.5-* model has an announced shutdown date within weeks of this
// being written. The "-latest" alias is Google's own recommended way to
// avoid re-breaking this every time they rotate models.

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

  const MODEL = "gemini-flash-latest";
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
