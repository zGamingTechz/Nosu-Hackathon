import React, { useState } from "react";
import angryImg from "../media/angry.png";
import annoyedImg from "../media/annoyed.png";
import happyImg from "../media/happy.png";
import idleImg from "../media/idle.png";

const Mood = () => {
  const [mood, setMood] = useState("idle");
  const [input, setInput] = useState("");

  // Mood to image map
  const moodImages = {
    angry: angryImg,
    annoyed: annoyedImg,
    happy: happyImg,
    idle: idleImg,
  };

  // Handler for user input
  const handleInputChange = (event) => {
    setInput(event.target.value.toLowerCase());
  };

  // Handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (moodImages[input]) {
      setMood(input); // Update mood if input matches
    } else {
      setMood("idle"); // Default to "idle" if no match
    }
    setInput(""); // Clear the input field
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Chatbot Mood</h1>
      <img
        src={moodImages[mood]}
        alt={mood}
        style={{ width: "200px", height: "200px", borderRadius: "10px" }}
      />
      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Type mood (e.g., angry, happy, idle, annoyed)"
          value={input}
          onChange={handleInputChange}
          style={{
            padding: "10px",
            fontSize: "16px",
            width: "300px",
            marginRight: "10px",
          }}
        />
        <button type="submit" style={{ padding: "10px 20px", fontSize: "16px" }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Mood;
