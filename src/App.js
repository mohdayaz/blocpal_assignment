import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Provider } from 'react-redux';
import Main from "../src/components/Main"
import store from "./store/store"

function App() {
  return (
    <div className="app">
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <Main />
        </DndProvider>
      </Provider>
    </div>
  )
}

export default App
