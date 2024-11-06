const drumSet = document.querySelector("#drumset");
const rebindBtn = document.querySelector("#rebindBtn");
const drumSetChildren = drumSet.children;
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

//generates the drumkit on pageload
generateDrumkit();

rebindBtn.addEventListener("click", () => {
  // disables the button if you are rebinding
  if (rebinding) return;
  rebindBtn.classList.toggle("disabled");
  // goes into rebindng state
  rebinding = true;
  currentKey = 0;
  drumSetChildren[currentKey].classList.toggle("rebinding");
});

window.addEventListener("keydown", (e) => {
  //if in the rebinding state updates the object array and the display
  if (rebinding) {
    drumKeys[currentKey].key = e.key.toLowerCase();
    document.querySelector(`#${drumKeys[currentKey].name}key`).textContent =
      e.key.toUpperCase();
    //removes the rebinding styling from the current key
    drumSetChildren[currentKey].classList.toggle("rebinding");
    currentKey++;
    // if all the keys have been rebinded goes out of the rebinding state
    if (currentKey >= drumKeys.length) {
      rebinding = false;
      rebindBtn.classList.toggle("disabled");
      // regenerates the drumkit with the new keys
      generateDrumkit();
      // returns to prevent trying to style the next key when there is none
      return;
    }
    //applies the rebinding styling to the next key when there is none
    drumSetChildren[currentKey].classList.toggle("rebinding");
  } else {
    drumKeys.forEach((drum) => {
      if (e.key.toLowerCase() === drum.key) {
        //plays the right sound when a key is pressed
        new Audio(`./sounds/${drum.name}.wav`).play();
        //styling a drum based on the key pressed
        document.querySelector(`#${drum.name}`).classList.toggle("pressed");
      }
    });
  }
});

//removes styling when a key is unpressed
window.addEventListener("keyup", () => {
  for (const drum of drumSetChildren) {
    drum.classList.remove("pressed");
  }
});

//generates the drumkit
function generateDrumkit() {
  //removes the previous drums if there are any
  const drumContainer = drumSetChildren;
  for (let i = drumContainer.length - 1; i >= 0; i--) {
    drumContainer[i].remove();
  }

  //loops through the object array
  drumKeys.forEach((e) => {
    //creates a div
    const drum = document.createElement("div");
    //gives it a class for styling
    drum.classList.add("drum");
    //gives it an unique id
    drum.id = e.name;
    //appends it to the drumset div
    drumSet.append(drum);

    //event listener for mouse click
    drum.addEventListener("mousedown", () => {
      //plays the right audio
      new Audio(`./sounds/${e.name}.wav`).play();
      //styling when pressed
      document.querySelector(`#${e.name}`).classList.toggle("pressed");
    });

    //removes styling when letting go of the mouse
    drum.addEventListener("mouseup", () => {
      for (const drum of drumSetChildren) {
        drum.classList.remove("pressed");
      }
    });

    //hover effect
    drum.addEventListener("mouseenter", () => {
      drum.classList.toggle("drumHover");
    });
    drum.addEventListener("mouseleave", () => {
      drum.classList.toggle("drumHover");
    });

    //creates a paragraph
    const drumName = document.createElement("p");
    //sets the text of the paragaph to be the name of the drum with the first letter capitalized
    drumName.textContent = e.name[0].toUpperCase() + e.name.slice(1);
    //adds class for text styling
    drumName.classList.add("text");

    //creates an image
    const drumImg = document.createElement("img");
    //gives the image the right source
    drumImg.src = `./images/${e.name}.jpg`;
    //adds a class for styling
    drumImg.classList.add("drumImg");
    //creates a kbd
    const drumKey = document.createElement("kbd");
    //gives it an unique id
    drumKey.id = `${e.name}key`;
    //gives it a class for text styling
    drumKey.classList.add("text");
    //sets the texcontent to the right key in uppercase
    drumKey.textContent = e.key.toUpperCase();
    //appends the the name image and key to the drum
    drum.append(drumName, drumImg, drumKey);
  });
}
