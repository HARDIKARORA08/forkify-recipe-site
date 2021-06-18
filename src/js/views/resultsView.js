import View from "./view.js";
import icons from 'url:../../img/icons.svg';
import preView from "./preView.js";
class resultsView extends View {
    _parentEl = document.querySelector('.results');
    _message=''
    _errorMessage='No recipes found for your query. Please try again'
    _generateMarkup() {
        // console.log(this._data);
       return this._data.map(result=>preView.render(result,false)).join('')
        
    }
    
};
export default new resultsView();