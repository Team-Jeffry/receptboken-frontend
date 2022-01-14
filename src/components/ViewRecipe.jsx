import axios from 'axios';
import React, { Component } from "react";

export default class ViewRecipe extends Component {
  state = {
    recipe: {
      name: '',
      description: '',
      instruction: '',
      time: '',
      ingredients: [],
      categories: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8080/v1/recipe/get/recept')
      .then(res => {
        console.log(res)
        const recipe = res.data;
        this.setState({ recipe });
      })
  }

  render() {
    return (
              <p key={this.state.recipe.id}>{this.state.recipe.name}</p>
    )
  }

}

