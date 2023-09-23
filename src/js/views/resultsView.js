import View from './view.js';
import icons from 'url:../../img/icons.svg';
class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query. Please try again !';
  _generateMarkup() {
    return this._data
      .map(res => {
        return this._generateMarkupPreview(res);
      })
      .join('');
  }
  _generateMarkupPreview(res) {
    const id = window.location.hash.slice(1);
    return `<li class="preview">
            <a class="preview__link ${
              res.id === id ? 'preview__link--active' : ''
            }"  href=#${res.id}>
              <figure class="preview__fig">
                <img src="${res.image}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${res.title}</h4>
                <p class="preview__publisher">${res.publisher}</p>
              </div>
            </a>
          </li>`;
  }
}
export default new ResultsView();
