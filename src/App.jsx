import "./App.css";
import { CategoriesProvider } from "./components/CategoriesProvider";
import { Main } from "./components/Main";

function App() {
  return (
    <CategoriesProvider>
      <Main />
    </CategoriesProvider>
  );
}

export default App;
