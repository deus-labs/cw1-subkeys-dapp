import { FaArrowLeft } from "react-icons/fa"

const Welcome = (): JSX.Element => {
  return (
    <div className="p-6 pr-60 bg-deus-black h-full flex flex-col justify-between text-deus-text">
      <div className="">
        <div className="text-5xl font-bold mb-5">CW1 Subkeys</div>
        <div className="text-3xl">What is it?</div>
        <br />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris
          augue neque gravida in fermentum et sollicitudin. Lectus vestibulum
          mattis ullamcorper velit. Vitae suscipit tellus mauris a diam maecenas
          sed enim. Duis convallis convallis tellus id interdum velit laoreet
          id. Lectus magna fringilla urna porttitor rhoncus dolor. Aenean
          pharetra magna ac placerat. Nulla facilisi nullam vehicula ipsum a
          arcu. Dui accumsan sit amet nulla facilisi morbi. Faucibus turpis in
          eu mi bibendum neque. Egestas dui id ornare arcu odio ut. Morbi leo
          urna molestie at elementum eu. Lectus magna fringilla urna porttitor
          rhoncus dolor purus non enim. Bibendum enim facilisis gravida neque
          convallis a cras semper auctor. Dignissim sodales ut eu sem integer
          vitae justo.
        </p>
        <br />
        <p>
          Eget gravida cum sociis natoque penatibus et magnis dis. Dapibus
          ultrices in iaculis nunc sed augue lacus. Aliquet porttitor lacus
          luctus accumsan. Sed odio morbi quis commodo odio aenean sed
          adipiscing. Elementum sagittis vitae et leo duis ut diam. Lacus vel
          facilisis volutpat est velit egestas dui id. Tristique nulla aliquet
          enim tortor at. Magna fermentum iaculis eu non diam phasellus
          vestibulum lorem sed. Est pellentesque elit ullamcorper dignissim cras
          tincidunt lobortis. Dignissim cras tincidunt lobortis feugiat vivamus
          at augue eget. Neque aliquam vestibulum morbi blandit cursus risus.
          Bibendum arcu vitae elementum curabitur vitae nunc. Et pharetra
          pharetra massa massa. Aliquam ultrices sagittis orci a scelerisque
          purus semper eget. Placerat orci nulla pellentesque dignissim enim sit
          amet venenatis. Ipsum consequat nisl vel pretium lectus. Volutpat ac
          tincidunt vitae semper quis lectus nulla. Ornare aenean euismod
          elementum nisi quis eleifend quam adipiscing vitae.
        </p>
      </div>
      <div
        className="p-3 h-36 border-2 border-deus-text mb-2 rounded-lg flex flex-col justify-between"
        style={{ width: "fit-content" }}
      >
        <div>
          Connecting the wallet is only supported through the Keplr extension.{" "}
          <br />
          You might not be able to use your Ledger to sign transactions for now.{" "}
          <br />
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
  )
}

export default Welcome
