const express = require('express');
// Task 8 Requirement: Import the natural npm package
const natural = require('natural');

const app = express();
app.use(express.json());

// Initialize the Sentiment Analyzer from the natural library
const Analyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;
const analyzer = new Analyzer("English", stemmer, "afinn");

// API Endpoint to process text sentiment
app.post('/api/sentiment', (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: "Text field is required for validation" });
    }

    try {
        // Tokenize text into words
        const tokenizer = new natural.WordTokenizer();
        const tokens = tokenizer.tokenize(text);

        // Get sentiment score
        const score = analyzer.getSentiment(tokens);

        res.status(200).json({ score: score });
    } catch (error) {
        console.error("Error evaluating sentiment score:", error);
        res.status(500).json({ error: "Internal microservice error" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Sentiment service listening on port ${PORT}`);
});

module.exports = app;
