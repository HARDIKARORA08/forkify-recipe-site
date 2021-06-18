import icons from 'url:../../img/icons.svg';
import Views from './view.js';

class paginationView extends Views {
    _parentEl = document.querySelector('.pagination');
    addhandlerRender(handler){
        this._parentEl.addEventListener('click',function(e){
            const btn=e.target.closest('.btn--inline');
            if(!btn) return ;
            const btnGoTo=+btn.dataset.goto;// convert to number
            console.log(btnGoTo); 
            console.log(btn);
            handler(btnGoTo);
            
        })
    }
    _generateMarkup() {
        const currPage = this._data.page;
        const numPage = Math.ceil(this._data.results.length / this._data.resultsperPage);
        // console.log(numPage);


        // PAGE 1 AND NO OTHER


        // PAGE 1 AND OTHER
        if(currPage===1 && numPage>1){
            return ` <button data-goto="${currPage+1}" class="btn--inline pagination__btn--next">
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`
        }

        // LAST PAGE
        if (currPage === numPage && numPage > 1) {
            return `<button data-goto="${currPage-1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currPage - 1}</span>
        </button>`
        }
        // OTHER PAGE
        if (currPage < numPage) {
            return ` <button data-goto="${currPage+1}" class="btn--inline pagination__btn--next">
          <span>Page ${currPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
        <button data-goto="${currPage-1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currPage - 1}</span>
        </button>`
        }
        return ''
    }
}

export default new paginationView();