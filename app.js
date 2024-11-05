const drumSet = document.querySelector("#drumset");
const rebindBtn = document.querySelector("#rebindBtn");
let rebinding = false;
let currentKey = 0;

const drumKeys = [
  {
    name: "hihat",
    key: "a",
  },
  {
    name: "kick",
    key: "s",
  },
  {
    name: "openhat",
    key: "d",
  },
  {
    name: "ride",
    key: "f",
  },
  {
    name: "snare",
    key: "g",
  },
  {
    name: "tom",
    key: "h",
  },
  {
    name: "tink",
    key: "j",
  },
  {
    name: "clap",
    key: "k",
  },
];

generateDrumkit();

rebindBtn.addEventListener("click", () => {
  if (rebinding) return;
  rebinding = true;
  drumSet.children[currentKey].classList.toggle("rebinding");
});

window.addEventListener("keydown", (e) => {
  if (rebinding) {
    drumKeys[currentKey].key = e.key.toLowerCase();
    document.querySelector(`#${drumKeys[currentKey].name}key`).textContent =
      e.key.toUpperCase();
    drumSet.children[currentKey].classList.toggle("rebinding");
    currentKey++;
    if (currentKey >= drumKeys.length) {
      currentKey = 0;
      rebinding = false;
      generateDrumkit();
      return;
    }
    drumSet.children[currentKey].classList.toggle("rebinding");
  } else {
    drumKeys.forEach((drum) => {
      if (e.key.toLowerCase() === drum.key) {
        new Audio(`./sounds/${drum.name}.wav`).play();
        document.querySelector(`#${drum.name}`).classList.toggle("pressed");
      }
    });
  }
});

window.addEventListener("keyup", () => {
  for (const drum of drumSet.children) {
    drum.classList.remove("pressed");
  }
});

function generateDrumkit() {
  const drumContainer = drumSet.children;
  for (let i = drumContainer.length - 1; i >= 0; i--) {
    drumContainer[i].remove();
  }
  drumKeys.forEach((e) => {
    const drum = document.createElement("div");
    drum.className = "drum";
    drum.id = e.name;
    drumSet.append(drum);
    drum.addEventListener("mousedown", () => {
      new Audio(`./sounds/${e.name}.wav`).play();
      document.querySelector(`#${e.name}`).classList.toggle("pressed");
    });
    drum.addEventListener("mouseup", () => {
      for (const drum of drumSet.children) {
        drum.classList.remove("pressed");
      }
    });
    const drumName = document.createElement("p");
    drumName.textContent = e.name[0].toUpperCase() + e.name.slice(1);

    const drumImg = document.createElement("img");
    drumImg.src = `./images/${e.name}.jpg`;
    drumImg.className = "drumImg";

    const drumKey = document.createElement("kbd");
    drumKey.id = `${e.name}key`;
    drumKey.textContent = e.key.toUpperCase();
    drum.append(drumName, drumImg, drumKey);
  });
}
