function getWeather(){
    const city=document.getElementById("city").value;
    const Apikey="27f652d0d6245c951906a6780964b3ac";

    const curruntWeather= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Apikey}`;
    const currentForecat=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${Apikey}`;

    if(!city)return alert("please enter the City!");

    fetch(curruntWeather)
    .then(response=>response.json())
    .then(data=>{console.log(data)
        displayWeather(data)
    })
    .catch(error=>{console.error(error)
alert(`there is something wrong with ${error}`)})

    fetch(currentForecat)
    .then(response=>response.json())
    .then(data=>{console.log(data);
    
        displayForecast(data.list)
    })
    .catch(error=>{console.error(error)
    alert(`there is something wrong with ${error}`)})

}

function displayWeather(data){
const tempDiv=document.querySelector(".temp");
const weatherInfoDiv=document.querySelector(".weather-info");
const weathericonDiv=document.querySelector(".weather-icon");
const hourlyForecastDiv=document.querySelector(".forecast");


if(data==='404'){weatherInfoDiv.innerHTML="wrong"}
else{
    const cityName=data.name;
    const temperature=Math.round(data.main.temp-273.1);
    const description=data.weather[0].description;
    const icon=data.weather[0].icon;
    const iconURL=`https://openweathermap.org/img/wn/${icon}@4x.png`;

    tempDiv.innerHTML=`<p>${temperature}°C</p>`;
    weatherInfoDiv.innerHTML=`<p>${cityName}</p><p>${description}</p>`;
    weathericonDiv.src=iconURL;
    weathericonDiv.alt=description;

    showicon()

}

}
function displayForecast(hourlyData){
    const hourlyForecastDiv = document.querySelector('.forcast');

    const next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000); 
    const hour=dateTime.getHours();
    const temperature=Math.round(item.main.temp-273.1);
    const icon=item.weather[0].icon;
    // const description=item.weather.description;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;


    const hourlyItemHtml=`
        <div class="hourly-item">
    <span>${hour}:00</span>
    <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
    </div>
    `
    hourlyForecastDiv.innerHTML+=hourlyItemHtml;
});



}



function showicon(){
const weatherIcon=document.querySelector(".weather-icon");
weatherIcon.style.display="block";
}
