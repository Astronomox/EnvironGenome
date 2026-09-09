// Gemini client. Requests go through the app's own /api/gemini endpoint, which
// holds the API key server-side (see /api/gemini.js). No key ever reaches the
// browser or gets typed in by a user.
export async function askGemini(prompt) {
  let res;
  try {
    res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
  } catch (e) {
    throw new Error("Could not reach the AI service. Check your connection and try again.");
  }

  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    // The dev server (plain `vite dev`) doesn't run /api routes at all, so this
    // request falls through to the SPA's index.html (a 200 with HTML in it) or
    // a plain 404 -- either way it's not JSON. This is the single most common
    // cause of "AI does nothing" during local development.
    if (res.status === 404) {
      throw new Error("AI endpoint not found (404). If you're running `npm run dev`, that doesn't serve /api routes -- use `vercel dev` instead, or deploy to Vercel with GEMINI_API_KEY set.");
    }
    throw new Error(`AI endpoint returned a non-JSON response (HTTP ${res.status}). If you're testing locally with plain \`npm run dev\`, switch to \`vercel dev\` so /api/gemini.js actually runs.`);
  }

  let data;
  try {
    data = await res.json();
  } catch (e) {
    throw new Error("The AI service returned a response that could not be parsed as JSON.");
  }
  if (!res.ok || data.error) {
    throw new Error(data.error || `The AI service could not complete this request (HTTP ${res.status}).`);
  }
  return data.text || "No response returned.";
}

// light markdown to html for bold and bullets
export function fmt(s) {
  return s
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/^\s*[\*\-]\s/gm, "\u2022 ");
}
