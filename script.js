function calculateBMR() {
  let height = document.getElementById("height").value;
  let weight = document.getElementById("weight").value;
  let age = document.getElementById("age").value;
  let gender = document.getElementById("gender").value;
  let activity = document.getElementById("activity").value;
  let BMR = 0;
  if (gender.toLowerCase() === "female") {
    BMR = 655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age)
  } else {
    BMR = 66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age)
  }
  let result = 0;
  if (activity === "Lightly") {
    result = BMR * 1.375;
  } else if (activity === "Moderately") {
    result = BMR * 1.55;
  } else {
    result = BMR * 1.725;
  }
  showMealPlan(result)
}

async function showMealPlan(bmr) {
  try {
    let url = "https://api.spoonacular.com/mealplanner/generate?targetCalories=" + bmr + "&apiKey=f320aafbabaa4d08beafba2dac29d887";
    let response = await fetch(url);
    let data = await response.json();

    let dayOfWeek = getDayOfWeek();
    let todayData = data.week[dayOfWeek];

    let result = await Promise.all(todayData.meals.map(async meal => {
      let calories = (await getCalories(meal.id)).calories;
      let imgUrl = (await getImageUrl(meal.id)).image;
      let recipes = (await getReciepe(meal.id));
      console.log("Recipes => " + recipes);
      let mealTitle = truncateText(meal.title, 25) 

      return `<div class="card">
        <p class="middle">BREAKFAST</p>
        <img class="middle2" src="${imgUrl}" width="300px" height="250px">
        <div class="middle3">
          <div class="middle3-1 description">
            <p>${mealTitle}</p>
            <h4>Calories - ${calories}</h4>
            <button class="btn">GET RECIPE</button>
          </div>
        </div>
      </div>`;
    }));

    document.getElementById("print-area").innerHTML = result.join("");
  } catch (err) {
    console.log(err);
  }
}

function getDayOfWeek() {
  const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
  return days[new Date().getDay()]
}

async function getImageUrl(id) {
  console.log("ID = >" + id);
  const URL = "https://api.spoonacular.com/recipes/" + id + "/information?apiKey=f320aafbabaa4d08beafba2dac29d887"

  return await fetch(URL)
    .then(res => res.json())
    .catch(err => console.log(err))
}

async function getCalories(id) {
  const caloriesURL = "https://api.spoonacular.com/recipes/" + id + "/nutritionWidget.json?apiKey=f320aafbabaa4d08beafba2dac29d887";
  return await fetch(caloriesURL)
    .then(res => res.json())
    .catch(err => console.log(err))

}

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
}

async function getReciepe(id) {
  const recipesURL = "https://api.spoonacular.com/recipes/" + id + "/information?apiKey=f320aafbabaa4d08beafba2dac29d887";
  return await fetch(recipesURL)
    .then(res => res.json())
    .catch(err => console.log(err))

}