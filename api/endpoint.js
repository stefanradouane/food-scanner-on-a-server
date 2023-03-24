const endpoint = (type, query, page, pageSize) => {
    if (type == "detail") {
        return `https://nl.openfoodfacts.org/api/v0/product/${query}.json`

    } else if (type == "all") {
        return `https://nl.openfoodfacts.org/cgi/search.pl?search_terms=${query ? query : ""}&page=${page ? page : 1}&page_size=${pageSize ? pageSize : 12}&json=true`
    }
}

module.exports = endpoint