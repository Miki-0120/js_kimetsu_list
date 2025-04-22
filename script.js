const BASE_URL = "https://ihatov08.github.io";
const API_URL = `${BASE_URL}/kimetsu_api/api`;

async function getdata() {
  const response = await fetch(`${API_URL}/all.json`);
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
    img.setAttribute("src", BASE_URL + character.image);
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
  loadingWrapper.style.display = "block";
  document.body.style.overflow = 'hidden';

  // const radioButtonValue = document.querySelector("#radioButton").character.value;
  const radioButtonValue = document.querySelector('input[name="character"]:checked').value;
  const charaListContainer = document.querySelector("#chara-list");
  
  try {
    charaListContainer.innerHTML = '';
    
      const response = await fetch(`${API_URL}/${radioButtonValue}.json`);
      const characters = await response.json();
    
    
    await Promise.all(characters.map(async (character) => {
      const card = document.createElement("div");
      card.className = "character-card";
      
      const nameDiv = document.createElement("div");
      nameDiv.className = "character-name";
      nameDiv.textContent = character.name;
      
      const imgDiv = document.createElement("div");
      imgDiv.className = "character-image";
      const img = document.createElement("img");
      img.setAttribute("src", BASE_URL + character.image);
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