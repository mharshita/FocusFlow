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
  "<p>This site is blocked by Focus Flow extension</p>" +
  "<p>Want to read something instead?</p>" +
  '<a style="color: blue" href="https://www.readsomethinggreat.com">Yes!</a>';

popupContainer.appendChild(popup);
document.body.appendChild(popupContainer);

document.body.style.overflow = "hidden";

// This is to prevent the user from doing inspect element using right-click
document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});
