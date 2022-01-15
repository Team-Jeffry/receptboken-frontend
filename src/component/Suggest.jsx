import React, { Component } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import Axios from "axios";

const keyCodes = {
    comma: 188,
    enter: [10, 13],
};

const delimiters = [...keyCodes.enter, keyCodes.comma];

export default class Suggest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: [],
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleDelete(i) {
        const { tags } = this.state;
        this.setState({
            tags: tags.filter((tag, index) => index !== i),
        });
    }

    handleAddition(tag) {
        this.setState((state) => ({ tags: [...state.tags, tag] }));
    }

    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: newTags });
    }

    async submit() {

        const ingredients = []

        this.state.tags.forEach(element => {            
            ingredients.push({ name: element.text })
        })        

        console.log(ingredients);

        await Axios.post("http://localhost:8080/v1/recipe/suggest", ingredients)
            .then((response) => {
                console.log(response)
            }).catch(error => console.log(error))
    }

    render() {
        const { tags } = this.state;
        return (
            <div>
                <div className="suggest">
                    <div className="container">
                        <div className="title-smaller">
                            <h1>Laga med det jag har</h1>
                        </div>
                        <ReactTags
                            inputFieldPosition="top"
                            allowDragDrop={true}
                            allowUnique={true}
                            placeholder="Vad har du hemma?"
                            tags={tags}
                            handleDelete={this.handleDelete}
                            handleAddition={this.handleAddition}
                            handleDrag={this.handleDrag}
                            delimiters={delimiters}
                        />
                        <button style={{ margin: "20px" }} onClick={this.submit}>Föreslå</button>
                    </div>
                </div>
            </div>
        );
    }
}
