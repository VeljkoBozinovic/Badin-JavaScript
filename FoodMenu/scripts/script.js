const elementSearchInput = document.querySelector("input[type=search]");
const elementSearchButton = document.querySelector(".search-input-button");
const elementContainer = document.querySelector(".container");
const elementWrapper = document.querySelector(".wrapper");
const elementOverlay = document.querySelector(".overlay");
const elementNoMeals = document.querySelector(".no-meal-message");

elementSearchButton.addEventListener("click", mealSearch);

async function mealSearch() {
  elementNoMeals.innerHTML = "";
  const searchValue = elementSearchInput.value;
  let meals = [];

  try {
    meals = await getMeals(searchValue);
  } catch (e) {
    console.log(e);
  }

  elementContainer.innerHTML = null;

  if (searchValue === "" || meals.meals === null) {
    elementNoMeals.innerHTML = "Jelo ne postoji!";
    return;
  }

  for (let i = 0; i < meals.meals.length; i++) {
    const elementNewMealCardTitle = document.createElement("div");
    elementNewMealCardTitle.innerHTML = meals.meals[i].strMeal;

    const elementNewMealCardImage = document.createElement("div");
    elementNewMealCardImage.classList.add("container-card-image");
    const mealImage = document.createElement("img");
    mealImage.src = meals.meals[i].strMealThumb;
    elementNewMealCardImage.appendChild(mealImage);

    const elementNewMealCardButton = document.createElement("button");
    elementNewMealCardButton.innerText = "Read more";
    elementNewMealCardButton.addEventListener("click", async () => {
      try {
        var meal = await getMealInfo(meals.meals[i].idMeal);
      } catch (e) {
        console.log(e);
      }

      const elementOverlayCategory = document.createElement("h1");
      elementOverlayCategory.innerHTML = meal.meals[0].strCategory;
      const elementOverlayRecipe = document.createElement("p");
      elementOverlayRecipe.innerHTML = meal.meals[0].strInstructions;
      const elementOverlayLink = document.createElement("a");
      elementOverlayLink.innerHTML = "Link";
      elementOverlayLink.href = meal.meals[0].strYoutube;
      elementOverlayLink.target = "_blank";

      elementOverlay.appendChild(elementOverlayCategory);
      elementOverlay.appendChild(elementOverlayRecipe);
      elementOverlay.appendChild(elementOverlayLink);
      elementWrapper.classList.remove("wrapper-hide");
    });

    const elementNewMealCard = document.createElement("div");
    elementNewMealCard.classList.add("container-card");
    elementNewMealCard.appendChild(elementNewMealCardTitle);
    elementNewMealCard.appendChild(elementNewMealCardImage);
    elementNewMealCard.appendChild(elementNewMealCardButton);
    elementContainer.appendChild(elementNewMealCard);
  }
}

async function getMeals(val) {
  return (
    await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${val}`)
  ).json();
}

async function getMealInfo(id) {
  return (
    await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  ).json();
}

elementWrapper.addEventListener("click", () => {
  elementOverlay.innerHTML = null;
  elementWrapper.classList.add("wrapper-hide");
});
