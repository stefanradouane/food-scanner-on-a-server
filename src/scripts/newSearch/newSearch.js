import debounce from '../debounce/debounce'
import {
    setUrl
} from '../url/url';

const search = document.querySelector('[data-search]');
const searchInput = document.querySelector('[data-search-input]');
// const searchPaginatorControls = ;

function newSearch() {
    const onInput = debounce((e) => {
        search.classList.add("search--loading")
        const query = searchInput.value
        const page = query != e.target.value ? e.target.value : null

        setUrl(query, page)

        // if (query && page == null || query && page == 1) {
        //     history.replaceState({}, '', '/producten?query=' + query)
        // } else if (query && page) {
        //     history.replaceState({}, '', '/producten?query=' + query + '&page=' + page)
        // } else if (query) {
        //     history.replaceState({}, '', '/producten?query=' + query)
        // } else if (page !== null) {
        //     history.replaceState({}, '', '/producten?page=' + page)
        // } else {
        //     history.replaceState({}, '', '/producten')
        // }

        fetch("/producten" + '?query=' + query + '&page=' + (page != null ? page : 1) + '&async=true')
            .then(res => res.text())
            .then(html => {
                const oldSection = document.querySelector('.search__results-body')
                oldSection.innerHTML = html
                search.classList.remove("search--loading")
                paginatorListener()
            })
    }, 250)

    // const onPaginator = (e) => {
    //     e.preventDefault()
    // }

    document.querySelector('[data-search-form]').addEventListener('input', onInput)
    document.querySelector('[data-search-control]').addEventListener('click', (e) => {
        e.preventDefault()
        onInput(e)
    });






    function paginatorListener() {
        document.querySelector('[data-paginator]').addEventListener('submit', (e) => {
            e.preventDefault()
        })

        document.querySelectorAll(".paginator__control").forEach((control) => {
            control.addEventListener("click", (e) => {
                onInput(e)
                // e.preventDefault()
            })
        })

        // console.log(searchPaginatorControls)


    }

    paginatorListener()
}

if (search) {
    newSearch()
}