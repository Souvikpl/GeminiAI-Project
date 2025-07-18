import { GoogleGenerativeAI } from "@google/generative-ai";
import readline from "readline";

const ai = new GoogleGenerativeAI("AIzaSyARXSYiI4xwQuBNe9wGDl4If2Pef_AxQyU");
//const modelFlash = "gemini-2.5-flash";
const modelPro = "gemini-2.5-pro";

async function main() {
    const model = ai.getGenerativeModel({ model: modelPro });

    const chat = model.startChat({ history: [] });

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "You: ",
    });

    console.log("🤖 Gemini 2.5 Pro Chatbot is ready! Type 'exit' to quit.\n");
    rl.prompt();

    rl.on("line", async (line) => {
        const input = line.trim();

        if (input.toLowerCase() === "exit") {
        rl.close();
        return;
        }

        try {
            const result = await chat.sendMessage(input);
            const response = result.response;
            const text = response.text();
            console.log(`Gemini: ${text}\n`);
        } catch (error) {
            console.error("❌ Error:", error.message);
        }

        rl.prompt();
    });

    rl.on("close", () => {
        console.log("\n👋 Chat ended.");
        process.exit(0);
    });
}

main();