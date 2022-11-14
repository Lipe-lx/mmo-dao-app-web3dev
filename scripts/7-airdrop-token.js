import sdk from "./1-initialize-sdk.js";

// Pegando o endereço ERC1155 do nosso NFT de filiação
const editionDrop = sdk.getEditionDrop("0x94D7dbDC971cdB8a67393e793e7beB66f1727271");
// Pegando o endereço ERC20 do nosso token
const token = sdk.getToken("0x2f5a435E3D87Aea28f7fA169CD05268DD304A547");

(async () => {
    try {
        // Pegue o endereço de todas as pessoas que possuem o nosso NFT de filiação com tokenId 0
        const walletAddresses = await editionDrop.history.getAllClaimerAddresses(0);

        if (walletAddresses.length === 0) {
            console.log(
                "Ninguem mintou o NFT ainda, peça alguns amigos para fazer isso e ganharem o NFT gratuitamente!"
            );
            process.exit(0);
        }

        // Faça um loop no array de endereços
        const airdropTargets = walletAddresses.map((address) => {
            // Escolha um # aleatorio entre 1000 e 10000
            const randomAmount = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
            console.log ("✅ Vai enviar", randomAmount, "tokens para ", address);
            
            // Configure o alvo
            const airdropTarget = {
                toAddress: address,
                amount: randomAmount,
            };
            return airdropTarget;
        });

        // Chame o transferBatch (batch = lote) em todos os alvos do airdrop.
        console.log("🌈 Começando o airdrop...")
        await token.transferBatch(airdropTargets);
        console.log("✅ Realizado o airdrop de tokens para todos os donos de 🌈NFT!");
    } catch (err) {
        console.error("O airdrop de tokens falhou", err);
    }
})();