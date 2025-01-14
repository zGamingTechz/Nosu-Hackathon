const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config();
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.json());

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.json({ response: "I didn't get that. Can you say it again?" });
  }

  try {
    const response = await axios.post(
      "https://api.studio.nebius.ai/v1/",
      {
        model: "meta-llama/Meta-Llama-3.2-Instruct",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: userMessage },
        ],
        max_tokens: 100,
        temperature: 1,
        top_p: 1,
        top_k: 50,
        n: 1,
        stream: false,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEBIUS_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const botReply = response.data.choices[0].message.content;
    res.json({ response: botReply });
  } catch (error) {
    console.error("Error with API request:", error);
    res.json({
      response: "Sorry, something went wrong with the bot. Please try again.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
