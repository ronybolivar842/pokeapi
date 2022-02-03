const API = "https://pokeapi.co/api/v2/pokemon?limit=50&offset=0";

const getData = (api) => {
  return fetch(api)
    .then((res) => res.json())
    .then((data) => {
      getPokemonData(data.results), pagination(data);
    })
    .catch((error) => console.error("Error en la API:", error));
};

const getPokemonData = (pokemonData) => {
  document.getElementById("characters").innerHTML = "";
  pokemonData.forEach((pokemon) => {
    fetch(pokemon.url)
      .then((res) => res.json())
      .then((data) => fillData(data))
      .catch((error) => console.error("Error en la API:", error));
  });
};

const fillData = (pokemon) => {
  let html = "";
  html += '<div class="col">';
  html += `<div class="card h-100 ${pokemon.types[0].type.name} p-2 text-white">`;
  html += '<div class="card-body text-center fs-4">';
  html += `<h5 class="card-title fs-2">${
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
  }</h5>`;
  html += `<p class="card-text">Height: ${pokemon.height}</p>`;
  html += `<p class="card-text">Weight: ${pokemon.weight}</p>`;
  html += "</div>";
  html += `<img src="${pokemon.sprites.other.dream_world.front_default}" class="card-img-top" alt="...">`;
  html += "</div>";
  html += "</div>";
  document.getElementById("characters").innerHTML += html;
};

const pagination = (data) => {
  let prevDisabled = data.previous == null ? "disabled" : "";
  let nextDisabled = data.next == null ? "disabled" : "";

  document.getElementById(
    "next"
  ).innerHTML = `<a class="btn ${nextDisabled}" onclick="getData('${data.next}')"><i class="fas fa-chevron-right"></i></a>`;
  document.getElementById(
    "prev"
  ).innerHTML = `<a class="btn ${prevDisabled}" onclick="getData('${data.previous}')"><i class="fas fa-chevron-left"></i></a>`;
};

getData(API);