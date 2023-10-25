import "./style.css";
import imagesArray from "./images.js";

let current = 0;
let forward = true;
const imageHolder = document.querySelector(".imageHolder");
imagesArray.forEach((image) => {
  const imageCard = document.createElement("div");
  const imageElement = document.createElement("img");
  imageElement.src = image;
  imageCard.append(imageElement);
  imageHolder.append(imageCard);
});

setInterval(slideWhenWhenTimeIsUp, 2000);
const body = document.querySelector("body");
const next = document.createElement("button");
next.textContent = "next";
next.addEventListener("click", slideToNext);

const previous = document.createElement("button");
previous.textContent = "previous";
previous.addEventListener("click", slideToPrevious);

body.append(previous, next, createCircles());

function slideToNext() {
  if (current === imagesArray.length - 1) return;
  slide("-");
  current = current + 1;
  changeSelected();
  changeForward();
}

function slideToPrevious() {
  if (current <= 0) return;
  slide("+");
  current = current - 1;
  changeSelected();
  changeForward();
}
function changeForward() {
  if (current === imagesArray.length - 1) forward = false;
  if (current === 0) forward = true;
}
function slide(op) {
  const imageNodes = document.querySelectorAll("img");
  const windowWidth = window.innerWidth;
  imageNodes.forEach((image) => {
    if (op === "+")
      image.style.left = `${
        Number(image.style.left.replace("px", "")) + windowWidth
      }px`;
    else
      image.style.left = `${
        Number(image.style.left.replace("px", "")) - windowWidth
      }px`;
    image.style.transition = "left 1s";
  });
}
function changeSelected() {
  const selected = document.querySelector('input[image-id="0"]');
  selected.checked = false;
  const toBeSelected = document.querySelector(`input[image-id="${current}"]`);
  toBeSelected.checked = true;
}
function createCircles() {
  const div = document.createElement("div");
  for (let i = 0; i < imagesArray.length; i++) {
    let input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("name", "image");
    input.setAttribute("image-id", i);
    if (i === 0) {
      input.setAttribute("checked", true);
    }
    input.addEventListener("click", slideToChosen);
    div.append(input);
  }
  return div;
}

function slideToChosen(e) {
  const chosen = Number(e.target.getAttribute("image-id"));
  if (chosen > current) {
    while (chosen > current) slideToNext();
  } else if (chosen < current) {
    while (chosen < current) slideToPrevious();
  }
}

function slideWhenWhenTimeIsUp() {
  if (current < imagesArray.length - 1 && forward) slideToNext();
  else if (current > 0) slideToPrevious();
  console.log(current);
  console.log(forward);
}
