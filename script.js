// script.js

// Tu API Key de OpenWeatherMap (Reemplaza 'TU_API_KEY' con tu propia API Key)
const apiKey = '56897b62a84b3d0c1acfed342555b9e7';

// Seleccionar el formulario y el campo de la ciudad
const weatherForm = document.getElementById('weatherForm');
const weatherResult = document.getElementById('weatherResult');

// Escuchar cuando se envía el formulario
weatherForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Evitar que la página se recargue

    // Obtener el valor ingresado por el usuario
    const city = document.getElementById('city').value;

    // Hacer la solicitud a la API de OpenWeatherMap
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Esto te mostrará la respuesta de la API en la consola
            
            // Verifica si la respuesta contiene un error
            if (data.cod !== 200) {
                throw new Error(data.message); // Lanza un error si hay un problema
            }

            // Extraer la temperatura y descripción del clima
            const temp = data.main.temp;
            const weather = data.weather[0].description;

            // Mostrar el resultado en la página
            weatherResult.innerHTML = `
                <h3>Clima en ${city}</h3>
                <p>Temperatura: ${temp}°C</p>
                <p>Condiciones: ${weather}</p>
            `;
        })
        .catch(error => {
            console.error('Error:', error); // Imprimir el error en la consola
            weatherResult.innerHTML = `<p>No se pudo obtener el clima de ${city}. Intenta de nuevo.</p>`;
        });
});
