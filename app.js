let btn=document.querySelector("button");
let input=document.querySelector(".city");
const apiKey="fc1e435e77da68dedc2b462f02ac8320";

btn.addEventListener("click",getweather);

async function getweather(){

    const city=input.value;
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data= await response.json();

    console.log(data);
    

}