// Vercel serverless function: /api/gemini-status
// Cheap, no-cost check: confirms GEMINI_API_KEY is present on the server.
// Does NOT call Google's API -- that would cost quota on every Home page
// load, which is exactly what ran consumption up before. A real live ping
// only happens when the user explicitly clicks "Test connection" on the
// Home page, which hits /api/gemini directly with a minimal prompt.
export default async function handler(req, res) {
  const configured = !!process.env.GEMINI_API_KEY;
  res.status(200).json({ configured });
}
