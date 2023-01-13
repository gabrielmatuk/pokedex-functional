const search = document.querySelector("#search"); //TO-DO BUTTON AND LABEL - SHINY TYPE
const number = document.querySelector("#number");
const pokemonImage = document.querySelector("#pokemon-image");
const type = document.querySelectorAll(".type");
const types = document.querySelector("#types");
const statNumber = document.querySelectorAll(".stat-number");
const barInner = document.querySelectorAll(".bar-inner");
const barOuter = document.querySelectorAll(".bar-outer");
const statDesc = document.querySelectorAll(".stat-desc");
const baseStats = document.querySelector("#base-stats");
const pokedex = document.querySelector("#pokedex");

const typeColors = {
  rock: [182, 158, 49],
  ghost: [112, 85, 155],
  steel: [183, 185, 208],
  water: [100, 147, 235],
  grass: [116, 203, 72],
  psychic: [251, 85, 132],
  ice: [154, 214, 223],
  dark: [117, 87, 76],
  fairy: [230, 158, 172],
  normal: [170, 166, 127],
  fighting: [193, 34, 57],
  flying: [168, 145, 236],
  poison: [164, 62, 158],
  ground: [222, 193, 107],
  bug: [167, 183, 35],
  fire: [245, 125, 49],
  electric: [249, 207, 48],
  dragon: [112, 55, 255],
};

const fetchApi = async (name) => {
  let pokName = name.toLowerCase();
  pokName = pokName.split(" ").join("-");
  const url = `https://pokeapi.co/api/v2/pokemon/${pokName}`;
  const res = await fetch(url);

  if (res.status === 200) {
    return await res.json();
  }

  return false;
};

search.addEventListener("change", async (event) => {
  const data = await fetchApi(event.target.value);

  if (!data) {
    alert("Pokémon does not exist.");
    return;
  }

  const mainColor = typeColors[data.types[0].type.name];
  baseStats.style.color = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;
  pokedex.style.backgroundColor = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;
  number.innerHTML = `#${data.id.toString().padStart(3, "0")}`;
  pokemonImage.src = data.sprites.other.home.front_default;

  types.innerHTML = "";
  data.types.forEach((t) => {
    let newType = document.createElement("span");
    let colors = typeColors[t.type.name];

    newType.innerHTML = t.type.name;
    newType.classList.add("type");
    newType.style.backgroundColor = `rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`;

    types.appendChild(newType);
  });
  data.stats.forEach((s, i) => {
    statNumber[i].innerHTML = s.base_stat.toString().padStart(3, "0");

    barInner[i].style.width = `${s.base_stat}%`;

    barInner[
      i
    ].style.backgroundColor = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;

    barOuter[
      i
    ].style.backgroundColor = `rgba(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]}, 0.3)`;

    statDesc[
      i
    ].style.color = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;
  });
});
