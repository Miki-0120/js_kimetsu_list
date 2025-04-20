const BASE_URL = "https://ihatov08.github.io/kimetsu_api/api/all.json";
const URL = "https://ihatov08.github.io";

async function getdata() {
  const response = await fetch(BASE_URL,URL);
  const characters = await response.json();
  const charaListContainer = document.querySelector("#chara-list");
  
  charaListContainer.innerHTML = '';
  
  await Promise.all(characters.map(async (character) => {
    const card = document.createElement("div");
    card.className = "character-card";

    const nameDiv = document.createElement("div");
    nameDiv.className = "character-name";
    nameDiv.textContent = character.name;
    
    const imgDiv = document.createElement("div");
    imgDiv.className = "character-image";
    const img = document.createElement("img");
    img.setAttribute("src", URL + character.image);
    imgDiv.appendChild(img);
    
    const categoryDiv = document.createElement("div");
    categoryDiv.className = "character-category";
    categoryDiv.textContent = character.category;
    
    card.appendChild(nameDiv);
    card.appendChild(imgDiv);
    card.appendChild(categoryDiv);
    
    charaListContainer.appendChild(card);
  }));
  
  return true;
}

async function formSwitch() {
  const loadingWrapper = document.getElementById('loading-wrapper');
  document.body.style.overflow = 'hidden';

  const radioButtonValue = document.querySelector("#radioButton").character.value;
  const charaListContainer = document.querySelector("#chara-list");
  const BASE_URL = `https://ihatov08.github.io/kimetsu_api/api/${radioButtonValue}.json`;
  response = await fetch(`${BASE_URL}/${radioButtonValue}.json`);
  const url = "https://ihatov08.github.io";

  try {
    charaListContainer.innerHTML = '';
    
    let characters;
    if (radioButtonValue === "all") {
      const response = await fetch(`https://ihatov08.github.io/kimetsu_api/api/${radioButtonValue}.json`);
      characters = await response.json();
    } else {
      const response = await fetch(BASE_URL);
      characters = await response.json();
    }
    
    await Promise.all(characters.map(async (character) => {
      const card = document.createElement("div");
      card.className = "character-card";
      
      const nameDiv = document.createElement("div");
      nameDiv.className = "character-name";
      nameDiv.textContent = character.name;
      
      const imgDiv = document.createElement("div");
      imgDiv.className = "character-image";
      const img = document.createElement("img");
      img.setAttribute("src", URL + character.image);
      imgDiv.appendChild(img);
      
      const categoryDiv = document.createElement("div");
      categoryDiv.className = "character-category";
      categoryDiv.textContent = character.category;
      
      card.appendChild(nameDiv);
      card.appendChild(imgDiv);
      card.appendChild(categoryDiv);
      
      charaListContainer.appendChild(card);
    }));
  }
  finally {
    loadingWrapper.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

async function init() {
  const loadingWrapper = document.getElementById('loading-wrapper');
  
  try {
    await getdata();
  } 
  finally {
    setTimeout(() => {
      loadingWrapper.style.display = "none";
      document.body.style.overflow = "auto";
    }, 500);
  }
}

window.addEventListener('DOMContentLoaded', init);