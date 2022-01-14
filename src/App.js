import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Suggest from "./component/Suggest";
import Home from "./component/Home";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/suggest" element={<Suggest />} />
            </Routes>
        </Router>
    );
}

export default App;
