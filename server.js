const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Load data anime dari file JSON
const animeData = require('./data/anime-api.json');

// Endpoint untuk mendapatkan semua anime
app.get('/api/anime', (req, res) => {
    res.json(animeData);
});

// Endpoint untuk mendapatkan anime berdasarkan ID
app.get('/api/anime/:id', (req, res) => {
    const anime = animeData.find(a => a.id === parseInt(req.params.id));
    if (!anime) return res.status(404).send('Anime not found');
    res.json(anime);
});

// Endpoint untuk mendapatkan anime berdasarkan tahun tertentu
app.get('/api/anime/year/:year', (req, res) => {
    const year = parseInt(req.params.year);
    const animeByYear = animeData.filter(a => a.year === year);
    if (animeByYear.length === 0) return res.status(404).send('No anime found for this year');
    res.json(animeByYear);
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
