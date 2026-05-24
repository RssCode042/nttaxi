import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const ai = process.env.GEMINI_API_KEY 
  ? new GoogleGenAI({ 
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } } 
    }) 
  : null;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Translation API
  app.post('/api/translate', async (req, res) => {
    try {
      if (!ai) {
        return res.status(500).json({ error: 'Gemini API not configured' });
      }

      const { text } = req.body;
      if (!text) return res.status(400).json({ error: 'Text is required' });

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: `Translate the following Bulgarian text to English. Maintain the tone and context provided. Only return the translated text without any explanations.\n\nText: ${text}`,
      });

      const translatedText = response.text.trim();

      res.json({ translated: translatedText });
    } catch (e: any) {
      console.error('Translation error:', e);
      res.status(500).json({ error: e.message || 'Translation failed' });
    }
  });

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
