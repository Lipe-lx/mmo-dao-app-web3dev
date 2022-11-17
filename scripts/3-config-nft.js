import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop("0x874ee39A4f3Fb0c03817f9C9c8d0A139A2fB1446");

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

