require('dotenv').config();

const input = document.querySelector('.input-fields input'),
	btn = document.querySelector('.input-fields button'),
	cityName = document.querySelector('#name'),
	temp = document.querySelector('#temp'),
	desc = document.querySelector('#desc'),
	wind = document.querySelector('#wind'),
	country = document.querySelector('#country'),
	img = document.querySelector('img');

const API_KEY = process.env.API_KEY;

btn.onclick = () => {
	const city = input.value;

	fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
	)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);

			cityName.innerHTML = data.name;
			country.innerHTML = data.sys.country;

			var iconId = data.weather[0].icon;
			img.setAttribute('src', `icons/${iconId}.png`);
			img.classList.remove('display');

			var kelvin = data.main.temp;
			var celsius = kelvin - 273.15;
			temp.innerHTML = `${celsius.toFixed(2)} C`;

			desc.innerHTML = data.weather[0].description;
			wind.innerHTML = `Wind : ${data.wind.speed}`;
		})
		.catch((err) => {
			cityName.innerHTML = 'No City Found';
		});
};
