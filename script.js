'use strict';

const countriesContainer = document.querySelector('.countries');
const searchBtn = document.getElementById('searchBtn');
const countryInput = document.getElementById('countryInput');
const clearBtn = document.getElementById('clearBtn');

const getCountryData = function(country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function() {
    const [data] = JSON.parse(this.responseText);

    const area = data.area ? `${data.area.toLocaleString()} km²` : 'Unknown';
    const subregion = data.subregion || 'Unknown';
    const demonym = data.demonym || 'Unknown';
    const borders = data.borders && data.borders.length ? data.borders.join(', ') : 'None';
    const tld = data.topLevelDomain ? data.topLevelDomain.join(', ') : 'Unknown';
    const mapsUrl = data.maps && data.maps.googleMaps ? data.maps.googleMaps : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.name)}`;

    const html =`
            <article class="country">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
                <h3 class="country__name">${data.name}, ${data.nativeName}</h3>
                <h4 class="country__region">${data.region}</h4>
                <h5 class="country__region">${data.capital}</h5>
                <p class="country__row"><span>👫</span>${( +data.population / 1000000).toFixed(1)}M people</p>
                <p class="country__row"><span>🌍</span>Area: ${area}</p>
                <p class="country__row"><span>🗺️</span>Subregion: ${subregion}</p>
                <p class="country__row"><span>🧑‍🤝‍🧑</span>Demonym: ${demonym}</p>
                <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                <p class="country__row"><span>💰</span>${data.currencies[0].name}, ${data.currencies[0].code}</p>
                <p class="country__row"><span>🌐</span>TLD: ${tld}</p>
                <p class="country__row"><span>🧭</span>Borders: ${borders}</p>
                <p class="country__row"><span>📍</span><a href="${mapsUrl}" target="_blank" rel="noopener">View on Google Maps</a></p>
            </div>
            </article>
    `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

// Search country when user clicks search button or presses Enter
searchBtn.addEventListener('click', () => {
  const country = countryInput.value.trim();
  if (country) {
    getCountryData(country);
    countryInput.value = '';
  }
});

countryInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    searchBtn.click();
  }
});

// Clear all country cards
clearBtn.addEventListener('click', () => {
  countriesContainer.innerHTML = '';
  countriesContainer.style.opacity = 0;
});