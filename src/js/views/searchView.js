class searchView{
  #parentEl=document.querySelector('.search');

  getQuery(){
      return this.#parentEl.querySelector('.search__field').value;
  }

  addhandlerRender(handler){
      this.#parentEl.addEventListener('submit',function(e){
          e.preventDefault();
          handler();
      });
  }
  clearView(){
      this.#parentEl.querySelector('.search__field').value='';
  }
}

export default  new searchView();