import axios from "axios";
import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class ShowRecipe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showHide: this.props.showHide,
            ingredients: [],
            categories: [],
        };
    }

    printValues(values) {
        return (
            <div>
                {values.map((elementInValues) => (
                    <div key={elementInValues.name}>{elementInValues.name}</div>
                ))}
            </div>
        );
    }

    render() {
        return (
            <div>
                {/* <Button variant="primary" onClick={() => this.handleModalShowHide()}>
          Launch demo modal
        </Button> */}

                <Modal show={this.props.showHide} style={{ paddingTop: "7vh" }}>
                    <Modal.Header
                        className="close-button"
                        closeButton
                        // onClick={() => this.handleModalShowHide()}
                    ></Modal.Header>
                    <Modal.Body className="modal-body">
                        <div className="modal-title">{this.props.recipe.name}</div>
                        <div className="modal-description">
                            {this.props.recipe.description}
                            <br></br>______________
                        </div>
                        <div className="row">
                            <div className="col">
                                <p style={{ fontWeight: "bold" }}>Ingredienser</p>
                                {this.printValues(this.props.recipe.ingredients)}
                            </div>
                            <div className="col instruction">
                                <p style={{ fontWeight: "bold" }}>Gör så här:</p>
                                <p className="instruction-text">{this.props.recipe.instruction}</p>
                            </div>
                        </div>
                        <div>
                            <p style={{ fontWeight: "bold", paddingTop: "70px" }}>Kategorier</p>
                            <div>{this.printValues(this.props.recipe.categories)}</div>
                        </div>
                    </Modal.Body>
                    {/* <Modal.Footer></Modal.Footer> */}
                </Modal>
            </div>
        );
    }
}

export default ShowRecipe;
