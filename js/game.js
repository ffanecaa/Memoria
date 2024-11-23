const elementos = [
  "../img/emojis/diosa.png",
  "../img/emojis/idolo.png",
  "../img/emojis/jomon.png",
  "../img/emojis/nugari.png",
  "../img/emojis/nuk.png",
  "../img/emojis/silex.png",
  "../img/emojis/sudame.png",
  "../img/emojis/venus.png",
];
const elementos1 = [
  "../img/robots/becho.png",
  "../img/robots/perro.png",
  "../img/robots/roboensaladera.png",
  "../img/robots/roboperro.png",
  "../img/robots/robotoazul.png",
  "../img/robots/robotRojo.png",
  "../img/robots/robotRojoL.png",
  "../img/robots/rosa.png",
 
];

let cards = [...elementos, ...elementos]; // Duplica las imágenes
let ArrayCards = [];
let ArrayImages = []; // Cambiado a imágenes en lugar de emojis
let fails = 0;
let win = 0;
let cardsFlipped = 0;
let canFlip = true;

let audio = document.getElementById("audio");

function couple(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createBoard() {
  cards = couple(cards); // Baraja las cartas
  const gameBoard = document.getElementById("gameBoard");
  for (let i = 0; i < cards.length; i++) {
    const cardSection = document.createElement("section");
    cardSection.classList.add("card");

    const cardContent = document.createElement("div");
    cardContent.classList.add("content");

    const cardFront = document.createElement("div");
    cardFront.classList.add("front");

    const cardBack = document.createElement("div");
    cardBack.classList.add("back");

    // Usa una imagen en lugar de texto
    const img = document.createElement("img");
    img.src = cards[i]; // Ruta de la imagen
    img.alt = "Memory Card"; // Texto alternativo
    img.style="width:120px,height:120px"
    cardBack.appendChild(img);

    cardSection.appendChild(cardContent);
    cardContent.appendChild(cardFront);
    cardContent.appendChild(cardBack);

    gameBoard.appendChild(cardSection);
  }
}

createBoard();

gameBoard.addEventListener("click", (e) => {
  if (!canFlip) return;

  const value = e.target.classList.contains("front");
  if (value && cardsFlipped < 2) {
    const currentCard = e.target.parentElement;
    const img = currentCard.querySelector(".back img"); // Selecciona la imagen de la carta
    const imagePath = img.src; // Obtén la ruta de la imagen
    currentCard.classList.add("flipped");
    ArrayCards.push(currentCard);
    ArrayImages.push(imagePath);
    cardsFlipped++;
    matchCardsVerification();
  }
});

const matchCardsVerification = () => {
  audio.play();
  if (ArrayCards.length === 2) {
    if (ArrayImages[0] === ArrayImages[1]) {
      ArrayCards = [];
      ArrayImages = [];
      win++;
    } else {
      canFlip = false;
      setTimeout(() => {
        ArrayCards[0].classList.remove("flipped");
        ArrayCards[1].classList.remove("flipped");
        ArrayCards = [];
        ArrayImages = [];
        canFlip = true;
      }, 350);
    }
    cardsFlipped = 0;
  }

  if (ArrayCards.length === 2) {
    fails++;
  }
  document.getElementById("fails").innerText = `Fallos: ${fails}`;
  document.getElementById("fin").innerText = `Aciertos: ${win}`;
  if (win === elementos.length) {
    audioAplausos.play();
    document.getElementById(
      "animationEnd"
    ).innerText = `🎉¡Juego completado! en ${fails} fallos🎉`;
    document.getElementById("fails").innerText = "";
    document.getElementById("fin").innerText = "";
    document.getElementById("contenedorBoton").style.display = "flex";
  }
};
