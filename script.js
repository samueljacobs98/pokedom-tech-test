// Assets
import { pokemonArray } from "./data/pokemon.js";

// Global Constants
const cardContainer = document.querySelector(".card-container");
const filterTypesBtn = document.querySelector(".filter-type");
const filterTypeSelected = document.getElementById("types");
const searchBtn = document.querySelector(".search-btn");
const filterNameSelected = document.getElementById("search");
const updateBtn = document.querySelector(".items-btn");
const itemsNumber = document.getElementById("items");
const reset = document.querySelector(".reset")

// Functions
const capitalise = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const getTypes = () => {
  const typesString = pokemonArray
    .map((pokemon) => pokemon.types.join(" "))
    .join(" ");
  const tempArray = typesString.split(" ");
  return [...new Set(tempArray)];
};
const types = getTypes();

const getNames = () => {
  const namesString = pokemonArray.map((pokemon) => pokemon.name).join(" ");
  const tempArray = namesString.split(" ");
  return [...new Set(tempArray)];
};
const names = getNames();

const addTypes = () => {
  const filterContainer = document.getElementById("types");
  types.forEach((type) => {
    filterContainer.innerHTML += `<option value=${type}>${type}</option>`;
  });
};

const filterByType = () => {
  const type = filterTypeSelected.value;
  const filteredPokemonArray = pokemonArray.filter((pokemon) =>
    pokemon.types.includes(`${type}`)
  );
  display(filteredPokemonArray);
};

const filterByName = () => {
  const name = filterNameSelected.value.toLowerCase();
  const filteredPokemonArray = pokemonArray.filter(
    (pokemon) => pokemon.name === `${name}`
  );
  display(filteredPokemonArray);
};

const updateItems = () => {
  if (itemsNumber.value < pokemonArray.length) {
    display(this, itemsNumber.value);
  }
};

const resetItems = () => {
  display()
}

const display = (fileteredPokemonArray, countMax) => {
  fileteredPokemonArray = fileteredPokemonArray || pokemonArray;
  countMax = countMax || fileteredPokemonArray.length;

  let displayHTML = "";
  cardContainer.innerHTML = displayHTML;
  let count = 0;

  fileteredPokemonArray.forEach((pokemon) => {
    if (count >= countMax) {
      return;
    }

    const name = capitalise(pokemon.name);
    displayHTML += `<div class="card">
            <img src="${pokemon.sprite}" alt="" srcset="" class="card__image" />
            <div class="card__content">
                <h2 class="card__heading">${name}</h2>
                <p class="card__text">${name} (#${
      pokemon.id
    }) is a ${pokemon.types.join(" & ")} type pokemon.</p>
            </div>
        </div>`;
    count++;
  });
  cardContainer.innerHTML = displayHTML;
};

// Events
window.onload = function () {
  addTypes();
  display();
};

filterTypesBtn.addEventListener("click", filterByType);
searchBtn.addEventListener("click", filterByName);
updateBtn.addEventListener("click", updateItems);
reset.addEventListener("click", resetItems)
