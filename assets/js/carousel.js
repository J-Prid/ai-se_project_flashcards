import {
  hexToString,
  removeColorClasses,
  getCarouselTitleString,
} from "./colors.js";
import { decks } from "./decks.js";

function renderCarouselView(deck) {
  let currentIndex = 0;
  let showingQuestion = true;

  const carouselEl = document.querySelector(".carousel");
  const leftBtn = carouselEl.querySelector(".carousel__btn_type_left");
  const rightBtn = carouselEl.querySelector(".carousel__btn_type_right");
  const cardTitleEl = carouselEl.querySelector(".carousel__title");
  const cardEl = carouselEl.querySelector(".carousel__card");
  const cardTextEl = carouselEl.querySelector(".carousel__card-text");
  const cardBtnEl = carouselEl.querySelector(".carousel__btn_type_flip");
  const cards = deck.cards;

  function disableButton(buttonEl) {
    buttonEl.classList.add("carousel__btn_disabled");
    buttonEl.disabled = true;
  }
  function enableButton(buttonEl) {
    buttonEl.classList.remove("carousel__btn_disabled");
    buttonEl.removeAttribute("disabled");
  }

  function updateArrows() {
    if (currentIndex === 0) {
      disableButton(leftBtn);
    } else {
      enableButton(leftBtn);
    }

    if (currentIndex === deck.cards.length - 1) {
      disableButton(rightBtn);
    } else {
      enableButton(rightBtn);
    }
  }

  function updateDisplay() {
    const colorName = hexToString(deck.color);

    removeColorClasses(cardEl);
    cardEl.classList.add(`card__carousel_color_${colorName}`);
    cardTitleEl.textContent = getCarouselTitleString(deck, currentIndex);
    updateArrows();

    if (showingQuestion) {
      cardTextEl.textContent = deck.cards[currentIndex].question;
      cardEl.classList.remove("carousel__card_color_white");
    } else {
      cardTextEl.textContent = deck.cards[currentIndex].answer;
      cardEl.classList.add("carousel__card_color_white");
    }
  }

  rightBtn.addEventListener("click", () => {
    if (currentIndex < deck.cards.length - 1) {
      currentIndex++;
      showingQuestion = true;
      updateDisplay();
    }
  });

  leftBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      showingQuestion = true;
      updateDisplay();
    }
  });

  cardBtnEl.addEventListener("click", () => {
    showingQuestion = !showingQuestion;
    updateDisplay();
  });

  updateDisplay();
}

export { renderCarouselView };
