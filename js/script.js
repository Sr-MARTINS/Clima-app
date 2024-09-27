
// const btnBusc = document.querySelector("#btnFrom");
// const title = document.querySelector("#title")
const msgAlert = document.querySelector("#alert")

document.querySelector("#btnFrom").addEventListener("click", async (e) => {
    e.preventDefault()

    const buscLoc = document.querySelector("#inEstats").value;
    
    if(!buscLoc) {
        return showAlert("Você precisa digitar uma cidade...")
    }

    const apiKey = '8a60b2de14f7a17c7a11706b2cfcd87c';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(buscLoc)}&appid=${apiKey}&units=metric&lang=pt_br`

    const results = await fetch(apiUrl);
    const json = await results.json();

    if(json.cod == 200) {
        showInf ({
            city: json.name,
            cuontry: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity,
        })
    }else {
        showAlert('Não foi possivel localizar...');
    }
    console.log(json.name)
})

function showInf (json) {
    showAlert(' ');

    document.querySelector(".clima").classList.add("show")

    document.querySelector("#title").innerHTML = `${json.name}`
}

function showAlert (msg) {
        msgAlert.innerHTML = msg;
};

