
var rates;

const baseCurrency = document.getElementById("base-select");
const targetCurrency = document.getElementById("target-select");
const baseInput = document.getElementById("base-input");
const targetInput = document.getElementById("target-input");
const rateResult = document.getElementById("rate");

axios.get("https://api.exchangerate-api.com/v4/latest/USD")
.then(res => {
  rates = res.data.rates;
  renderOption(rates, baseCurrency);
  renderOption(rates, targetCurrency);
  rateResult.innerHTML = "1 " + Object.keys(rates)[0] + " = " + rates[targetCurrency.value] + " " + targetCurrency.value;
  targetInput.value = rates[targetCurrency.value].toFixed(2);
  
})
.catch(err => {
  console.log(err);
})

function renderOption(datas, elementId) {
  let content = "";
  for (let data in datas) {
    content += "<option>" + data + "</option>";
  }
  
  return elementId.innerHTML = content;
}

targetCurrency.addEventListener("change", renderRate);
baseInput.addEventListener("change", renderRate);

function renderRate() {
  var currentRate = targetCurrency.value;
  let content = "1 " + Object.keys(rates)[0] + " = " + rates[currentRate] + " " + currentRate;
  rateResult.innerHTML = content;
  targetInput.value = rates[currentRate].toFixed(2);
}

