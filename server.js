require('dotenv').config();
const express = require('express');
// const fetch = require('node-fetch'); // For Node.js <18

const app = express();
const PORT = process.env.PORT || 3000;
const apiKey = process.env.API_KEY;

app.use(express.json());
app.use(express.static('public')); // Serve frontend files

// Endpoint to get weather
app.get('/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) return res.status(400).json({ error: "City is required" });

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
