/* ================= MEMORY ENGINE ================= */

const MemoryEngine = {

    save(text, type) {
        let chats = JSON.parse(localStorage.getItem("preetiChat")) || [];
        chats.push({ text, type });
        localStorage.setItem("preetiChat", JSON.stringify(chats));
    },

    load() {
        let chats = JSON.parse(localStorage.getItem("preetiChat")) || [];
        chats.forEach(chat => {
            ChatUI.addMessage(chat.text, chat.type);
        });
    },

    clear() {
        localStorage.removeItem("preetiChat");
        location.reload();
    }
};


/* ================= UI ================= */

const ChatUI = {

    addMessage(text, type) {
        const chatBox = document.getElementById("chat-box");

        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", type);
        messageDiv.innerText = text;

        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    },

    showTyping() {
        const chatBox = document.getElementById("chat-box");

        const typingDiv = document.createElement("div");
        typingDiv.classList.add("message", "bot");
        typingDiv.id = "typing";
        typingDiv.innerText = "PreetiCare AI soch raha hai...";

        chatBox.appendChild(typingDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    },

    removeTyping() {
        const typing = document.getElementById("typing");
        if (typing) typing.remove();
    }
};


/* ================= VALENTINE ENGINE ================= */

const ValentineEngine = {

    checkDate() {

        const today = new Date();
        const month = today.getMonth(); // Feb = 1
        const date = today.getDate();

        if (month === 1) {

            this.showCountdown();

            const messages = {
                7: "🌹 Happy Rose Day 🌹\nTum meri life ka sabse beautiful phool ho 🤍",
                8: "💍 Happy Propose Day 💍\nMain tumhe har kal ke liye choose karta hoon.",
                9: "🍫 Happy Chocolate Day 🍫\nTum chocolate se bhi zyada sweet ho ❤️",
                10: "🧸 Happy Teddy Day 🧸\nKaash main teddy hota aur tum mujhe hug karti 🤍",
                11: "🤍 Happy Promise Day 🤍\nMain hamesha tumhare saath rahunga.",
                12: "🤗 Happy Hug Day 🤗\nYeh hug lifetime validity ke saath hai.",
                14: "❤️ Happy Valentine's Day ❤️\nTum meri forever ho 🤍"
            };

            if (messages[date]) {
                setTimeout(() => {
                    ChatUI.addMessage(messages[date], "bot");
                    MemoryEngine.save(messages[date], "bot");
                }, 2000);
            }

            if (date === 14) {
                this.secretProposal();
                this.heartExplosion();
            }
        }
    },

    showCountdown() {
        const today = new Date();
        const valentine = new Date(today.getFullYear(), 1, 14);
        const diff = Math.ceil((valentine - today) / (1000 * 60 * 60 * 24));

        if (diff > 0) {
            const msg = `💖 Valentine's Day tak sirf ${diff} din baaki hain 💖`;
            setTimeout(() => {
                ChatUI.addMessage(msg, "bot");
                MemoryEngine.save(msg, "bot");
            }, 1500);
        }
    },

    secretProposal() {
        const proposal = "Preeti 🤍\nKya tum meri forever banogi? 💍❤️";
        setTimeout(() => {
            ChatUI.addMessage(proposal, "bot");
            MemoryEngine.save(proposal, "bot");
        }, 4000);
    },

    heartExplosion() {
        for (let i = 0; i < 60; i++) {
            let heart = document.createElement("div");
            heart.classList.add("love-particle");
            heart.innerHTML = "❤️";
            heart.style.left = Math.random() * 100 + "vw";
            heart.style.animationDuration = "2s";
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 2000);
        }
    }
};


/* ================= CHAT ENGINE ================= */

const ChatEngine = {

    init() {
        MemoryEngine.load();
        this.greetIfFirstTime();
        ValentineEngine.checkDate();
    },

    greetIfFirstTime() {
        let chats = JSON.parse(localStorage.getItem("preetiChat"));

        if (!chats || chats.length === 0) {

            setTimeout(() => {
                ChatUI.addMessage("Hi Preeti 🤍", "bot");
                MemoryEngine.save("Hi Preeti 🤍", "bot");
            }, 500);

            setTimeout(() => {
                ChatUI.addMessage("Aaj mood kaisa hai tumhara? 😊", "bot");
                MemoryEngine.save("Aaj mood kaisa hai tumhara? 😊", "bot");
            }, 1200);
        }
    },

    send() {

        const inputField = document.getElementById("userInput");
        const message = inputField.value.trim();

        if (!message) return;

        ChatUI.addMessage(message, "user");
        MemoryEngine.save(message, "user");

        inputField.value = "";

        ChatUI.showTyping();

        setTimeout(() => {
            ChatUI.removeTyping();
            this.respond(message.toLowerCase());
        }, 900);
    },

    quickSend(text) {
        document.getElementById("userInput").value = text;
        this.send();
    },

    respond(input) {

        let reply = "";

        /* Valentine Keywords */

        if (input.includes("rose day"))
            reply = "🌹 Happy Rose Day 🌹\nTum meri life ka sabse beautiful phool ho 🤍";

        else if (input.includes("propose day"))
            reply = "💍 Happy Propose Day 💍\nMain tumhe har kal ke liye choose karta hoon.";

        else if (input.includes("chocolate day"))
            reply = "🍫 Happy Chocolate Day 🍫\nTum chocolate se bhi zyada sweet ho ❤️";

        else if (input.includes("teddy day"))
            reply = "🧸 Happy Teddy Day 🧸\nKaash main teddy hota aur tum mujhe hug karti 🤍";

        else if (input.includes("promise day"))
            reply = "🤍 Happy Promise Day 🤍\nMain hamesha tumhare saath rahunga.";

        else if (input.includes("hug day"))
            reply = "🤗 Happy Hug Day 🤗\nMain tumhe tight hug bhej raha hoon 🤍";

        else if (input.includes("valentine"))
            reply = "❤️ Happy Valentine's Day ❤️\nTum meri forever ho 🤍";

        /* Mood */

        else if (input.includes("happy"))
            reply = "Yeh sunke mujhe bhi smile aa gayi ❤️";

        else if (input.includes("low") || input.includes("sad"))
            reply = "Main hoon na 🤍";

        else if (input.includes("miss"))
            reply = "Main bhi tumhe miss karta hoon ❤️";

        else if (input.includes("love"))
            reply = "Main tumse itna pyaar karta hoon ki words kam pad jaate hain 🤍";

        else if (input === "reset memory") {
            MemoryEngine.clear();
            return;
        }

        else
            reply = "Tumhara forever Arjun ispe kaam kar raha hai, full love ke saath 🤍";

        ChatUI.addMessage(reply, "bot");
        MemoryEngine.save(reply, "bot");
    }
};


/* ================= INIT ================= */

window.onload = function () {
    ChatEngine.init();
};


/* ================= BACKGROUND HEARTS ================= */

setInterval(() => {
    const particle = document.createElement("div");
    particle.classList.add("love-particle");
    particle.innerHTML = "❤️";
    particle.style.left = Math.random() * 100 + "vw";
    particle.style.animationDuration = (4 + Math.random() * 3) + "s";
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 7000);
}, 500);
