import type { NextPage } from "next"
import { useState } from "react"

const Home: NextPage = () => {
  const [wallet, setWalletAddress] = useState("")
  const [collection, setCollectionAddress] = useState("")
  const [NFTs, setNFTs] = useState([])
  const fetchNFT = async () => {
    let nfts
    console.log("fetching nft")
    const api_key = process.env.API_KEY
    const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTs/`
    let requestOptions = {
      method: "GET",
    }
    if (!collection.length) {
      const fetchURL = `${baseURL}?owner=${wallet}`
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    } else {
      console.log("fetching nfts for collection owned by address")
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    }
    if (nfts) {
      console.log("nfts:", nfts)
      setNFTs(nfts.ownedNfts)
    }
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <input
          onChange={(e) => {
            setWalletAddress(e.target.value)
          }}
          value={wallet}
          type="text"
          placeholder="Add your wallet address"
          className="border-2 border-gray-600 p-4"
        />
        <input
          onChange={(e) => {
            setCollectionAddress(e.target.value)
          }}
          value={collection}
          type="text"
          placeholder="Add the collection address"
          className="border-2 border-gray-600 p-4"
        />
        <label className="text-gray-600 "><input type={"checkbox"} className="mr-2"></input>Fetch for collection</label>
        <button
          onClick={fetchNFT}
          className={"disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"}
        >Let's go!
        </button>
      </div>
    </div>
  )
}

export default Home
