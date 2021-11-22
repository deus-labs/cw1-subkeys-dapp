import { SdkProvider } from "./services/wallet"
import Login from "./components/Login"
import "./App.css"

const App = (): JSX.Element => {
  return (
    <SdkProvider>
      <div className="App">
        <Login />
      </div>
    </SdkProvider>
  )
}

export default App
