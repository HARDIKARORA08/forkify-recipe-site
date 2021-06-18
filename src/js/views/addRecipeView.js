import icons from 'url:../../img/icons.svg';
import Views from './view.js';

class addRecipeView extends Views {
    _parentEl = document.querySelector('.upload');
    _window=document.querySelector('.add-recipe-window');
    _overlay=document.querySelector('.overlay');
    _btnOpen=document.querySelector('.nav__btn--add-recipe');
    _btnclose=document.querySelector('.btn--close-modal');
    _message='Recipe was succfully uploaded'

    constructor(){
        super();
        this.addhandlerShow();
        this.addhandlerhide();
    }

    _toggleWindow(){

        this._overlay.classList.toggle('hidden')
        this._window.classList.toggle('hidden')
    }

    addhandlerShow(){
        this._btnOpen.addEventListener('click',this._toggleWindow.bind(this));
    }
    addhandlerhide(){
        this._btnclose.addEventListener('click',this._toggleWindow.bind(this));
    }
    addhandlerupload(handler){
        this._parentEl.addEventListener('submit',function(e){
            e.preventDefault();
            const dataArr=[...new FormData(this)];
            console.log(dataArr);
            const data=Object.fromEntries(dataArr)
            console.log(data);
            handler(data);
        })
    }
   
    _generateMarkup() {
       
    }
}

export default new addRecipeView();