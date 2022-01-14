import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component {
    render() {
        return (
            <div className="background">
                <h1 className="title">Receptboken</h1>
                <div className="container">
                    <button>Sök recept</button>
                    <Link to="/suggest">
                        <button>Laga med det jag har</button>
                    </Link>
                    <button>Skapa nytt recept</button>
                </div>
            </div>
        );
    }
}
