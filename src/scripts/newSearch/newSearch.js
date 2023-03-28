import debounce from '../debounce/debounce';
import { setUrl } from '../url/url';

const search = document.querySelector('[data-search]');
const searchInput = document.querySelector('[data-search-input]');
// const searchPaginatorControls = ;

function newSearch() {
  const onInput = debounce((e) => {
    search.classList.add('search--loading');
    const query = searchInput.value;

    // Check if a query is made
    const page = query != e.target.value ? e.target.value : 1;

    // Change the url
    setUrl(query, page);

    const baseString = '/producten';
    const queryString = !query ? '' : '?query=' + query;
    const pageString = !queryString
      ? '?page=' + (page != null ? page : 1)
      : '&page=' + (page != null ? page : 1);

    const asyncString = '&async=true';
    const endpoint = baseString + queryString + pageString + asyncString;

    fetch(endpoint)
      .then((res) => {
        console.log(res.url);
        return res.text();
      })
      .then((html) => {
        const oldSection = document.querySelector('.search__results-body');
        oldSection.innerHTML = html;
        search.classList.remove('search--loading');
        paginatorListener();
      })
      .catch((err) => {
        console.log(err);
        const oldSection = document.querySelector('.search__results-body');
        oldSection.innerHTML =
          '<h1 class=title title--h1>An internet error occured</h1>';
      });
  }, 250);

  // const onPaginator = (e) => {
  //     e.preventDefault()
  // }

  document
    .querySelector('[data-search-form]')
    .addEventListener('input', onInput);
  document
    .querySelector('[data-search-control]')
    .addEventListener('click', (e) => {
      e.preventDefault();
      onInput(e);
    });

  function paginatorListener() {
    document
      .querySelector('[data-paginator]')
      .addEventListener('submit', (e) => {
        e.preventDefault();
      });

    document.querySelectorAll('.paginator__control').forEach((control) => {
      control.addEventListener('click', (e) => {
        onInput(e);
        // e.preventDefault()
      });
    });

    // console.log(searchPaginatorControls)
  }

  paginatorListener();
}

if (search) {
  newSearch();
}
