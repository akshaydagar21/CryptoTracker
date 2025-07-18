import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for cryptocurrency dashboard
  // All data comes from frontend crypto hook using CoinGecko API or simulated data
  
  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Cryptocurrency dashboard API is running' });
  });

  const httpServer = createServer(app);

  return httpServer;
}
