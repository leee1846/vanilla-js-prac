const btn = document.querySelector("button");
const container = document.querySelector("#container");

btn.addEventListener("click", () => {
  appearNotification();
});

const appearNotification = () => {
  const notification = document.createElement("div");
  notification.classList.add("toast");
  notification.innerText = "주의사항!!!";

  container.appendChild(notification);

  setTimeout(() => {
    container.classList.add("active");
  }, 100);
  setTimeout(() => {
    container.classList.remove("active");
    notification.remove();
  }, 2000);
};
