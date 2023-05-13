function displayAll() {
    let url = "https://api.spoonacular.com/recipes/complexSearch?apiKey=f320aafbabaa4d08beafba2dac29d887";
  
    fetch(url).then(function(response){
      response.json().then(function(data) {
        console.log(data);
        return data;
      })
      .then((data) => {      
        data.forEach((item) => {
        //   showCountryHome(item);
        })
      })
    });
  }
  displayAll();
  // Creates a card for each country with the information I want
  
  function showCountryHome(data) {
    let countries = document.getElementById("countries-wrapper");
    let div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<img src="${data.flags.svg}" width=200>
                     <p>${data.name.common}</p>
                     <p>Population: ${data.population}</p>
                     <p>Region: ${data.region}</p>
                     <p>Capital: ${data.capital}</p>`
    countries.appendChild(div);
  }