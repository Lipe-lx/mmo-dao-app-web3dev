import sdk from "./1-initialize-sdk.js";

const token = sdk.getToken("0x2f5a435E3D87Aea28f7fA169CD05268DD304A547");

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