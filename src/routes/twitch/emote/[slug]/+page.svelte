<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";

  import IcBaselineSearch from "~icons/ic/baseline-search";
  import IcBaselineInfo from "~icons/ic/baseline-info";

  let { data } = $props();
  let emoteInput = $state(data.slug.toLowerCase().replace(/\s/g, ""));
  let emoteID = $derived("");
  let emoteName = $derived("🤷");
  let emoteChannel = $derived("🤷");
  let emoteDate = $derived("🤷");

  onMount(() => {
    if (emoteInput) {
      loadEmoteInfo();
    }
  });

  /**
   * @param {SubmitEvent & { currentTarget: EventTarget & HTMLFormElement; }} event
   */
  function lookup(event) {
    event.preventDefault();

    let regexV1 = /^\d+$/;
    let regexV2 = /emotesv2_[a-z0-9]{32}/;
    let regexCDN = /emoticons\/v[12]\/([\w\d]*)\//;
    const isEmoteID = regexV1.test(emoteInput) || regexV2.test(emoteInput) || regexCDN.test(emoteInput);
    if (isEmoteID) {
      if (regexCDN.test(emoteInput)) {
        emoteID = emoteInput.match(regexCDN)[1];
      } else if (regexV2.test(emoteInput)) {
        emoteID = emoteInput.match(regexV2)[0];
      } else if (regexV1.test(emoteInput)) {
        emoteID = emoteInput.match(regexV1)[0];
      }
    } else {
      emoteID = "";
      return;
    }

    goto(`/twitch/emote/${emoteID?.toLowerCase().replace(/\s/g, "")}`);
    loadEmoteInfo();
  }

  /**
   * @type {any[]}
   */
  const combinations = [
    { suffix: "BE", name: "Beard" },
    { suffix: "BN", name: "Bunny ears" },
    { suffix: "BT", name: "Bubble Tea" },
    { suffix: "BW", name: "Greyscale" },
    { suffix: "CL", name: "Clover" },
    { suffix: "EB", name: "Easter basket" },
    { suffix: "EG", name: "Easter eggs" },
    { suffix: "FF", name: "Pride Fan" },
    { suffix: "FC", name: "Flower crown" },
    { suffix: "FB", name: "Feather Boa" },
    { suffix: "EV", name: "Red envelope" },
    { suffix: "HF", name: "Horizontal flip" },
    { suffix: "HE", name: "Heart Eyes" },
    { suffix: "HB", name: "Heart Broken" },
    { suffix: "GR", name: "Guitar" },
    { suffix: "KI", name: "Kiss Imprint" },
    { suffix: "LH", name: "Lucky Hat" },
    { suffix: "MC", name: "Maracas" },
    { suffix: "PK", name: "Pumpkin" },
    { suffix: "PM", name: "Pumpkin" },
    { suffix: "WD", name: "Women's day" },
    { suffix: "WH", name: "Witch hat" },
    { suffix: "SA", name: "Santa hat" },
    { suffix: "RA", name: "Lunar Rat" },
    { suffix: "RB", name: "Rosie's Bandana" },
    { suffix: "RD", name: "Reindeer" },
    { suffix: "SF", name: "Snowflakes" },
    { suffix: "SG", name: "Sunglasses" },
    { suffix: "TK", name: "Thinking" },
    { suffix: "UN", name: "Unicorn" },
    { suffix: "SM", name: "Snowman" },
    { suffix: "SO", name: "Sombrero" },
    { suffix: "SQ", name: "Squished" },
  ];

  async function loadEmoteInfo() {
    let regexV1 = /^\d+$/;
    let regexV2 = /emotesv2_[a-z0-9]{32}/;
    let regexCDN = /emoticons\/v[12]\/([\w\d]*)\//;
    const isEmoteID = regexV1.test(emoteInput) || regexV2.test(emoteInput) || regexCDN.test(emoteInput);
    if (isEmoteID) {
      if (regexCDN.test(emoteInput)) {
        emoteID = emoteInput.match(regexCDN)[1];
      } else if (regexV2.test(emoteInput)) {
        emoteID = emoteInput.match(regexV2)[0];
      } else if (regexV1.test(emoteInput)) {
        emoteID = emoteInput.match(regexV1)[0];
      }
    } else {
      emoteID = "dank";
    }

    try {
      let response = await fetch(`https://static-cdn.jtvnw.net/emoticons/v2/${emoteID}/default/dark/1.0`, { method: "HEAD" });
      emoteDate = response.headers.get("Last-Modified") || "🤷";
    } catch (error) {
      console.log(error);
    }
  }
</script>

