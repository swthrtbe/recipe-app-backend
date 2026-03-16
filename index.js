
// 1. Load our tools
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // This loads your secret keys from the .env file

// 2. Setup the server app
const app = express();
app.use(cors()); // Enable the "Bridge"
app.use(express.json()); // Allow the server to read JSON data sent from the app

app.get('/', (req, res) => {
    res.send("Welcome to the AI Recipe API!");
});

// 3. Create your first "Door" (Route)
app.get('/test', (req, res) => {
    res.json({ message: "Success! The backend is working." });
});

// 4. Start the engine
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is flying on http://localhost:${PORT}`);
});

const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

// The "Smart" Door for Recipes
app.post('/api/recipes', async (req, res) => {
    const { ingredients } = req.body; // Expo will send: ["eggs", "onion"]

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ 
                role: "user", 
                content: `Give me a simple recipe name and 3 steps using these ingredients: ${ingredients.join(", ")}` 
            }],
        });

        res.json({ recipe: response.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: "AI is tired right now..." });
    }
});

