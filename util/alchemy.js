import { 
  Network,
  Alchemy,
  NftExcludeFilters,
} from 'alchemy-sdk';

import _ from 'lodash'

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);

const _getCategoryAll = () => {
  return ['external', 'internal', 'erc20', 'erc721', 'erc1155', 'specialnft']
}

const _getNoCount = () => ({
  allTime: 0,
  current: 0,
})

const _getNoTx = () => ({
  all: [],
  defi: [],
  nft: []
})

const _intToHex = (int) => (`0x${parseInt(int).toString(16)}`)

const getLatestBlockNum = async () => {
  try {
    const latestBlock = await alchemy.core.getBlockNumber()
    // Use the latestBlock - 5 so to void potential data processing lags
    // from Alchemy
    return _intToHex(latestBlock - 5)
  } catch (error) {
    console.error(error)
    return -1
  }
}

const getFromTx = async (address, fromBlock, toBlock) => {
  try {
    const res = await alchemy.core.getAssetTransfers({
      fromBlock,
      toBlock,
      'fromAddress': address,
      'category': _getCategoryAll()
    })

    const all = res.transfers

    return {
      all,
      defi: _.filter(all, ['category', 'erc20']),
      nft: _.filter(all, (tx) => (tx.category === 'erc721' || tx.category === 'erc1155')),
    }
  } catch (error) {
    console.error(error)
    return _getNoTx()
  }  
}

const getToTx = async (address, fromBlock, toBlock) => {
  try {
    const res = await alchemy.core.getAssetTransfers({
      fromBlock,
      toBlock,
      'toAddress': address,
      'category': _getCategoryAll()
    })

    const all = res.transfers

    return {
      all,
      defi: _.filter(all, ['category', 'erc20']),
      nft: _.filter(all, (tx) => (tx.category === 'erc721' || tx.category === 'erc1155')),
    }
  } catch (error) {
    console.error(error)
    return _getNoTx()
  }  
}

const _getContractAddresses = (fromTx, toTx) => {
  const fromContractAddress = fromTx.map(tx => tx.rawContract.address)
  const toContractAddress = toTx.map(tx => tx.rawContract.address)
  return [...new Set([...fromContractAddress, ...toContractAddress])];
}

const getDeFiTokenCount = async (address, fromTx, toTx) => {
  try {
    const contractAddresses = _getContractAddresses(fromTx, toTx)

    if (contractAddresses.length > 0) {
      const res = await alchemy.core.getTokenBalances(address, contractAddresses)
      const currentDeFiTokens = _.filter(
        res.tokenBalances,
        ({ tokenBalance }) => (parseInt(tokenBalance, 16) > 0)
      )
      return {
        allTime: res.tokenBalances.length,
        current: currentDeFiTokens.length,
      }
    }

    return _getNoCount()
  } catch (error) {
    console.error(error)
    return _getNoCount()
  }
}

const getNFTCount = async (address, fromTx, toTx) => {
  try {
    const nfts = await alchemy.nft.getNftsForOwner(address, {
      omitMetadata: true,
      excludeFilters: [ NftExcludeFilters.SPAM ] 
    });

    return {
      allTime: _getContractAddresses(fromTx, toTx).length,
      current: nfts.totalCount
    }
  } catch (error) {
    console.error(error)
    return _getNoCount()
  }
}

async function getNFTs(address, type = 'all') {
  try {
    const nfts = await alchemy.nft.getNftsForOwner(address)
    return nfts.ownedNfts.map((nft) => ({
      contract: nft.contract.address.toLowerCase(),
      tokenId: nft.tokenId,
      tokenType: nft.tokenType,
      metaData: nft.rawMetadata,
      media: nft.media
    }))
  } catch (error) {
    console.error(error)
    return []
  }
}

async function getNFTMetadata(contractAddress, contractId) {
  try {
    const nftMetadata = await alchemy.nft.getNftMetadata(contractAddress, contractId);
    return nftMetadata.metadata
  } catch (error) {
    console.error(error)
    return null
  }
}

export {
  getLatestBlockNum,
  getFromTx,
  getToTx,
  getDeFiTokenCount,
  getNFTCount,
  getNFTs,
  getNFTMetadata
}