import View from './view.js';
import icons from 'url:../../img/icons.svg';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.btn--inline');
      if(!btn)return;

      const goToPage=+btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    //console.log(this._data.page);
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // if Page 1 and there are  other pages

    if (this._data.page === 1 && numPages > 1) {
      return `<button data-goto="${
        this._data.page + 1
      }" class="btn--inline pagination__btn--next">
            <span>Page ${this._data.page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }

    // if Page 1 and there are no other pages

    if (this._data.page === 1 && numPages === 1) {
      return ``;
    }

    // if Last page

    if (this._data.page === numPages) {
      //console.log('hi again');
      return `<button data-goto="${
        this._data.page - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page - 1}</span>
          </button>`;
    }

    // if Other middle pages
    else {
      return `<button data-goto="${
        this._data.page + 1
      }" class="btn--inline pagination__btn--next">
            <span>Page ${this._data.page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> <button data-goto="${
            this._data.page - 1
          }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page - 1}</span>
          </button>`;
    }
  }
}
export default new PaginationView();
