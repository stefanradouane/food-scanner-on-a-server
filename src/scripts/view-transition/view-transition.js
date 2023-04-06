import { detailPage } from '../detailpage/detailpage.js';
import { getPageContent, onLinkNavigate, transitionHelper } from '../utils.js';

const barcodePath = '/producten/';

// Start! //
onLinkNavigate(async ({ fromPath, toPath, isBack, sameOrigin }) => {
  const endpoint = sameOrigin ? toPath + '&async=true' : toPath;
  const navigationType = getNavigationType(fromPath, toPath);
  const content = await getPageContent(endpoint);

  const transition = transitionHelper({
    classNames: navigationType,
    updateDOM() {
      // This is a pretty heavy-handed way to update page content.
      // In production, you'd likely be modifying DOM elements directly,
      // or using a framework.
      // innerHTML is used here just to keep the DOM update super simple.
      document.body.innerHTML = content;
    },
  });

  transition.finished.finally(() => {
    // If rendered a detailpage make sure the detail page logic is added to the page
    if (toPath.includes(barcodePath)) {
      detailPage();
    }
  });
});

function getNavigationType(fromPath, toPath) {
  // Logic to make a classname based on the navigator action.
  return 'className';
}
