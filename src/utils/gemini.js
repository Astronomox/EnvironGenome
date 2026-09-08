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
  let data;
  try {
    data = await res.json();
  } catch (e) {
    throw new Error("The AI service returned an unreadable response.");
  }
  if (!res.ok || data.error) {
    throw new Error(data.error || "The AI service could not complete this request.");
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
