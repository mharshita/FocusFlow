const websiteInput = document.getElementById("websiteInput");
const websiteInputBtn = document.getElementById("websiteInputBtn");
const blockedWebsites = document.getElementById("blockedWebsites");
var blockedWebsitesArray = [];

function handleDelete(index) {
  blockedWebsitesArray.splice(index, 1);
  chrome.storage.local.set({ focus_flow_blocked: blockedWebsitesArray });
  updateBlockedWebsiteUi(blockedWebsitesArray);
}

function isWebsiteRepeated(website, array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === website) {
      return true;
    }
  }

  return false;
}

function addRowStyle(ele) {
  ele.style.display = "flex";
  ele.style.width = "30%";
  ele.style.paddingLeft = "2em";
  ele.style.justifyContent = "space-between";
  ele.style.marginTop = "10px";
  ele.style.marginBottom = "10px";
}

function addButtonStyle(ele) {
  ele.style.outline = "none";
  ele.style.background = "inherit";
  ele.style.border = "none";
  ele.style.cursor = "pointer";
  ele.style.fontSize = "18px";
}

function updateBlockedWebsiteUi(blockedWebsitesArray) {
  blockedWebsites.innerHTML = "";

  for (let i = 0; i < blockedWebsitesArray.length; i++) {
    let divElement = document.createElement("div");
    addRowStyle(divElement);

    let pElement = document.createElement("p");
    pElement.textContent = blockedWebsitesArray[i];

    let buttonElement = document.createElement("button");
    buttonElement.textContent = "X";
    buttonElement.addEventListener("click", (e) => {
      handleDelete(i);
    });
    addButtonStyle(buttonElement);

    divElement.appendChild(pElement);
    divElement.appendChild(buttonElement);

    blockedWebsites.appendChild(divElement);
  }
}

function checkValidURL(str) {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + //* validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + //* validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + //* validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + //* validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + //* validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); //* validate fragment locator
  return !!urlPattern.test(str);
}

window.onload = function () {
  //* check if the key focus_flow_blocked is present in the chrome storage api or not
  //* if it is not present then initialize the key with an empty array
  chrome.storage.local.get("focus_flow_blocked", function (result) {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    } else {
      if ("focus_flow_blocked" in result) {
        //key is present
        blockedWebsitesArray = result.focus_flow_blocked;
        updateBlockedWebsiteUi(blockedWebsitesArray);
      } else {
        //key is not present
        chrome.storage.local.set({ focus_flow_blocked: [] }, function () {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
          }
        });
      }
    }
  });
};

websiteInputBtn.addEventListener("click", (e) => {
  let substr = websiteInput.value.substring(0, 4);
  let sub = websiteInput.value.substring(0, 3);

  let temp = websiteInput.value;

  if (substr !== "http" && sub !== "www") {
    temp = "https://" + websiteInput.value;
  }

  if (checkValidURL(temp)) {
    if (isWebsiteRepeated(websiteInput.value, blockedWebsitesArray)) {
      alert("Website Already Exists");
    } else {
      blockedWebsitesArray.push(temp);
      chrome.storage.local.set({ focus_flow_blocked: blockedWebsitesArray });
      updateBlockedWebsiteUi(blockedWebsitesArray);
    }
    websiteInput.value = "";
  } else {
    alert("invalid URL");
  }
});
