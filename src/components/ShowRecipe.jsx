import axios from "axios";
import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

class ShowRecipe extends Component {
  constructor() {
    super();
    this.state = {
      showHide: false,
      recipe: {
        /* name: "bla",
      description: "",
      instruction: "",
      time: "",
      ingredients: [],
      categories: [],*/
      },
      ingredients: [],
      categories: []
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
        console.log(res);

        this.res = res.data;
        this.state.recipe = this.res[0];
        this.state.ingredients = this.res[0].ingredients;
        this.state.categories = this.res[0].categories;
      });
  };

  handleModalShowHide() {
    this.setState({ showHide: !this.state.showHide });
  }

  getIngredients() {
    /* for (let i = 0; i < this.state.recipe.ingredients.length; i++) { 
      console.log(this.state.recipe.ingredients[i].name);
    }*/

    /*this.state.recipe.ingredients.forEach(element => {
      console.log(element)
    });*/
    //const allIngredients = this.state.recipe
    //console.log(this.state.ingredients);



    return (
      <ul>
        <li>hej</li>
        <li>hej</li>
      </ul>
    );
  }

  render() {
    return (
      <div>
        <Button variant="primary" onClick={() => this.handleModalShowHide()}>
          Launch demo modal
        </Button>

        <Modal show={this.state.showHide}>
          <Modal.Header className="close-button" closeButton onClick={() => this.handleModalShowHide()}>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <div  className="modal-title">{this.state.recipe.name}</div>
            <div className="modal-description">{this.state.recipe.description}<br>
            </br>______________</div>
              <div className="row">
                <div className="col" >{this.state.ingredients.name}</div>
                <div className="col">{this.state.recipe.instruction}</div>
              </div>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ShowRecipe;
