import React, { Component } from "react";
import { Link, animateScroll as scroll } from "react-scroll";

export default class Home extends Component {
    render() {
        return (
            <div className="home">
                <h1 className="title">Receptboken</h1>
                <div className="container">
                    <button>Sök recept</button>
                    <Link activeClass="active" to="suggest" spy={true} smooth={true} offset={0} duration={900}>
                        <button>Laga med det jag har</button>
                    </Link>
                    <button>Skapa nytt recept</button>
                </div>
            </div>
        );
    }
}

