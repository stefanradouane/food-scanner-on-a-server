const CORE_CACHE_VERSION = 'v1';
// Object containing the files and pages the service worker must cache.
const CORE_CACHE_ARRAY = [
  {
    name: `files-${CORE_CACHE_VERSION}`,
    urls: ['/manifest.json', '/dist/css/all.css', '/dist/scripts/main.js'],
  },
  {
    name: `assets-${CORE_CACHE_VERSION}`,
    urls: [
      '/assets/sounds/scan.wav',
      '/assets/images/protein.png',
      '/assets/images/eaten-apple.png',
      '/assets/icon/icon-256x256.png',
      '/assets/images/nutriscore/nutriscore-a.svg',
      '/assets/images/nutriscore/nutriscore-b.svg',
      '/assets/images/nutriscore/nutriscore-c.svg',
      '/assets/images/nutriscore/nutriscore-d.svg',
      '/assets/images/nutriscore/nutriscore-e.svg',
      '/assets/images/nutriscore/nutriscore-unknown.svg',
    ],
  },
  {
    name: `pages-${CORE_CACHE_VERSION}`,
    urls: ['/', '/barcode', '/offline'],
  },
  {
    name: `partials-${CORE_CACHE_VERSION}`,
    urls: [],
  },
  {
    name: `web-images-${CORE_CACHE_VERSION}`,
    urls: [],
  },
];

let cacheNames = CORE_CACHE_ARRAY.map((cache) => cache.name);

// Install the service worker
// Anc cache the files defined in the variable CORE_CACHE_ARRAY
self.addEventListener('install', (e) => {
  // Install Service Worker
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        CORE_CACHE_ARRAY.map((object) => {
          // Object does not exist in caches
          if (keys.indexOf(object.name) === -1) {
            // Make new cache
            return caches.open(object.name).then((cache) => {
              // caching object.name
              return cache.addAll(object.urls);
            });
            // Object does exist in caches
          } else {
            // found object.name
            return Promise.resolve(true);
          }
        })
      ).then(() => {
        // done installing
        return this.skipWaiting();
      });
    })
  );
});

// Activate event listener
// Checks if the caches contains a cache that is not defined in the variable CORE_CACHE_ARRAY
// After that claim the clients (make sure the page doesn't have to be reloaded before starting to work.)
self.addEventListener('activate', (e) => {
  // Activate Service Worker
  e.waitUntil(
    caches
      .keys()
      .then((keys) => {
        return Promise.all(
          keys.map((key) => {
            // Cache is not defined
            if (cacheNames.indexOf(key) === -1) {
              // Delete cache
              return caches.delete(key);
            }
          })
        );
      })
      .then(() => {
        // After activation claim the client
        clients.claim();
      })
  );
});

// Fetch Event listener router
// This listener checks on the following fetch types:
// - HTML request
// - Image request
// - File request
// - Source from different origin
// - */* request (handle front end fetches)
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  if (isHtmlGetRequest(e.request)) {
    e.respondWith(
      caches
        .open(`pages-${CORE_CACHE_VERSION}`)
        .then((cache) => cache.match(e.request.url))
        .then((response) => {
          return response
            ? response
            : fetchAndCache(
                url.href.replace('&async=true', ''),
                `pages-${CORE_CACHE_VERSION}`
              );
        })
        .then((response) => {
          // Fetch default partial for no JS UX
          // Fetch only /producten partials.
          if (url.pathname.endsWith('/producten')) {
            fetchAndCache(
              url.pathname + url.search + '&async=true',
              `partials-${CORE_CACHE_VERSION}`
            );
          }
          return response;
        })
        .catch((err) => {
          // Show partial
          return caches
            .open(`pages-${CORE_CACHE_VERSION}`)
            .then((cache) => cache.match('/offline'));
        })
    );
  } else if (isImageGetRequest(e.request)) {
    e.respondWith(
      caches
        .open(`assets-${CORE_CACHE_VERSION}`)
        .then((cache) => cache.match(getPathName(e.request.url)))
        .then((response) => response)
    );
  } else if (isFileGetRequest(e.request)) {
    e.respondWith(
      caches
        .open(`files-${CORE_CACHE_VERSION}`)
        .then((cache) => cache.match(e.request.url))
    );
  } else if (new URL(e.request.referrer).origin !== url.origin) {
    e.respondWith(
      caches
        .open(`web-images-${CORE_CACHE_VERSION}`)
        .then((cache) => cache.match(e.request.url))
        .then((response) =>
          response
            ? response
            : fetchAndCacheImage(
                e.request.url,
                `web-images-${CORE_CACHE_VERSION}`
              )
        )
        .catch((err) => {
          return caches
            .open(`assets-${CORE_CACHE_VERSION}`)
            .then((cache) => cache.match('/assets/images/eaten-apple.png'));
        })
    );
  } else if (e.request.headers.get('accept') == '*/*') {
    const path = url.pathname + url.search;
    const href = url.href;
    const usedHref = href.replace('&async=true', '');

    if (url.search.includes('&async=true')) {
      // Handle partial
      e.respondWith(
        caches
          .open(`partials-${CORE_CACHE_VERSION}`)
          .then((cache) => cache.match(path))
          .then((response) => {
            return response
              ? response
              : fetchAndCache(href, `partials-${CORE_CACHE_VERSION}`);
          })
          .then((response) => {
            // Fetch default page for no JS UX
            fetchAndCache(usedHref, `pages-${CORE_CACHE_VERSION}`);
            return response;
          })
          .catch((err) => {
            // Return an error.
            // The front-end will render an partial.
            // This part of the code will never be executed with JS disabled (after installation of this SW)
            return err;
          })
      );
    } else {
      // Handle page
      e.respondWith(
        caches
          .open(`pages-${CORE_CACHE_VERSION}`)
          .then((cache) => cache.match(path))
          .then((response) => {
            return response
              ? response
              : fetchAndCache(usedHref, `pages-${CORE_CACHE_VERSION}`);
          })
          .then((response) => {
            // Fetch default page for no JS UX
            // Fetch only /producten partials.
            if (url.pathname.endsWith('/producten')) {
              fetchAndCache(
                href + '&async=true',
                `partials-${CORE_CACHE_VERSION}`
              );
            }
            return response;
          })
          .catch((err) => {
            // Show partial
            return caches
              .open(`pages-${CORE_CACHE_VERSION}`)
              .then((cache) => cache.match('/offline'));
          })
      );
    }
  }
});

