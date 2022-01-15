import React, { useRef } from "react";
import Axios from "axios";

class SaveRecipe extends React.Component {
    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.submit = this.submit.bind(this);

        this.state = {
            requestbody: {
                name: "",
                description: "",
                instruction: "",
                time: 0,
                ingredients: [
                    {
                        name: "",
                        description: "",
                    },
                ],
                categoryNames: [
                    {
                        name: "",
                    },
                ],
            },
        };
    }

    render() {
        return (
            <div className="save-recipe">
                <div className="blurredBackground"></div>
                <div className="container p-10">
                    <h1 className="h1-padded">Skapa nytt recept</h1>
                    <form className="row g-3" onSubmit={this.onSubmit}>
                        <div className="col-md-4">
                            <label for="recipeName">Receptnamn *</label>
                            <input
                                id="recipeName"
                                value={this.state.requestbody.name}
                                className="form-control"
                                type="text"
                                onChange={(e) => this.handleInputChange(e)}
                            ></input>
                        </div>
                        <div className="col-md-4">
                            <label for="description">Beskrivning av recept *</label>
                            <input
                                id="description"
                                value={this.state.requestbody.description}
                                className="form-control"
                                type="text"
                                onChange={(e) => this.handleInputChange(e)}
                            ></input>
                        </div>
                        <div className="col-md-4">
                            <label for="instruction">Instruktioner till receptet *</label>
                            <input
                                id="instruction"
                                value={this.state.requestbody.instruction}
                                className="form-control"
                                type="text"
                                onChange={(e) => this.handleInputChange(e)}
                            ></input>
                        </div>
                        <div className="col-md-4">
                            <label for="time">Tid att tillaga *</label>
                            <input
                                id="time"
                                value={this.state.requestbody.time}
                                className="form-control"
                                type="text"
                                onChange={(e) => this.handleInputChange(e)}
                            ></input>
                        </div>
                        <div className="col-md-8">
                            <label for="ingredientName">Namn på ingrediens *</label>
                            <input
                                id="ingredients"
                                value={this.state.requestbody.ingredients.name}
                                className="form-control"
                                type="text"
                                onChange={(e) => this.handleInputChange(e)}
                            ></input>
                        </div>
                        <div className="col-md-12">
                            <label for="ingredientDescription">Beskrivning av ingrediens *</label>
                            <input
                                id="ingredientDescription"
                                value={this.state.requestbody.ingredients.description}
                                className="form-control"
                                type="text"
                                onChange={(e) => this.handleInputChange(e)}
                            ></input>
                        </div>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <button>Avbryt</button>
                            <button onClick={this.submit()}>Spara recept</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    onSubmit(e) {
        e.preventDefault();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.id;

        this.setState({
            requestbody: {
                ...this.state.requestbody,
                [name]: value,
            },
        });
    }

    async submit() {
        const requestbody = this.state.requestbody;

        await Axios.post("http://localhost:8080/v1/recipe/save", {
            name: requestbody.name,
            description: requestbody.description,
            instruction: requestbody.instruction,
            time: requestbody.time,
            ingredients: [
                {
                    name: requestbody.ingredients.name,
                    description: requestbody.ingredients.description,
                },
            ],
            categoryNames: [
                {
                    name: requestbody.categoryNames.name,
                },
            ],
        });
    }
}

export default SaveRecipe;
