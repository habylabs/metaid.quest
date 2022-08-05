import { 
  Network,
  Alchemy,
  NftExcludeFilters,
} from 'alchemy-sdk';

import _ from 'lodash'

import {
  IDENTITY_NFT_CONTRACTS,
  EQUIPMENT_NFT_CONTRACTS
} from './constants'

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);

const _getCategoryAll = () => {
  return ['external', 'internal', 'erc20', 'erc721', 'erc1155', 'specialnft']
}

const _intToHex = (int) => (`0x${parseInt(int).toString(16)}`)

const getLatestBlockNum = async () => {
  try {
    const latestBlock = await alchemy.core.getBlockNumber()
    // Use the latestBlock - 5 so to void potential data processing lags
    // from Alchemy
    return _intToHex(latestBlock - 5)
  } catch (error) {
    console.log(error)
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
   console.log(error)
   return 0 
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
   console.log(error)
   return 0 
  }  
}

const _compareFirstFromToTx = (firstFromTx, firstToTx) => {
  if (parseInt(firstFromTx.blockNum, 16) > parseInt(firstToTx.blockNum, 16)) {
    return firstToTx
  }

  return firstFromTx
}

const getFirstTx = (allFromTx, allToTx) => {
  return {
    all: _compareFirstFromToTx(allFromTx.all[0], allToTx.all[0]),
    defi: _compareFirstFromToTx(allFromTx.defi[0], allToTx.defi[0]),
    nft: _compareFirstFromToTx(allFromTx.nft[0], allToTx.nft[0])
  }
}

const _compareLatestFromToTx = (latestFromTx, latestToTx) => {
  if (parseInt(latestFromTx.blockNum, 16) > parseInt(latestToTx.blockNum, 16)) {
    return latestFromTx
  }

  return latestToTx
}

const getLatestTx = (allFromTx, allToTx) => {
  const allFrom = allFromTx.all
  const defiFrom = allFromTx.defi
  const nftFrom = allFromTx.nft

  const allTo = allToTx.all
  const defiTo = allToTx.defi
  const nftTo = allToTx.nft

  return {
    all: _compareLatestFromToTx(allFrom[allFrom.length - 1], allTo[allTo.length - 1]),
    defi: _compareLatestFromToTx(defiFrom[defiFrom.length - 1], defiTo[defiTo.length - 1]),
    nft: _compareLatestFromToTx(nftFrom[nftFrom.length - 1], nftTo[nftTo.length - 1])
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
    const res = await alchemy.core.getTokenBalances(address, contractAddresses)
    const currentDeFiTokens = _.filter(
      res.tokenBalances,
      ({ tokenBalance }) => (parseInt(tokenBalance, 16) > 0)
    )
    return {
      allTime: res.tokenBalances.length,
      current: currentDeFiTokens.length,
    }
  } catch (error) {
    console.log(error)
    return []
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
    console.log(error)
    return 0
  }
}

function _getNftContractAddresses(type) {
  if (type === 'all') {
    return _.concat(IDENTITY_NFT_CONTRACTS, EQUIPMENT_NFT_CONTRACTS)
  } else if (type === 'equipment') {
    return EQUIPMENT_NFT_CONTRACTS
  } else {
    return IDENTITY_NFT_CONTRACTS
  }
}

async function getNFTs(address, type = 'all') {
  try {
    const nfts = await alchemy.nft.getNftsForOwner(address, {
      contractAddresses: _getNftContractAddresses(type)
    });
    return nfts.ownedNfts.map((nft) => ({
      contract: nft.contract,
      tokenId: nft.tokenId,
      tokenType: nft.tokenType,
      metaData: nft.rawMetadata,
      media: nft.media
    }))
  } catch (error) {
    console.log(error)
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
  getFirstTx,
  getLatestTx,
  getDeFiTokenCount,
  getNFTCount,
  getNFTs,
  getNFTMetadata
}