const modalBtn = document.querySelector(".btn");
const modal = document.querySelector(".container");
const closeBtn = document.querySelector(".close");
const modalText = document.querySelector(".text");

modalBtn.addEventListener("click", (e) => {
  modal.style.display = "inherit";
});

closeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
  e.stopPropagation();
  if (
    e.target.className !== "modal" &&
    e.target.parentNode.className !== "modal"
  ) {
    modal.style.display = "none";
  }
});
