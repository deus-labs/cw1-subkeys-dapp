import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { WalletProvider } from "./services/wallet"
import PageLayout from "./layout/Page"
import { contractPath, executePath, instantiatePath, queryPath } from "./routes"
import { ProtectedSwitch } from "./routes/ProtectedSwitch"
import Welcome from "./pages/Welcome"
import Instantiate from "./pages/Instantiate"
import Execute from "./pages/Execute"
import Query from "./pages/Query"
import "react-toastify/dist/ReactToastify.css"

const App = (): JSX.Element => {
  return (
    <WalletProvider>
      <Router basename={process.env.PUBLIC_URL}>
        <PageLayout>
          <Switch>
            <Route exact path="/" component={Welcome} />
            <ProtectedSwitch>
              <Route exact path={`/${contractPath}`} component={Welcome} />
              <Route
                exact
                path={`/${instantiatePath}`}
                component={Instantiate}
              />
              <Route exact path={`/${executePath}`} component={Execute} />
              <Route exact path={`/${queryPath}`} component={Query} />
            </ProtectedSwitch>
          </Switch>
        </PageLayout>
      </Router>
      <ToastContainer theme="dark" />
    </WalletProvider>
  )
}

export default App
