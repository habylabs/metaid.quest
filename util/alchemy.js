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

function getCategoryAll() {
  return ['external', 'internal', 'token']
}

async function getLatestBlock() {
  return await alchemy.core.getBlockNumber()
}

async function get6mBlock() {
  try {
    const latestBlock = await getLatestBlock()
    return `0x${(parseInt(latestBlock, 16) - 1000000).toString(16)}`
  } catch (error) {
    console.log(error)
  }
}

async function getFirstTx(address) {
  try {
    const resFrom = await alchemy.core.getAssetTransfers([{
      'fromAddress': address,
      'category': getCategoryAll()
    }])
    const resTo = await alchemy.core.getAssetTransfers([{
      'toAddress': address,
      'category': getCategoryAll()
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
    const res = await alchemy.core.getAssetTransfers([{
      'fromBlock': fromBlock,
      'toBlock': "latest",
      'fromAddress': address,
      'category': getCategoryAll()
    }])

    return res.result.transfers
  } catch (error) {
   console.log(error)
   return 0 
  }  
}

async function getToTx(fromBlock, address) {
  try {
    const res = await alchemy.core.getAssetTransfers([{
      'fromBlock': fromBlock,
      'toBlock': "latest",
      'toAddress': address,
      'category': getCategoryAll()
    }])

    return res.result.transfers
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
  get6mBlock,
  getFirstTx,
  getFromTx,
  getToTx,
  getTokens,
  getNFTCount,
  getNFTs,
  getNFTMetadata
}