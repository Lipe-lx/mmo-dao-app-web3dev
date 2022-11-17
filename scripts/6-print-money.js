import sdk from "./1-initialize-sdk.js";

const token = sdk.getToken("0x4834a4bb8C4c05Ad7e69570c44E2AcB584AB184B");

(async () => {
    try {
        // Escolha a quantidade de tokens disponíveis
        const amount = 1_000_000;
        // Interagindo com o contrato ERC20 e cunhando os tokens
        await token.mintToSelf(amount);
        const totalSupply = await token.totalSupply();

        // Exibindo a quantidade de tokens existentes
        console.log("✅ Agora temos", totalSupply.displayValue, "$EXP em cirlulação");
    } catch (error) {
        console.log("Falha ao imprimir o dinheiro", error);
    }
})();