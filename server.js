const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
    try {
        const response = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: "llama3.2",
                prompt: req.body.message,
                stream: false
            }),
        });

        const data = await response.json();
        res.json({ response: data.response });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to get response from Ollama' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
