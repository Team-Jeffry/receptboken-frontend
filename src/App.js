import React from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import Suggest from "./component/Suggest";
import Home from "./component/Home";

function App() {
    return (
        <div>          
            <Home id="home"/>
            <Suggest id="suggest"/>
        </div>
    );
}

export default App;
