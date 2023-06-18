import { Provider } from "react-redux"
import { Posts } from "./components/Posts"
import { GlobalStyles } from "./components/styles/GlobalStyles"
import { store } from "./redux/store"
import { OrderTypeButtons } from "./components/OrderTypeButtons"

export default function App() {
  return <Provider store={store} >
    <GlobalStyles />
    <div>
      <OrderTypeButtons />
      <Posts />
    </div>
  </Provider>
}