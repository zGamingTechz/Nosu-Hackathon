const chatLog = document.getElementById("chat-log");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const currentMood = document.getElementById("current-mood");

function setMood(mood) {
    const moodMap = {
        idle: { text: "Idle 💤", color: "#000000", image: "static/images/idle.jpg" },
        smiling: { text: "Smiling 😏", color: "#FFC107", image: "static/images/smiling.jpg" },
        happy: { text: "Happy 😜", color: "#4CAF50", image: "static/images/happy.jpg" },
        annoyed: { text: "Annoyed 🙄", color: "#FF9800", image: "static/images/annoyed.jpg" },
        angry: { text: "Angry 😤", color: "#F44336", image: "static/images/angry.jpg" }
    };
    currentMood.textContent = moodMap[mood].text;
    currentMood.style.color = moodMap[mood].color;
    const cartoonImage = document.querySelector(".cartoon");
    if (cartoonImage) {
        cartoonImage.src = moodMap[mood].image;
    }
    else  {
        console.log("h");
    }
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
