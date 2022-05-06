'use strict'
let container = document.querySelector('.country')
const lat = document.querySelector('#latitude');
const lng = document.querySelector('#longitute');
const submit = document.querySelector('#submit');
const neighbour1 = document.querySelector('.render_neighbour1')
const neighbour2 = document.querySelector('.render_neighbour2')

submit.addEventListener('click', function(){
	const whereAmI = function(lat, lng){
		fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
		.then(res => res.json())
		.then(data => {
			alert(`You are in ${data.city}, ${data.country}`);
			return fetch(`https://restcountries.com/v3.1/name/${data.country}`)
		})
		.then(res => res.json())
		.then(data => {
			console.log(data[0].borders[0]);
			
			const html = `<div class='country_flag'><img id='flag-img' src="${data[0].flags.svg}" alt=""></div>
			<div class='country__name'>${data[0].name.common}</div>
			<div class='content'>Region: ${data[0].region}</div>
			<div class='content'>Capital: ${data[0].capital[0]}</div>
			<div class='content'>Population: ${data[0].population}</div>`;
			container.innerHTML = html;

			return fetch(`https://restcountries.com/v3.1/alpha/${data[0].borders[0]}`)
		})
		.then(res => res.json())
		.then(nei => {
			console.log(nei[0]);
			const html = `<div class='nei_img'><img id='neighbourflag-img' src="${nei[0].flags.svg}" alt=""></div>
			<div class='neighbour__name'>${nei[0].name.common}</div>
			<div class='neighbour__content'>Region: ${nei[0].region}</div>
			<div class='neighbour__content'>Capital: ${nei[0].capital[0]}</div>
			<div class='neighbour__content'>Population: ${nei[0].population}</div>`;
			neighbour1.innerHTML = html;

			return fetch(`https://restcountries.com/v3.1/alpha/${nei[0].borders[0]}`)
		})
		.then(res => res.json())
		.then(nei2 => {
			console.log(nei2[0]);
			const html = `<div class='nei_img'><img id='neighbourflag-img' src="${nei2[0].flags.svg}" alt=""></div>
			<div class='neighbour__name'>${nei2[0].name.common}</div>
			<div class='neighbour__content'>Region: ${nei2[0].region}</div>
			<div class='neighbour__content'>Capital: ${nei2[0].capital[0]}</div>
			<div class='neighbour__content'>Population: ${nei2[0].population}</div>`;
			neighbour2.innerHTML = html;

		})
		.catch(err => alert('Please Try again'))
	}
	whereAmI(lat.value, lng.value);

})




