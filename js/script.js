
const LocalBusc = document.querySelector("#inEstats");
const btnBusc = document.querySelector("#btnFrom");

const title = document.querySelector("#title");

const msgAlert = document.querySelector("#alert");

const boxImg = document.querySelector("#temp-img");
const tempGrau = document.querySelector("#temp-value");
const decripTemp = document.querySelector("#temp-decrip");
const tempMax = document.querySelector("#temp-max");
const tempMin = document.querySelector("#temp-min");
const humidity = document.querySelector("#humidity");
const windSeep = document.querySelector("#windSeep");

btnBusc.addEventListener("click", async (e) => {
    e.preventDefault()

    const buscLoc = LocalBusc.value;
    
    if(!buscLoc) {
        return showAlert("Você precisa digitar uma cidade...")
    };

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
        });
    }else {
        showAlert(`
        <p>  Não foi possivel localizar... </p>
        
        <img style="width: 50%" 
            src="img/buscador.png" alt="busc">
        `);    
    };
    
})

const showInf = (json) => {
    showAlert(' ');
    
    document.querySelector(".clima").classList.add("show")

    title.innerHTML = `${json.city} - ${json.cuontry} `
    tempGrau.innerHTML = `${json.temp.toFixed(1).toString().replace('.' , ',')} <span>ºC</span>`
    
    decripTemp.innerHTML = `${json.description}`;
    tempMax.innerHTML = `${json.tempMax.toFixed(1)} <span>ºC</span>`;
    tempMin.innerHTML = `${json.tempMin.toFixed(1)} <span>ºC</span>`;

    humidity.innerHTML = `${json.humidity} <span>%</span>`;
    windSeep.innerHTML = `${json.windSpeed}<span>km/h</span>`;

    boxImg.setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
};

function showAlert (msg) {
        msgAlert.innerHTML = msg;
        setTimeout(() => {
            msgAlert.innerHTML = " "
        }, 4000)
};


btnBusc.addEventListener("keydow", (e) => {
    if(e.key === "Enter") {
        document.getElementById("#btnFrom").click
    }
});

LocalBusc.addEventListener("keyup", () => {
    if(!LocalBusc.value) {
        document.querySelector(".clima").classList.remove('show');
            document.querySelector(".clima").classList.remove('alert');
    }
});