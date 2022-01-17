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
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submit = this.submit.bind(this);

    this.state = {
      tags: [],
      suggestions: [],
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

  async componentDidMount() {
    await Axios.get("http://localhost:8080/v1/ingredient/all").then(
      (response) => {
        const ingredients = response.data.map((element) => {
          return { id: element.name, text: element.name };
        });
        this.setState({ suggestions: ingredients });
      }
    );
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

  render() {
    const { tags, suggestions } = this.state;

    return (
      <div>
        <div className="save">
          <div className="container">
            <div className="title-smaller">
              <h1>Spara ett nytt recept</h1>
            </div>
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
