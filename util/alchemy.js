import { 
  Network,
  Alchemy,
  NftExcludeFilters,
} from 'alchemy-sdk';

import _ from 'lodash'

import {
  EQUIPMENT_NFT_CONTRACTS,
  DEFAULT_IDENTITY_NFT_CONTRACTS,
} from './constants'

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

const _recursiveTxPagination = async (results, alchemyRes, params = {}) => {
  if (alchemyRes && alchemyRes.pageKey) {
    const res = await alchemy.core.getAssetTransfers({
      ...params,
      pageKey: alchemyRes.pageKey
    })

    const recursiveRes = await _recursiveTxPagination(res.transfers, res, params)
    return _.concat(results, recursiveRes)
  }

  return results
}

const _recursiveNftPagination = async (address, results, alchemyRes, params = {}) => {
  if (alchemyRes && alchemyRes.pageKey) {
    const res = await alchemy.nft.getNftsForOwner(address, {
      ...params,
      pageKey: alchemyRes.pageKey
    })

    const recursiveRes = await _recursiveNftPagination(address, res.ownedNfts, res, params)
    return _.concat(results, recursiveRes)
  }

  return results
}

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
    const params = {
      fromBlock,
      toBlock,
      fromAddress: address,
      excludeZeroValue: true,
      category: _getCategoryAll()
    }
    const res = await alchemy.core.getAssetTransfers(params)

    const all = await _recursiveTxPagination(res.transfers, res, params)
    console.log(`All FromTx length for ${address}: ${all.length}`)

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
    const params = {
      fromBlock,
      toBlock,
      toAddress: address,
      excludeZeroValue: true,
      category: _getCategoryAll()
    }
    const res = await alchemy.core.getAssetTransfers(params)

    const all = await _recursiveTxPagination(res.transfers, res, params)
    console.log(`All ToTx length for ${address}: ${all.length}`)

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
    console.log(`NFT Total count for ${address}: ${nfts.totalCount}`)

    return {
      allTime: _getContractAddresses(fromTx, toTx).length,
      current: nfts.totalCount
    }
  } catch (error) {
    console.error(error)
    return _getNoCount()
  }
}

const _parseNftTitleMetaData = (title) => {
  const titleArray = title.split('#')
  return (
    titleArray[0] === '' ? null : titleArray[0]
  )
}

const _pullAllNfts = async (address, initialAlchemyRes, params) => {
  if (initialAlchemyRes.pageKey) {
    if (initialAlchemyRes.totalCount > 500) {
      return initialAlchemyRes.ownedNfts
    }

    return await _recursiveNftPagination(
      address,
      initialAlchemyRes.ownedNfts,
      initialAlchemyRes,
      params
    )
  }

  return initialAlchemyRes.ownedNfts
}

const _getFinalNftList = async (address, defaultNfts, initialAlchemyRes, params) => {
  const allNfts = await _pullAllNfts(address, initialAlchemyRes, params)
  return _.unionWith(defaultNfts, allNfts, _.isEqual)
}

const getNFTs = async (address) => {
  try {
    const defaultListParams = {
      excludeFilters: [ NftExcludeFilters.SPAM ],
      contractAddresses: _.concat(DEFAULT_IDENTITY_NFT_CONTRACTS, EQUIPMENT_NFT_CONTRACTS),
    }
    const defaultAlchemyRes = await alchemy.nft.getNftsForOwner(address, defaultListParams)
    const defaultNfts = await _recursiveNftPagination(
      address,
      defaultAlchemyRes.ownedNfts,
      defaultAlchemyRes,
      defaultListParams
    )
    console.log(`Default NFT total count for ${address}: ${defaultNfts.length}`)

    const params = { excludeFilters: [ NftExcludeFilters.SPAM ] }
    const initialAllNfts = await alchemy.nft.getNftsForOwner(address, params)

    const finalNftList = await _getFinalNftList(
      address,
      defaultNfts,
      initialAllNfts, 
      params
    )
    console.log(`NFT list count for ${address}: ${finalNftList.length}`)

    return finalNftList.map((nft) => ({
      contract: nft.contract.address.toLowerCase(),
      title: _parseNftTitleMetaData(nft.title),
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

const getNFTMetadata = async (contractAddress, contractId) => {
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