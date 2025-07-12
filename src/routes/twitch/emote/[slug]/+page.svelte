<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";

  import IcBaselinePersonSearch from "~icons/ic/baseline-person-search";

  let { data } = $props();
  let emote = $state(data.slug.toLowerCase().replace(/\s/g, ""));

  onMount(() => {
    if (emote) {
      loadEmoteInfo();
    }
  });

  /**
   * @param {SubmitEvent & { currentTarget: EventTarget & HTMLFormElement; }} event
   */
  function lookup(event) {
    event.preventDefault();
    goto(`/twitch/emote/${emote?.toLowerCase().replace(/\s/g, "")}`);
    loadEmoteInfo();
  }

  /**
   * @type {any[]}
   */
  const combinations = [
    "BE",
    "BN",
    "BT",
    "BW",
    "CL",
    "EB",
    "EG",
    "FF",
    "FC",
    "FB",
    "EV",
    "HF",
    "HE",
    "HB",
    "GR",
    "KI",
    "LH",
    "MC",
    "PK",
    "PM",
    "WD",
    "WH",
    "SA",
    "RA",
    "RB",
    "RD",
    "SF",
    "SG",
    "TK",
    "UN",
    "SM",
    "SO",
    "SQ",
  ];

  async function loadEmoteInfo() {}
</script>

<svelte:head>
  <title>Emote {emote} info | OkayegBOT</title>
  <meta name="description" content="Info about the Twitch emote {emote}" />
  <meta property="og:title" content="Emote {emote} info | OkayegBOT" />
  <meta property="og:url" content="https://static-cdn.jtvnw.net/emoticons/v2/{emote}/default/dark/3.0" />
  <meta property="og:description" content="Info about the Twitch emote {emote}" />
</svelte:head>

<div class="flex justify-center mt-5">
  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
    <legend class="fieldset-legend">Twitch emote info</legend>
    <form class="join" onsubmit={(event) => lookup(event)}>
      <input type="text" class="input join-item validator" placeholder="Emote" bind:value={emote} required />
      <button class="btn join-item btn-primary" type="submit" disabled={`/twitch/emote/${emote}` === page.url.pathname}><IcBaselinePersonSearch />Lookup</button>
    </form>
    <p class="label">View info about any Twitch emote - id only for now :)</p>
  </fieldset>
</div>

<div class="flex flex-row justify-center text-center gap-5">
  <div class="flex-none">
    <h2 class="text-xl">3.0 size</h2>
    <img class="mx-auto" src="https://static-cdn.jtvnw.net/emoticons/v2/{emote}/default/dark/3.0" alt="3.0 size" title="3.0 size" />
  </div>
  <div class="flex-none">
    <h2 class="text-xl">2.0 size</h2>
    <img class="mx-auto" src="https://static-cdn.jtvnw.net/emoticons/v2/{emote}/default/dark/2.0" alt="2.0 size" title="2.0 size" />
  </div>
  <div class="flex-none">
    <h2 class="text-xl">1.0 size</h2>
    <img class="mx-auto" src="https://static-cdn.jtvnw.net/emoticons/v2/{emote}/default/dark/1.0" alt="1.0 size" title="1.0 size" />
  </div>
</div>

<div class="flex flex-row justify-center flex-wrap text-center gap-5">
  {#each combinations as combination}
    <div class="flex-none">
      <h2 class="text-xl">_{combination}</h2>
      <img class="mx-auto" src="https://static-cdn.jtvnw.net/emoticons/v2/{emote}_{combination}/default/dark/3.0" alt="{combination} modifier" title="{combination} modifier" />
    </div>
  {/each}
</div>
