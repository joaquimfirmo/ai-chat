import readline from 'readline';
import { chatStream } from './chatStream.mjs';



async function main() {
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
                askQuestion(); // Pergunta novamente
                return;
            }

            try {
                const response = await chatStream(userQuestion, (chunk) => {
                    process.stdout.write(chunk);
                });
                
                console.log(`\n`);

                setTimeout(() => {
                    askQuestion(); // Pergunta novamente após resposta
                }, 500); // Espera 500 milissegundos antes de perguntar novamente
            } catch (error) {
                console.error("❌ Erro no chat:", error);
                console.log("🔄 Tente novamente com outra pergunta.\n");
                askQuestion();
            }
        });
    };

    askQuestion(); // Iniciar o chat
}

main().catch(console.error);

process.on('SIGINT', async () => {
    console.log('\n🛑 Interrompido pelo usuário');
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('\n🛑 Processo terminado');
    process.exit(0);
});

process.on('uncaughtException', async (error) => {
    console.error('\n💥 Erro não capturado:', error);
    process.exit(1);
});

process.on('unhandledRejection', async (reason, promise) => {
    console.error('\n💥 Promise rejeitada não tratada:', reason);
    process.exit(1);
});

