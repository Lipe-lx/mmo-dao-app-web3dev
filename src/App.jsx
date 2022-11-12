//importando o thirdweb
import { useAddress, useMetamask, useEditionDrop } from '@thirdweb-dev/react';
import { useState, useEffect } from 'react';

const App = () => {
  //acessando a Metamesk através do thirdweb
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  console.log("👋 Address:", address);

  // inicializando o contrato editionDrop
  const editionDrop = useEditionDrop("0xA2Cd9116Cee3aE676a1096827369881C6fc6659F");

  // Verificação se o usuário possui a NFT passaporte
  const [hasClaimeNFT, setHasClaimedNFT] = useState(false);

  // isClaiming nos ajuda a saber se está no estado de carregamento enquanto o NFT é cunhado.
  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    // verificação da conecção da carteira
    if(!address){
      return;
    }
    
    const checkBalance = async () => {
      try{
        const balance = await editionDrop.balanceOf(address, 0);
        // Caso seja maior que 0 o saldo a carteira possui o NFT passaport
        // No gt(0) o numero 0 refere-se ao id do nft cunhado
        if (balance.gt(0)) {
          setHasClaimedNFT(true)
          console.log("🌟 esse usuário tem o NFT Passaporte!")
        } else {
          setHasClaimedNFT(false);
          console.log("😭 esse usuário NÃO tem o NFT Passaporte.")
        }
      } catch(error) {
        setHasClaimedNFT(false)
        console.log("Falha ao ler saldo", error);
      }
    }
    checkBalance()
  }, [address, editionDrop])

  const mintNft = async () => {
    try {
      setIsClaiming(true);
      await editionDrop.claim("0", 1);
      console.log(`🌊 Cunhado com sucesso! Olhe na OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/0`);
      setHasClaimedNFT(true);
    } catch (error) {
      setHasClaimedNFT(false);
      console.error("Falha ao cunhar NFT", error);
    } finally {
      setIsClaiming(false);
    
    }
  };

  //caso a carteira não esteja conectada
  if (!address) {
    return(
      <div className="landing">
        <h1>Bem-vind@s à MMODAO - Para você que assim como eu ama um MMORPG 🙇‍♀️</h1>
        <button onClick={connectWithMetamask} className="btn-hero">
          Conect sua Carteira
        </button>
      </div>
    );
  }

  //Quando a carteira está conectada e temos o endereço do usuário
  return (
    <div className="mint-nft">
      <h1>Cunhe gratuitamente seu NFT Passaporte da MMODAO 🧙</h1>
      <button
        disabled={isClaiming}
        onClick={mintNft}>
        {isClaiming ? "Cunhando..." : "Cunhe seu NFT (GRATS)"}
      </button>
    </div>
  );
};

export default App;
