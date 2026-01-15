<script>
  import { onMount, onDestroy } from "svelte";
  import { roundToTwo } from "$lib/functions";
  import svgMap from "svgmap";
  import IcBaselineCurrencyExchange from "~icons/ic/baseline-currency-exchange";
  import IcOutlineInfo from "~icons/ic/outline-info";

  let mapCurrency = "USD";
  let mapType = "subs";
  let countries = [];

  onMount(async () => {
    const svgPanZoomImport = await import("svg-pan-zoom");
    const svgPanZoom = svgPanZoomImport.default;
    window.svgPanZoom = svgPanZoom;

    loadSubPrices("subs", "USD");
  });

  onDestroy(async () => {
    const tooltip = document.querySelector(".svgMap-tooltip");
    tooltip?.remove();
  });

  /**
   * @param {string} type
   * @param {string} currency
   */
  async function loadSubPrices(type, currency) {
    console.log(type, currency);
    let res = await fetch(`/data/subs.json`);
    let res2 = await fetch(`https://api.fxratesapi.com/latest?base=${currency}`);
    let data = await res.json();
    let data2 = await res2.json();
    let min = 1000000;
    let max = 0;
    let colorMin = "#27d444";
    let colorMax = "#e72222";
    let name = "Local Subscription Price";
    let values = {};
    for (let index = 0; index < data[type].length; index++) {
      let price = data[type][index].price / data2.rates[data[type][index].currency];
      values[data[type][index].code] = {
        price: data[type][index].currency == currency ? data[type][index].price : roundToTwo(price) || 0,
      };
      max = Math.max(max, price);
      min = Math.min(min, price);
      if (!countries.some((e) => e.code === data[type][index].code)) {
        countries.push(data[type][index]);
      }
    }
    if (type == "turbo") {
      name = "Turbo Local Pricing";
      for (let index = 0; index < countries.length; index++) {
        if (!(countries[index].code in values)) {
          values[countries[index].code] = {
            price: roundToTwo(11.99 / data2.rates["USD"]),
          };
        }
      }
    }

    if (type == "primepayout") {
      name = "Prime gaming sub payout";
      colorMin = "#e72222";
      colorMax = "#27d444";
    }
    document.getElementById("map").innerHTML = "";
    new svgMap({
      targetElementID: "map",
      showZoomReset: true,
      zoomScaleSensitivity: 0.3,
      colorMin: colorMin,
      colorMax: colorMax,
      ratioType: "log",
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
  <link rel="stylesheet" href="/svg-map.min.css" />
</svelte:head>

<label class="select" id="currencySelectGroup">
  <span class="label"><IcBaselineCurrencyExchange />Currency</span>
  <select id="currencySelect" bind:value={mapCurrency} onchange={() => loadSubPrices(mapType, mapCurrency)}>
    <option value="AED">AED</option>
    <option value="ARS">ARS</option>
    <option value="AUD">AUD</option>
    <option value="BRL">BRL</option>
    <option value="BYN">BYN</option>
    <option value="CAD">CAD</option>
    <option value="CHF">CHF</option>
    <option value="CLP">CLP</option>
    <option value="CNY">CNY</option>
    <option value="COP">COP</option>
    <option value="CRC">CRC</option>
    <option value="CZK">CZK</option>
    <option value="DKK">DKK</option>
    <option value="EGP">EGP</option>
    <option value="EUR">EUR</option>
    <option value="GBP">GBP</option>
    <option value="HKD">HKD</option>
    <option value="HUF">HUF</option>
    <option value="IDR">IDR</option>
    <option value="ILS">ILS</option>
    <option value="INR">INR</option>
    <option value="ISK">ISK</option>
    <option value="JPY">JPY</option>
    <option value="KRW">KRW</option>
    <option value="KWD">KWD</option>
    <option value="MXN">MXN</option>
    <option value="MYR">MYR</option>
    <option value="NGN">NGN</option>
    <option value="NOK">NOK</option>
    <option value="NZD">NZD</option>
    <option value="PEN">PEN</option>
    <option value="PHP">PHP</option>
    <option value="PKR">PKR</option>
    <option value="PLN">PLN</option>
    <option value="QAR">QAR</option>
    <option value="RON">RON</option>
    <option value="RUB">RUB</option>
    <option value="SAR">SAR</option>
    <option value="SEK">SEK</option>
    <option value="SGD">SGD</option>
    <option value="THB">THB</option>
    <option value="TRY">TRY</option>
    <option value="TWD">TWD</option>
    <option value="UAH">UAH</option>
    <option value="USD" selected>USD</option>
    <option value="VND">VND</option>
    <option value="ZAR">ZAR</option>
  </select>
</label>

<label class="select" id="typeSelectGroup">
  <span class="label"><IcOutlineInfo />Type</span>
  <select id="typeSelect" bind:value={mapType} onchange={() => loadSubPrices(mapType, mapCurrency)}>
    <option value="subs" selected>Sub price</option>
    <option value="turbo">Turbo price</option>
    <option value="primepayout">Prime sub payout</option>
  </select>
</label>

<div id="map"></div>

<style>
  #map {
    cursor: grab;
  }

  #map:active {
    cursor: grabbing;
  }

  :global(.svgMap-country:hover) {
    cursor: default;
  }

  :global(.svgMap-country:active) {
    cursor: grabbing;
  }

  :global(.svgMap-map-image) {
    background-color: #093cac;
  }

  :global(.svgMap-map-controls-wrapper) {
    position: fixed;
    bottom: 90px !important;
  }

  #currencySelectGroup {
    position: fixed;
    z-index: 100;
    width: 240px;
    right: 20px;
    top: 90px;
  }

  #typeSelectGroup {
    position: fixed;
    z-index: 100;
    width: 240px;
    right: 20px;
    top: 140px;
  }
</style>
