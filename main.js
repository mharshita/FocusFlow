const blockBtn = document.getElementById("blockBtn");
const redirectBtn = document.getElementById("redirectBtn");
const block = document.getElementById("block");
const redirect = document.getElementById("redirect");
const websiteInput = document.getElementById("websiteInput");
const websiteInputBtn = document.getElementById("websiteInputBtn");
const blockedWebsites = document.getElementById("blockedWebsites");

function navigation() {
  if (
    window.location.href ===
    "chrome-extension://jfdpfbllhnkbnhldhiagbjjpdkgkgpim/index.html"
  ) {
    redirect.style.display = "none";
    block.style.display = "block";
  }
}

window.onload = function () {
  navigation();
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
  //console.log(websiteInput.value);
  //TODO: Do the following:
  //If website is invalid, show error
  //If website is valid, add the website in the array that contains blocked website in the storage
});
