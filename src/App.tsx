import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { SdkProvider } from "./services/wallet"
import PageLayout from "./layout/page"
import { allowancesPath, operationPath, withdrawPath } from "./routes"
import { ProtectedSwitch } from "./routes/ProtectedSwitch"
import Login from "./components/Login"
import Operations from "./components/Operations"
import Allowances from "./components/Allowances"
import Withdraw from "./components/Withdraw"

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
    </SdkProvider>
  )
}

export default App
