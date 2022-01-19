import axios from "axios";
import React, { Component } from "react";
import {Modal, Button} from "react-bootstrap";

class ShowRecipe extends Component {
  constructor() {
    super();
    this.state = {
      showHide: false,
      recipe: {},
      ingredients: [],
      categories: [],
    };
  }

  componentDidMount = async () => {
    const postData = {
      recipeName: "Fruktsallad med Jordgubbar",
      categoryNames: ["frukt"],
      time: 12,
    };

    await axios
      .post("http://localhost:8080/v1/recipe/get", postData)
      .then((res) => {
        this.setState({
          ...this.state,
          recipe: res.data[0],
        });

        this.setState({
          ...this.state,
          ingredients: this.getIngredients(),
          categories: this.getCategories()
        });
      });
  };

  handleModalShowHide() {
    this.setState({ showHide: !this.state.showHide });
  }

  getIngredients() {
    let array = [];
    for (let i = 0; i < this.state.recipe.ingredients.length; i++) {
      array.push(this.state.recipe.ingredients[i].name);
    }

    return array;
  }

  getCategories() {
    let array = [];
    for (let i = 0; i < this.state.recipe.categories.length; i++) {
      array.push(this.state.recipe.categories[i].name);
    }

    return array;
  }

  printValues(values) {
    return (
      <div>
        {values.map((elementInValues) => (
          <div key={Math.floor(Math.random() * 1000)}>{elementInValues}</div>
        ))}
      </div>
    );
  }

  render() {
    return (
      <div>
        <Button variant="primary" onClick={() => this.handleModalShowHide()}>
          Launch demo modal
        </Button>

        <Modal show={this.state.showHide}>
          <Modal.Header
            className="close-button"
            closeButton
            onClick={() => this.handleModalShowHide()}
          ></Modal.Header>
          <Modal.Body className="modal-body">
            <div className="modal-title">{this.state.recipe.name}</div>
            <div className="modal-description">
              {this.state.recipe.description}
              <br></br>______________
            </div>
            <div className="row">
              <div className="col">
                <p style={{fontWeight: "bold"}}>Ingredienser</p>
                {this.printValues(this.state.ingredients)}
                </div>
              <div className="col">
                <p style={{fontWeight: "bold"}}>Gör så här:</p>
                {this.state.recipe.instruction}</div>
            </div>
            <div>
            <p style={{fontWeight: "bold", paddingTop: "70px"}}>Kategorier</p>
          <div>{this.printValues(this.state.categories)}</div>
          </div>
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ShowRecipe;
