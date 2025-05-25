// script.js

const apiKey = "adbf510244ceece337b1b07bf6317d4c"; // Thay bằng API Key OpenWeatherMap của bạn

// Hiển thị thời gian thực
function updateTime() {
  const now = new Date();
  document.getElementById("time").textContent = "⏰ " + now.toLocaleString();
}
setInterval(updateTime, 1000);
updateTime();

// Lấy thời tiết theo vị trí hiện tại
function getLocalWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=vi`)
        .then(res => res.json())
        .then(data => {
          document.getElementById("location").textContent = `📍 ${data.name}, ${data.sys.country}`;
          document.getElementById("temperature").textContent = `🌡️ Nhiệt độ: ${data.main.temp}°C`;
          document.getElementById("humidity").textContent = `💧 Độ ẩm: ${data.main.humidity}%`;
        });
    }, () => {
      document.getElementById("location").textContent = "Không thể lấy vị trí.";
    });
  } else {
    document.getElementById("location").textContent = "Trình duyệt không hỗ trợ định vị.";
  }
}

// Gợi ý thành phố khi nhập
function suggestCities() {
  const input = document.getElementById("cityInput").value.toLowerCase();
  const suggestionBox = document.getElementById("suggestionList");
  suggestionBox.innerHTML = "";

  if (!input) return;

  const suggestions = cityList.filter(c =>
    c.name.toLowerCase().startsWith(input)
  ).slice(0, 10);

  suggestions.forEach(city => {
    const div = document.createElement("div");
    div.textContent = `${city.name}, ${city.country}`;
    div.setAttribute("role", "option");
    div.onclick = () => {
      document.getElementById("cityInput").value = city.name;
      suggestionBox.innerHTML = "";
      getCityWeather();
    };
    suggestionBox.appendChild(div);
  });
}

// Lấy thời tiết theo tên thành phố nhập
function getCityWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=vi`)
    .then(res => res.json())
    .then(data => {
      const localTime = new Date((data.dt + data.timezone) * 1000);
      document.getElementById("cityTime").textContent = `🕒 Giờ địa phương: ${localTime.toUTCString()}`;
      document.getElementById("cityTemp").textContent = `🌡️ Nhiệt độ: ${data.main.temp}°C`;
      document.getElementById("cityHumidity").textContent = `💧 Độ ẩm: ${data.main.humidity}%`;
    })
    .catch(() => {
      document.getElementById("cityTime").textContent = "Không tìm thấy thành phố.";
      document.getElementById("cityTemp").textContent = "";
      document.getElementById("cityHumidity").textContent = "";
    });
}

getLocalWeather();
