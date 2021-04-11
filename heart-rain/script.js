const createHeart = () => {
  const heart = document.createElement("div");
  heart.classList.add("heart");

  heart.innerText = "♥";
  heart.style.left = Math.ceil(Math.random() * 100) + "vh";

  document.body.appendChild(heart);
};
setInterval(() => {
  createHeart();
}, 100);
