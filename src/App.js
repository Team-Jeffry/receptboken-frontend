import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SaveRecipe from "./components/saveRecipe";

function App() {
  return (
    <Router>
      <div className="background">
        <h1 className="title">Receptboken</h1>
        <div className="container">
          <Link to="/search">
            <button>Sök recept</button>
          </Link>
          <Link to="/suggest">
            <button>Laga med det jag har</button>
          </Link>
          <Link to="/save">
            <button>Skapa nytt recept</button>
          </Link>
        </div>
        <Routes>
          <Route exact path="/save" element={<SaveRecipe />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
