import { API_URL, RES_PER_PAGE } from './config.js'; //importing api url from config.js
import { getJSON } from './helper.js';
//import {async} from 'regenerator-runtime';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};
export const loadRecipe = async function (id) {
  try {
    // console.log(data);
    const data = await getJSON(`${API_URL}${id}`);
    const recipe = data.data.recipe;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    // console.log(state.recipe);
  } catch (err) {
    //console.log(err);//we are not handling the error here because we want to handle the error in the controller
    throw err; //throwing the error so that the promise will be rejected in the controller
  }
};
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await getJSON(`${API_URL}?search=${query}`);
    //console.log(data);
    if (!data.results) {
      throw new Error();
    }
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
  } catch (err) {
    throw err;
  }
};

export const getSerarchResultsPage = function (
  page = state.search.page //setting the default value for page
) {
  state.search.page = page;
  //console.log(state.search.page);
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = ing.quantity * (newServings / state.recipe.servings);
  });
  state.recipe.servings = newServings;
};
