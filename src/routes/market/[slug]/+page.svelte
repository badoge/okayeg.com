<script>
  import { onMount } from "svelte";
  import { addOrdinalSuffix, relativeTime } from "$lib/functions";
  import IcBaselineContentCopy from "~icons/ic/baseline-content-copy";
  let { data } = $props();

  onMount(async () => {
    try {
      let NFEID = data.slug.toLowerCase().replace(/\s/g, "");
      console.log(NFEID);
      let response = await fetch(`https://api.okayeg.com/market`);
      let nfes = await response.json();

      let rarities = {
        Common: 1,
        Rare: 2,
        Epic: 3,
        Legendary: 4,
      };

      let html = `<div class="row row-cols-1 row-cols-md-4 g-3" id="listingsRow">`;
      for (let index = 0; index < nfes.length; index++) {
        html += `
      <div class="col nfe-card" data-price="${nfes[index].price}" data-rarity="${rarities[nfes[index].rarity] || 5}">
      <div class="card" id=${nfes[index]._id}>
      <img src="data:image/gif;base64,${nfes[index].image}" class="card-img-top" alt="NFE ${nfes[index]._id}" title="NFE ${nfes[index]._id}" />
      <div class="card-body">
        <h5 class="card-title">${nfes[index].price.toLocaleString()} ${nfes[index].price == 1 ? "eg" : "egs"}</h5>
        <p class="card-text">${nfes[index].rarity || "Unknown rarity"} NFE listed by 
        <a href="https://twitch.tv/${nfes[index].ownerusername}" target="_blank" rel="noopener noreferrer">${nfes[index].ownerusername}</a></p>
        <button type="button" class="btn btn-secondary" onclick="copyBuyCommand(${nfes[index]._id},event)"><i class="material-icons notranslate">content_copy</i>Copy buy command</button>
      </div>
      </div>
      </div>`;
      }
      document.getElementById("listings").innerHTML = html + "</div>";
      if (document.getElementById(NFEID)) {
        document.getElementById(NFEID).scrollIntoView();
        document.getElementById(NFEID).classList.add("border-info");
        let flashBorder = setInterval(() => {
          document.getElementById(NFEID).classList.toggle("border-info");
        }, 200);
        setTimeout(() => {
          clearInterval(flashBorder);
          document.getElementById(NFEID).classList.remove("border-info");
        }, 2000);
      }

      document.getElementById("sort").addEventListener("change", async function () {
        let cards = document.querySelectorAll(".nfe-card");
        let sorted = Array.from(cards).sort((a, b) => {
          switch (this.value) {
            case "priceHighest":
              return parseInt(b.dataset.price, 10) - parseInt(a.dataset.price, 10);
            case "priceLowest":
              return parseInt(a.dataset.price, 10) - parseInt(b.dataset.price, 10);
            case "rarityHighest":
              return parseInt(b.dataset.rarity, 10) - parseInt(a.dataset.rarity, 10);
            case "rarityLowest":
              return parseInt(a.dataset.rarity, 10) - parseInt(b.dataset.rarity, 10);
            default:
              break;
          }
        });
        document.getElementById("listingsRow").innerHTML = "";
        for (let index = 0; index < sorted.length; index++) {
          document.getElementById("listingsRow").appendChild(sorted[index]);
        }
      });
    } catch (error) {
      console.log("loadNFEMarket error", error);
    }
  });
</script>

<svelte:head>
  <title>NFE market | OkayegBOT</title>
  <meta name="description" content="Non Fungible Eg marketplace" />
  <meta property="og:title" content="NFE market | OkayegBOT" />
  <meta property="og:url" content="https://okayeg.com/market" />
  <meta property="og:description" content="Non Fungible Eg marketplace" />
</svelte:head>

<div class="flex justify-center m-5">
  <div class="flex-1 shrink"></div>

  <div class="w-350 shrink">
    <h1 class="text-4xl">NFE Marketplace</h1>
    <select class="select select-accent mb-3" id="sort" aria-label="sort select">
      <option selected>Sort by:</option>
      <option value="priceHighest">Price highest to lowest</option>
      <option value="priceLowest">Price lowest to highest</option>
      <option value="rarityHighest">Rarity highest to lowest</option>
      <option value="rarityLowest">Rarity lowest to highest</option>
    </select>
    <div id="listings">
      <span class="loading loading-spinner loading-xl"></span>
    </div>
  </div>
  <div class="flex-1 shrink"></div>
</div>

<style>
  .nfe {
    border-radius: 6px;
    margin: 5px;
    width: fit-content;
  }

  .nfecontainer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    text-align: center;
  }

  .nfetext {
    max-width: 128px;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>
