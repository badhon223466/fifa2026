import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Add JSON parsing middleware
  app.use(express.json());

  // API proxy route for Football API to hide the API Key
  app.get("/api/matches/live", async (req, res) => {
    try {
      const apiKey = process.env.VITE_FOOTBALL_API_KEY || "214b89fe797299b99d5a34a622937ae5";
      console.log(`Fetching live matches with key: ${apiKey.substring(0, 5)}...`);
      const response = await axios.get("https://v3.football.api-sports.io/fixtures", {
        params: { live: "all" },
        headers: {
          "x-apisports-key": apiKey,
        },
      });
      console.log("Live matches response received:", response.data?.results);
      res.json(response.data);
    } catch (error: any) {
      console.error("Error fetching live matches:", error.response?.data || error.message);
      res.status(error.response?.status || 500).json(error.response?.data || { error: "Failed to fetch live matches" });
    }
  });

  // Proxy for World Cup info or specific leagues
  app.get("/api/leagues", async (req, res) => {
    try {
      const apiKey = process.env.VITE_FOOTBALL_API_KEY || "214b89fe797299b99d5a34a622937ae5";
      const response = await axios.get("https://v3.football.api-sports.io/leagues", {
        headers: {
          "x-apisports-key": apiKey,
        },
      });
      res.json(response.data);
    } catch (error: any) {
      res.status(error.response?.status || 500).json(error.response?.data || { error: "Failed to fetch leagues" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
