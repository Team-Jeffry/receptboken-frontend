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
    };
  }

  componentDidMount = async () => {
    const postData = {
      recipeName: "Fruktsallad med Jordgubbar",
      categoryNames: ["Frukt"],
      time: 12,
    };

    await axios
      .post("http://localhost:8080/v1/recipe/get", postData)
      .then((res) => {
        console.log(res);

        this.res = res.data;
        this.state.recipe = this.res[0];
        return this.state.recipe;
      });
  };

  handleModalShowHide() {
    this.setState({ showHide: !this.state.showHide });
  }

  render() {
    return (
      <div>
        <Button variant="primary" onClick={() => this.handleModalShowHide()}>
          Launch demo modal
        </Button>

        <Modal show={this.state.showHide}>
          <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
            <Modal.Title className="modal-title">{this.state.recipe.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
            <div>{this.state.recipe.description}</div>

              <div className="row">
                <div className="col"></div>
                <div className="col">{this.state.recipe.instruction}</div>
              </div>
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
