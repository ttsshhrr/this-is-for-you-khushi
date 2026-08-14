const question = document.getElementById("question");
const gif = document.getElementById("gif");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");


// YES button click
yesBtn.addEventListener("click", () => {
  question.innerHTML = "I knew it 😍";

  gif.src = "https://media.giphy.com/media/UMon0fuimoAN9ueUNP/giphy.gif";
});


// ==========================================
// YES BUTTON KO SCREEN KE ANDAR MOVE KARNA
// ==========================================

let buttonMoved = false;
let lastX = -9999;
let lastY = -9999;

function prepareYesButton() {

  if (buttonMoved) return;

  buttonMoved = true;

  // Button ko kisi parent ke transform/overflow se bahar nikalo
  document.body.appendChild(yesBtn);

  yesBtn.style.position = "fixed";
  yesBtn.style.zIndex = "999999";
  yesBtn.style.margin = "0";
}


function moveYesButton() {

  prepareYesButton();

  const padding = 25;

  // Current actual size
  const rect = yesBtn.getBoundingClientRect();

  const buttonWidth = rect.width;
  const buttonHeight = rect.height;

  // Viewport ki actual boundaries
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const minX = padding;
  const minY = padding;

  const maxX = screenWidth - buttonWidth - padding;
  const maxY = screenHeight - buttonHeight - padding;

  // Agar screen chhoti hai
  if (maxX < minX || maxY < minY) {
    yesBtn.style.left = `${minX}px`;
    yesBtn.style.top = `${minY}px`;
    return;
  }

  let x;
  let y;

  // Previous location se reasonably door nayi location
  let tries = 0;

  do {

    x = minX + Math.random() * (maxX - minX);
    y = minY + Math.random() * (maxY - minY);

    tries++;

  } while (
    tries < 50 &&
    Math.abs(x - lastX) < buttonWidth * 1.5 &&
    Math.abs(y - lastY) < buttonHeight * 1.5
  );

  lastX = x;
  lastY = y;

  // Integer position
  x = Math.round(x);
  y = Math.round(y);

  yesBtn.style.left = `${x}px`;
  yesBtn.style.top = `${y}px`;
}


// Desktop
yesBtn.addEventListener("mouseenter", moveYesButton);


// Mobile
yesBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveYesButton();
});


// Keyboard
yesBtn.addEventListener("focus", moveYesButton);


// ==========================================
// RESIZE FIX
// ==========================================

window.addEventListener("resize", () => {

  if (!buttonMoved) return;

  const padding = 25;

  const rect = yesBtn.getBoundingClientRect();

  let x = rect.left;
  let y = rect.top;

  const maxX =
    window.innerWidth - rect.width - padding;

  const maxY =
    window.innerHeight - rect.height - padding;

  x = Math.max(padding, Math.min(x, maxX));
  y = Math.max(padding, Math.min(y, maxY));

  yesBtn.style.left = `${x}px`;
  yesBtn.style.top = `${y}px`;
});
noBtn.addEventListener("click", () => {
    window.location.href = "celebration.html";
});