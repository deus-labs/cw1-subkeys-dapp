import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { SdkProvider } from "./services/wallet"
import PageLayout from "./layout/page"
import { allowancesPath, operationPath, withdrawPath } from "./routes"
import { ProtectedSwitch } from "./routes/ProtectedSwitch"
import Operations from "./components/Operations"
import Allowances from "./components/Allowances"
import Withdraw from "./components/Withdraw"
import Welcome from "./pages/Welcome"
import "react-toastify/dist/ReactToastify.css"

const App = (): JSX.Element => {
  return (
    <SdkProvider>
      <Router basename={process.env.PUBLIC_URL}>
        <PageLayout>
          <Switch>
            <Route exact path="/" component={Welcome} />
            <ProtectedSwitch>
              <Route exact path={operationPath} component={Operations} />
              <Route exact path={allowancesPath} component={Allowances} />
              <Route exact path={withdrawPath} component={Withdraw} />
            </ProtectedSwitch>
          </Switch>
        </PageLayout>
      </Router>
      <ToastContainer />
    </SdkProvider>
  )
}

export default App
