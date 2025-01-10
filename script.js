let second = document.querySelector('.second')
let center = document.querySelector(".center")

function generate(key, value) {
    let container = document.createElement("div")
    container.classList.add("container")

    let keyDiv = document.createElement("div")
    keyDiv.classList.add('key')

    let valueDiv = document.createElement("div")
    valueDiv.classList.add('value')

    keyDiv.innerHTML = key


    if (key == "Flag" || key == "Nation Emblem") {
        let img = document.createElement("img")
        img.src = value
        img.alt="No image"
        valueDiv.appendChild(img)
    }
    else if (key == "Location") {
        let a = document.createElement('a')
        a.href = value
        a.target="_blank"
        a.innerHTML='Click here to open Google Map'
        valueDiv.appendChild(a)
    }
    else if (value == true)
        valueDiv.innerHTML = "Yes"
    else if (value == false)
        valueDiv.innerHTML = "NO"
    else
        valueDiv.innerHTML = value

    second.appendChild(container)
    container.appendChild(keyDiv)
    container.appendChild(valueDiv)

}

function getAPIData() {
    let input = document.getElementById('country')
    let country 
    if (input.value == "") {
        alert("Please enter a country to get details")
    }
    else {
        country = input.value
    }
    let request = new XMLHttpRequest()
    request.open("get", "https://restcountries.com/v3.1/name/" + country)
    request.send()

    center.removeChild(second)
    second = document.createElement("div")
    second.classList.add('second')
    center.appendChild(second)


    request.addEventListener("load", () => {
        let data = JSON.parse(request.responseText)
        data.forEach(country => {
           generate("Official Name", country.name.official);
    generate("Common Name", country.name.common);
    
    // Geographic Information
    generate("Continent", country.continents);
    generate("Region", country.region);
    generate("Sub Region", country.subregion);
    generate("Location", country.maps.googleMaps);
    generate("Borders", country.borders);
    generate("Area", country.area);
    generate("Timezone", country.timezones);
    generate("Start Of Week", country.startOfWeek);

    // Political & Administrative Information
    generate("Capital", country.capital);
    generate("Independent", country.independent);
    generate("UN Membership", country.unMember);
    generate("Land Locked", country.landlocked);

    // Demographics
    generate("Population", country.population);
    generate("Languages", Object.values(country.languages));

    // Economy & Currency
    generate("Currency", Object.values(Object.values(country.currencies)[0]));

    // Transportation
    generate("Car Sign", country.car.signs);
    generate("Driving Side", country.car.side);

    // Symbols
    generate("Flag", country.flags.png);
    generate("Nation Emblem", country.coatOfArms.png);

    // Fix duplicate key
    generate("Timezone", country.timezones);

            let gap = document.createElement("div")
            gap.classList.add('gap')
            second.appendChild(gap)
        });
    })
}
getAPIData()
