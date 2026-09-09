import http from "http";
import { createServer } from "vite";

let callCount = 0;

const server = http.createServer(async (req, res) => {
  if (req.url === "/api/gemini" && req.method === "POST") {
    callCount++;
    res.setHeader("Content-Type", "application/json");
    if (callCount === 1) {
      res.statusCode = 502;
      res.end(JSON.stringify({ error: "The AI provider could not complete this request: This model is currently experiencing high demand. Please try again later." }));
    } else {
      res.statusCode = 200;
      res.end(JSON.stringify({ text: "Retry succeeded: lead exposure primarily affects the nervous system and kidneys." }));
    }
    return;
  }
  res.statusCode = 404;
  res.end("not found");
});
server.listen(5555, () => console.log("mock api on 5555"));
