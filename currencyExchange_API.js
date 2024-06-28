const url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
let drowpDowns = document.querySelectorAll(".dropDown select")
let input = document.querySelector("form input")
let button = document.querySelector("button")
let FromCurr = document.querySelector(".From select")
let ToCurr = document.querySelector(".To select")
let finalMsg = document.querySelector(".msg")

for (const select of drowpDowns) {
    for (const countryCode in countryList) {
        const element = countryList[countryCode];
        let newOption = document.createElement("option")
        newOption.innerText = countryCode
        newOption.value = countryCode
        if (select.name === "FromCountry" && countryCode === "PKR") {
            newOption.selected = "selected";
        } else if (select.name === "ToCountry" && countryCode === "USD") {
            newOption.selected = "selected";
        }
        select.append(newOption)
    }
    select.addEventListener("change", (event) => {
        changeFlag(event.target)
    }
    )
}

function changeFlag(element) {
    let code = element.value
    country = countryList[code]
    let img = `https://flagsapi.com/${country}/flat/64.png`;
    let path = element.parentElement.querySelector("img");
    path.src = img;
}



async function updateExchangeRate(){
    if (input.value == "" || input.value < 1) {
        input.value = "1"
    }
    // const newURL = `${url}/${FromCurr.value.toLowerCase()}/${ToCurr.value.toLowerCase()}.json`
      const newURL = `${url}/${FromCurr.value.toLowerCase()}.min.json`;
    console.log(newURL)
    let respone = await fetch(newURL)
    let data = await respone.json()
    let conversionRate = data[FromCurr.value.toLowerCase()][ToCurr.value.toLowerCase()];
    console.log(`Conversion rate from ${FromCurr.value} to ${ToCurr.value}:`, conversionRate);
    let finalAmount = input.value * conversionRate

    finalMsg.innerText = `${input.value} ${FromCurr.value} = ${finalAmount} ${ToCurr.value}` 

}

button.addEventListener("click", async (event) => {
    event.preventDefault();
    updateExchangeRate()
}
)

window.addEventListener("load",() => {
  updateExchangeRate()
}
)



