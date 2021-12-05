interface TransactionHashProps {
  txHash: string
}

const TransactionHash = ({ txHash }: TransactionHashProps): JSX.Element => {
  if (txHash === "") return <></>

  return (
    <div className="flex p-3 bg-deus-pink text-white bg-gradient-to-r from-deus-pink to-deus-purple rounded-lg font-bold">
      <div>Transaction hash: </div>
      <div className="ml-2">{txHash}</div>
    </div>
  )
}

export default TransactionHash
