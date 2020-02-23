
var rates;

const baseCurrency = document.getElementById("base-select");
const targetCurrency = document.getElementById("target-select");
const baseInput = document.getElementById("base-input");
const targetInput = document.getElementById("target-input");
const rateResult = document.getElementById("rate");
const swapButton = document.getElementById("swap-btn");

axios.get("https://api.exchangerate-api.com/v4/latest/USD")
.then(res => {
  rates = res.data.rates;
  renderOption(rates, baseCurrency);
  renderOption(rates, targetCurrency);
  baseInput.value = 1;
  targetCurrency.value = Object.keys(rates)[1];
  renderRate();
  
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
baseInput.addEventListener("input", renderRate);
swapButton.addEventListener("click", swapSelector);
baseCurrency.addEventListener("change", baseCurrencyOnChange);

function swapSelector() {
  let temp;
  temp = baseCurrency.value;
  baseCurrency.value = targetCurrency.value;
  targetCurrency.value = temp;
  baseCurrencyOnChange();
}

function renderRate() {
  var currentRate = targetCurrency.value;
  let content = "1 " + Object.keys(rates)[0] + " = " + rates[currentRate] + " " + currentRate;
  rateResult.innerHTML = content;
  let result = rates[currentRate] * baseInput.value;
  targetInput.value = result.toFixed(2);
}

function baseCurrencyOnChange() {
  axios.get("https://api.exchangerate-api.com/v4/latest/" + baseCurrency.value)
  .then(res => {
    rates = res.data.rates;
    renderRate();
  })
}

