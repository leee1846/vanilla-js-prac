let bg = document.querySelector(".bg");
let moon = document.querySelector(".moon");
let road = document.querySelector(".road");
let mountain = document.querySelector(".mountain");

window.addEventListener("scroll", () => {
  const value = window.scrollY;
  bg.style.top = value + "px";
  road.style.top = value + "px";
  mountain.style.top = value + "px";
  moon.style.left = value + "px";
});
