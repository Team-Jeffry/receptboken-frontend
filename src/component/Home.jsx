import React, { Component } from "react";
import { Link, animateScroll as scroll } from "react-scroll";

export default class Home extends Component {
  render() {
    return (
      <div ref={this.myRef} className="home">
        <h1 className="title">Receptboken</h1>
        <div className="container">
          <Link
            activeClass="active"
            to="search-recipe"
            spy={true}
            smooth={true}
            offset={-200}
            duration={900}
          >
            <button>Sök recept</button>
          </Link>
          <Link
            activeClass="active"
            to="suggest"
            spy={true}
            smooth={true}
            offset={-200}
            duration={900}
          >
            <button>Laga med det jag har</button>
          </Link>
          <Link
            activeClass="active"
            to="save-recipe"
            spy={true}
            smooth={true}
            offset={-200}
            duration={900}
          >
            <button>Skapa nytt recept</button>
          </Link>
        </div>
      </div>
    );
  }
}
