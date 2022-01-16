import React from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import Suggest from "./component/Suggest";
import Home from "./component/Home";
import SaveRecipe from "./component/SaveRecipe";

function App() {
    window.onload = () => {
        window.scrollTo(0, 0);
    };

    return (
        <div>
            <Home id="home" />
            <Suggest id="suggest" />
            <SaveRecipe id="save-recipe" />
        </div>
    );
}

export default App;
