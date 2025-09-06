async function getWeather(city) {
    try {
        const response = await fetch(`/weather?city=${city}`);
        if (!response.ok) throw new Error('City not found');

        const data = await response.json();
        updateUI(data);
    } catch (error) {
        alert(error.message);
        console.error(error);
    }
}
