
import icons from 'url:../../img/icons.svg';
export default class View{
    _parentEl = document.querySelector('.recipe');
    _data
    _errorMessage = 'We could not find the recipe you were looking for';
    _message=''

    /**
     * 
     * @param {Object | Object[]} data  The data which is to be rendered (eg. recipe)
     * @param {boolean} [renPreview =true]  This is optional if false this returns markup
     * @returns {undefined | string} Returns string if revPreview is false
     * @this {Object} View pe hi point karta hai
     * @author Hardik Arora
     * @todo Complete Implemenattion
     */
    render(data,renPreview=true) {
        if(!data || (Array.isArray(data) && data.length===0)) return this.renderError();
      this._data = data;
      const markup = this._generateMarkup();
      if(!renPreview) return markup;
      this._clear();
      this._parentEl.insertAdjacentHTML('afterbegin', markup);
    }
    _clear() {
      this._parentEl.innerHTML = ''
    }
    renderSpinner = function () {
      const markup = `
          <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
        `
      this._parentEl.innerHTML = '';
      this._parentEl.insertAdjacentHTML('afterbegin', markup);
    }
    addhandlerRender(handler) {
      window.addEventListener('hashchange', handler);
      window.addEventListener('load', handler);
      // EASIER WAY====>
      // ['hashchange','load'].forEach(ev=>window.addEventListener(ev,controlRecipes));
    }
  
    renderError(message = this._errorMessage) {
      const markup = ` <div class="error">
          <div>
            <svg>
              <use href="${icons}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>`
      this._clear();
      this._parentEl.insertAdjacentHTML('afterbegin', markup);
  
    }
    _renderMessage(message=this._message) {
      const markup = `
      <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${this._message}</p>
    </div>`
      this._clear();
      this._parentEl.insertAdjacentHTML('afterbegin', markup);
    }
    update(data){
      this._data = data;
      const newMarkup=this._generateMarkup();
      const newDOM=document.createRange().createContextualFragment(newMarkup);
      const newElements=Array.from(newDOM.querySelectorAll('*'));
      const currElements=Array.from(this._parentEl.querySelectorAll('*'));
      // console.log(newElements);
      // console.log(currElements);

      newElements.forEach((newEl,i)=>{
        const currEl=currElements[i];
        // console.log(currEl,newEl.isEqualNode(currEl));
        if(!newEl.isEqualNode(currEl) && newEl.firstChild?.nodeValue.trim()!==''){
          currEl.textContent=newEl.textContent;
        }
        if(!newEl.isEqualNode(currEl)){
          Array.from(newEl.attributes).forEach(attr=>{
            currEl.setAttribute(attr.name,attr.value);
          })
        }
      })
      
    }
    _generateMarkup() {
      const markup = `
      <figure class="recipe__fig">
       <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
       <h1 class="recipe__title">
         <span>${this._data.title}</span>
       </h1>
     </figure>
  
     <div class="recipe__details">
       <div class="recipe__info">
         <svg class="recipe__info-icon">
           <use href="${icons}#icon-clock"></use>
         </svg>
         <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
         <span class="recipe__info-text">minutes</span>
       </div>
       <div class="recipe__info">
         <svg class="recipe__info-icon">
           <use href="${icons}#icon-users"></use>
         </svg>
         <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
         <span class="recipe__info-text">servings</span>
  
         <div class="recipe__info-buttons">
           <button class="btn--tiny btn--update-servings" data-update="${this._data.servings-1}">
             <svg>
               <use href="${icons}#icon-minus-circle"></use>
             </svg>
           </button>
           <button class="btn--tiny btn--update-servings" data-update="${this._data.servings+1}">
             <svg>
               <use href="${icons}#icon-plus-circle"></use>
             </svg>
           </button>
         </div>
       </div>
  
       <div class="recipe__user-generated">
         <svg>
           <use href="${icons}#icon-user"></use>
         </svg>
       </div>
       <button class="btn--round">
         <svg class="">
           <use href="${icons}#icon-bookmark-fill"></use>
         </svg>
       </button>
     </div>
  
     <div class="recipe__ingredients">
       <h2 class="heading--2">Recipe ingredients</h2>
       <ul class="recipe__ingredient-list">
       ${this._data.ingredients.map(this._generateMarkupIngridients).join('')}
       </ul>
     </div>
  
     <div class="recipe__directions">
       <h2 class="heading--2">How to cook it</h2>
       <p class="recipe__directions-text">
         This recipe was carefully designed and tested by
         <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
         directions at their website.
       </p>
       <a
         class="btn--small recipe__btn"
         href="${this._data.sourceUrl}"
         target="_blank"
       >
         <span>Directions</span>
         <svg class="search__icon">
           <use href="${icons}#icon-arrow-right"></use>
         </svg>
       </a>
     </div>`
      return markup;
    }
    _generateMarkupIngridients(ing) {
      return `
      <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${ing.quantity ? new Fraction(ing.quantity).toString() : ''}</div>
        <div class="recipe__description">
          <span class="recipe__unit">${ing.unit}</span>
          ${ing.description}
        </div>
      </li>
      `
    }
}