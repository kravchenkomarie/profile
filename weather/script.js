const wrapper = document.querySelector(".wrapper"),
inputPart = document.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
wIcon = document.querySelector(".weather-part img"),
arrowBack = wrapper.querySelector("header i");

let api;

inputField.addEventListener("keyup", e =>{
    //if user pressed enter btn and input value is not empty
    if(e.key == "Enter"  && inputField.value != ""){
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click", ()=>{
    if(navigator.geolocation){ //if browser support geolocation api
navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        alert("Ваш браузер не поддерживает API геолокации")
    }
});

function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&units=metric&lang=ru&appid=fe1a0978ca9981df94710e1df3aa49ac`;
    fetchData();
}

function onSuccess(position){
    const {latitude, longitude} = position.coords; //getting lat and lon of the user device from coodrs obj
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=ru&appid={fe1a0978ca9981df94710e1df3aa49ac}`;
    fetchData();
}


function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

function fetchData(){
        infoTxt.innerText = "Получить детали прогноза погоды...";
        infoTxt.classList.add("pending");
    // getting api response and returning it with parsing into js obj and in anoyher
    // then function calling weatherDetails function with passing api result as an argument
        fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch(() =>{
            infoTxt.innerText = "Что-то пошло не так";
            infoTxt.classList.replace("pending", "error");
        });
}

function weatherDetails(info){
   if(info.cod == "404") {
    infoTxt.classList.replace("pending", "error");
       infoTxt.innerText = `${inputField.value} -  некорректное название города`;
}else{
    //let's get required properties value from the info object
    const city = info.name;
    const country = info.sys.country;
    const {description, id} = info.weather[0];
    const {feels_like, humidity, temp} = info.main;
    
    //using custom icon according to the id which api return us
    if(id == 800){
        wIcon.src = "icons/clear.svg";
    }else if (id >= 200 && id <= 232){
        wIcon.src = "icons/storm.svg";
    }else if (id >= 600 && id <= 622){
        wIcon.src = "icons/snow.svg";
    }else if (id >= 701 && id <= 781){
        wIcon.src = "icons/haze.svg";
    }else if (id >= 801 && id <= 804){
        wIcon.src = "icons/cloud.svg";
    }else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)){
        wIcon.src = "icons/rain.svg";
    }

    //let's pass these values to a psrticular html element
    wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
    wrapper.querySelector(".weather").innerText = description;
    wrapper.querySelector(".location span").innerText = `${city}, ${country}`;
    wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
    wrapper.querySelector(".humidity span").innerText = `${humidity}%`;
    
    infoTxt.classList.remove("pending", "error");
    wrapper.classList.add("active");
    }
}

arrowBack.addEventListener("click", () => {
    wrapper.classList.remove("active");
});
