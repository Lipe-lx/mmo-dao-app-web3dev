import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop("0x94D7dbDC971cdB8a67393e793e7beB66f1727271");

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

