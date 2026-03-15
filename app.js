let btn1=document.querySelector(".button1");
let btn2=document.querySelector(".button2");
let input=document.querySelector(".city");
let cityName=document.querySelector(".cityName");
let temp=document.querySelector(".temp");
let condition=document.querySelector(".condition");
let wind=document.querySelector(".wind");
let humidity=document.querySelector(".humidity");
let loader=document.querySelector("#loader");
let icon=document.querySelector(".icon");
let forecast=document.querySelector(".forecastInfo");

const apiKey="fc1e435e77da68dedc2b462f02ac8320";

btn1.addEventListener("click",function(){
    const city=input.value;
    getweather(`q=${city}`);
});

document.addEventListener("keydown",function(e){
    if (e.key=="Enter"){
        const city=input.value;
        getweather(`q=${city}`);
    }
})

btn2.addEventListener("click",getLocation);

function getLocation(){
    navigator.geolocation.getCurrentPosition(showWeatherByLocation);
    console.log("working");
}

function showWeatherByLocation(position){
    const lat=position.coords.latitude;
    const lon = position.coords.longitude;

    console.log(lat);
    let coordinates=`lat=${lat}&lon=${lon}`
    getweather(coordinates);
}

async function getweather(query){
    try{
        loader.classList.remove("hidden");

        const url =`https://api.openweathermap.org/data/2.5/weather?${query}&appid=${apiKey}&units=metric`;
        const response = await axios.get(url);
        const data = response.data;
        changeBackground(data.weather[0].main);
        displayWeather(data);


        const url1 =`https://api.openweathermap.org/data/2.5/forecast?${query}&appid=${apiKey}&units=metric`;
        const response1 = await axios.get(url1);
        const data1 = response1.data;
        displayForecastData(data1);
    }
    
    catch(error){
        loader.classList.add("hidden");
        alert("City not found or API error")
    }
}

function displayWeather(data){
    cityName.textContent=data.name;
    temp.textContent=data.main.temp+"°C";
    condition.textContent=data.weather[0].description;
    humidity.textContent=`Humidity: ${data.main.humidity}%`;
    wind.textContent=`wind speed: ${data.wind.speed} m/s`;
    loader.classList.add("hidden");
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

}

function displayForecastData(data1){
    forecast.innerHTML="";
    for (let i=0;i<5;i++){
        const fIcon=data1.list[i].weather[0].icon;
        const fWeather=data1.list[i].weather[0].description;
        const fTemp=data1.list[i].main.temp;
        const date=new Date(data1.list[i].dt_txt);
        forecast.innerHTML+=`
            <div class="fday">
                <p clas="date" >${date.toDateString().slice(0,3)}</p>
                <img class="ficon" src="https://openweathermap.org/img/wn/${fIcon}@2x.png"/>
                <p>${Math.round(fTemp)}°C</p>
                <p class="fWeather" >${fWeather}</p>
            </div>
            `;
            console.log(date);
            console.log(date.toDateString());
    }
    console.log(data1);
}
function changeBackground(weather){
    if(weather === "Clear"){
    document.body.style.background =
    "linear-gradient(to top,#031035,#edf066)";
    }

    else if(weather === "Clouds"){
    document.body.style.background =
    "linear-gradient(to top,#d7d2cc,#304352)";
    }

    else if(weather === "Rain"){
    document.body.style.background =
    "linear-gradient(to top,#4b79a1,#283e51)";
    }

    else if(weather === "Snow"){
    document.body.style.background =
    "linear-gradient(to top,#e6dada,#274046)";
    }
 }