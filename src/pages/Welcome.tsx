import { FaArrowLeft, FaGithub } from "react-icons/fa"

const Welcome = (): JSX.Element => {
  return (
    <div className="p-6 bg-deus-black flex flex-col justify-end text-deus-text flex-1">
      <div className="">
        <div className="text-5xl font-bold mb-5">
          <a
            href="https://github.com/CosmWasm/cw-plus/tree/main/contracts/cw1-subkeys"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-center">
              CW1 Subkeys <FaGithub size={24} className="ml-2" />
            </div>
          </a>{" "}
        </div>
        <p className="mb-3">
          CW1 Subkeys is initially proposed in Cosmos forum in Jun 2019 to be
          added to the Cosmos Hub as a module. You can check out from this{" "}
          <a
            href="https://forum.cosmos.network/t/proposal-adding-subkey-feature-to-cosmos-sdk-and-apply-it-to-the-hub/2358/15"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-400 font-bold"
          >
            link.
          </a>
        </p>
        <p>
          Since then it’s still not yet added to the Hub but thanks to CosmWasm
          and the ability to write smart contracts on Cosmos blockchains, this
          feature is here now.
        </p>
        <div className="text-3xl font-bold my-3">
          How it works? <br />
        </div>
        <div className="text-lg">
          <div>
            - Contract is instantiated with a given list of admins and a
            variable for making the list mutable/immutable. <br />
          </div>
          <div>
            - Admins can update the admin list if needed.
            <br />
          </div>
          <div>
            - Admins can freeze the admin list, making it immutable forever.
            <br />
          </div>
          <div>
            - Admins increase/decrease allowance for any wallet they add.
            <br />
          </div>
          <div>
            - Admins can set permissions to wallets for relaying different
            messages. This is limited to 4 for now. (delegate, undelegate,
            redelegate, withdraw)
            <br />
          </div>
          <div>
            - Wallet owners can relay send messages to get tokens that are
            allocated to them with allowance feature.
            <br />
          </div>
        </div>
        <div className="text-3xl font-bold my-3">
          Use cases <br />
        </div>
        <div className="text-lg">
          <div>
            - People can use this contract to utilize as a single shared account
            between themselves. They can lock up tokens and get them based on
            their allowance. <br />
          </div>
          <div>
            - This example can also be implemented in a bigger environment such
            as a company. Different accounts and subkeys can be made to do
            internal allocations. <br />
          </div>
          <div>
            - In our use case we have a validator that is running and in order
            to fairly distribute the rewards among the team, we setup a single
            account that gets all the rewards and give allowance to the people
            who'll get those. <br />
          </div>
        </div>
      </div>
      <div className="flex-1 my-10"></div>
      <div className="h-full flex-1 flex items-end">
        <div
          className="p-3 h-36 border-2 border-deus-text mb-2 rounded-lg flex flex-col justify-between "
          style={{ width: "fit-content" }}
        >
          <div>
            Connecting the wallet is only supported through the Keplr extension.{" "}
            <br />
            You might not be able to use your Ledger to sign transactions for
            now. <br />
            We are working on it!
          </div>
          <div className="flex item-center text-xl font-bold">
            <div className="flex items-center justify-center">
              <FaArrowLeft size={22} className="mr-3" />
            </div>
            Connect your wallet to explore CW1 Subkeys
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome
