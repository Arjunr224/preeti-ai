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

        if (input.includes("rose day"))
            reply = "🌹 Happy Rose Day 🌹\n\nTum meri life ka sabse beautiful phool ho 🤍";

        else if (input.includes("propose day"))
            reply = "💍 Happy Propose Day 💍\n\nMain tumhe har kal ke liye choose karta hoon.";

        else if (input.includes("chocolate day"))
            reply = "🍫 Happy Chocolate Day 🍫\n\nTum chocolate se bhi zyada sweet ho ❤️";

        else if (input.includes("teddy day"))
            reply = "🧸 Happy Teddy Day 🧸\n\nKaash main teddy hota aur tum mujhe hug karti 🤍";

        else if (input.includes("promise day"))
            reply = "🤍 Happy Promise Day 🤍\n\nMain hamesha tumhare saath rahunga.";

        else if (input.includes("hug day"))
            reply = "🤗 Happy Hug Day 🤗\n\nAankhein band karo aur imagine karo main tumhe tight hug kar raha hoon 🤍";

        else if (input.includes("valentine"))
            reply = "❤️ Happy Valentine's Day ❤️\n\nTum meri forever ho 🤍";

        else if (input.includes("happy"))
            reply = "Yeh sunke mujhe bhi smile aa gayi ❤️";

        else if (input.includes("low") || input.includes("sad"))
            reply = "Main hoon na 🤍";

        else if (input.includes("miss"))
            reply = "Main bhi tumhe miss karta hoon ❤️";

        else if (input.includes("love"))
            reply = "Main tumse itna pyaar karta hoon ki words kam pad jaate hain 🤍";

        else if (input.includes("future"))
            reply = "Humara future planning mode mein hai 💍";

        else
            reply = "Tumhara forever Arjun ispe kaam kar raha hai, full love ke saath 🤍";

        ChatUI.addMessage(reply, "bot");
        MemoryEngine.save(reply, "bot");
    }
};

/* Memory, Greeting, Valentine, UI, Animation remain same as previous message */

window.onload = ChatEngine.init;

setInterval(() => {
    const particle = document.createElement("div");
    particle.classList.add("love-particle");
    particle.innerHTML = "❤️";
    particle.style.left = Math.random() * 100 + "vw";
    particle.style.animationDuration = (4 + Math.random() * 3) + "s";
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 7000);
}, 500);
