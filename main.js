const blockBtn = document.getElementById("blockBtn");
const redirectBtn = document.getElementById("redirectBtn");
const block = document.getElementById("block");
const redirect = document.getElementById("redirect");
const websiteInput = document.getElementById("websiteInput");
const websiteInputBtn = document.getElementById("websiteInputBtn");
const blockedWebsites = document.getElementById("blockedWebsites");
var blockedWebsitesArray = [];

function navigation() {
  if (
    window.location.href ===
    "chrome-extension://jfdpfbllhnkbnhldhiagbjjpdkgkgpim/index.html"
  ) {
    redirect.style.display = "none";
    block.style.display = "block";
  }
}

function updateBlockedWebsiteUi(blockedWebsitesArray) {
  blockedWebsites.innerHTML = "";

  for (let i = 0; i < blockedWebsitesArray.length; i++) {
    var pElement = document.createElement("p");
    pElement.textContent = blockedWebsitesArray[i];
    blockedWebsites.appendChild(pElement);
  }
}

function checkValidURL(str) {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // validate fragment locator
  return !!urlPattern.test(str);
}

window.onload = function () {
  navigation();

  //check if the key focus_flow_blocked is present in the chrome storage api or not
  //if it is not present then initialize the key with an empty array
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

redirectBtn.addEventListener("click", (e) => {
  block.style.display = "none";
  redirect.style.display = "block";
});

blockBtn.addEventListener("click", (e) => {
  redirect.style.display = "none";
  block.style.display = "block";
});

websiteInputBtn.addEventListener("click", (e) => {
  let substr = websiteInput.value.substring(0, 4);
  let temp = websiteInput.value;

  if (substr != "http") {
    temp = "https://" + websiteInput.value;
  }

  if (checkValidURL(temp)) {
    blockedWebsitesArray.push(websiteInput.value);
    chrome.storage.local.set({ focus_flow_blocked: blockedWebsitesArray });
    updateBlockedWebsiteUi(blockedWebsitesArray);
    websiteInput.value = "";
  } else {
    alert("invalid URL");
  }
});
