import axios from 'axios';
import React, { Component } from "react";

/*const api = axios.create({
  baseURL: `http://localhost:8080/v1/recipe/`
})*/

export default class ViewRecipe extends Component {
/*state = {
    name: '',
    description: '',
    instruction: '',
    time: '',
    ingredients: [],
    categories: []
};

getRecipeFromServer() {
  axios.get(`http://localhost:8080/v1/recipe/get/mat`, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res)
      this.setState({
        name: res.data.name,
        description: res.data.description,
        instruction: res.data.instruction,
        time: res.data.time,
        ingredients: res.data.ingredients,
        categories: res.data.categories
      });
    });
  }

  render() {
    return (
      <p>{this.state.name}</p>
    )
  }*/

  //---------------------------------------------------

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

  getARecipe() {
    axios.get('http://localhost:8080/v1/recipe/get/mat')
      .then(res => {
        console.log(res)
        const recipe = res.data;
        this.setState({ recipe });
      })
  }

  render() {
    return (
              <li key={this.state.recipe.id}>{this.state.recipe.name}</li>
    )
  }

}

