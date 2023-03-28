/**
 * Changes the URL to to current query.
 * @param {Object} search
 * @param {String} id
 */
export const setUrl = (query, page) => {
  if ((query && page == null) || (query && page == 1)) {
    history.replaceState({}, '', '/producten?query=' + query);
  } else if (query && page) {
    history.replaceState({}, '', '/producten?query=' + query + '&page=' + page);
  } else if (query) {
    history.replaceState({}, '', '/producten?query=' + query);
  } else if (page !== null) {
    history.replaceState({}, '', '/producten?page=' + page);
  } else {
    history.replaceState({}, '', '/producten');
  }
};

/**
 * Returns params based on query string.
 * @param {string} query A (serialized) query string.
 * @return {Object} Params (parameters) object.
 */
export const parseQuery = (query) => {
  const searchParams = new URLSearchParams(query['search']);
  const objectParams = Object.fromEntries(searchParams);
  const queryObject = {
    id: objectParams.id,
    q: objectParams.q ? objectParams.q : '',
    page: objectParams.page,
  };
  return queryObject;
};
