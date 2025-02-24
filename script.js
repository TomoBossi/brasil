const images = document.querySelectorAll("img");
const large_image_container = document.getElementById("large_image_container");
const large_image = document.getElementById("large_image");
const music = document.getElementById("music");
let currentImageIndex = -1;
let playedMusic = false;

large_image_container.setAttribute("onclick", "hideLarge()");

let srcs = [];
for (let image of images) {
  let src = image.getAttribute("src");
  if (src !== "") {
    let hqSrc = src.replace("/thumbnails", "").replace(/\.jpg$/i, ".png");
    image.setAttribute("onclick", `showLarge("${hqSrc}");playMusic();`);
    srcs.push(hqSrc);
  }
}

function showLarge(src) {
  large_image.setAttribute("src", src);
  currentImageIndex = srcs.indexOf(src);
  large_image.style.opacity = "1";
  large_image_container.style.zIndex = "100";
}

function hideLarge() {
  large_image.style.opacity = "0";
  large_image.setAttribute("src", "");
  large_image_container.style.zIndex = "-1";
}

function next(step = 1) {
  if (large_image.style.opacity === "1") {
    large_image.setAttribute("src", "");
    showLarge(srcs[(currentImageIndex + step + srcs.length) % srcs.length]);
  }
}

function playMusic() {
  if (!playedMusic) {
    music.play();
    playedMusic = true;
  }
}

document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "Escape":
      e.preventDefault();
      hideLarge();
      break;
    case "ArrowRight":
      e.preventDefault();
      next();
      break;
    case "ArrowLeft":
      e.preventDefault();
      next(-1);
      break;
  }
});
