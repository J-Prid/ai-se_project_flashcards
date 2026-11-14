import { decks, getDeckByID } from "./decks.js";
import { hexToString } from "./colors.js";
import { renderCarouselView } from "./carousel.js";

console.log(decks);

const deckTemplate = document.querySelector("#deck-template");
const deckList = document.querySelector(".decks__list");
const sections = document.querySelectorAll(".page__main-content > *");

function updateVisibleSection() {
  const id = window.location.hash.slice(1) || "home";
  const target = document.getElementById(id);
  const sectionToShow = [...sections].includes(target)
    ? target
    : document.getElementById("not-found");

  if (id.startsWith("carousel/")) {
    const deckId = id.split("/")[1];
    const deck = getDeckByID(deckId);
    const carouselToShow = document.getElementById("carousel");
    renderCarouselView(deck);
    sections.forEach((section) => {
      section.hidden = section !== carouselToShow;
    });
  } else {
    sections.forEach((section) => {
      section.hidden = section !== sectionToShow;
    });
  }
}

window.addEventListener("hashchange", updateVisibleSection);
updateVisibleSection();

function createDeckEl(item) {
  const copy = deckTemplate.content.cloneNode(true);
  const deckTitle = copy.querySelector(".deck__title");
  const deckEl = copy.querySelector(".deck");
  const colorName = hexToString(item.color);
  const deckCount = copy.querySelector(".deck__count");
  const deckLink = copy.querySelector(".deck__link");
  deckLink.href = `#carousel/${item.id}`;
  deckCount.textContent = `${item.cards.length} cards`;
  deckEl.classList.add(`deck_color_${colorName}`);
  deckTitle.textContent = item.name;

  const deleteBtn = copy.querySelector(".deck__delete-btn");
  deleteBtn.addEventListener("click", function () {
    deckEl.remove();
  });

  return copy;
}

function renderDeckEl(item) {
  const deckEl = createDeckEl(item);
  deckList.prepend(deckEl);
}

decks.forEach(renderDeckEl);
