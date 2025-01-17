// Función para cargar las recetas
function loadRecipes() {
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const recipesContainer = document.getElementById('recipes-container');
    recipesContainer.innerHTML = '';

    recipes.forEach((recipe, index) => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <button onclick="viewRecipe(${index})">Ver Detalles</button>
        `;
        recipesContainer.appendChild(recipeCard);
    });
}

// Función para agregar una receta
function addRecipe() {
    const title = document.getElementById('recipe-title').value;
    const image = document.getElementById('recipe-image').value;
    const ingredients = document.getElementById('recipe-ingredients').value.split(',');
    const elaboration = document.getElementById('recipe-elaboration').value;

    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes.push({ title, image, ingredients, elaboration });
    localStorage.setItem('recipes', JSON.stringify(recipes));

    showNotification('Receta agregada exitosamente!');
    document.getElementById('recipe-form').reset();
    loadRecipes(); // Actualizar la lista de recetas
}

// Función para ver detalles de la receta
function viewRecipe(index) {
    localStorage.setItem('selectedRecipe', index);
    window.location.href = 'ver-receta.html';
}

// Cargar detalles de la receta
function loadRecipeDetails() {
    const index = localStorage.getItem('selectedRecipe');
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const recipe = recipes[index];

    const recipeDetailContainer = document.getElementById('recipe-detail-container');
    recipeDetailContainer.innerHTML = `
        <h2>${recipe.title}</h2>
        <img src="${recipe.image}" alt="${recipe.title}">
        <h3>Ingredientes</h3>
        <ul>${recipe.ingredients.map(ingredient => `<li>${ingredient.trim()}</li>`).join('')}</ul>
        <h3>Elaboración</h3>
        <p>${recipe.elaboration}</p>
    `;
}



// Función para eliminar receta
function deleteRecipe() {
    const index = localStorage.getItem('selectedRecipe');
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    recipes.splice(index, 1);
    localStorage.setItem('recipes', JSON.stringify(recipes));

    showNotification('Receta eliminada exitosamente!');
    window.location.href = 'index.html';
}
/* Replace with your JS Code 
(Leave empty if not needed) */
function toggleMenu() {
    var menu = document.getElementById("menu");
    menu.classList.toggle("show");
  }


  const sign_in_btn = document.querySelector("#sign-in-btn");
  const sign_up_btn = document.querySelector("#sign-up-btn");
  const container = document.querySelector(".container");
  const sign_in_btn2 = document.querySelector("#sign-in-btn2");
  const sign_up_btn2 = document.querySelector("#sign-up-btn2");
  sign_up_btn.addEventListener("click", () => {
      container.classList.add("sign-up-mode");
  });
  sign_in_btn.addEventListener("click", () => {
      container.classList.remove("sign-up-mode");
  });
  sign_up_btn2.addEventListener("click", () => {
      container.classList.add("sign-up-mode2");
  });
  sign_in_btn2.addEventListener("click", () => {
      container.classList.remove("sign-up-mode2");
  });            
// Función para mostrar notificaciones
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.className = `notification ${type}`;
    notification.innerText = message;
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Manejar el evento de agregar receta
document.getElementById('recipe-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    addRecipe();
});




// Cargar recetas al inicio
document.addEventListener('DOMContentLoaded', () => {
    loadRecipes();
    loadRecipeDetails();
});

