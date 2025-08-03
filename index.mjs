import { chat } from "./src/chat.mjs";

async function main() {
    await chat();
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

