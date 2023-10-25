import "./style.css";
import imagesArray from "./images.js";

let current = 0;
const imageHolder = document.querySelector(".imageHolder");
imagesArray.forEach((image) => {
  const imageCard = document.createElement("div");
  const imageElement = document.createElement("img");
  imageElement.src = image;
  imageCard.append(imageElement);
  imageHolder.append(imageCard);
});
const body = document.querySelector("body");
const next = document.createElement("button");
next.textContent = "next";
next.addEventListener("click", slideToNext);

const previous = document.createElement("button");
previous.textContent = "previous";
previous.addEventListener("click", slideToPrevious);

body.append(next, previous);

function slideToNext() {
  if (current === imagesArray.length - 1) return;
  slide("-");
}

function slideToPrevious() {
  if (current <= 0) return;
  slide("+");
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
    image.style.transition = "left 2s";
  });
  if (op === "+") current = current - 1;
  else current = current + 1;
}
