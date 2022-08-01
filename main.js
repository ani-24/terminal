const terminal = document.querySelector(".terminal");

function isTouchDevice() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}
const touchScreen = isTouchDevice();

const sentences = [
  "Hello, My name is <b>Aniket Kumar</b>",
  "I am a young, creative full-stack web developer.",
  "Press: ",
  "- 'p' to view my projects",
  "- 's' to see my skills",
  "- 'a' to know about me",
  "or",
  "- 'c' to contact me",
];

const skills = [
  "1. HTML 5",
  "2. CSS 3",
  "3. Sass",
  "4. Bootstrap 4 / 5",
  "5. Materialize CSS",
  "6. Tailwind CSS",
  "7. Vanilla JS",
  "8. React JS",
  "9. Next JS",
  "10. PHP",
  "11. MySQL",
  "12. NodeJS",
  "13. Express",
  "14. MongoDB",
  "15. Mongoose",
  "16. Firebase",
  "What else would you like to see?",
];

const typingMusic = new Audio("./typing.wav");

let state = 0;

typingMusic.addEventListener("timeupdate", () => {
  if (typingMusic.ended) {
    typingMusic.currentTime = 0;
    typingMusic.play();
  }
});

let typingSpeed = 80;
let charIndex = 0;
let sentIndex = 0;

let p;
const type = (sentenceArr) => {
  terminal.scrollTop = terminal.scrollHeight;
  if (charIndex == 0) {
    p = document.createElement("p");
    terminal.appendChild(p);
  }
  if (charIndex <= sentenceArr[sentIndex].length - 1) {
    p.innerHTML += sentenceArr[sentIndex].charAt(charIndex);
    charIndex++;
    setTimeout(() => {
      type(sentenceArr);
    }, typingSpeed);
  } else if (sentIndex < sentenceArr.length - 1) {
    sentIndex++;
    charIndex = 0;
    setTimeout(() => {
      type(sentenceArr);
    }, 160);
  } else {
    if (sentIndex >= sentenceArr.length - 1) {
      p = document.createElement("p");
      p.classList.add("user-input");
      terminal.appendChild(p);
      if (touchScreen) {
        const input = document.createElement("input");
        input.focus();
      }
      window.addEventListener("keydown", (key) => {
        if (key.key == "w" || key.key == "W") {
          alert("Works");
        } else if (key.key == "s" || key.key == "S") {
          const userInput = document.querySelector(".user-input");
          userInput.classList.add("value-recieved");
          userInput.innerHTML = key.key;
          typingMusic.currentTime = 0;
          typingMusic.play();
          sentIndex = 0;
          charIndex = 0;
          setTimeout(() => {
            type(skills);
          }, 200);
        }
      });
    }
    typingMusic.pause();
  }
};

if (!touchScreen) {
  terminal.innerHTML = "<p class='intro'>Press SPACE to begin...</p>";
  document.addEventListener("keydown", (key) => {
    if (state == 0) {
      if (key.key === " ") {
        terminal.innerHTML = "";
        typingMusic.play();
        type(sentences);
        state = 1;
      }
    }
  });
} else {
  terminal.innerHTML = "<p class='intro'>Touch the screen to begin...</p>";
  window.addEventListener("click", () => {
    if (state == 0) {
      terminal.innerHTML = "";
      typingMusic.play();
      type(sentences);
      state = 1;
    }
  });
}
