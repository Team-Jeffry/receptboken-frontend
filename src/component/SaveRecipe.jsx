import React, { useRef } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import Axios from "axios";

const keyCodes = {
  comma: 188,
  enter: [10, 13],
};

const delimiters = [...keyCodes.enter, keyCodes.comma];

class SaveRecipe extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleDeleteCategory = this.handleDeleteCategory.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleAdditionCategory = this.handleAdditionCategory.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submit = this.submit.bind(this);

    this.state = {
      tags: [],
      suggestions: [],
      categoryTags: [],
      categorySuggestions: [],
      saveRecipeJson: {
        name: "",
        description: "",
        instruction: "",
        time: "",
        ingredients: [
          {
            name: "",
            description: "",
          },
        ],
        categoryNames: [],
      },
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

  async submit() {
    const ingredients = [];
    const categories = [];

    this.state.tags.forEach((element) => {
      ingredients.push({
        name: element.text,
        description: element.description,
      });
    });

    this.state.categoryTags.forEach((element) => {
      categories.push(element.text);
    });

    const requestBody = {
      name: this.state.saveRecipeJson.name,
      description: this.state.saveRecipeJson.description,
      instruction: this.state.saveRecipeJson.instruction,
      time: this.state.saveRecipeJson.time,
      ingredients: ingredients,
      categoryNames: categories,
    };

    await Axios.post("http://localhost:8080/v1/recipe/save", requestBody)
      .then((response) => {
        this.setState({
          suggestions: [],
          tags: [],
          categorySuggestions: [],
          categoryTags: [],
          saveRecipeJson: {
            ...this.state.saveRecipeJson,
            name: "",
            description: "",
            instruction: "",
            time: "",
            ingredients: {
              name: "",
              description: "",
            },
            categoryNames: [],
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async componentDidMount() {
    await Axios.get("http://localhost:8080/v1/ingredient/all").then(
      (response) => {
        const ingredients = response.data.map((element) => {
          return {
            id: element.name,
            text: element.name,
            description: element.description,
          };
        });
        this.setState({ suggestions: ingredients });
      }
    );

    await Axios.get("http://localhost:8080/v1/category/all").then(
      (response) => {
        const categories = response.data.map((element) => {
          return {
            id: element.name,
            text: element.name,
          };
        });
        this.setState({ categorySuggestions: categories });
      }
    );
  }

  handleDelete(i) {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i),
    });
  }

  handleDeleteCategory(i) {
    const { categoryTags } = this.state;
    this.setState({
      categoryTags: categoryTags.filter((tag, index) => index !== i),
    });
  }

  handleAddition(tag) {
    this.setState((state) => ({ tags: [...state.tags, tag] }));
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
    const tags = this.state.tags;
    const suggestions = this.state.suggestions;

    const categoryTags = this.state.categoryTags;
    const categorySuggestions = this.state.categorySuggestions;

    return (
      <div>
        <div className="save-recipe">
          <div className="blurredBackground"></div>
          <div className="container">
            <div className="title-smaller">
              <h1>Spara ett nytt recept</h1>
            </div>
            <form>
              <input
                onChange={(e) => this.handleInputChange(e)}
                type="text"
                id="name"
                value={this.state.saveRecipeJson.name}
                placeholder="Namn på recept"
              />
              <br />
              <input
                onChange={(e) => this.handleInputChange(e)}
                type="text"
                id="description"
                value={this.state.saveRecipeJson.description}
                placeholder="Beskrivning av receptet"
              />
              <br />
              <input
                onChange={(e) => this.handleInputChange(e)}
                type="text"
                id="instruction"
                value={this.state.saveRecipeJson.instruction}
                placeholder="Instruktioner till receptet"
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
              placeholder="Ingrediens"
              suggestions={suggestions}
              tags={tags}
              handleDelete={this.handleDelete}
              handleAddition={this.handleAddition}
              handleDrag={this.handleDrag}
              delimiters={delimiters}
            />
            <br />
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
            />
            <br />
            <button style={{ margin: "20px" }} onClick={this.submit}>
              Spara
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SaveRecipe;
