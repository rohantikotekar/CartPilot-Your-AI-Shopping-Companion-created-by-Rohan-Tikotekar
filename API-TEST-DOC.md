# CartPilot - Test Documentation

## Base URL
```
http://localhost:3000
```

---

## Endpoints

### POST /api/chat

**Description:** Send a message or image to the AI shopping assistant for product recommendations.

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
- `message` (string, optional): User's text query
- `image` (string, optional): URL of an image to analyze

---

## Test Cases

### Test Case 1: Image-Based Product Search

**Request:**
```http
POST /api/chat
Content-Type: application/json
```

**Request Body:**
```json
{
  "message": "Find me something similar to this",
  "image": "https://plus.unsplash.com/premium_photo-1718913936342-eaafff98834b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2072"
}
```

**Response:**
```json
{
  "reply": "It looks like you're interested in a basic t-shirt. Here's a similar product from our catalog:\n\n**Performance Sports T-Shirt**\n- **Price:** $29.99\n- **Description:** Moisture-wicking polyester blend, breathable fabric, perfect for running and gym workouts.\n- **Why I Recommend It:** It's designed for comfort and performance, making it great for both casual wear and workouts.\n\nLet me know if you'd like more information!",
  "timestamp": "2025-10-11T05:01:57.134Z"
}
```

---

### Test Case 2: Text-Based Product Search

**Request:**
```http
POST /api/chat
Content-Type: application/json
```

**Request Body:**
```json
{
  "message": "I need a laptop for gaming"
}
```

**Response:**
```json
{
  "reply": "I'm Shopify Assistant, and while I specialize in a variety of products, I currently don't have a selection of laptops or gaming-specific items in my catalog. However, I can help you find gaming accessories or related items if you're interested! Let me know what you need, and I'll do my best to assist you!",
  "timestamp": "2025-10-11T05:06:23.869Z"
}
```

---
