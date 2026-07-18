if ($request.url.indexOf("youtubei/v1/player") !== -1) {
  let body = $response.body;
  if (body) {
    let obj = JSON.parse(body);
    if (obj.adPlacements) delete obj.adPlacements;
    if (obj.adSlots) delete obj.adSlots;
    if (obj.overlay && obj.overlay.mealbarPromoRenderer) delete obj.overlay.mealbarPromoRenderer;
    $done({ body: JSON.stringify(obj) });
  } else {
    $done({});
  }
} else if ($request.url.indexOf("youtubei/v1/browse") !== -1) {
  let body = $response.body;
  if (body) {
    let obj = JSON.parse(body);
    if (obj.contents && obj.contents.twoColumnBrowseResultsRenderer) {
      let tabs = obj.contents.twoColumnBrowseResultsRenderer.tabs;
      if (tabs && tabs[0].tabRenderer.content.sectionListRenderer) {
        let contents = tabs[0].tabRenderer.content.sectionListRenderer.contents;
        tabs[0].tabRenderer.content.sectionListRenderer.contents = contents.filter(item => {
          return !item.adSlotRenderer;
        });
      }
    }
    $done({ body: JSON.stringify(obj) });
  } else {
    $done({});
  }
} else {
  $done({});
}