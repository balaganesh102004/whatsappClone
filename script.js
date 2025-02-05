// chat sidebar data

const chatData = [
    {name: "Aaa", time: "10:20PM", img:"https://cdn.pixabay.com/photo/2013/07/12/19/20/throwing-154588_1280.png"},
    {name: "bob", time: "10:20PM", img:"https://cdn.pixabay.com/photo/2013/07/12/19/20/throwing-154588_1280.png"},
    {name: "John", time: "10:20PM", img:"./assets/secondUser.png"},
];


const chatHistories = {};

function loadChats() {
    const chatList = document.getElementById("chatList");
    chatList.innerHTML = "";

    chatData.forEach(chat => {
        const chatCard = document.createElement("div");
        chatCard.classList.add("chat-card");

        chatCard.innerHTML = `
        <img src="${chat.img}" alt="${chat.name}">
        <div class="chat-details">
        <div class="chat-name">${chat.name}</div>
        </div>
        <div class="chat-time">${chat.time}</div>
        `;

        chatCard.addEventListener('click', () => {
            selectChat(chat);
        });

        chatList.appendChild(chatCard);
    });
}
console.log(chatHistories)

function selectChat(chat) {
    const receiverData = document.querySelector(".receiver-data");
    receiverData.querySelector("img").src = chat.img;
    receiverData.querySelector("h2").innerText = chat.name;

    const chatWindow = document.querySelector(".chat-window");
    chatWindow.innerHTML = "";

    if (chatHistories[chat.name]) {
        chatHistories[chat.name].forEach(message => {
            const messageDiv = document.createElement("div");
            messageDiv.classList.add("message", message.type);
            messageDiv.innerText = message.text;
            chatWindow.appendChild(messageDiv);
        });
    }
}

function sendMessage() {
    const input = document.getElementById("input1");
    const message = input.value;
    if (message.trim() === "") return;

    const chatWindow = document.querySelector(".chat-window");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", "sent");
    messageDiv.innerText = message;
    chatWindow.appendChild(messageDiv);

    const receiverName = document.querySelector(".receiver-data h2").innerText;
    if (!chatHistories[receiverName]) {
        chatHistories[receiverName] = [];
    }
    chatHistories[receiverName].push({ text: message, type: "sent" });

    input.value = "";
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

window.onload = () => {
    loadChats();

    const closeButton = document.querySelector(".close-icon");
    closeButton.addEventListener('click', function() {
        const parentDiv = this.parentElement;
        parentDiv.style.display = 'none';
    });

    const sendIcon = document.querySelector(".send-icon");
    sendIcon.addEventListener('click', sendMessage);

    const input = document.getElementById("input1");
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
};
