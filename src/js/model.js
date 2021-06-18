import {async} from 'regenerator-runtime';
import { API_URL,PER_PAGE_RESULTS,KEY } from './config.js';
import { AJAX} from './helpers.js';
export const state={
    recipe: {},
    search: {
      query: '',
      results: [],
      resultsperPage: PER_PAGE_RESULTS,
      page:1,
    },
    bookmarks:[],
}
const createRecipeObject=function(data){
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && {key: recipe.key})
  }
}
export const loadRecipe=async function(id){
    try{
    const data=await AJAX(`${API_URL}/${id}`)
    state.recipe=createRecipeObject(data);
    console.log(state.recipe);
    if(state.bookmarks.some(bookmark=>bookmark.id===id)) state.recipe.bookmarked=true;
    else state.recipe.bookmarked=false;
}catch(err){
    console.error(`${err} yes`);
    throw err;
}
}

// LOAD SEARCH RESULT
export const loadSearchResult=async function(query){
    try{
      const data=await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
      state.search.results=data.data.recipes.map(rec=>{
          return {
            id: rec.id,
            title: rec.title,
            publisher: rec.publisher,
            sourceUrl: rec.source_url,
            image: rec.image_url,
            ...(rec.key && {key: rec.key})
          }
      })
    }catch(err){
      console.error(err);
    }
}

export const getSearchResults=function(page=state.search.page){
  state.search.page=page;
  const start=(page-1)*state.search.resultsperPage//0;
  const end=page*state.search.resultsperPage;//9;

  return state.search.results.slice(start,end);
}

export const updateServings=function(newServings){
   state.recipe.ingredients.forEach(ing=>{
     ing.quantity=ing.quantity*newServings/state.recipe.servings;
     // NEW qt= old qt*new serv/old serv
   });

   state.recipe.servings=newServings;
}
export const addBookmarks=function(recipe){
     // ADD BOOKMARKS
     state.bookmarks.push(recipe);

     // MARK CURRENT RECIPE AS BOOKMARK
     if(recipe.id===state.recipe.id) state.recipe.bookmarked=true;
     persistBookmarks();
}
export const deleteBookmark=function(id){
   const index=state.bookmarks.findIndex(b=>b.id===id);
   state.bookmarks.splice(index,1);
   if(id===state.recipe.id)state.recipe.bookmarked=false;
   persistBookmarks();
} 
function persistBookmarks(){
  localStorage.setItem('bookmark',JSON.stringify(state.bookmarks));
}
function init(){
  if(localStorage.getItem('bookmark')){
    const data=JSON.parse(localStorage.getItem('bookmark'));
    state.bookmarks=data;
  }
}
init();
export const uploadRecipe= async function(newRecipe){
  try{
  const ingredients=Object.entries(newRecipe).filter(entry=>entry[0].startsWith('ingredient')&& entry[1]!=='' ).map(ing=>{
   const ingArr=ing[1].split(',').map(ing=>ing.trim());
   if(ingArr.length!==3) throw new Error('Wrong ingredient format. Enter correct format');
   const [quantity,unit,description]=ingArr;
   return {quantity: quantity? +quantity:null,unit: unit? unit: '',description: description? description:''}
  })
  console.log(ingredients);
  
  const recipe={
    title: newRecipe.title,
    publisher: newRecipe.publisher,
    source_url: newRecipe.sourceUrl,
    image_url: newRecipe.image,
    servings: +newRecipe.servings,
    cooking_time: +newRecipe.cookingTime,
    ingredients,
  }
  const data=await AJAX(`${API_URL}?key=${KEY}`,recipe);
  state.recipe=createRecipeObject(data);
  addBookmarks(state.recipe)
} catch(err){
  throw err;
}
}
console.log(state.bookmarks);
export const clearBookmarks=function(){
  localStorage.clear('bookmarks');
}
// clearBookmarks();