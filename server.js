const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Sentiment = require('sentiment');

const app = express();
const PORT = 5000;
const sentiment = new Sentiment();

app.use(cors());
app.use(bodyParser.json());

// Define mood mapping based on sentiment score
function getMood(score) {
    if (score >= 5) return "Ecstatic 😆";
    if (score === 4) return "Excited 🤩";
    if (score === 3) return "Happy 😊";
    if (score === 2) return "Pleasant 🙂";
    if (score === 1) return "Mildly Happy 😌";
    if (score === 0) return "Neutral 😐";
    if (score === -1) return "Unsettled 😕";
    if (score === -2) return "Disappointed 😞";
    if (score === -3) return "Sad 😢";
    if (score === -4) return "Very Sad 😭";
    if (score === -5) return "Depressed 😔";
    if (score === 6) return "Overjoyed 🥳";
    if (score === -6) return "Devastated 😖";
    if (score === 7) return "Euphoric 🎉";
    if (score === -7) return "Hopeless 😭";
    return "Extreme Mood 🤯"; // Fallback for very high/low scores
}

// Route for mood analysis
app.post('/analyze', (req, res) => {
    try {
        const userText = req.body.text;
        if (!userText) {
            return res.status(400).json({ error: "Invalid request. No text provided." });
        }

        console.log("🔍 Analyzing text:", userText);

        const analysis = sentiment.analyze(userText);
        const mood = getMood(analysis.score);

        console.log("✅ Mood:", mood);

        res.json({ mood, score: analysis.score });

    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
});

// Start the server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
