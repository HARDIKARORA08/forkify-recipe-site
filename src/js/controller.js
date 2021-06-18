import * as model from './model.js';
import 'core-js/stable';
import { MODAL_TIMEOUT } from './config.js';
import 'regenerator-runtime/runtime'
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookMarksView from './views/bookMarksView.js';
import addRecipeView from './views/addRecipeView.js';

if(module.hot){
  module.hot.accept();
}


const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const controlRecipes = async function () {
  try {
    const id=window.location.hash.slice(1);
    console.log(id);
    if(!id) return ;
    recipeView.renderSpinner();
    // UPDATE SEARCH ONE
    resultsView.update(model.getSearchResults(1));
    // update bookmarks
    bookMarksView.update(model.state.bookmarks)
    //LOADING RECIPE
    await model.loadRecipe(id);
    //rendering recipe
    recipeView.render(model.state.recipe);

  } catch (err) {
    recipeView.renderError();
  }
}
// LOADING SEARCH RESULTS
const controlSearchResults=async function(){
  // ADD SPINNER
   resultsView.renderSpinner();
  // GET QUERY
  const query=searchView.getQuery();
  if(!query) return;
  // EMPTYING THE SEARCH BOX
  // LOADING RESULT
  await model.loadSearchResult(query);
  searchView.clearView();
  // console.log(model.state.search.results);
  // resultsView.render(model.state.search.results) THIS PRINTS ALL THE RSULTS AT ONCE
  // PRINT THE SEARCH RESULT
  resultsView.render(model.getSearchResults(1))// GET SEARCH RESULTS DIVIDE IN 10

  // RENDER PAGINATION
  paginationView.render(model.state.search)

}
// PAGINATION CONTROL

const controlPagination=function(pageNum){
  console.log(pageNum);
   // PRINT THE new SEARCH RESULT
   resultsView.render(model.getSearchResults(pageNum))// GET SEARCH RESULTS DIVIDE IN 10

   // RENDER new PAGINATION
   paginationView.render(model.state.search)
}

// SERVINGS CHANGE
const controlServings=function(newServings){
  // UPDATE RECIPE SERVINGS (IN STATE)
    model.updateServings(newServings);

  // UPDATE  THE RECIPE VIEW
   recipeView.update(model.state.recipe)
  //  recipeView.render(model.state.recipe)

}
// CONTROL BOOKMARKS
const controlBookmarks=function(){
  // ADD BOOK
  if(!model.state.recipe.bookmarked) model.addBookmarks(model.state.recipe)
  // DELETE BOOKMARK
  else model.deleteBookmark(model.state.recipe.id);
  // UPDATE RECIPE VIEW
  console.log(model.state.recipe);
  recipeView.update(model.state.recipe)
  // RENDER BOOKMARKS
  bookMarksView.render(model.state.bookmarks)
}

const loadBookmarks=function(){
  bookMarksView.render(model.state.bookmarks);
}

// ADD RECIPE

const addrecipe=async function(newRecipe){
  try{
   addRecipeView.renderSpinner();
   await model.uploadRecipe(newRecipe);
   console.log(model.state.recipe);
   recipeView.render(model.state.recipe);

   // CLOSE FORM
   setTimeout(function(){
     addRecipeView._toggleWindow();
   }, MODAL_TIMEOUT);

   addRecipeView._renderMessage();

   //  CHANGE URL
   window.history.pushState(null,'',`#${model.state.recipe.id}`)
  }catch(err){
    addRecipeView.renderError(err);
  }
}
// THIS IS PUBLISHER SUBSCRIBER BPATTERN FOR HANDLERS
function init(){
 recipeView.addhandlerRender(controlRecipes);
 searchView.addhandlerRender(controlSearchResults);
 paginationView.addhandlerRender(controlPagination);
 recipeView.addhandlerUpdateServings(controlServings);
 recipeView.addhandlerBookmark(controlBookmarks);
 bookMarksView.addhandlerRender(loadBookmarks);
 addRecipeView.addhandlerupload(addrecipe)
 console.log('hello');
}
init();
