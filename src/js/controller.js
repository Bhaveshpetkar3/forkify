import * as model from './model.js';

import 'core-js/actual';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import 'regenerator-runtime/runtime';
import { async, mark } from 'regenerator-runtime';
import resultsView from './views/resultsView.js';
import PaginationView from './views/PaginationView.js';

// if(module.hot)
// {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); //getting the hash from the url
    if (!id) return; //if there was no id found, we don't want to show the recipe
    recipeView.renderSpinner();

    resultsView.update(model.getSerarchResultsPage())

    //1. Loading recipe
    await model.loadRecipe(id); //because loadrecipe is an async function and it will return a promise. We used the await to wait till the promis gets fulfilled

    //2. Rendering recipe

    recipeView.render(model.state.recipe);
  } catch (err) {
    //console.log(err);//no need to log the errow because we are showing it in the view
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    //1. Get Search query
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return; //Adding a guard class in case if there is no query at all

    //2. Load search results
    await model.loadSearchResults(query);

    //3. Rendering the results
    //console.log(model.state.search.results);
    resultsView.render(model.getSerarchResultsPage());

    //Rendering the pagination
    PaginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError();
  }
};

const controlPagination=function(pageno)
{
  resultsView.render(model.getSerarchResultsPage(pageno));
  PaginationView.render(model.state.search);
  //console.log('Page controller');
}

const controlServings=function(newServings){
//Update the recipe servings (in state)
model.updateServings(newServings);

//Update the recipe view
recipeView.update(model.state.recipe);
// recipeView.update(model.state.recipe);//to only update the required fields and not the whole section
}
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  PaginationView.addHandlerClick(controlPagination);
  
};
init();
