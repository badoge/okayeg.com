<script>
  import { onMount } from "svelte";

  let dupeEmotes = [
    "555555600",
    "555555599",
    "555555598",
    "555555597",
    "555555596",
    "555555595",
    "555555594",
    "555555593",
    "555555592",
    "555555591",
    "555555590",
    "555555589",
    "555555588",
    "555555587",
    "555555586",
    "555555585",
    "555555584",
    "555555583",
    "555555582",
    "555555581",
    "555555580",
    "555555579",
    "555555578",
    "555555577",
    "555555576",
    "555555575",
    "555555574",
    "555555573",
    "555555572",
    "555555571",
    "555555570",
    "555555569",
    "555555568",
    "555555567",
    "555555566",
    "555555565",
    "555555564",
    "555555563",
    "555555562",
    "555555561",
    "555555560",
    "555555559",
    "555555558",
    "555555557",
  ];

  onMount(async () => {
    try {
      let response1 = await fetch(`https://helper.donk.workers.dev/twitch/chat/emotes/global`);
      let globalTwitch = await response1.json();
      document.getElementById("twitch").innerHTML = "";
      for (let i = 0, j = globalTwitch.data.length; i < j; i++) {
        if (dupeEmotes.includes(globalTwitch.data[i].id)) {
          continue;
        }
        document.getElementById("twitch").insertAdjacentHTML(
          "beforeend",
          `<div  class="emote border border-accent">
            <img src="https://static-cdn.jtvnw.net/emoticons/v2/${globalTwitch.data[i].id}/default/dark/3.0" loading="lazy" title="${globalTwitch.data[i].name}" alt="${globalTwitch.data[i].name}">
            <div>${globalTwitch.data[i].name}</div>
          </div>`,
        );
      } //for globalTwitch
      document.getElementById("twitchCount").innerHTML = ` (${globalTwitch.data.length - dupeEmotes.length} emotes)`;

      let response2 = await fetch(`https://api.betterttv.net/3/cached/emotes/global`);
      let globalBTTV = await response2.json();
      document.getElementById("bttv").innerHTML = "";
      for (let i = 0, j = globalBTTV.length; i < j; i++) {
        document.getElementById("bttv").insertAdjacentHTML(
          "beforeend",
          `<div class="border border-accent emote">
            <a href="https://betterttv.com/emotes/${globalBTTV[i].id}" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn.betterttv.net/emote/${globalBTTV[i].id}/3x" loading="lazy" alt="${globalBTTV[i].code}" title="${globalBTTV[i].code}">
            </a>
            <div>${globalBTTV[i].code}</div>
          </div>`,
        );
      } //for globalBTTV
      document.getElementById("bttvCount").innerHTML = ` (${globalBTTV.length} emotes)`;

      let response3 = await fetch(`https://api.frankerfacez.com/v1/set/global`);
      let globalFFZ = await response3.json();
      document.getElementById("ffz").innerHTML = "";
      for (let index = 0; index < globalFFZ.default_sets.length; index++) {
        let set = globalFFZ.default_sets[index];
        for (let i = 0, j = globalFFZ.sets[set].emoticons.length; i < j; i++) {
          let emote = globalFFZ.sets[set].emoticons[i];
          let url = emote.urls["4"];
          if (emote.animated) {
            url = emote.animated["4"];
          }
          document.getElementById("ffz").insertAdjacentHTML(
            "beforeend",
            `<div class="border border-accent emote">
              <a href="https://www.frankerfacez.com/emoticon/${emote.id}" target="_blank" rel="noopener noreferrer">
                <img src="${url}" loading="lazy" alt="${emote.name}" title="${emote.name}">
              </a>
              <div>${emote.name}</div>
            </div>`,
          );
        }
      } //for globalFFZ
      document.getElementById("ffzCount").innerHTML = ` (${globalFFZ.sets["3"].emoticons.length} emotes)`;

      let response4 = await fetch(`https://7tv.io/v3/emote-sets/global`);
      let global7TV = await response4.json();
      document.getElementById("seventv").innerHTML = "";
      for (let i = 0, j = global7TV.emotes.length; i < j; i++) {
        let files = global7TV.emotes[i].data.host.files.filter((e) => e.format == "AVIF");
        document.getElementById("seventv")?.insertAdjacentHTML(
          "beforeend",
          `<div class="border border-accent emote">
            <a href="https://7tv.app/emotes/${global7TV.emotes[i].id}" target="_blank" rel="noopener noreferrer">
              <img src="${global7TV.emotes[i].data.host.url}/${files[3].name}" loading="lazy" alt="${global7TV.emotes[i].name}" title="${global7TV.emotes[i].name}">
            </a>
            <div>${global7TV.emotes[i].name}</div>
          </div>`,
        );
      } //for 7tv
      document.getElementById("7tvCount").innerHTML = ` (${global7TV.length} emotes)`;
    } catch (error) {
      console.log("loadGlobalEmotes error", error);
    }
  });
</script>

<svelte:head>
  <title>Global Emotes | OkayegBOT</title>
  <meta name="description" content="View the current global Twitch/BTTV/FFZ/7TV emotes" />
  <meta property="og:title" content="Global Emotes | OkayegBOT" />
  <meta property="og:url" content="https://okayeg.com/twitch/global/emotes" />
  <meta property="og:description" content="View the current global Twitch/BTTV/FFZ/7TV emotes" />
</svelte:head>

<div class="flex flex-col m-5">
  <div class="card w-full bg-base-200 card-xl shadow-lg mb-5">
    <div class="card-body">
      <h2 class="card-title">Global Twitch Emotes<span id="twitchCount" class="text-body-secondary"></span></h2>
      <div id="twitch" class="emotecontainer"><span class="loading loading-spinner loading-xl"></span></div>
    </div>
  </div>

  <div class="card w-full bg-base-200 card-xl shadow-sm mb-5">
    <div class="card-body">
      <h2 class="card-title">Global BTTV Emotes<span id="bttvCount" class="text-body-secondary"></span></h2>
      <div id="bttv" class="emotecontainer"><span class="loading loading-spinner loading-xl"></span></div>
    </div>
  </div>

  <div class="card w-full bg-base-200 card-xl shadow-sm mb-5">
    <div class="card-body">
      <h2 class="card-title">Global FFZ Emotes<span id="ffzCount" class="text-body-secondary"></span></h2>
      <div id="ffz" class="emotecontainer"><span class="loading loading-spinner loading-xl"></span></div>
    </div>
  </div>

  <div class="card w-full bg-base-200 card-xl shadow-sm mb-5">
    <div class="card-body">
      <h2 class="card-title">Global 7TV Emotes<span id="7tvCount" class="text-body-secondary"></span></h2>
      <div id="seventv" class="emotecontainer"><span class="loading loading-spinner loading-xl"></span></div>
    </div>
  </div>
</div>
