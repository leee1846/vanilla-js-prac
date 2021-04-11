const text = "넌 개발자가 될수 있을꺼야!!!";

let index = 0;

const writeIndex = () => {
  document.body.innerText = text.slice(0, index);

  index++;

  if (index > text.length - 1) {
    clearInterval(interval);
  }
};

const interval = setInterval(() => {
  writeIndex();
}, 200);
