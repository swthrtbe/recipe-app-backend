// --- STEP 1: IMPORTING THE TOOLS ---
// 'require' is like calling a delivery service to bring tools to your project.
const express = require('express'); // The framework that builds the server
const cors = require('cors');       // Allows your Expo app to talk to this server
require('dotenv').config();         // Loads secret keys (like OpenAI) from your .env file

// --- STEP 2: INITIALIZING THE APP ---
// We create an 'app' instance. This is the "brain" of your backend.
const app = express();

// --- STEP 3: MIDDLEWARE (The "Security Guards") ---
// Middleware runs on EVERY request before it reaches your routes.
app.use(cors());          // Guard 1: Allows "Cross-Origin" requests (from your phone)
app.use(express.json());  // Guard 2: Converts incoming data (JSON) into a JS object we can read

// --- STEP 4: ROUTES (The "Doors") ---

// Door 1: The "Home" Door (GET request)
// Use this to check if your server is actually awake.
app.get('/', (req, res) => {
    // 'req' = Request (what the user sends)
    // 'res' = Response (what the server sends back)
    res.send("🚀 Server is live!");
});

// Door 2: The "Recipe" Door (POST request)
app.post('/api/generate-recipe', (req, res) => {
    try {
        const { ingredients } = req.body;

        if (!ingredients || ingredients.length === 0) {
            return res.status(400).json({ error: "No ingredients provided" });
        }

        const main = ingredients[0];
        // We define the variable here:
        const finalRecipeText = `How to make ${main} Surprise:\n1. Mix ${ingredients.join(' and ')}.\n2. Heat it up!\n3. Enjoy!`;

        // We send the same variable name here:
        res.json({ recipe: finalRecipeText });

    } catch (error) {
        console.error("Oops:", error);
        res.status(500).json({ error: "Server crashed" });
    }
});

// --- STEP 5: STARTING THE ENGINE ---
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`✅ Server started on port ${PORT}`);
});