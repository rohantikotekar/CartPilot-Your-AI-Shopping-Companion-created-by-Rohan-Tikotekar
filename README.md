# 🛍️ CartPilot - Your AI shopping companion

A production-ready AI-powered shopping assistant that handles general conversation, text-based product recommendations, and image-based product search - all in a single intelligent agent.

## 🎯 Features

✅ **General Conversation** - Chat naturally with the AI agent about its capabilities  
✅ **Text-Based Product Recommendations** - Get personalized product suggestions  
✅ **Image-Based Product Search** - Upload images to find similar products  
✅ **Unified Agent** - Single AI handles all 3 use cases seamlessly  
✅ **20 Product Catalog** - Pre-loaded with sports and fitness items  

## 🚀 Live Demo

**Deployed App**: [https://cartpilot-14lzs6ke9-rohans-projects-a97c7c7b.vercel.app/](https://cartpilot-14lzs6ke9-rohans-projects-a97c7c7b.vercel.app/)

## 📹 Video Demonstrations

| Demo Type | Link |
|-----------|------|
| 💬 General Conversation | [Watch Demo](https://drive.google.com/file/d/1YS5uGBE8MF7G5oGHlrqugFLWEjsr0wqe/view?usp=drive_link) |
| 🏋️ Text-Based Product Recommendation | [Watch Demo](https://drive.google.com/file/d/1ACkzCsV3PEjY3CrRh8sSHjKOVUn93AOG/view?usp=drive_link) |
| 📸 Image-Based Product Search | [Watch Demo](https://drive.google.com/file/d/18nfVQiIjuFoLUNUDkOX2Z4xfOrSimJS5/view?usp=drive_link) |

## 🏗️ Architecture

### Tech Stack

**Frontend:**
- React 18 + Vite
- Modern, responsive UI with inline CSS
- Image upload with preview
- Real-time chat interface

**Backend:**
- Node.js + Express
- OpenAI GPT-4o (text + vision)
- In-memory product catalog (JSON)
- RESTful API design

**Why This Stack?**
- ⚡ **Fast Setup**: No complex build tools or configurations
- 🎯 **Simple**: Everything in one codebase, no external databases
- 💪 **Reliable**: OpenAI handles all AI complexity
- 🚀 **Easy Deploy**: Vercel-ready with zero config

### Architecture Diagram

```
┌─────────────────┐
│   User Browser  │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────┐
│   Frontend (React + Vite)           │
│   • Chat UI                         │
│   • Text Input                      │
│   • Image Upload                    │
└────────┬────────────────────────────┘
         │ HTTP POST /api/chat
         ▼
┌─────────────────────────────────────┐
│   Backend (Express API)             │
│   ┌───────────────────────────────┐ │
│   │  Endpoint: POST /api/chat     │ │
│   │  • Receives text/image        │ │
│   │  • Calls OpenAI API           │ │
│   │  • Returns AI response        │ │
│   └───────────────────────────────┘ │
│                                     │
│   ┌───────────────────────────────┐ │
│   │  AI Agent (OpenAI GPT-4o)     │ │
│   │  • Intent detection           │ │
│   │  • Product catalog search     │ │
│   │  • Image recognition          │ │
│   │  • Natural conversation       │ │
│   └───────────────────────────────┘ │
│                                     │
│   ┌───────────────────────────────┐ │
│   │  Product Catalog (JSON)       │ │
│   │  • 20 products                │ │
│   │  • Categories, prices, tags   │ │
│   └───────────────────────────────┘ │
└─────────────────────────────────────┘
```

## 📋 Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **OpenAI API Key** ([Get one here](https://platform.openai.com/api-keys))
- **Git** (optional, for cloning)

## 🚀 Quick Start (5 minutes)

### Step 1: Create Project Structure

```bash
mkdir commerce-agent
cd commerce-agent
mkdir backend frontend
```

### Step 2: Setup Backend

Copy all files from the artifacts to your `backend/` folder:
- `package.json`
- `server.js`
- `products.json`
- `.env`

Then run:

```bash
cd backend
npm install
```

**IMPORTANT:** Edit `backend/.env` and add your OpenAI API key:
```
OPENAI_API_KEY=sk-your-actual-key-here
PORT=3001
```

### Step 3: Setup Frontend

Copy all files from the artifacts to your `frontend/` folder:
- `package.json`
- `vite.config.js`
- `index.html`
- Create `src/` folder with:
  - `main.jsx`
  - `App.jsx`
  - `index.css`

Then run:

```bash
cd frontend
npm install
```

### Step 4: Run the Project

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
You should see: `✅ Server running on http://localhost:3001`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
You should see: `Local: http://localhost:3000`

### Step 5: Test It!

Open **http://localhost:3000** in your browser.

Try these:
- **General chat:** "What can you do?"
- **Text search:** "Recommend a sports t-shirt"
- **Image search:** Upload any image of a product that you want to buy


## 🌐 Deployment (Vercel)

### Option 1: Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Copy `vercel.json` to root directory

3. Login and deploy:
```bash
vercel login
vercel
```

4. Add your OpenAI API key as environment variable:
```bash
vercel env add OPENAI_API_KEY
# Paste your key when prompted
# Select "Production"
```

5. Redeploy:
```bash
vercel --prod
```

### Option 2: Vercel Dashboard

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add Environment Variable:
   - Key: `OPENAI_API_KEY`
   - Value: Your OpenAI key
5. Deploy!

**Note:** Vercel automatically detects the build configuration from `vercel.json`.

## 🧪 Testing the Agent

### Test Case 1: General Conversation
```
User: "What's your name?"
Expected: Agent introduces itself as Shopify Assistant
```

### Test Case 2: Text-Based Search
```
User: "I need a t-shirt for running"
Expected: Agent recommends Performance Sports T-Shirt with details
```

### Test Case 3: Image-Based Search
```
User: [Uploads image of yoga mat]
Expected: Agent identifies it and recommends similar products
```

## 🔧 Troubleshooting

### Backend won't start
- ✅ Check if port 3001 is available
- ✅ Verify OpenAI API key in `.env`
- ✅ Run `npm install` in backend folder

### Frontend can't connect to backend
- ✅ Ensure backend is running on port 3001
- ✅ Check `vite.config.js` proxy settings
- ✅ Clear browser cache

### OpenAI errors
- ✅ Verify API key is valid
- ✅ Check OpenAI account has credits
- ✅ Ensure API key has proper permissions

### Image upload not working
- ✅ Check file size (< 10MB recommended)
- ✅ Use common formats (JPG, PNG)
- ✅ Check browser console for errors


## 💡 Key Design Decisions

### Understanding Requirements
- **User-Centric Design**: Prioritized simplicity and quick deployment over endless features
- **Iteration Over Perfection**: Chose an architecture that allows rapid prototyping and user feedback

### Technology Stack Rationale
- **Single Agent Architecture**: One GPT-4o model handles all use cases using system prompts
  - *Why*: Reduces complexity, easier maintenance, and leverages GPT-4o's versatility
  - *Trade-off*: Less specialization per task, but gains significant operational simplicity
- **Inline Styles**: No CSS frameworks, keeps bundle small
  - *Why*: Faster load times, no external dependencies, full control over styling
  - *Trade-off*: More verbose code, but eliminates framework learning curve and bloat

### ML Model Selection
- **GPT-4o**: Chosen for its balance of performance, cost, and capabilities
  - *Multimodal support*: Handles text and images natively (Base64 encoding)
  - *Prompt flexibility*: Single model adapts to multiple use cases via system prompts
  - *Reliability*: Production-ready with predictable latency and uptime

### Data Storage Decision
- **In-Memory Catalog**: Simple JSON file, no database needed
  - *Why*: Eliminates database setup, hosting costs, and connection overhead
  - *Scalability consideration*: Perfect for catalogs up to ~1000 items; plan migration to DB when needed
  - *Maintainability*: Easy to version control, backup, and debug

## 🎨 Customization

### Add More Products
Edit `backend/products.json` and add items following the same structure.

### Change Agent Personality
Edit `SYSTEM_PROMPT` in `backend/server.js`

### Modify UI Colors
Edit the `styles` object in `frontend/src/App.jsx`

## 📝 License

MIT License - Feel free to use this for your projects!

## 🤝 Support

For issues or questions:
1. Check the Troubleshooting section
2. Review OpenAI API documentation
3. Verify all environment variables are set

---

**Built with ❤️ by Rohan Tikotekar, a Passionate AI and Software Engineer**
