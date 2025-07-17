<script>
  import { onMount } from "svelte";
  import IcBaselineContentCopy from "~icons/ic/baseline-content-copy";
  import { copyCommand } from "$lib/functions.js";

  let nfes = $state();

  let rarities = {
    Common: 1,
    Rare: 2,
    Epic: 3,
    Legendary: 4,
  };

  onMount(async () => {
    try {
      let response = await fetch(`https://api.okayeg.com/market`);
      if (response.status !== 200) {
        nfes = null;
        return;
      }
      nfes = await response.json();

      if (!nfes) {
        nfes = null;
        return;
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
      nfes = null;
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
      {#if nfes}
        <div class="flex flex-wrap gap-4" id="listingsRow">
          {#each nfes as nfe}
            <div class="card bg-base-200 w-60 shadow-md nfe-card" data-price={nfe.price} data-rarity={rarities[nfe.rarity] || 5}>
              <figure>
                <img src="data:image/gif;base64,{nfe.image}" class="w-50 m-5" alt="NFE {nfe._id}" title="NFE {nfe._id}" />
              </figure>
              <div class="card-body">
                <h2 class="card-title font-bold">
                  {nfe.price.toLocaleString()}
                  {nfe.price == 1 ? "eg" : "egs"}
                </h2>
                <p>
                  {nfe.rarity || "Unknown rarity"} NFE listed by
                  <a class="link" href="https://twitch.tv/{nfe.ownerusername}" target="_blank" rel="noopener noreferrer">{nfe.ownerusername}</a>
                </p>
                <div class="card-actions justify-end mt-3">
                  <button type="button" class="btn btn-secondary" onclick={(event) => copyCommand(nfe._id, "buy", event)}><IcBaselineContentCopy />Copy buy command</button>
                </div>
              </div>
            </div>
          {/each}
        </div>
      {:else if nfes?.length == 0}
        <span class="text-2xl">There are't any NFEs for sale :(</span>
      {:else if nfes === null}
        <span class="text-2xl">Could not load the market :(</span>
      {:else}
        <span class="loading loading-spinner loading-xl"></span>
      {/if}
    </div>
  </div>
  <div class="flex-1 shrink"></div>
</div>
