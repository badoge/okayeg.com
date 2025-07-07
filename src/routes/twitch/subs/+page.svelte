<script>
  import { onMount } from "svelte";
  import { roundToTwo } from "$lib/functions";
  import "svgmap/dist/svgMap.min.css";

  let svgMap;
  onMount(async () => {
    const obj = await import("svgmap");
    svgMap = obj.default;

    loadSubPrices("subs", "USD");
    document.getElementById("currencySelect").onchange = function () {
      loadSubPrices(document.getElementById("typeSelect").value, this.value);
    };
    document.getElementById("typeSelect").onchange = function () {
      loadSubPrices(this.value, document.getElementById("currencySelect").value);
    };
  });

  let countries = [];
  async function loadSubPrices(type, currency) {
    let res = await fetch(`/data/subs.json`);
    let res2 = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency.toLowerCase()}.min.json`);
    let data = await res.json();
    let data2 = await res2.json();
    let min = 1000000;
    let max = 0;
    let colorMin = "#27d444";
    let colorMax = "#e72222";
    let name = "Local Subscription Price";
    let values = {};
    for (let index = 0; index < data[type].length; index++) {
      let price = data[type][index].price / data2[currency.toLowerCase()][data[type][index].currency.toLowerCase()];
      values[data[type][index].code] = {
        price: data[type][index].currency == currency ? data[type][index].price : roundToTwo(price) || 1,
      };
      if (max < price) {
        max = price;
      }
      if (min > price) {
        min = price;
      }
      if (!countries.some((e) => e.code === data[type][index].code)) {
        countries.push(data[type][index]);
      }
    }
    if (type == "turbo") {
      name = "Turbo Local Pricing";
      for (let index = 0; index < countries.length; index++) {
        if (!(countries[index].code in values)) {
          values[countries[index].code] = {
            price: roundToTwo(11.99 / data2[currency.toLowerCase()].usd),
          };
        }
      }
    }

    if (type == "primepayout") {
      name = "Prime gaming sub payout";
      colorMin = "#e72222";
      colorMax = "#27d444";
    }

    new svgMap({
      targetElementID: "map",
      showZoomReset: true,
      zoomScaleSensitivity: 0.3,
      colorMin: colorMin,
      colorMax: colorMax,
      colorNoData: "#909090",
      data: {
        data: {
          price: {
            name: name,
            format: `{0} ${currency}`,
            thresholdMax: max,
            thresholdMin: min,
          },
        },
        applyData: "price",
        values: values,
      },
    });
  } //loadSubPrices
</script>

<svelte:head>
  <title>Twitch local subscription prices | OkayegBOT</title>
  <meta name="description" content="View the local Twitch subscription prices with currency conversion" />
  <meta property="og:title" content="Twitch local subscription prices | OkayegBOT" />
  <meta property="og:url" content="https://okayeg.com/twitch/subs" />
  <meta property="og:description" content="View the local Twitch subscription prices with currency conversion" />
</svelte:head>

<div class="container-fluid">
  <div class="row">
    <div class="col p-0 m-0">
      <div class="form-floating" id="currencySelectDiv">
        <select class="form-select" id="currencySelect" aria-label="currency select">
          <option value="AED">AED</option>
          <option value="AUD">AUD</option>
          <option value="BRL">BRL</option>
          <option value="BYN">BYN</option>
          <option value="CAD">CAD</option>
          <option value="CLP">CLP</option>
          <option value="CRC">CRC</option>
          <option value="DKK">DKK</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="HKD">HKD</option>
          <option value="INR">INR</option>
          <option value="ISK">ISK</option>
          <option value="KRW">KRW</option>
          <option value="KWD">KWD</option>
          <option value="MXN">MXN</option>
          <option value="MYR">MYR</option>
          <option value="NOK">NOK</option>
          <option value="NZD">NZD</option>
          <option value="PEN">PEN</option>
          <option value="PHP">PHP</option>
          <option value="PLN">PLN</option>
          <option value="QAR">QAR</option>
          <option value="RUB">RUB</option>
          <option value="SAR">SAR</option>
          <option value="SEK">SEK</option>
          <option value="SGD">SGD</option>
          <option value="THB">THB</option>
          <option value="TRY">TRY</option>
          <option value="TWD">TWD</option>
          <option value="UAH">UAH</option>
          <option value="USD" selected>USD</option>
          <option value="ZAR">ZAR</option>
        </select>
        <label for="currencySelect">Currency</label>
      </div>
      <div class="form-floating" id="typeSelectDiv">
        <select class="form-select" id="typeSelect" aria-label="type select">
          <option value="subs" selected>Sub price</option>
          <option value="turbo">Turbo price</option>
          <option value="primepayout">Prime sub payout</option>
        </select>
        <label for="typeSelect">Type</label>
      </div>
      <div id="map"></div>
    </div>
  </div>
</div>

<style>
  body {
    overflow: hidden;
    background: #163d64;
  }

  .svgMap-map-wrapper {
    background: #163d64;
  }
  .svgMap-map-controls-wrapper {
    position: fixed;
    bottom: 60px !important;
  }

  #currencySelectDiv {
    position: fixed;
    z-index: 100;
    width: 175px;
    right: 10px;
    top: 60px;
  }

  #typeSelectDiv {
    position: fixed;
    z-index: 100;
    width: 175px;
    right: 10px;
    top: 130px;
  }
</style>
