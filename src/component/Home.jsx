import React, { Component } from "react";
import { Link } from "react-scroll";
import ShowRecipe from ".//ShowRecipe"

const style = {
    display: "flex",
    justifyContent: "center",
};

export default class Home extends Component {
    render() {
        return (
            <div ref={this.myRef} className="home">
                <h1 className="title">Receptboken</h1>
                <div style={style}>
                    <Link activeClass="active" to="search-recipe" spy={true} smooth={true} offset={0} duration={900}>
                        <button>Sök recept</button>
                    </Link>
                    <Link activeClass="active" to="suggest" spy={true} smooth={true} offset={-280} duration={900}>
                        <button>Laga med det jag har</button>
                    </Link>
                    <Link activeClass="active" to="save-recipe" spy={true} smooth={true} offset={0} duration={900}>
                        <button>Skapa nytt recept</button>
                    </Link>
                </div>
            </div>
        );
    }
}
