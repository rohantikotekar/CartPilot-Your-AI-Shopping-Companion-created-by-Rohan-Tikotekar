import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let products = [];
try {
  const productsData = readFileSync(join(__dirname, 'products.json'), 'utf8');
  products = JSON.parse(productsData);
} catch (error) {
  console.error('Error loading products:', error);
}

const SYSTEM_PROMPT = `You are Shopify Assistant, a helpful AI shopping agent for an e-commerce store.

Your capabilities:
1. Answer general questions about yourself and what you can do
2. Recommend products based on text descriptions
3. Identify and recommend products from images

Product Catalog (${products.length} items):
${JSON.stringify(products, null, 2)}

Instructions:
- For general questions: Introduce yourself as Shopify Assistant and explain your capabilities
- For product recommendations: Search the catalog and suggest 2-4 relevant items with details
- For image-based queries: Identify what's in the image and recommend similar products from the catalog
- Always be friendly, concise, and helpful
- Format product recommendations clearly with name, price, and why you recommend it
- If no suitable products exist, politely say so and suggest alternatives`;

app.post('/api/chat', async (req, res) => {
  try {
    const { message, image } = req.body;

    if (!message && !image) {
      return res.status(400).json({ error: 'Message or image required' });
    }

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
    ];

    if (image) {
      messages.push({
        role: 'user',
        content: [
          { type: 'text', text: message || 'What products do you recommend based on this image?' },
          { type: 'image_url', image_url: { url: image } }
        ]
      });
    } else {
      messages.push({ role: 'user', content: message });
    }

    const completion = await openai.chat.completions.create({
      model: image ? 'gpt-4o' : 'gpt-4o-mini',
      messages: messages,
      temperature: 0.7,
      max_tokens: 1000,
    });

    const reply = completion.choices[0].message.content;

    res.json({ 
      reply,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: 'Failed to process request',
      details: error.message 
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    products: products.length,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📦 Loaded ${products.length} products`);
});