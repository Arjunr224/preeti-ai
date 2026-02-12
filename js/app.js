/* ================= CHAT ENGINE ================= */

const ChatEngine = {

    init() {
        MemoryEngine.load();
        GreetingModule.greetIfFirstTime();
        ValentineEngine.checkDate();
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
            ChatEngine.respond(message.toLowerCase());
        }, 900);
    },

    quickSend(text) {
        document.getElementById("userInput").value = text;
        this.send();
    },

    respond(input) {

        let reply = "";

        if (input.includes("happy"))
            reply = "Yeh sunke mujhe bhi smile aa gayi ❤️ Tumhari khushi meri favorite cheez hai.";

        else if (input.includes("low") || input.includes("sad"))
            reply = "Aao yahan 🤍 Sab kuch akela handle karne ki zarurat nahi hai. Main hoon na.";

        else if (input.includes("miss"))
            reply = "Main bhi tumhe bahut miss karta hoon ❤️ Distance sirf shehron ka hota hai, dilon ka nahi.";

        else if (input.includes("love"))
            reply = "Main tumse itna pyaar karta hoon ki words bhi kam pad jaate hain 🤍";

        else if (input.includes("future"))
            reply = "Humara future already planning mode mein hai 😌 Bas execution baaki hai 💍";

        else
            reply = "Tumhara forever Arjun ispe kaam kar raha hai, full love ke saath 🤍";

        ChatUI.addMessage(reply, "bot");
        MemoryEngine.save(reply, "bot");
    }
};


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
    }
};


/* ================= GREETING ================= */

const GreetingModule = {

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
    }
};


/* ================= VALENTINE ENGINE ================= */

const ValentineEngine = {

    checkDate() {
        const today = new Date();
        const month = today.getMonth();
        const date = today.getDate();

        if (month === 1) {

            ValentineEngine.showCountdown();

            const messages = {
                7: "🌹 Happy Rose Day 🌹 Tum meri life ka sabse beautiful phool ho 🤍",
                8: "💍 Happy Propose Day 💍 Main tumhe har kal ke liye choose karta hoon.",
                9: "🍫 Happy Chocolate Day 🍫 Tum chocolate se bhi zyada sweet ho ❤️",
                10: "🧸 Happy Teddy Day 🧸 Kaash main teddy hota aur tum mujhe hug karti 🤍",
                11: "🤍 Happy Promise Day 🤍 Main hamesha tumhare saath rahunga.",
                12: "🤗 Happy Hug Day 🤗 Yeh hug lifetime validity ke saath hai.",
                14: "❤️ Happy Valentine's Day ❤️ Tum meri forever ho 🤍"
            };

            if (messages[date]) {
                setTimeout(() => {
                    ChatUI.addMessage(messages[date], "bot");
                    MemoryEngine.save(messages[date], "bot");
                }, 2000);
            }

            if (date === 14) {
                ValentineEngine.secretProposal();
                ValentineEngine.heartExplosion();
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
        const proposal = "Preeti 🤍 Kya tum meri forever banogi? 💍❤️";
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
    },

    removeTyping() {
        const typing = document.getElementById("typing");
        if (typing) typing.remove();
    }
};

window.onload = ChatEngine.init;


/* ================= BACKGROUND LOVE ================= */

setInterval(() => {
    const particle = document.createElement("div");
    particle.classList.add("love-particle");
    particle.innerHTML = "❤️";
    particle.style.left = Math.random() * 100 + "vw";
    particle.style.animationDuration = (4 + Math.random() * 3) + "s";
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 7000);
}, 500);
