import mongoose from "mongoose";

export async function connect(){
    try {
       console.log('Conectando...');
       await mongoose.connect(String(process.env.DATABASE_URL));
       console.log('Conexão realizada com sucesso!')
    } catch (error) {
        console.error("Não foi possível conectar!");
        console.error(`Erro: ${error}`);
    }
}   