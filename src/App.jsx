//importando o thirdweb
import { useAddress, useMetamask, useEditionDrop, useToken } from '@thirdweb-dev/react';
import { useState, useEffect, useMemo } from 'react';

const App = () => {
  //acessando a Metamesk através do thirdweb
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  console.log("👋 Address:", address);

  // inicializando o contrato editionDrop
  const editionDrop = useEditionDrop("0x874ee39A4f3Fb0c03817f9C9c8d0A139A2fB1446");
  const token = useToken("0x4834a4bb8C4c05Ad7e69570c44E2AcB584AB184B");
  // Verificação se o usuário possui a NFT passaporte
  const [hasClaimeNFT, setHasClaimedNFT] = useState(false);
  // isClaiming nos ajuda a saber se está no estado de carregamento enquanto o NFT é cunhado.
  const [isClaiming, setIsClaiming] = useState(false);
  // array para guardar a quantitdade de tokens de cada carteira que possui o NFT
  const [memberTokenAmounts, setMemberTokenAmounts] = useState([]);
  // array para guardar os endereços das carteiras que possuem os nfts.
  const [memberAddresses, setMemberAddresses] =useState([]);

  // função para simplificar a visualização do endereço
  const shortenAddress =(str) => {
    return str.sbstring(0,6) + "..." + str.substring(str.length - 4);
  };

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

  // useEffect para identificar todos os endereços que possuem a Nft
  useEffect(() => {
    if (!hasClaimeNFT) {
      return;
    }
    const getAllAddress = async () => {
      try {
        // pegando endereços que possuem a NFT com Id 0.
        const memberAddresses = await editionDrop.history.getAllClaimerAddresses(0)
        setMemberAddresses(memberAddresses);
        console.log("🚀 Endereços de membros", memberAddresses);
      } catch (error) {
        console.error("falha ao pegar lista de membros", error);
      }
    };
    getAllAddress();
  }, [hasClaimeNFT, editionDrop.history]);

  // useEffect para pegar a quatidade de tokens das carteira detentoras do NFT
  useEffect(() => {
    if (!hasClaimeNFT) {
      return;
    }  
    const getAllBalances = async () => {
      try {
        const amounts = await token.history.getAllHolderBalances();
        setMemberTokenAmounts(amounts);
        console.log("👜 Quantidades", amounts);
      } catch (error) {
        console.error("falha ao buscar os saldo dos membros", error);
      }
    };    
    getAllBalances();
  }, [hasClaimeNFT, token.history]);

  // Colocando em um unico array os memberAddresses e os memberTokemAmounts
  const memberList = useMemo (() => {
    return memberAddresses.map((address) => {
      const member = memberTokenAmounts?.find(({ holder }) => holder === address);
      return {
        address,
        tokenAmount: member?.balance.displayValue || "0",
      }
    });
  }, [memberAddresses, memberTokenAmounts]);

  const mintNft = async () => {
    try {
      setIsClaiming(true);

      await editionDrop.claim("0", 1);

      console.log(`🌊 Cunhado com sucesso! Olhe na OpenSea: 
        https://testnets.opensea.io/assets/${editionDrop.getAddress()}/0`);

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
        <h1>Bem-vind@s à MMODAO</h1>
        <h1>Para você que assim como eu ama um MMO RPG 🧙</h1>
        <button onClick={ connectWithMetamask } className="btn-hero">
          Conect sua Carteira
        </button>
      </div>
    )
  }
  if (hasClaimeNFT) {
    return(
      <div className='member-page'>
        <h1>🧙Página da MMODAO🧙</h1>
        <h1>🛡️🏹Legião dos Heróis🗡️🛡️</h1>
        <p>🌟 Juntos nossa XP irá sempre progredir ao maximo! 🌟</p>
        <div>
          <div>
            <h2>Lista dos Heróis</h2>
            <table className='card'>
              <thead>
                <tr>
                  <th>Endereço</th>
                  <th>Quantidade de EXP</th>
                </tr>
              </thead>
              <tbody>
                {memberList.map((member) => {
                  return (
                    <tr key={member.address}>
                      <td>{shortenAddress(member.address)}</td>
                      <td>{member.tokenAmount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  //Quando a carteira está conectada e temos o endereço do usuário
  return (
    <div className="mint-nft">
      <h1>Cunhe gratuitamente seu NFT Passaporte da MMODAO 🧙</h1>
      <button disabled={ isClaiming } onClick={ mintNft }>
        {isClaiming ? "Cunhando..." : "Cunhe seu NFT (GRATS)"}
      </button>
    </div>
  );
};

export default App;
