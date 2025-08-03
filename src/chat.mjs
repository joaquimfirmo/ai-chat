import readline from 'readline';
import { chatStream } from './chatStream.mjs';



export async function chat() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log("Bem vindo ao Chat AI! 🤖");
    
    const askQuestion = () => { 
        rl.question("Você: ", async (userQuestion) => {
            if (userQuestion.toLowerCase() === 'sair') {
                console.log("Saindo do chat. Até logo! 👋");
                rl.close();
                return;
            }

            if(!userQuestion.trim()) {
                console.log("Por favor, digite uma pergunta válida.");
                askQuestion(); 
            }

            try {
                const response = await chatStream(userQuestion, (chunk) => {
                    process.stdout.write(chunk);
                });
                
                console.log(`\n`);

                setTimeout(() => {
                    askQuestion();
                }, 500);
            } catch (error) {
                console.error("❌ Erro no chat:", error);
                console.log("🔄 Tente novamente com outra pergunta.\n");
                askQuestion();
            }
        });
    };

    askQuestion();
}


