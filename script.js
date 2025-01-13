const chatLog = document.getElementById("chat-log");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const currentMood = document.getElementById("current-mood");

// Mood map for predefined emotions
const moodMap = {
    idle: { text: "Idle", color: "#000000" },
    smiling: { text: "Smiling", color: "#FFC107" },
    happy: { text: "Happy", color: "#4CAF50" },
    annoyed: { text: "Annoyed", color: "#FF9800" },
    angry: { text: "Angry", color: "#F44336" }
};

// Set the mood
function setMood(moodKey) {
    const mood = moodMap[moodKey];
    currentMood.textContent = mood.text;
    currentMood.style.color = mood.color;
}

// Mock chatbot response and mood logic
function getChatbotResponse(message) {
    const responses = {
        hello: { reply: "Hi there!", mood: "smiling" },
        how: { reply: "I'm just a chatbot, but I'm good!", mood: "happy" },
        bye: { reply: "Goodbye! Have a nice day!", mood: "idle" },
        annoying: { reply: "Please be polite!", mood: "annoyed" },
        angry: { reply: "Calm down, please.", mood: "angry" }
    };

    // Find the response and mood based on user message
    const lowerMessage = message.toLowerCase();
    if (responses[lowerMessage]) {
        return responses[lowerMessage];
    } else {
        return { reply: "I'm not sure how to respond to that.", mood: "idle" };
    }
}

function appendMessage(sender, message) {
    const messageElement = document.createElement("div");
    messageElement.textContent = `${sender}: ${message}`;
    chatLog.appendChild(messageElement);
    chatLog.scrollTop = chatLog.scrollHeight; // Scroll to bottom
}

sendButton.addEventListener("click", () => {
    const userMessage = userInput.value.trim();
    if (userMessage) {
        appendMessage("You", userMessage);

        // Get chatbot's response and mood
        const { reply, mood } = getChatbotResponse(userMessage);
        setMood(mood); // Update the mood meter
        setTimeout(() => appendMessage("Bot", reply), 500); // Simulate delay

        userInput.value = "";
    }
});
