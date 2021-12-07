import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { WalletProvider } from "./services/wallet"
import { ContractsProvider } from "./contracts"
import PageLayout from "./layout/Page"
import {
  executePath,
  instantiatePath,
  queryPath /* contractPath */,
} from "./routes"
// import { ProtectedSwitch } from "./routes/ProtectedSwitch"
import Welcome from "./pages/Welcome"
// import Contract from "./pages/Contract"
import Instantiate from "./pages/Instantiate"
import Execute from "./pages/Execute"
import Query from "./pages/Query"
import "react-toastify/dist/ReactToastify.css"
import { useState } from "react"

const App = (): JSX.Element => {
  const [network, setNetwork] = useState<string>("juno")

  return (
    <WalletProvider>
      <ContractsProvider>
        <Router basename={process.env.PUBLIC_URL}>
          <PageLayout network={network} setNetwork={setNetwork}>
            <Switch>
              <Route exact path="/" component={Welcome} />
              <Route
                exact
                path={`/${network}/${instantiatePath}`}
                component={Instantiate}
              />
              <Route
                exact
                path={`/${network}/${executePath}`}
                component={Execute}
              />
              <Route
                exact
                path={`/${network}/${queryPath}`}
                component={Query}
              />
              {/* <ProtectedSwitch>
                <Route exact path={`/${contractPath}`} component={Contract} />
                <Route
                  exact
                  path={`/${instantiatePath}`}
                  component={Instantiate}
                />
                <Route exact path={`/${executePath}`} component={Execute} />
                <Route exact path={`/${queryPath}`} component={Query} />
              </ProtectedSwitch> */}
            </Switch>
          </PageLayout>
        </Router>
        <ToastContainer theme="dark" />
      </ContractsProvider>
    </WalletProvider>
  )
}

export default App
