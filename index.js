const apiKey = "273cd7dd3b71051057af7bc6d966f995"; // Replace with your API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherElement = document.querySelector('.weather');
const weatherIcon = document.querySelector('.weather-icon');

// Fetch data from the API 
async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();

    if (data.cod === "404") {
      alert("City not found!");
      return;
    }

    // Display weather data
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = data.main.temp + " °C";
    document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
    document.querySelector('.wind').innerHTML = data.wind.speed + " km/h";

    // Change weather icon based on weather condition
    const weatherCondition = data.weather[0].main;
    const iconMap = {
      Clouds: "clouds.png",
      Rain: "rain.png",
      Drizzle: "drizzle.png",
      Mist: "mist.png",
      Clear: "clear.png",
      Snow: "snow.png",
    };
    weatherIcon.src = iconMap[weatherCondition] || "default.png";

    // Smoothly show the weather card
    weatherElement.classList.remove('show'); // Reset animation
    setTimeout(() => {
      weatherElement.classList.add('show'); // Trigger smooth animation
    }, 300); // Increased delay for smoother animation
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("Something went wrong. Please try again.");
  }
}

// Event listener for search button
searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city) {
    checkWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});

// Optional: Trigger search on 'Enter' key press
searchBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});