<svelte:head>
  <title>Emote {emoteID} info | OkayegBOT</title>
  <meta name="description" content="Info about the Twitch emote {emoteID}" />
  <meta property="og:title" content="Emote {emoteID} info | OkayegBOT" />
  <meta property="og:url" content="https://beta.okayeg.com/twitch/emote/{emoteID}" />
  <meta property="og:image" content="https://static-cdn.jtvnw.net/emoticons/v2/{emoteID}/default/dark/3.0" />
  <meta property="og:description" content="Info about the Twitch emote {emoteID}" />
</svelte:head>

<div class="flex justify-center mt-5">
  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
    <legend class="fieldset-legend">Twitch emote info</legend>
    <form class="join" onsubmit={(event) => lookup(event)}>
      <input type="text" class="input join-item validator" placeholder="Emote" bind:value={emoteInput} required />
      <button class="btn join-item btn-primary" type="submit" disabled={`/twitch/emote/${emoteInput}` === page.url.pathname}><IcBaselineSearch />Lookup</button>
    </form>
    <p class="label">View info about any Twitch emote - id and url only for now :)</p>
  </fieldset>
</div>

{#if emoteID == "dank"}
  <p class="text-center text-2xl">Invalid emote ID</p>
{:else if !emoteID}
  <p class="text-center text-2xl">No emote ID provided</p>
{:else}
  <div class="flex">
    <div class="w-100 shrink"></div>

    <div class="flex flex-wrap w-600">
      <div class="card w-fit bg-base-200 shadow-xl m-10">
        <div class="card-body">
          <h2 class="card-title">Emote info</h2>

          <table class="table">
            <tbody>
              <tr>
                <th>ID</th>
                <td>{emoteID}</td>
              </tr>
              <tr>
                <th>Name</th>
                <td>{emoteName}</td>
              </tr>
              <tr>
                <th>Channel</th>
                <td>{emoteName}</td>
              </tr>
              <tr>
                <th>Creation date<span class="tooltip align-text-bottom" data-tip="Uses the Last-Modified http header which is not accurate"><IcBaselineInfo /></span></th>
                <td>{emoteDate}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="card w-fit bg-base-200 shadow-xl m-10">
        <div class="card-body">
          <h2 class="card-title">Emote sizes</h2>
          <div class="flex flex-row justify-center text-center gap-5">
            <div class="flex-none border border-accent rounded-b-xl p-1 h-fit">
              <a target="_blank" href="https://static-cdn.jtvnw.net/emoticons/v2/{emoteID}/default/dark/3.0">
                <img class="mx-auto" src="https://static-cdn.jtvnw.net/emoticons/v2/{emoteID}/default/dark/3.0" alt="3.0 size" title="3.0 size" />
              </a>
              <h2 class="text-xl">3.0</h2>
            </div>
            <div class="flex-none border border-accent rounded-b-xl p-1 h-fit">
              <a target="_blank" href="https://static-cdn.jtvnw.net/emoticons/v2/{emoteID}/default/dark/2.0">
                <img class="mx-auto" src="https://static-cdn.jtvnw.net/emoticons/v2/{emoteID}/default/dark/2.0" alt="2.0 size" title="2.0 size" />
              </a>
              <h2 class="text-xl">2.0</h2>
            </div>
            <div class="flex-none border border-accent rounded-b-xl p-1 h-fit">
              <a target="_blank" href="https://static-cdn.jtvnw.net/emoticons/v2/{emoteID}/default/dark/1.0">
                <img class="mx-auto" src="https://static-cdn.jtvnw.net/emoticons/v2/{emoteID}/default/dark/1.0" alt="1.0 size" title="1.0 size" />
              </a>
              <h2 class="text-xl">1.0</h2>
            </div>
          </div>
        </div>
      </div>

      <div class="card w-fit bg-base-200 shadow-xl m-10">
        <div class="card-body">
          <h2 class="card-title">Modified emote</h2>
          <div class="flex flex-row flex-wrap justify-center text-center gap-5">
            {#each combinations as combination}
              <div class="flex-none border border-accent rounded-b-xl p-1 h-fit">
                <a target="_blank" href="https://static-cdn.jtvnw.net/emoticons/v2/{emoteID}_{combination.suffix}/default/dark/3.0">
                  <img
                    class="mx-auto"
                    src="https://static-cdn.jtvnw.net/emoticons/v2/{emoteID}_{combination.suffix}/default/dark/3.0"
                    alt="{combination.name} modifier (_{combination.suffix})"
                    title="{combination.name} modifier (_{combination.suffix})"
                    onerror={(e) => (e.target.closest("div").style.display = "none")}
                  />
                </a>
                <h2 class="text-xl">{combination.name} <span class="opacity-50">(_{combination.suffix})</span></h2>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>

    <div class="w-100 shrink"></div>
  </div>
{/if}
