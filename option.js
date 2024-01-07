//*: This file adds a popup to the blocked websites. It is added in the manifest.json

//*: Nice to have: add keyboard shortcuts also that would prevent the user from doing inspect element.

var popupContainer = document.createElement("div");
popupContainer.style.position = "fixed";
popupContainer.style.top = "0";
popupContainer.style.left = "0";
popupContainer.style.width = "100%";
popupContainer.style.height = "100%";
popupContainer.style.backgroundColor = "rgba(0, 0, 0, 1)";
popupContainer.style.display = "flex";
popupContainer.style.justifyContent = "center";
popupContainer.style.alignItems = "center";
popupContainer.style.zIndex = "9999";

var popup = document.createElement("div");
popup.style.backgroundColor = "#fff";
popup.style.padding = "20px";
popup.style.borderRadius = "5px";
popup.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)";
popup.style.textAlign = "center";
popup.style.color = "#000";
popup.style.width = "50vw";
popup.style.height = "50vh";

popup.innerHTML =
  "<p>This site is blocked by Focus Flow extension</p>";

  // Todo: think of something interesting to add in here.
  // +
  // "<p>Want to read something instead?</p>" +
  // '<a style="color: blue" href="https://www.readsomethinggreat.com">Yes!</a>';

popupContainer.appendChild(popup);

// do changes to document only if current url matches the added url

chrome.storage.local.get(["focus_flow_blocked"]).then((result) => {
  
    const blockedWebsite = result.focus_flow_blocked;

    for(let i=0; i < blockedWebsite.length; i += 1) {
      let sub = blockedWebsite[i].substr(0, 3);

      let url;
      let hostname;
      let origin;

      if (sub !== "www") {
        url = new URL(blockedWebsite[i]);
        hostname = "www." + url.hostname;
        origin = url.origin;
      } else {
        hostname = blockedWebsite[i];
      }

      if (
        window.location.hostname === hostname ||
        window.location.origin === origin
      ) {
        document.body.appendChild(popupContainer);
        document.body.style.overflow = "hidden";

        // This is to prevent the user from doing inspect element using right-click
        document.addEventListener("contextmenu", (e) => {
          e.preventDefault();
        });
      }
    }
});
