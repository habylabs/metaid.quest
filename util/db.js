import prisma from '../lib/prisma';

async function getTokenByTokenId(tokenId) {
  try {
    const db = await prisma.token.findUnique({
      where: {
        token_id: tokenId,
      },
    })

    return db
  } catch (error) {
    console.error(error)
    throw error
  }
}

export {
  getTokenByTokenId,
}