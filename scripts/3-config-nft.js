import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop("0xA2Cd9116Cee3aE676a1096827369881C6fc6659F");

(async () => {
    try{
        await editionDrop.createBatch([
            {
                name: "Passaporte MMODAO",
                description: "Este é um NFT passaporte de entrada em nossa DAO, para você que assim como eu ama um MMORPG",
                image: readFileSync("scripts/assets/mmodao_member.png"),
            },
        ]);
        console.log("✅ Novo NFT criado com sucesso no drop!");
    } catch (error) {
        console.error("falha ao criar o NFT", error);
    }
})()

