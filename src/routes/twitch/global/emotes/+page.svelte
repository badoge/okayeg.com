<script>
  import IcBaselineRefresh from "~icons/ic/baseline-refresh";

  async function reloadTwitchGlobal() {
    document.getElementById("twitch").innerHTML = spinner;
    try {
      let response = await fetch(`https://helper.donk.workers.dev/twitch/chat/emotes/global`);
      let emotes = await response.json();
      document.getElementById("twitch").innerHTML = "";
      for (let i = 0, j = emotes.data.length; i < j; i++) {
        document.getElementById("twitch").innerHTML += `
      <div class="border border-secondary emote">
      <img src="https://static-cdn.jtvnw.net/emoticons/v2/${emotes.data[i].id}/default/dark/3.0" loading="lazy" title="${emotes.data[i].name}" alt="${emotes.data[i].name}">
      <div class="text-body-secondary text-center">${emotes.data[i].name}</div>
      </div>`;
      }
      document.getElementById("twitchCount").innerHTML = ` (${emotes.data.length} emotes)`;
    } catch (error) {
      console.log("reloadTwitchGlobal error" + error);
    }
  } //reloadTwitchGlobal

  async function loadGlobalEmotes() {
    try {
      let response1 = await fetch(`/data/globaltwitch.json`);
      let globalTwitch = await response1.json();
      for (let i = 0, j = globalTwitch.data.length; i < j; i++) {
        document.getElementById("twitch").innerHTML += `<div class="border border-secondary emote">
      <img src="https://static-cdn.jtvnw.net/emoticons/v2/${globalTwitch.data[i].id}/default/dark/3.0" loading="lazy" title="${globalTwitch.data[i].name}" alt="${globalTwitch.data[i].name}">
      <div class="text-body-secondary text-center">${globalTwitch.data[i].name}</div>
      </div>`;
      } //for globalTwitch
      document.getElementById("twitchCount").innerHTML = ` (${globalTwitch.data.length} emotes)`;

      let response2 = await fetch(`https://api.betterttv.net/3/cached/emotes/global`);
      let globalBTTV = await response2.json();
      for (let i = 0, j = globalBTTV.length; i < j; i++) {
        document.getElementById("bttv").innerHTML += `<div class="border border-secondary emote">
      <a href="https://betterttv.com/emotes/${globalBTTV[i].id}" target="_blank" rel="noopener noreferrer"><img src="https://cdn.betterttv.net/emote/${globalBTTV[i].id}/3x" loading="lazy" alt="${globalBTTV[i].code}" title="${globalBTTV[i].code}"></a>
      <div class="text-body-secondary text-center">${globalBTTV[i].code}</div>
      </div>`;
      } //for globalBTTV
      document.getElementById("bttvCount").innerHTML = ` (${globalBTTV.length} emotes)`;

      let response3 = await fetch(`https://api.frankerfacez.com/v1/set/global`);
      let globalFFZ = await response3.json();
      for (let index = 0; index < globalFFZ.default_sets.length; index++) {
        let set = globalFFZ.default_sets[index];
        for (let i = 0, j = globalFFZ.sets[set].emoticons.length; i < j; i++) {
          let emote = globalFFZ.sets[set].emoticons[i];
          let url = emote.urls["4"];
          if (emote.animated) {
            url = emote.animated["4"];
          }
          document.getElementById("ffz").innerHTML += `<div class="border border-secondary emote">
      <a href="https://www.frankerfacez.com/emoticon/${emote.id}" target="_blank" rel="noopener noreferrer"><img src="${url}" loading="lazy" alt="${emote.name}" title="${emote.name}"></a>
      <div class="text-body-secondary text-center">${emote.name}</div>
      </div>`;
        }
      } //for globalFFZ
      document.getElementById("ffzCount").innerHTML = ` (${globalFFZ.sets["3"].emoticons.length} emotes)`;

      let response4 = await fetch(`https://7tv.io/v3/emote-sets/global`);
      let global7TV = await response4.json();
      for (let i = 0, j = global7TV.emotes.length; i < j; i++) {
        let files = global7TV.emotes[i].data.host.files.filter((e) => e.format == "AVIF");
        document.getElementById("7tv").innerHTML += `<div class="border border-secondary emote">
      <a href="https://7tv.app/emotes/${global7TV.emotes[i].id}" target="_blank" rel="noopener noreferrer">
      <img src="${global7TV.emotes[i].data.host.url}/${files[3].name}" loading="lazy" alt="${global7TV.emotes[i].name}" title="${global7TV.emotes[i].name}"></a>
      <div class="text-body-secondary text-center">${global7TV.emotes[i].name}</div>
      </div>`;
      } //for 7tv
      document.getElementById("7tvCount").innerHTML = ` (${global7TV.length} emotes)`;
    } catch (error) {
      console.log("loadGlobalEmotes error", error);
    }
  } //loadGlobalEmotes
</script>

<svelte:head>
  <title>Global Emotes | OkayegBOT</title>
  <meta name="description" content="View the current global Twitch/BTTV/FFZ/7TV emotes" />
  <meta property="og:title" content="Global Emotes | OkayegBOT" />
  <meta property="og:url" content="https://okayeg.com/twitch/global/emotes" />
  <meta property="og:description" content="View the current global Twitch/BTTV/FFZ/7TV emotes" />
</svelte:head>

<div class="container-fluid">
  <div class="row">
    <div class="col-xl-1"></div>
    <div class="col-xl-10">
      <h1 class="display-1">
        Global Twitch Emotes<span id="twitchCount" class="text-body-secondary"></span>:
        <button
          type="button"
          class="btn btn-outline-secondary"
          onclick={reloadTwitchGlobal()}
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          data-bs-title="Reload global Twitch emotes. The emote list is manually rearranged by me to look pretty so it might be out of date sometimes, reloading fetches the emote list from twitch directly."
        >
          <IcBaselineRefresh />
        </button>
      </h1>
      <br />
      <div id="twitch" class="emotecontainer"></div>
      <h1 class="display-1">Global BTTV Emotes<span id="bttvCount" class="text-body-secondary"></span>:</h1>
      <div id="bttv" class="emotecontainer"></div>

      <h1 class="display-1">Global FFZ Emotes<span id="ffzCount" class="text-body-secondary"></span>:</h1>
      <div id="ffz" class="emotecontainer"></div>

      <h1 class="display-1">Global 7TV Emotes<span id="7tvCount" class="text-body-secondary"></span>:</h1>
      <div id="7tv" class="emotecontainer"></div>
    </div>
    <div class="col-xl-1"></div>
  </div>
</div>
