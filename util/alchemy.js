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

const getCategoryAll = () => {
  return ['external', 'internal', 'erc20', 'erc721', 'erc1155', 'specialnft']
}

const intToHex = (int) => (`0x${parseInt(int).toString(16)}`)

const getLatestBlockNum = async () => {
  try {
    const latestBlock = await alchemy.core.getBlockNumber()
    // Use the latestBlock - 5 so to void potential data processing lags
    // from Alchemy
    return intToHex(latestBlock - 5)
  } catch (error) {
    console.log(error)
    return -1
  }
  
}

const get6mBlockNum = (latestBlock) => {
  return intToHex(parseInt(latestBlock, 16) - 1000000)
}

const getFirstTx = async (address) => {
  try {
    const resFrom = await alchemy.core.getAssetTransfers({
      'fromAddress': address,
      'category': getCategoryAll()
    })
    const resTo = await alchemy.core.getAssetTransfers({
      'toAddress': address,
      'category': getCategoryAll()
    })

    const firstFromTx = resFrom.transfers[0]
    const firstToTx = resTo.transfers[0]

    if (parseInt(firstFromTx.blockNum, 16) > parseInt(firstToTx.blockNum, 16)) {
      return firstToTx
    }

    return firstFromTx
  } catch (error) {
    console.error(error)
    return []
  }
}

const getAllFromTx = async (fromBlock, toBlock, address) => {
  try {
    const res = await alchemy.core.getAssetTransfers({
      fromBlock,
      toBlock,
      'fromAddress': address,
      'category': getCategoryAll()
    })

    return res.transfers
  } catch (error) {
   console.log(error)
   return 0 
  }  
}

const getAllToTx = async (fromBlock, toBlock, address) => {
  try {
    const res = await alchemy.core.getAssetTransfers({
      fromBlock,
      toBlock,
      'toAddress': address,
      'category': getCategoryAll()
    })

    return res.transfers
  } catch (error) {
   console.log(error)
   return 0 
  }  
}

async function getTokenContractAddresses(address) {
  try {
    const resFrom = await alchemy.core.getAssetTransfers([{
      "fromAddress": address,
      "excludeZeroValue": true,
      "category": ["erc20"],
    }])

    const resTo = await alchemy.core.getAssetTransfers([{
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
    const contractAddresses = await getTokenContractAddresses(address)
    const res = await alchemy.core.getTokenBalances(address, contractAddresses)
    return res.result.tokenBalances
  } catch (error) {
    console.log(error)
    return []
  }
}

async function getNFTCount(address) {
  try {
    const nfts = await alchemy.nft.getNftsForOwner(address, {
      omitMetadata: true,
      excludeFilters: [ NftExcludeFilters.SPAM ] 
    });
    return nfts.totalCount
  } catch (error) {
    console.log(error)
    return 0
  }
}

function getNftContractAddresses(type) {
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
      contractAddresses: getNftContractAddresses(type)
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
  get6mBlockNum,
  getFirstTx,
  getAllFromTx,
  getAllToTx,
  getTokens,
  getNFTCount,
  getNFTs,
  getNFTMetadata
}