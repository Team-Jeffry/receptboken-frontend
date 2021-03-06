import React from "react";
import { WithContext as ReactTags } from "react-tag-input";
import Axios from "axios";
import SuggestionList from "./SuggestionList";
import { apiUrl } from "../config";

const keyCodes = {
    comma: 188,
    enter: [10, 13],
};

const delimiters = [...keyCodes.enter, keyCodes.comma];

class SearchRecipe extends React.Component {
    constructor(props) {
        super(props);

        this.handleDeleteCategory = this.handleDeleteCategory.bind(this);
        this.handleAdditionCategory = this.handleAdditionCategory.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submit = this.submit.bind(this);

        this.state = {
            categoryTags: [],
            categorySuggestions: [],
            suggestionResults: [],
            saveRecipeJson: {
                name: "",
                time: "",
                categoryNames: [],
            },
            buttonClicked: false,
        };
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.id;

        this.setState({
            saveRecipeJson: {
                ...this.state.saveRecipeJson,
                [name]: value,
            },
        });
    }

    async componentDidMount() {
        await Axios.get(apiUrl + "/v1/category/all").then((response) => {
            const categories = response.data.map((element) => {
                return {
                    id: element.name,
                    text: element.name,
                };
            });
            this.setState({ categorySuggestions: categories });
        });
    }

    async submit() {
        let categories = [];

        if (!this.state.buttonClicked) {
            this.setState({ buttonClicked: true });
        }

        this.state.categoryTags.forEach((element) => {
            categories.push(element.text);
        });

        const requestBody = {
            recipeName: this.state.saveRecipeJson.name,
            categoryNames: categories,
            time: this.state.saveRecipeJson.time,
        };

        await Axios.post(apiUrl + "/v1/recipe/get", requestBody)
            .then((response) => {
                this.setState({ suggestionResults: response.data });
            })
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.log(error);
            });
    }

    handleDeleteCategory(i) {
        const { categoryTags } = this.state;
        this.setState({
            categoryTags: categoryTags.filter((tag, index) => index !== i),
        });
    }

    handleAdditionCategory(tag) {
        this.setState((state) => ({ categoryTags: [...state.categoryTags, tag] }));
    }

    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: newTags });
    }

    render() {
        const categoryTags = this.state.categoryTags;
        const categorySuggestions = this.state.categorySuggestions;
        const suggestionResults = this.state.suggestionResults;

        return (
            <div>
                <div className="search-recipe">
                    <div className="blurredBackground" />
                    <div className="container">
                        <div className="title-smaller">
                            <h1>S??k efter recept</h1>
                        </div>

                        <form>
                            <input
                                onChange={(e) => this.handleInputChange(e)}
                                type="text"
                                id="name"
                                value={this.state.saveRecipeJson.name}
                                placeholder="Namn p?? recept"
                            />
                            <br />
                            <input
                                onChange={(e) => this.handleInputChange(e)}
                                type="number"
                                id="time"
                                value={this.state.saveRecipeJson.time}
                                placeholder="Tillagningstid"
                            />
                        </form>
                        <ReactTags
                            inputFieldPosition="top"
                            allowDragDrop={true}
                            allowUnique={true}
                            placeholder="Kategori"
                            suggestions={categorySuggestions}
                            tags={categoryTags}
                            handleDelete={this.handleDeleteCategory}
                            handleAddition={this.handleAdditionCategory}
                            delimiters={delimiters}
                            autocomplete
                        />
                        <br />
                        <button style={{ margin: "20px" }} onClick={this.submit}>
                            S??k
                        </button>
                        {suggestionResults.length !== 0 && <SuggestionList data={suggestionResults} />}

                        {suggestionResults.length === 0 && this.state.buttonClicked && (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    paddingTop: "20px",
                                    fontStyle: "italic",
                                }}
                            >
                                {<div>Hittade inga recept</div>}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchRecipe;
