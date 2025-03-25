const apiKey = 'key';
        let cities = [];

        function fetchWeather(city, index) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`)
                .then(response => response.json())
                .then(data => displayWeather(data, index))
                .catch(error => console.error('Error obteniendo datos:', error));
        }

        function displayWeather(data, index) {
            const container = document.getElementById('weather-container');
            let weatherCard = document.getElementById(`city-${index}`);

            if (!weatherCard) {
                weatherCard = document.createElement('div');
                weatherCard.className = 'col-md-4';
                weatherCard.id = `city-${index}`;
                container.appendChild(weatherCard);
            }

            weatherCard.innerHTML = `
                <div class="card p-3 mb-3">
                    <input type="text" class="form-control mb-2" value="${data.name}" onchange="editCity(${index}, this.value)">
                    <p>Temperatura: ${data.main.temp}°C</p>
                    <p>Clima: ${data.weather[0].description}</p>
                    <p>Humedad: ${data.main.humidity}%</p>
                    <button class="btn btn-warning" onclick="updateCity(${index})">Actualizar</button>
                    <button class="btn btn-danger" onclick="removeCity(${index})">Eliminar</button>
                </div>
            `;
        }

        function addCity() {
            const cityInput = document.getElementById('city-input');
            const cityName = cityInput.value.trim();
            if (cityName && !cities.includes(cityName)) {
                cities.push(cityName);
                fetchWeather(cityName, cities.length - 1);
                cityInput.value = '';
            }
        }

        function editCity(index, newName) {
            cities[index] = newName;
        }

        function updateCity(index) {
            fetchWeather(cities[index], index);
        }

        function removeCity(index) {
            cities.splice(index, 1);
            loadWeather();
        }

        function loadWeather() {
            document.getElementById('weather-container').innerHTML = '';
            cities.forEach((city, index) => fetchWeather(city, index));
        }