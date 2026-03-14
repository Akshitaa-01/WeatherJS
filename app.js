let btn=document.querySelector("button");
let input=document.querySelector(".city");
let cityName=document.querySelector(".cityName");
let temp=document.querySelector(".temp");
let condition=document.querySelector(".condition");
let wind=document.querySelector(".wind");
let humidity=document.querySelector(".humidity");

const apiKey="fc1e435e77da68dedc2b462f02ac8320";

btn.addEventListener("click",getweather);
document.addEventListener("keypress",function(e){
    if (e.key=="Enter"){
        getweather();
    }
})

async function getweather(){
    try{
        const city=input.value;
        const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await axios.get(url);
        const data = response.data;

        cityName.textContent=data.name;
        temp.textContent=data.main.temp+"°C";
        condition.textContent=data.weather[0].description;
        humidity.textContent=`Humidity: ${data.main.humidity}%`;
        wind.textContent=`wind speed: ${data.wind.speed} m/s`;
        
    }
    
    catch(error){
        alert("City not found or API error")
    }
}