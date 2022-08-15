import mongoose from "mongoose";
import Logger from "./logger";

export async function connect(){
    try {
       await mongoose.connect(String(process.env.DATABASE_URL));
       Logger.info('Conexão realizada com sucesso!')
    } catch (error) {
        Logger.error("Não foi possível conectar!");
        Logger.error(`Erro: ${error}`);
    }
}   