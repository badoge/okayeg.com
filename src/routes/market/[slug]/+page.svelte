<script>
  import { onMount } from "svelte";
  import IcBaselineContentCopy from "~icons/ic/baseline-content-copy";

  let { data } = $props();
  let nfe = $state("loading");

  let rarities = {
    Common: 1,
    Rare: 2,
    Epic: 3,
    Legendary: 4,
  };

  onMount(async () => {
    try {
      let NFEID = parseInt(data.slug.toLowerCase().replace(/\s/g, ""), 10);

      if (!NFEID) {
        nfe = "invalid nfe id";
        return;
      }

      let response = await fetch(`https://api.okayeg.com/market?asd=a112311sd11`);
      let nfes = await response.json();

      const i = nfes.findIndex((e) => e._id === NFEID);
      if (i === -1) {
        nfe = "not found";
        return;
      }

      nfe = nfes[i];
    } catch (error) {
      console.log("load NFE listing error", error);
    }
  });

  /**
   * @param {any} id
   * @param {any} [event]
   */
  function copyBuyCommand(id, event) {
    navigator.clipboard.writeText(`=nfe buy ${id}`);
    if (event.target.innerHTML == "Command copied :)") {
      event.target.innerHTML = "You already copied this :)";
    } else {
      event.target.innerHTML = "Command copied :)";
    }
  } //copyBuyCommand
</script>

<svelte:head>
  <title>NFE market | OkayegBOT</title>
  <meta name="description" content="Non Fungible Eg marketplace" />
  <meta property="og:title" content="NFE market | OkayegBOT" />
  <meta property="og:url" content="https://okayeg.com/market" />
  <meta property="og:description" content="Non Fungible Eg marketplace" />
</svelte:head>

<div class="flex m-5">
  <div class="flex-1 shrink"></div>

  <div class="w-350 shrink text-center justify-items-center">
    <h1 class="text-2xl">Viewing single NFE listing</h1>
    <p class="text-sm mb-10"><a class="link" href="/market">Go back to market</a></p>

    {#if nfe == "loading"}
      <span class="loading loading-spinner loading-xl"></span>
    {:else if nfe == "invalid nfe id"}
      <span class="text-2xl text-error">Invalid NFE id provided</span>
    {:else if nfe == "not found"}
      <span class="text-2xl text-error">NFE not found/not for sale</span>
    {:else if nfe}
      <div class="card bg-base-200 w-60 shadow-md nfe-card mt-10" data-price={nfe.price} data-rarity={rarities[nfe.rarity] || 5}>
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
            <button type="button" class="btn btn-secondary" onclick={(event) => copyBuyCommand(nfe._id, event)}><IcBaselineContentCopy />Copy buy command</button>
          </div>
        </div>
      </div>
    {:else}
      <span class="text-2xl">Something went wrong :(</span>
    {/if}
  </div>

  <div class="flex-1 shrink"></div>
</div>
