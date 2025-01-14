const chatLog = document.getElementById("chat-log");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const currentMood = document.getElementById("current-mood");

function setMood(mood) {
    const moodMap = {
        idle: { text: "Idle 💤", color: "#000000" },
        smiling: { text: "Smiling 😏", color: "#FFC107" },
        happy: { text: "Happy 😜", color: "#4CAF50" },
        annoyed: { text: "Annoyed 🙄", color: "#FF9800" },
        angry: { text: "Angry 😤", color: "#F44336" }
    };
    currentMood.textContent = moodMap[mood].text;
    currentMood.style.color = moodMap[mood].color;
}

function appendMessage(sender, message) {
    const messageElement = document.createElement("div");
    messageElement.textContent = `${sender}: ${message}`;
    chatLog.appendChild(messageElement);
    chatLog.scrollTop = chatLog.scrollHeight;
}

function sendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage) {
        appendMessage("You", userMessage);

        const typingPlaceholder = document.createElement("div");
        typingPlaceholder.textContent = "GF is typing...";
        chatLog.appendChild(typingPlaceholder);
        chatLog.scrollTop = chatLog.scrollHeight;

        fetch('/get_response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userMessage })
        })
        .then(response => response.json())
        .then(data => {
            typingPlaceholder.remove();
            setMood(data.mood);
            appendMessage("GF", data.response);
        });

        userInput.value = "";
    }
}

sendButton.addEventListener("click", sendMessage);

userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});
