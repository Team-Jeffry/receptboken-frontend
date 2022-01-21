import React, { Component } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import Axios from "axios";
import SuggestionList from "./SuggestionList";

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
            prevTags: [],
            suggestions: [],
            suggestionResults: [],
            checkField: false,
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.submit = this.submit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.checkResults = this.checkResults.bind(this);
    }

    componentDidMount() {
        Axios.get("http://localhost:8080/v1/ingredient/all").then((response) => {
            const ingredients = response.data.map((element) => {
                return { id: element.name, text: element.name };
            });
            this.setState({ suggestions: ingredients });
        });
    }

    async componentDidUpdate() {
        if (this.state.prevTags.length !== this.state.tags.length) {
            this.setState({ prevTags: this.state.tags });
            await this.submit();
        }
    }

    handleDelete = (i) => {
        const { tags } = this.state;
        this.setState({
            tags: tags.filter((tag, index) => index !== i),
        });
    };

    handleAddition = (tag) => {
        this.setState((state) => ({ tags: [...state.tags, tag] }));
    };

    handleDrag = (tag, currPos, newPos) => {
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: newTags });
    };

    async submit() {
        const ingredients = [];

        this.state.tags.forEach((element) => {
            ingredients.push({ name: element.text });
        });

        await Axios.post("http://localhost:8080/v1/recipe/suggest", ingredients)
            .then((response) => {
                this.setState({ suggestionResults: response.data });
            })
            .catch((error) => console.log(error));
    }

    handleInputChange() {
        if(!this.state.checkField){
        this.setState({ checkField: true })
        } 
        if(this.state.suggestionResults.length === 0){
            this.setState({ checkField: false })
        }

    }

    checkResults () {
        const fieldArray = document.getElementsByClassName('ReactTags__tagInputField')
        let hasText = false;

        for (let i = 0; i < fieldArray.length; i++){
            if(fieldArray[i].value.length !== 0) {
                hasText = true;
            }  
        }
        
        console.log(hasText)

        
            return <div>{hasText && this.state.suggestionResults.length === 0 && (
            <div>Hittade inga recept</div>
            )}
            </div>
        
    }

    render() {
        const { tags, suggestions, suggestionResults } = this.state;

        return (
            <div className="suggest">
                <div className="title-smaller">
                    <h1>Laga med det jag har</h1>
                </div>
                <div className="suggest-inner">
                    <div className="tags-field">
                        <ReactTags
                            inputFieldPosition="top"
                            allowDragDrop={true}
                            allowUnique={true}
                            placeholder="Vad har du hemma?"
                            suggestions={suggestions}
                            tags={tags}
                            handleInputChange={this.handleInputChange}
                            handleDelete={this.handleDelete}
                            handleAddition={this.handleAddition}
                            handleDrag={this.handleDrag}
                            delimiters={delimiters}
                            autocomplete
                        />
                    </div>
                    {/* <div style={{ display: "flex", justifyContent: "center", marginBottom: "2vh", marginTop: "2vh" }}>
                        <button style={{ margin: "20px" }} onClick={this.submit}>
                            Föreslå
                        </button>
                    </div> */}
                    <div style={{display: "flex", justifyContent: "center", paddingTop: "20px", fontStyle: "italic"}}>
                    {this.checkResults()}
                    </div>
                    <SuggestionList data={suggestionResults} />
                </div>
            </div>
        );
    }
}
