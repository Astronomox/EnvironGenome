// Gemini client, called directly from the browser with a user-supplied key.
export async function askGemini(key, prompt) {
  if (!key) throw new Error("NO_KEY");
  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + encodeURIComponent(key);
  let res;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
  } catch (e) {
    throw new Error("Network error reaching Gemini. Check your connection.");
  }
  const data = await res.json();
  if (data.error) throw new Error("Gemini error: " + (data.error.message || "request failed") + ". Check your key.");
  const parts = data?.candidates?.[0]?.content?.parts;
  return parts && parts[0] ? parts[0].text : "No response returned.";
}

// light markdown to html for bold and bullets
export function fmt(s) {
  return s
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/^\s*[\*\-]\s/gm, "\u2022 ");
}
