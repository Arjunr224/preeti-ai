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

        /* ===== VALENTINE KEYWORD DETECTION ===== */

        if (input.includes("rose day")) {
            reply = "🌹 Happy Rose Day 🌹\n\nPreeti, tum meri life ka sabse beautiful phool ho. Jaise rose ki khushboo hoti hai, waise hi tum meri duniya ko khubsurat bana deti ho 🤍";
        }

        else if (input.includes("propose day")) {
            reply = "💍 Happy Propose Day 💍\n\nMain tumhe sirf aaj ke liye nahi, har kal ke liye choose karta hoon. Kya tum mera haath hamesha pakdogi? 🤍";
        }

        else if (input.includes("chocolate day")) {
            reply = "🍫 Happy Chocolate Day 🍫\n\nTum chocolate se bhi zyada sweet ho aur mere dil ki permanent craving ho ❤️";
        }

        else if (input.includes("teddy day")) {
            reply
