import View from "./view.js";
import icons from 'url:../../img/icons.svg';
import preView from "./preView.js";
class bookmarksView extends View {
    _parentEl = document.querySelector('.bookmarks');
    _message=''
    _errorMessage='No Bokmarks yet. Find a nice recipe and bookmark it!'
    _generateMarkup() {
        // console.log(this._data);
       return this._data.map(bookMark=>preView.render(bookMark,false)).join('')
        
    }
    addhandlerRender(handler){
        window.addEventListener('load',handler);
    }
}
    
export default new bookmarksView();