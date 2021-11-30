import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { SdkProvider } from "./services/wallet"
import CenteredLayout from "./layout/centered"
import { allowancesPath, operationPath, withdrawPath } from "./routes"
import { ProtectedSwitch } from "./routes/ProtectedSwitch"
import Connect from "./components/Connect"
import Operations from "./components/Operations"
import Allowances from "./components/Allowances"
import Withdraw from "./components/Withdraw"
import "react-toastify/dist/ReactToastify.css"

const App = (): JSX.Element => {
  return (
    <SdkProvider>
      <CenteredLayout>
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route exact path="/" component={Connect} />
            <ProtectedSwitch>
              <Route exact path={operationPath} component={Operations} />
              <Route exact path={allowancesPath} component={Allowances} />
              <Route exact path={withdrawPath} component={Withdraw} />
            </ProtectedSwitch>
          </Switch>
        </Router>
      </CenteredLayout>
      <ToastContainer />
    </SdkProvider>
  )
}

export default App
