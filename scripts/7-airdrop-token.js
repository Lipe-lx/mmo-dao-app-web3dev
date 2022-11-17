import sdk from "./1-initialize-sdk.js";

// Pegando o endereço ERC1155 do nosso NFT de filiação
const editionDrop = sdk.getEditionDrop("0x874ee39A4f3Fb0c03817f9C9c8d0A139A2fB1446");
// Pegando o endereço ERC20 do nosso token
const token = sdk.getToken("0x4834a4bb8C4c05Ad7e69570c44E2AcB584AB184B");

(async () => {
    try {
        // Pegue o endereço de todas as pessoas que possuem o nosso NFT de filiação com tokenId 0
        const walletAddresses = await editionDrop.history.getAllClaimerAddresses(0);

        // Verificar se existem carteiras com o NFT
        if (walletAddresses.length === 0) {
            console.log(
                "Ninguem mintou o NFT ainda, peça alguns amigos para fazer isso e ganharem o NFT gratuitamente!"
            );

            process.exit(0);
        }

        // Faça um loop no array de endereços walletAddresses
        const airdropTargets = walletAddresses.map((address) => {
            
            // Escolha um número aleatorio entre 1.000 e 10.000
            const randomAmount = Math.floor(Math.random()*(10000-1000+1));
            console.log ("✅ Vai enviar", randomAmount, "tokens para ", address);            
            
            // Configure o alvo - quantidade de tokens e o endereço
            const airdropTarget = {
                toAddress: address,
                amount: randomAmount,
            };

            return airdropTarget;
        });

        // Chame o transferBatch (batch = lote) em todos os alvos do airdrop.
        console.log("🌈Começando o airdrop...")
        await token.transferBatch(airdropTargets);
        console.log("✅ Realizado o airdrop de tokens para todos os donos de 🌈NFT!");
    } 
    catch (err) {
        console.error("O airdrop de tokens falhou", err);
    }
})();