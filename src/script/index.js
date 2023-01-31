const search = document.querySelector("#search"); //TO-DO BUTTON AND LABEL - SHINY TYPE // BOTAR LOADER - TRAVAR O BOTÃO PARA
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
const switchShiny = document.querySelector("#switch-shiny");
const loader = document.querySelector(".loader");

if (window.performance) {
  console.log("Perfomance works well.");
  if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    sessionStorage.setItem("last_poke", "empty_value");
  }
}

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

const TIMEOUT_PROMISE = 800;

const URL_BULBASAUR_SHINY =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/1.png";
const URL_BULBASAUR_NORMAL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png";

const fetchApi = async (name) => {
  return new Promise(async (resolve, reject) => {
    let pokName = name.toLowerCase();
    pokName = pokName.split(" ").join("-");
    const url = `https://pokeapi.co/api/v2/pokemon/${pokName}`;
    loader.hidden = false;
    pokedex.style.filter = `blur(3px)`;
    search.disabled = true;
    setTimeout(async () => {
      const res = await fetch(url);
      loader.hidden = true;
      pokedex.style.filter = "";
      search.disabled = false;

      if (res.status === 200) {
        const pokeData = await res.json();
        sessionStorage.setItem("last_poke", JSON.stringify(pokeData));
        resolve(pokeData);
      }
      reject(false);
    }, TIMEOUT_PROMISE);
  });
};

search.addEventListener("change", async (event) => {
  try {
    const data = await fetchApi(event.target.value);
    // return pokemonError;
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
    checkToggle();
  } catch (e) {
    alert(`Pokémon doesn't exist!`);
  }
});

const checkToggle = () => {
  let storage = sessionStorage.getItem("last_poke");
  console.log(sessionStorage);
  if (storage == "empty_value") {
    if (switchShiny.checked) {
      pokemonImage.src = URL_BULBASAUR_SHINY;
    } else {
      pokemonImage.src = URL_BULBASAUR_NORMAL;
    }
  }
  if (storage != "empty_value") {
    let jsonStorage = JSON.parse(storage);

    if (storage != "empty_value" && switchShiny.checked) {
      pokemonImage.src = jsonStorage.sprites.other.home.front_shiny
        ? jsonStorage.sprites.other.home.front_shiny
        : alert(`This pokemon it's a Shiny Lock`);
    } else {
      pokemonImage.src = jsonStorage.sprites.other.home.front_default
        ? jsonStorage.sprites.other.home.front_default
        : alert(`This pokemon it's a Shiny Lock`);
    }
  }
};
