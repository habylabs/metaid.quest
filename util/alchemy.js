import { 
  Network,
  initializeAlchemy,
  getNftsForOwner,
  getNftMetadata,
  NftExcludeFilters,
} from '@alch/alchemy-sdk';

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
  maxRetries: 10
};

const alchemy = initializeAlchemy(settings);

function getAlchemyURL() {
  return `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`
}

async function fetchAlchemyData(method, params) {
  try {
    const alchemyRes = await fetch(getAlchemyURL(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "jsonrpc": "2.0",
        "id": 0,
        "method": method,
        "params": params,
      })
    })
  
    const json = await alchemyRes.json()
    return json
  } catch (error) {
    console.log(error)
  }
}

async function get6mBlock() {
  try {
    const res = await fetchAlchemyData('eth_getBlockByNumber', ['latest', false])
    const { number } = res.result
    return `0x${(parseInt(number, 16) - 1000000).toString(16)}`
  } catch (error) {
    console.log(error)
  }
}

async function getFirstTx(address) {
  try {
    const resFrom = await fetchAlchemyData('alchemy_getAssetTransfers', [{
      "fromBlock": "0x1",
      "fromAddress": address,
    }])

    const resTo = await fetchAlchemyData('alchemy_getAssetTransfers', [{
      "fromBlock": "0x1",
      "toAddress": address,
    }])

    const firstFromTx = resFrom.result.transfers[0]
    const firstToTx = resTo.result.transfers[0]

    if (parseInt(firstFromTx, 16) > parseInt(firstToTx, 16)) {
      return firstToTx
    }

    return firstFromTx
  } catch (error) {
    console.error(error)
    return []
  }
}

async function getFromTx(fromBlock, address) {
  try {
    const res = await fetchAlchemyData('alchemy_getAssetTransfers', [{
      "fromBlock": fromBlock,
      "toBlock": "latest",
      "fromAddress": address,
    }])

    return res.result.transfers
  } catch (error) {
   console.log(error)
   return 0 
  }  
}

async function getToTx(fromBlock, address) {
  try {
    const res = await fetchAlchemyData('alchemy_getAssetTransfers', [{
      "fromBlock": fromBlock,
      "toBlock": "latest",
      "toAddress": address,
    }])

    return res.result.transfers
  } catch (error) {
   console.log(error)
   return 0 
  }  
}

async function getContractAddresses(address) {
  try {
    const resFrom = await fetchAlchemyData('alchemy_getAssetTransfers', [{
      "fromBlock": "0x1",
      "fromAddress": address,
      "excludeZeroValue": true,
      "category": ["erc20"],
    }])

    const resTo = await fetchAlchemyData('alchemy_getAssetTransfers', [{
      "fromBlock": "0x1",
      "toAddress": address,
      "excludeZeroValue": true,
      "category": ["erc20"],
    }])

    const fromContractAddress = resFrom.result.transfers.map(tx => tx.rawContract.address)
    const toContractAddress = resTo.result.transfers.map(tx => tx.rawContract.address)
    return [...new Set([...fromContractAddress, ...toContractAddress])];
  } catch (error) {
    console.log(error)
    return []
  }
}

async function getTokens(address) {
  try {
    const contractAddresses = await getContractAddresses(address)
    const res = await fetchAlchemyData('alchemy_getTokenBalances', [address, contractAddresses])
    return res.result.tokenBalances
  } catch (error) {
    console.log(error)
    return []
  }
}

async function getNFTCount(address) {
  try {
    const nfts = await getNftsForOwner(alchemy, address, {
      omitMetadata: true,
      excludeFilters: [ NftExcludeFilters.SPAM ] 
    });
    return nfts.totalCount
  } catch (error) {
    console.log(error)
    return 0
  }
}

async function getNFTMetadata(contractAddress, contractId) {
  try {
    const nftMetadata = await getNftMetadata(alchemy, contractAddress, contractId);
    return nftMetadata.metadata
  } catch (error) {
    console.error(error)
    return null
  }
}

export {
  get6mBlock,
  getFirstTx,
  getFromTx,
  getToTx,
  getTokens,
  getNFTCount,
  getNFTMetadata
}