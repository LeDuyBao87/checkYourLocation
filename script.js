'use strict'
let container = document.querySelector('.country')
const whereAmI = function(lat, lng){
	fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
		.then(res => res.json())
		.then(data => {
			console.log(`You are in ${data.city}, ${data.country}`);
			return fetch(`https://restcountries.com/v3.1/name/${data.country}`)
		})
		.then(res => res.json())
		.then(data => {
			console.log(data[0])
			const html = `<div><img id='flag-img' src="${data[0].flags.svg}" alt=""></div>
			<div class='country__name'>${data[0].name.common}</div>
			<div class='content'>Region: ${data[0].region}</div>
			<div class='content'>Capital: ${data[0].capital[0]}</div>
			<div class='content'>Population: ${data[0].population}</div>
			<div class='content'>Languages: ${data[0].languages.deu}</div>`;
			container.innerHTML = html;

		})
		.catch(err => console.error(err))
}

// whereAmI(52.508, 13.381)
whereAmI(19.037, 72.873)
// whereAmI(-33.933, 18.474)