/*******************************************************
 * ServiceWorker functions
 ********************************************************/
/**
 * Checks if a request is a GET and image request
 * @param {Object} request The request object
 * @returns {Boolean} Boolean value indicating whether the request is a GET and image request
 */
function isImageGetRequest(request) {
  return CORE_CACHE_ARRAY.map((object) => {
    if (
      object.name == `assets-${CORE_CACHE_VERSION}` &&
      request.method === 'GET' &&
      object.urls.includes(getPathName(request.url))
    ) {
      return true;
    } else {
      return false;
    }
  }).filter((o) => o)[0];
}

/**
 * Checks if a request is a GET and file request
 * @param {Object} request The request object
 * @returns {Boolean} Boolean value indicating whether the request is a GET and file request
 */
function isFileGetRequest(request) {
  return CORE_CACHE_ARRAY.map((object) => {
    if (
      object.name == `files-${CORE_CACHE_VERSION}` &&
      request.method === 'GET' &&
      object.urls.includes(getPathName(request.url))
    ) {
      return true;
    } else {
      return false;
    }
  }).filter((o) => o)[0];
}

/**
 * Checks if a request is a GET and HTML request
 * @param {Object} request The request object
 * @returns {Boolean} Boolean value indicating whether the request is a GET and HTML request
 */
function isHtmlGetRequest(request) {
  if (
    request.method === 'GET' &&
    request.headers.get('accept') !== null &&
    request.headers.get('accept').includes('text/html')
  ) {
    return true;
  } else {
    return false;
  }
}

/**
 * Checks if a request is a core GET request
 * @param {Object} request The request object
 * @returns {Boolean} Boolean value indicating whether the request is in the core mapping
 */
function isCoreGetRequest(request) {
  CORE_CACHE_ARRAY.forEach((object) => {
    if (
      request.method === 'GET' &&
      object.urls.includes(getPathName(request.url))
    ) {
      return true;
    }
  });
  return false;
}

/**
 * Get a pathname from a full URL by stripping off domain
 * @param {Object} requestUrl The request object, e.g. https://www.mydomain.com/index.css
 * @returns {String} Relative url to the domain, e.g. index.css
 */
function getPathName(requestUrl) {
  const url = new URL(requestUrl);
  return url.pathname;
}

/**
 * Fetch an image and cache this image as a WebP
 * @param {string} url the path to the request
 * @param {string} cacheName the name of the cache directory
 * @returns {Request}
 */
function fetchAndCacheImage(url, cacheName) {
  return fetch(url, {}).then((response) => {
    return response.blob().then((blob) => {
      return createWebp(blob).then((webpBlob) => {
        const newRes = new Response(webpBlob, {
          'Content-Type': 'image/webp',
        });
        // console.log(newRes.blob());
        return caches.open(cacheName).then(function (cache) {
          cache.put(url, newRes.clone());
          return newRes;
        });
      });
    });
  });
}

/**
 * Fetch a page and cache this page
 * @param {string} url the path to the request
 * @param {string} cacheName the name of the cache directory
 * @returns {Request}
 */
function fetchAndCache(request, cacheName) {
  return fetch(request).then((response) => {
    if (!response.ok) {
      throw new TypeError('Bad response status');
    }
    const clone = response.clone();
    caches.open(cacheName).then((cache) => cache.put(request, clone));
    return response;
  });
}

/**
 *
 * @param {Blob} blob
 * @returns WebP blob
 */

function createWebp(blob) {
  return new Promise((resolve, reject) => {
    // Check if browser supports createImageBitmap
    if ('createImageBitmap' in self) {
      // Create ImageBitmap object from blob
      createImageBitmap(blob)
        .then((imageBitmap) => {
          // Create canvas with same dimensions as imageBitmap
          var canvas = new OffscreenCanvas(
            imageBitmap.width,
            imageBitmap.height
          );
          var ctx = canvas.getContext('2d');
          // Draw ImageBitmap onto canvas
          ctx.drawImage(imageBitmap, 0, 0);
          // Convert canvas to WebP blob
          canvas
            .convertToBlob({ type: 'image/webp', quality: 0.8 })
            .then((webpBlob) => {
              resolve(webpBlob);
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch(function (error) {
          reject(error);
        });
    } else {
      // Fallback to using original image
      resolve(blob);
    }
  });
}
