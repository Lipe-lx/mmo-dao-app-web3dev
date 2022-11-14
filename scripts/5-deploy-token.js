import { AddressZero } from "@ethersproject/constants";
import sdk from "./1-initialize-sdk.js";

(async () => {
    try {
        // Realizando o deploy de um contrato ERC20 padrão
        const tokenAddress = await sdk.deployer.deployToken ({
            // Nome do token
            name: "Experience MMODAO",
            // Simbolo do token
            symbol: "EXP",
            // Aqui é para o caso de querermos vender o token
            // Neste caso não realizaremos vendas, portanto o AddressZero é adicionado
            primary_sale_recipient: AddressZero,
        });
        console.log(
            "✅ Módulo de token implantado com sucesso. Endereço:",
            tokenAddress,
        );
    } catch (error) {
        console.error("falha ao implantar moódulo do token", error);
    }
})();