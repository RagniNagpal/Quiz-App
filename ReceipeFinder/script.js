function searchRecipes() {
  const query = document.getElementById("searchInput").value.trim();
  const container = document.getElementById("recipesContainer");
  container.innerHTML = "Loading...";

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then((res) => res.json())
    .then((data) => {
      container.innerHTML = "";

      if (data.meals) {
        data.meals.forEach((meal) => {
          const card = document.createElement("div");
          card.className = "recipe-card";

          card.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
            <p><strong>Category:</strong> ${meal.strCategory}</p>
            <a href="${meal.strSource || '#'}" target="_blank">View Recipe</a>
          `;

          container.appendChild(card);
        });
      } else {
        container.innerHTML = "<p>No recipes found!</p>";
      }
    })
    .catch(() => {
      container.innerHTML = "<p>Something went wrong. Try again!</p>";
    });
}
