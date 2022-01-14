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
      name: "",
      description: "",
      instruction: "",
      time: "",
      ingredients: [],
      categories: [],
    },
  };
}

  componentDidMount() {
    const postData = {
      recipeName: "Fruktsallad med Jordgubbar",
      categoryNames: ["Frukt"],
      time: 12,
    };

    axios.post("http://localhost:8080/v1/recipe/get", postData).then((res) => {
      console.log(res);
      //const recipe = res.data;
      this.setState({ name: res.data.name });
      console.log(res.data.name);
    });
  }

  handleModalShowHide() {
    this.setState({ showHide: !this.state.showHide })
  }

  render() {
    return (
      <div>
      <Button variant="primary" onClick={() => this.handleModalShowHide()}>
          Launch demo modal
      </Button>

      <Modal show={this.state.showHide}>
          <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
          <Modal.Title id="name">{this.state.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>

          </Modal.Footer>
      </Modal>

  </div>
    );
  }
}

export default ShowRecipe;
