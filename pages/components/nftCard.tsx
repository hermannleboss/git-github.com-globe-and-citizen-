import { NextPage } from "next"

export const NFTCard: NextPage = ({ nft }) => {
  return (
    <div className="w-1/4 flex flex-col ">
      <div className="rounded-md">
        <img className="object-cover h-128 w-full rounded-t-md" src={nft.media[0].gateway}></img>
      </div>
      <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110 ">
        <div className="">
          <h2 className="text-xl text-gray-800">{nft.title}</h2>
          <p className="text-gray-600">Id: {nft.id.tokenId.substring(nft.id.tokenId.length - 4)}</p>
          <p className="text-gray-600">{nft.contract.address}</p>
        </div>

        <p>{nft.contract.address.substring(0, 4)}
          ... {nft.contract.address.substring(nft.contract.address.length - 4)}</p>
        <div><a target={"_blank"} href={`https://etherscan.io/token/${nft.contract.address}`}>Viex on ehterscan</a>
        </div>
      </div>
    </div>
  )
}