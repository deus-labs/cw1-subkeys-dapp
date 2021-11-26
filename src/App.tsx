import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { SdkProvider } from "./services/wallet"
import PageLayout from "./layout/page"
import { allowancesPath, operationPath, withdrawPath } from "./routes"
import { ProtectedSwitch } from "./routes/ProtectedSwitch"
import Login from "./components/Login"
import Operations from "./components/Operations"
import Allowances from "./components/Allowances"
import Withdraw from "./components/Withdraw"
import "react-toastify/dist/ReactToastify.css"

const App = (): JSX.Element => {
  return (
    <SdkProvider>
      <PageLayout>
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route exact path="/" component={Login} />
            <ProtectedSwitch>
              <Route exact path={operationPath} component={Operations} />
              <Route exact path={allowancesPath} component={Allowances} />
              <Route exact path={withdrawPath} component={Withdraw} />
            </ProtectedSwitch>
          </Switch>
        </Router>
      </PageLayout>
      <ToastContainer />
    </SdkProvider>
  )
}

export default App
