<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";

  import IcBaselineSearch from "~icons/ic/baseline-search";
  import IcBaselineInfo from "~icons/ic/baseline-info";

  let { data } = $props();
  let emoteInput = $state(page.params.emoteID.toLowerCase().replace(/\s/g, ""));
  let emoteID = $derived("");
  let emoteName = $derived("🤷");
  let emoteChannel = $derived("🤷");
  let emoteSetID = $derived("🤷");
  let emoteTier = $derived("🤷");
  let emoteType = $derived("🤷");
  let emoteDate = $derived("🤷");
  let emoteFormat = $derived("🤷");
  let emoteAnimated = $derived("🤷");
  let emoteDeleted = $derived("");
  let emote1x = $state("");
  let emote2x = $state("");
  let emote4x = $state("");
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

    emoteID = "";
    emoteName = "🤷";
    emoteChannel = "🤷";
    emoteSetID = "🤷";
    emoteTier = "🤷";
    emoteType = "🤷";
    emoteDate = "🤷";
    emoteFormat = "🤷";
    emoteAnimated = "🤷";
    emoteDeleted = "";

    let modifiedEmotes = document.querySelectorAll("#modifiedEmotes > div");
    for (let index = 0; index < modifiedEmotes.length; index++) {
      modifiedEmotes[index].style.display = "";
    }

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
    { suffix: "BT", name: "Bubble Tea" },
    { suffix: "BN", name: "Bunny ears" },
    { suffix: "CL", name: "Clover" },
    { suffix: "EB", name: "Easter basket" },
    { suffix: "EG", name: "Easter eggs" },
    { suffix: "FB", name: "Feather Boa" },
    { suffix: "FC", name: "Flower crown" },
    { suffix: "BW", name: "Greyscale" },
    { suffix: "GR", name: "Guitar" },
    { suffix: "HB", name: "Heart Broken" },
    { suffix: "HE", name: "Heart Eyes" },
    { suffix: "HF", name: "Horizontal flip" },
    { suffix: "KI", name: "Kiss Imprint" },
    { suffix: "LH", name: "Lucky Hat" },
    { suffix: "RA", name: "Lunar Rat" },
    { suffix: "MC", name: "Maracas" },
    { suffix: "FF", name: "Pride Fan" },
    { suffix: "PK", name: "Pumpkin" },
    { suffix: "PM", name: "Pumpkin" },
    { suffix: "EV", name: "Red envelope" },
    { suffix: "RD", name: "Reindeer" },
    { suffix: "RB", name: "Rosie's Bandana" },
    { suffix: "SA", name: "Santa hat" },
    { suffix: "SF", name: "Snowflakes" },
    { suffix: "SM", name: "Snowman" },
    { suffix: "SO", name: "Sombrero" },
    { suffix: "SQ", name: "Squished" },
    { suffix: "SG", name: "Sunglasses" },
    { suffix: "TK", name: "Thinking" },
    { suffix: "UN", name: "Unicorn" },
    { suffix: "WH", name: "Witch hat" },
    { suffix: "WD", name: "Women's day" },
  ];

  const emoteTiers = { "1000": "1", "2000": "2", "3000": "3" };
  const emoteTypes = { bitstier: "Custom Bits tier emote", follower: "Custom follower emote", subscriptions: "Custom subscriber emote" };

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
      let response = await fetch(`https://uploader.px.dog/emote?id=${emoteID}`);
      if (response.status == 200) {
        let result = await response.json();
        emoteName = result.name || "🤷";
        emoteChannel = `<a class="link" href="/twitch/emotes/${result.channel}">${result.channel}</a>` || "🤷";
        emoteType = emoteTypes[result.type] || "🤷";
        emoteTier = result.type !== "subscriptions" ? `<span class="opacity-50">Only subscriber emotes have tiers</span>` : emoteTiers[result.tier];
        emoteSetID = result.set_id || "🤷";
        emoteFormat = result.animated === 1 ? "Animated" : "Static";
        emoteAnimated = result.animated;
      }
    } catch (error) {
      console.log(error);
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
  <meta property="og:url" content="https://okayeg.com/twitch/emote/{emoteID}" />
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
    <div class="flex flex-wrap w-full justify-center">
      <div class="card w-fit h-fit bg-base-200 shadow-xl m-5">
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
                <td>{@html emoteChannel}</td>
              </tr>
              <tr>
                <th>Creation date<span class="tooltip align-text-bottom" data-tip="Uses the Last-Modified http header which is not accurate"><IcBaselineInfo /></span></th>
                <td>{emoteDate}</td>
              </tr>
              <tr>
                <th>Type</th>
                <td>{emoteType}</td>
              </tr>
              <tr>
                <th>Tier</th>
                <td>{@html emoteTier}</td>
              </tr>
              <tr>
                <th>Format</th>
                <td>{emoteFormat}</td>
              </tr>
              <tr>
                <th>Set ID</th>
                <td>{emoteSetID}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="card w-fit h-fit bg-base-200 shadow-xl m-5">
        <div class="card-body">
          <h2 class="card-title">Emote sizes</h2>
          <div class="flex flex-col justify-center text-center gap-5">
            <div class="flex-none border border-accent rounded-b-xl p-1 h-fit">
              <a target="_blank" href="https://static-cdn.jtvnw.net/emoticons/v2/{emoteID}/default/dark/3.0">
                <img class="mx-auto" bind:this={emote4x} src="https://static-cdn.jtvnw.net/emoticons/v2/{emoteID}/default/dark/3.0" alt="3.0 size" title="3.0 size" />
              </a>
              <h2 class="text-xl">4x <span class="opacity-50">{emote4x ? `(${emote4x.naturalWidth} x ${emote4x.naturalHeight}px)` : ""}</span></h2>
            </div>
            <div class="flex-none border border-accent rounded-b-xl p-1 h-fit">
              <a target="_blank" href="https://static-cdn.jtvnw.net/emoticons/v2/{emoteID}/default/dark/2.0">
                <img class="mx-auto" bind:this={emote2x} src="https://static-cdn.jtvnw.net/emoticons/v2/{emoteID}/default/dark/2.0" alt="2.0 size" title="2.0 size" />
              </a>
              <h2 class="text-xl">2x <span class="opacity-50">{emote2x ? `(${emote2x.naturalWidth} x ${emote2x.naturalHeight}px)` : ""}</span></h2>
            </div>
            <div class="flex-none border border-accent rounded-b-xl p-1 h-fit">
              <a target="_blank" href="https://static-cdn.jtvnw.net/emoticons/v2/{emoteID}/default/dark/1.0">
                <img class="mx-auto" bind:this={emote1x} src="https://static-cdn.jtvnw.net/emoticons/v2/{emoteID}/default/dark/1.0" alt="1.0 size" title="1.0 size" />
              </a>
              <h2 class="text-xl">1x <span class="opacity-50">{emote1x ? `(${emote1x.naturalWidth} x ${emote1x.naturalHeight}px)` : ""}</span></h2>
            </div>
          </div>
        </div>
      </div>

      <div class="card w-180 h-fit bg-base-200 shadow-xl m-5">
        <div class="card-body">
          <h2 class="card-title">Modified emotes</h2>
          <div id="modifiedEmotes" class="flex flex-row flex-wrap justify-center text-center gap-5 grid md:grid-cols-4 grid-cols-2">
            {#if emoteAnimated === 1}
              <h4 class="text-2xl opacity-50">Animated emotes don't have modified versions</h4>
            {:else}
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
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
