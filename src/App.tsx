import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom"
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

const App = (): JSX.Element => {
  return (
    <WalletProvider>
      <ContractsProvider>
        <Router basename={process.env.PUBLIC_URL}>
          <PageLayout>
            <Switch>
              <Route exact path="/" component={Welcome} />
              <Route
                exact
                path={`/${instantiatePath}`}
                component={Instantiate}
              />
              <Route exact path={`/${executePath}`} component={Execute} />
              <Route exact path={`/${queryPath}`} component={Query} />
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
              <Redirect to="/" />
            </Switch>
          </PageLayout>
        </Router>
        <ToastContainer theme="dark" />
      </ContractsProvider>
    </WalletProvider>
  )
}

export default App
