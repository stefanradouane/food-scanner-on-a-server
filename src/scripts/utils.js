const search = document.querySelector('[data-search]');

export function getPageContent(url) {
  return fetch(url).then((res) => res.text());
}

// Intercept navigations
// https://developer.chrome.com/docs/web-platform/navigation-api/
// This is a native usage of the navigation API, to keep things simple.
export async function onLinkNavigate(callback) {
  navigation.addEventListener('navigate', (e) => {
    // The url of the desitnation
    const toUrl = new URL(e.destination.url);

    // If destination origin is the same as location origin (execute a search).
    // Then don't use a view transition
    if (location.origin !== toUrl.origin) return;

    //
    const fromPath = location.pathname;

    // If navigation goes a page into the history
    // Return true, else false
    const isBack = isBackNavigation(e);

    // If destination pathname is the same as location pathname (execute a search).
    // Then don't use a view transition
    const sameOrigin = location.pathname == toUrl.pathname;
    if (sameOrigin) return;

    // Intercept the response and return a custom response
    e.intercept({
      async handler() {
        if (e.info === 'ignore') return;
        // Execute written callback onLinkNavigate(() => {}) function
        // Perform the view transition
        await callback({
          toPath: toUrl.search ? toUrl.pathname + toUrl.search : toUrl.pathname,
          fromPath,
          isBack,
          sameOrigin,
        });
      },
    });
  });
}

/**
 * @param {Url} href eg: /producten
 * @returns {Element} <a> with href param href
 */
export function getLink(href) {
  const fullLink = new URL(href, location.href).href;

  return [...document.querySelectorAll('a')].find(
    (link) => link.href === fullLink
  );
}

// This helper function returns a View-Transition-like object, even for browsers that don't support view transitions.
// It won't do the transition in unsupported browsers, it'll act as if the transition is skipped.
// It also makes it easier to add class names to the document element.
export function transitionHelper({
  skipTransition = false,
  classNames = '',
  updateDOM,
}) {
  if (skipTransition || !document.startViewTransition) {
    const updateCallbackDone = Promise.resolve(updateDOM()).then(
      () => undefined
    );

    return {
      ready: Promise.reject(Error('View transitions unsupported')),
      domUpdated: updateCallbackDone,
      updateCallbackDone,
      finished: updateCallbackDone,
    };
  }

  const classNamesArray = classNames.split(/\s+/g).filter(Boolean);

  document.documentElement.classList.add(...classNamesArray);

  const transition = document.startViewTransition(updateDOM);

  transition.finished.finally(() =>
    document.documentElement.classList.remove(...classNamesArray)
  );

  return transition;
}

/**
 * @param {*} navigateEvent
 * @returns {Boolean} true if navigate a page back
 */
function isBackNavigation(navigateEvent) {
  if (
    navigateEvent.navigationType === 'push' ||
    navigateEvent.navigationType === 'replace'
  ) {
    return false;
  }
  if (
    navigateEvent.destination.index !== -1 &&
    navigateEvent.destination.index < navigation.currentEntry.index
  ) {
    return true;
  }
  return false;
}
