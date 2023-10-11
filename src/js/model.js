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
  bookmarks: [],
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

    if(state.bookmarks.some(bookmark=>bookmark.id===id)){
      state.recipe.bookmarked=true;
    }
    else state.recipe.bookmarked=false;

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
    state.search.page = 1;
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

export const addBookmark = function (recipe) {
  // Add recipe to bookmarks
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};

export const deleteBookmark = function (id) {
  // Find index of bookmark with given id
  const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);

  // Remove bookmark from bookmarks array
  state.bookmarks.splice(index, 1);

  // Mark current recipe as not bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;
};
