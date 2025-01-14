const chatLog = document.getElementById("chat-log");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const currentMood = document.getElementById("current-mood");

const sassyResponses = [
    "Ugh, whatever... 🙄",
    "Can't talk right now, I'm doing hot girl things 💅",
    "New phone, who dis? 📱",
    "K.",
    "That's nice honey... anyway- 💁‍♀️",
    "*seen at 2:43 PM*",
    "I'll reply to this later (probably not) 🤷‍♀️",
    "Sorry, I was too busy being fabulous 👑",
    "Is that supposed to be interesting? 🥱",
    "Bestie, I'm gonna need you to calm down ✋",
];

function detectMood(message) {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('love') || lowerMessage.includes('miss')) {
        return { text: "Ugh, clingy much? 🙄", color: "#ff4b6e" };
    } else if (lowerMessage.includes('sorry')) {
        return { text: "As you should be 💅", color: "#4CAF50" };
    } else if (lowerMessage.includes('bye')) {
        return { text: "Finally! 😌", color: "#FF9800" };
    } else {
        return { text: "Unbothered 💅", color: "#9C27B0" };
    }
}

function setMood(mood) {
    currentMood.textContent = mood.text;
    currentMood.style.color = mood.color;
}

async function getChatbotResponse(message) {
  try {
    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    return {
      reply: data.response,
      mood: detectMood(message),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      reply: "Sorry, there was an issue with the bot.",
      mood: detectMood(message),
    };
  }
}


function appendMessage(sender, message) {
    const messageElement = document.createElement("div");
    messageElement.textContent = `${sender}: ${message}`;
    chatLog.appendChild(messageElement);
    chatLog.scrollTop = chatLog.scrollHeight;
}

function showTypingIndicator() {
    const typingIndicator = document.querySelector('.typing-indicator');
    typingIndicator.style.display = 'block';
}

function hideTypingIndicator() {
    const typingIndicator = document.querySelector('.typing-indicator');
    typingIndicator.style.display = 'none';
}

sendButton.addEventListener("click", async () => {
    const userMessage = userInput.value.trim();
    if (userMessage) {
        appendMessage("You", userMessage);
        userInput.value = "";
        userInput.disabled = true;
        sendButton.disabled = true;

        showTypingIndicator();
        
        // Random delay between 1 and 3 seconds
        const delay = Math.random() * 2000 + 1000;
        setTimeout(async () => {
            hideTypingIndicator();
            const { reply, mood } = await getChatbotResponse(userMessage);
            setMood(mood);
            appendMessage("Her", reply);

            userInput.disabled = false;
            sendButton.disabled = false;
            userInput.focus();
        }, delay);
    }
});

userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey && !userInput.disabled) {
        sendButton.click();
    }
});

// Initial mood
setMood({ text: "Unbothered 💅", color: "#9C27B0" });
