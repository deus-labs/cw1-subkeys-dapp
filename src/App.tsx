import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { SdkProvider } from "./services/wallet"
import PageLayout from "./layout/page"
import { allowancesPath, operationPath } from "./routes"
import { ProtectedSwitch } from "./routes/ProtectedSwitch"
import Login from "./components/Login"
import Operations from "./components/Operations"
import Allowances from "./components/Allowances"

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
            </ProtectedSwitch>
            <Login />
          </Switch>
        </Router>
      </PageLayout>
    </SdkProvider>
  )
}

export default App
