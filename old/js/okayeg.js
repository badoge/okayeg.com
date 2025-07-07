/*jshint esversion: 8 */

const months = {
  0: "1-Month",
  2: "2-Month",
  3: "3-Month",
  6: "6-Month",
  9: "9-Month",
  12: "1-Year",
  18: "1.5-Year",
  24: "2-Year",
  30: "2.5-Year",
  36: "3-Year",
  42: "3.5-Year",
  48: "4-Year",
  54: "4.5-Year",
  60: "5-Year",
  66: "5.5-Year",
  72: "6-Year",
  78: "6.5-Year",
  84: "7-Year",
  90: "7.5-Year",
  96: "8-Year",
  102: "8.5-Year",
  108: "9-Year",
  114: "9.5-Year",
  120: "10-Year",
  126: "10.5-Year",
  132: "11-Year",
  138: "11.5-Year",
  144: "12-Year",
  2000: "1-Month Tier 2",
  2002: "2-Month Tier 2",
  2003: "3-Month Tier 2",
  2006: "6-Month Tier 2",
  2009: "9-Month Tier 2",
  2012: "1-Year Tier 2",
  2018: "1.5-Year Tier 2",
  2024: "2-Year Tier 2",
  2030: "2.5-Year Tier 2",
  2036: "3-Year Tier 2",
  2042: "3.5-Year Tier 2",
  2048: "4-Year Tier 2",
  2054: "4.5-Year Tier 2",
  2060: "5-Year Tier 2",
  2066: "5.5-Year Tier 2",
  2072: "6-Year Tier 2",
  2078: "6.5-Year Tier 2",
  2084: "7-Year Tier 2",
  2090: "7.5-Year Tier 2",
  2096: "8-Year Tier 2",
  2102: "8.5-Year Tier 2",
  2108: "9-Year Tier 2",
  2114: "9.5-Year Tier 2",
  2120: "10-Year Tier 2",
  2126: "10.5-Year Tier 2",
  2132: "11-Year Tier 2",
  2138: "11.5-Year Tier 2",
  2144: "12-Year Tier 2",
  3000: "1-Month Tier 3",
  3002: "2-Month Tier 3",
  3003: "3-Month Tier 3",
  3006: "6-Month Tier 3",
  3009: "9-Month Tier 3",
  3012: "1-Year Tier 3",
  3018: "1.5-Year Tier 3",
  3024: "2-Year Tier 3",
  3030: "2.5-Year Tier 3",
  3036: "3-Year Tier 3",
  3042: "3.5-Year Tier 3",
  3048: "4-Year Tier 3",
  3054: "4.5-Year Tier 3",
  3060: "5-Year Tier 3",
  3066: "5.5-Year Tier 3",
  3072: "6-Year Tier 3",
  3078: "6.5-Year Tier 3",
  3084: "7-Year Tier 3",
  3090: "7.5-Year Tier 3",
  3096: "8-Year Tier 3",
  3102: "8.5-Year Tier 3",
  3108: "9-Year Tier 3",
  3114: "9.5-Year Tier 3",
  3120: "10-Year Tier 3",
  3126: "10.5-Year Tier 3",
  3132: "11-Year Tier 3",
  3138: "11.5-Year Tier 3",
  3144: "12-Year Tier 3",
};

const svg =
  '<svg style="fill: #a970ff; position: relative;" type="color-fill-current" width="16px" height="16px" version="1.1" viewBox="0 0 16 16" x="0px" y="0px"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 3.5L8 2L3.5 3.5L2 8L3.5 12.5L8 14L12.5 12.5L14 8L12.5 3.5ZM7.00008 11L11.5 6.5L10 5L7.00008 8L5.5 6.5L4 8L7.00008 11Z"></path></svg>';
const staffpic = `<img src="/pics/staff.png" loading="lazy" width="16px" height="16px" title="Twitch staff" alt="Twitch staff">`;

const spinner = `<div style="display: table; margin: 0 auto;" class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>`;

let copyTooltip;
let token;

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

async function getTwitchUser(username) {
  try {
    let response = await fetch(`https://helper.donk.workers.dev/twitch/users?login=${username}`);
    let result = await response.json();
    if (!result?.data || !result?.data[0]?.id) {
      return null;
    }
    return result.data[0];
  } catch (error) {
    console.log("getTwitchUser error", error);
    return null;
  }
} //getTwitchUser

async function loadChannelEmotes() {
  let displayName = "";
  let input = location.hash;
  let channel = input.replace("#", "").toLowerCase().replace(/\s/g, "");
  if (document.getElementById("channel").value) {
    channel = document.getElementById("channel").value.toLowerCase().replace(/\s/g, "");
  } else {
    document.getElementById("channel").value = channel;
  }
  if (!channel) {
    return;
  }

  let user = await getTwitchUser(channel);
  if (!user) {
    document.getElementById("output").style.display = "";
    document.getElementById("output").innerHTML = `<h1 class="display-1 text-center">Channel not found</h1>`;
    document.getElementById("twitch").innerHTML = "";
    document.getElementById("badges").innerHTML = "";
    document.getElementById("bttv").innerHTML = "";
    document.getElementById("ffz").innerHTML = "";
    document.getElementById("seventv").innerHTML = "";
    return;
  } else {
    document.getElementById("output").style.display = "none";
    displayName = user.display_name.toLowerCase() == user.login ? user.display_name : `${user.display_name} (${user.login})`;
  }

  document.getElementById("twitch").innerHTML = "";
  document.getElementById("badges").innerHTML = "";
  document.getElementById("bttv").innerHTML = "";
  document.getElementById("ffz").innerHTML = "";
  document.getElementById("seventv").innerHTML = "";

  try {
    let response = await fetch(`https://helper.donk.workers.dev/twitch/chat/emotes?broadcaster_id=${user.id}`);
    let result = await response.json();
    if (result?.data?.length > 0) {
      result.data.sort((a, b) => a.name.localeCompare(b.name));
      document.getElementById("twitch").innerHTML = `
      <h1 class="display-1">
        <a href="https://twitch.tv/${user.login}" target="_blank" rel="noopener noreferrer">${displayName}</a>'s Subscriber Emotes:
      </h1>`;
      let tier1Count = 0;
      let tier2Count = 0;
      let tier3Count = 0;
      let followerCount = 0;
      let bitsCount = 0;
      let t1 = "";
      let t2 = "";
      let t3 = "";
      let follower = "";
      let bits = "";
      for (let i = 0, j = result.data.length; i < j; i++) {
        if (result.data[i].tier == "1000") {
          tier1Count++;
          t1 += `
          <div class="border border-secondary emote">
            <img src="https://static-cdn.jtvnw.net/emoticons/v2/${result.data[i].id}/default/dark/3.0" loading="lazy" title="${result.data[i].name}" alt="${result.data[i].name}">
            <div class="text-body-secondary emotetext text-center">${escapeString(result.data[i].name)}</div>
          </div>`;
        }
        if (result.data[i].tier == "2000") {
          tier2Count++;
          t2 += `
          <div class="border border-secondary emote">
            <img src="https://static-cdn.jtvnw.net/emoticons/v2/${result.data[i].id}/default/dark/3.0" title="${result.data[i].name}" loading="lazy" alt="${result.data[i].name}">
            <div class="text-body-secondary emotetext text-center">${escapeString(result.data[i].name)}</div>
          </div>`;
        }
        if (result.data[i].tier == "3000") {
          tier3Count++;
          t3 += `
          <div class="border border-secondary emote">
            <img src="https://static-cdn.jtvnw.net/emoticons/v2/${result.data[i].id}/default/dark/3.0" title="${result.data[i].name}" loading="lazy" alt="${result.data[i].name}">
            <div class="text-body-secondary emotetext text-center">${escapeString(result.data[i].name)}</div>
          </div>`;
        }
        if (result.data[i].emote_type == "follower") {
          followerCount++;
          follower += `
          <div class="border border-secondary emote">
            <img  src="https://static-cdn.jtvnw.net/emoticons/v2/${result.data[i].id}/default/dark/3.0" title="${result.data[i].name}" loading="lazy" alt="${result.data[i].name}">
            <div class="text-body-secondary emotetext text-center">${escapeString(result.data[i].name)}</div>
          </div>`;
        }
        if (result.data[i].emote_type == "bitstier") {
          bitsCount++;
          bits += `
          <div class="border border-secondary emote">
            <img src="https://static-cdn.jtvnw.net/emoticons/v2/${result.data[i].id}/default/dark/3.0" title="${result.data[i].name}" loading="lazy" alt="${result.data[i].name}">
            <div class="text-body-secondary emotetext text-center">${escapeString(result.data[i].name)}</div>
          </div>`;
        }
      }
      if (t1) {
        t1 = `
        <h3>
          Tier 1 Emotes <span class="text-body-secondary">(${tier1Count} ${tier1Count == 1 ? "emote" : "emotes"})</span>:
        </h3>
        <div class="emotecontainer">${t1}</div>`;
      }
      if (t2) {
        t2 = `
        <h3>
          Tier 2 Emotes <span class="text-body-secondary">(${tier2Count} ${tier2Count == 1 ? "emote" : "emotes"})</span>:
        </h3>
        <div class="emotecontainer">${t2}</div>`;
      }
      if (t3) {
        t3 = `
        <h3>
          Tier 3 Emotes <span class="text-body-secondary">(${tier3Count} ${tier3Count == 1 ? "emote" : "emotes"})</span>:
        </h3>
        <div class="emotecontainer">${t3}</div>`;
      }
      if (follower) {
        follower = `
        <h3>
          Follower Emotes <span class="text-body-secondary">(${followerCount} ${followerCount == 1 ? "emote" : "emotes"})</span>:
        </h3>
        <div class="emotecontainer">${follower}</div>`;
      }
      if (bits) {
        bits = `
        <h3>
          Bits Tier Emotes <span class="text-body-secondary">(${bitsCount} ${bitsCount == 1 ? "emote" : "emotes"})</span>:
        </h3>
        <div class="emotecontainer">${bits}</div>`;
      }
      document.getElementById("twitch").innerHTML += t1 + t2 + t3 + follower + bits;
    }
  } catch (error) {
    console.log("twitch emotes error", error);
  }

  try {
    let response = await fetch(`https://helper.donk.workers.dev/twitch/chat/badges?broadcaster_id=${user.id}`);
    let result = await response.json();
    if (result?.data?.length > 0) {
      let subBadges = [];
      let bitBadges = [];
      if (result?.data[0]?.versions?.length > 0) {
        if (result.data[0].set_id == "subscriber") {
          subBadges = result.data[0].versions;
        }
        if (result.data[0].set_id == "bits") {
          bitBadges = result.data[0].versions;
        }
      }
      if (result?.data[1]?.versions?.length > 0) {
        if (result.data[1].set_id == "subscriber") {
          subBadges = result.data[1].versions;
        }
        if (result.data[1].set_id == "bits") {
          bitBadges = result.data[1].versions;
        }
      }
      subBadges.sort(function (a, b) {
        return parseInt(a.id, 10) - parseInt(b.id, 10);
      });
      bitBadges.sort(function (a, b) {
        return parseInt(a.id, 10) - parseInt(b.id, 10);
      });

      let subt1 = "";
      let subt2 = "";
      let subt3 = "";
      let bits = "";

      for (let i = 0, j = subBadges.length; i < j; i++) {
        if (subBadges[i].id >= 3000) {
          subt3 += `
          <div class="border border-secondary emote">
            <img src="${subBadges[i].image_url_4x}" loading="lazy">
            <div class="text-body-secondary text-center">${months[subBadges[i].id]}</div>
          </div>`;
        } else if (subBadges[i].id >= 2000) {
          subt2 += `
          <div class="border border-secondary emote">
            <img src="${subBadges[i].image_url_4x}" loading="lazy">
            <div class="text-body-secondary text-center">${months[subBadges[i].id]}</div>
          </div>`;
        } else {
          subt1 += `
          <div class="border border-secondary emote">
            <img src="${subBadges[i].image_url_4x}" loading="lazy">
            <div class="text-body-secondary text-center">${months[subBadges[i].id]}</div>
          </div>`;
        }
      }
      for (let i = 0, j = bitBadges.length; i < j; i++) {
        bits += `
        <div class="border border-secondary emote">
          <img src="${bitBadges[i].image_url_4x}" loading="lazy">
          <div class="text-body-secondary text-center">${escapeString(bitBadges[i].title)}</div>
        </div>`;
      }
      if (subt1) {
        subt1 = `<h3>Tier 1 Sub Badges:</h3><div class="emotecontainer">${subt1}</div>`;
      }
      if (subt2) {
        subt2 = `<h3>Tier 2 Sub Badges:</h3><div class="emotecontainer">${subt2}</div>`;
      }
      if (subt3) {
        subt3 = `<h3>Tier 3 Sub Badges:</h3><div class="emotecontainer">${subt3}</div>`;
      }
      if (bits) {
        bits = `<h3>Bit badges:</h3><div class="emotecontainer">${bits}</div>`;
      }
      document.getElementById("badges").innerHTML = subt1 + subt2 + subt3 + bits;
    }
  } catch (error) {
    console.log("twitch badges error", error);
  }

  try {
    let response = await fetch(`https://api.betterttv.net/3/cached/users/twitch/${user.id}`);
    let result = await response.json();
    if (result?.channelEmotes?.length > 0 || result?.sharedEmotes?.length > 0) {
      let bttvChannelEmotes = "";
      let bttvSharedEmotes = "";
      result.channelEmotes.sort((a, b) => a.code.localeCompare(b.code));
      result.sharedEmotes.sort((a, b) => a.code.localeCompare(b.code));
      document.getElementById("bttv").innerHTML = `
      <h1 class="display-1">
        <a href="https://betterttv.com/users/${result.id}" target="_blank" rel="noopener noreferrer">${displayName}</a>'s BTTV Emotes:
      </h1>`;

      for (let i = 0, j = result.channelEmotes.length; i < j; i++) {
        bttvChannelEmotes += `
        <div class="border border-secondary emote">
          <a href="https://betterttv.com/emotes/${result.channelEmotes[i].id}" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn.betterttv.net/emote/${result.channelEmotes[i].id}/3x" loading="lazy" alt="${result.channelEmotes[i].code}" title="${result.channelEmotes[i].code}">
          </a>
          <div class="text-body-secondary emotetextwide text-center">${escapeString(result.channelEmotes[i].code)}</div>
        </div>`;
      }
      for (let i = 0, j = result.sharedEmotes.length; i < j; i++) {
        bttvSharedEmotes += `
        <div class="border border-secondary emote">
          <a href="https://betterttv.com/emotes/${result.sharedEmotes[i].id}" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn.betterttv.net/emote/${result.sharedEmotes[i].id}/3x" loading="lazy" alt="${result.sharedEmotes[i].code}" title="${result.sharedEmotes[i].code}">
          </a>
          <div class="text-body-secondary emotetextwide text-center">${escapeString(result.sharedEmotes[i].code)}</div>
        </div>`;
      }
      if (bttvChannelEmotes) {
        bttvChannelEmotes = `
        <h3>
          BTTV channel emotes
          <i class="material-icons notranslate" data-bs-toggle="tooltip" data-bs-title="Channel emotes are emotes that were uploaded to BTTV by ${user.login}.">info</i>
          <span class="text-body-secondary">(${result.channelEmotes.length} ${result.channelEmotes.length == 1 ? "emote" : "emotes"})</span>:
        </h3>
        <div class="emotecontainer">${bttvChannelEmotes}</div>`;
      }
      if (bttvSharedEmotes) {
        bttvSharedEmotes = `
        <h3>
          BTTV shared emotes
          <i class="material-icons notranslate" data-bs-toggle="tooltip" data-bs-title="Shared emotes are emotes that were uploaded to BTTV by other users.">info</i>
          <span class="text-body-secondary">(${result.sharedEmotes.length} ${result.channelEmotes.length == 1 ? "emote" : "emotes"})</span>:
        </h3>
        <div class="emotecontainer">${bttvSharedEmotes}</div>`;
      }
      document.getElementById("bttv").innerHTML += bttvChannelEmotes + bttvSharedEmotes;
      enableTooltips();
    }
  } catch (error) {
    console.log("bttv error", error);
  }

  try {
    let response = await fetch(`https://api.frankerfacez.com/v1/room/id/${user.id}`);
    let result = await response.json();
    if (response.status == 200 && result?.room?.set && result.sets[result?.room?.set]?.emoticons?.length > 0) {
      let ffz = "";
      let setid = result.room.set;
      let sets = result.sets[setid];
      sets.emoticons.sort((a, b) => a.name.localeCompare(b.name));

      document.getElementById("ffz").innerHTML = `
      <h1 class="display-1">
        <a href="https://www.frankerfacez.com/channel/${user.login}" target="_blank" rel="noopener noreferrer">${displayName}</a>'s FFZ Emotes 
        <span class="text-body-secondary">(${sets.emoticons.length} ${sets.emoticons.length == 1 ? "emote" : "emotes"})</span>:
      </h1>`;

      for (let i = 0, j = sets.emoticons.length; i < j; i++) {
        let url = sets.emoticons[i].urls["4"];
        if (sets.emoticons[i].animated) {
          url = sets.emoticons[i].animated["4"];
        }
        ffz += `
        <div class="border border-secondary emote">
          <a href="https://www.frankerfacez.com/emoticon/${sets.emoticons[i].id}" target="_blank" rel="noopener noreferrer">
            <img src="${url}" loading="lazy" alt="${sets.emoticons[i].name}" title="${sets.emoticons[i].name}">
          </a>
          <div class="text-body-secondary emotetextwide text-center">${escapeString(sets.emoticons[i].name)}</div>
        </div>`;
      } //ffz emotes

      if (ffz) {
        ffz = `<div class="emotecontainer">${ffz}</div>`;
      }
      document.getElementById("ffz").innerHTML += ffz;

      if (result.room.mod_urls) {
        document.getElementById("badges").innerHTML += `
        <h3>Mod badge:</h3>
        <div class="emotecontainer">
          <div class="border border-secondary emote">
            <img src="${result.room.mod_urls["4"]}" loading="lazy" alt="Mod badge" title="Mod badge">
            <div class="text-body-secondary text-center">Mod badge</div>
          </div>
        </div>`;
      } //ffz mod badge
      if (result.room.vip_badge) {
        document.getElementById("badges").innerHTML += `
        <h3>VIP badge:</h3>
        <div class="emotecontainer">
          <div class="border border-secondary emote">
            <img src="${result.room.vip_badge["4"]}" loading="lazy" alt="VIP badge" title="VIP badge">
            <div class="text-body-secondary text-center">VIP badge</div>
          </div>
        </div>`;
      } //ffz vip badge
    }
  } catch (error) {
    console.log("ffz error", error);
  }

  try {
    let response = await fetch(`https://7tv.io/v3/users/twitch/${user.id}`);
    let result = await response.json();
    if (response.status == 200 && result?.emote_set?.emotes?.length > 0) {
      result.emote_set.emotes.sort((a, b) => a.name.localeCompare(b.name));
      let seventv = "";
      document.getElementById("seventv").innerHTML = `
      <h1 class="display-1">
        <a href="https://7tv.app/users/${result.user.id}" target="_blank" rel="noopener noreferrer">${displayName}</a>'s 7TV Emotes 
        <span class="text-body-secondary">(${result.emote_set.emotes.length} ${result.emote_set.emotes.length == 1 ? "emote" : "emotes"})</span>:
      </h1>`;
      for (let i = 0, j = result.emote_set.emotes.length; i < j; i++) {
        let files = result.emote_set.emotes[i].data.host.files.filter((e) => e.format == "AVIF");
        seventv += `
        <div class="border border-secondary emote">
          <a href="https://7tv.app/emotes/${result.emote_set.emotes[i].id}" target="_blank" rel="noopener noreferrer">
            <img src="${result.emote_set.emotes[i].data.host.url}/${files[3].name}" loading="lazy" alt="${result.emote_set.emotes[i].name}" title="${result.emote_set.emotes[i].name}">
          </a>
          <div class="text-body-secondary emotetextwide text-center">${escapeString(result.emote_set.emotes[i].name)}</div>
        </div>`;
      }
      if (seventv) {
        seventv = `<div class="emotecontainer">${seventv}</div>`;
      }
      document.getElementById("seventv").innerHTML += seventv;
    } //7tv
  } catch (error) {
    console.log("7tv error", error);
  }

  if (
    document.getElementById("twitch").innerHTML == "" &&
    document.getElementById("badges").innerHTML == "" &&
    document.getElementById("bttv").innerHTML == "" &&
    document.getElementById("ffz").innerHTML == "" &&
    document.getElementById("seventv").innerHTML == ""
  ) {
    document.getElementById("output").style.display = "";
    document.getElementById("output").innerHTML = `<h1 class="display-1 text-center">Channel Has no emotes</h1>`;
  }
} //loadChannelEmotes

function enableTooltips() {
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) =>
      new bootstrap.Tooltip(tooltipTriggerEl, {
        trigger: "hover",
      }),
  );
} //enableTooltips

async function loadFollowList() {
  let input = location.hash;
  let username = input.replace("#", "").toLowerCase().replace(/\s/g, "");
  if (document.getElementById("username").value) {
    username = document.getElementById("username").value;
  } else {
    document.getElementById("username").value = username;
  }

  if (username) {
    document.getElementById("title1").style.display = "block";
    document.getElementById("listcontainer").style.display = "block";

    document.getElementById("title1").innerHTML = "";
    document.getElementById("list").innerHTML = spinner;

    try {
      let response = await fetch(`https://api.okayeg.com/followlist?username=${username}`);

      if (response.status !== 200) {
        document.getElementById("title1").innerHTML = `<h1 class="display-1">
        <a href="https://twitch.tv/${username}" target="_blank" rel="noopener noreferrer">${username}</a> was never looked up
        </h1>`;
        document.getElementById("list").innerHTML = "";
        return;
      }

      let followList = await response.json();
      let fetchTime = followList.time;
      let displayName = followList.data.display_name.toLowerCase() == followList.data.login ? followList.data.display_name : `${followList.data.display_name} (${followList.data.login})`;

      document.getElementById("list").innerHTML = "";
      if (followList.data.total == 0) {
        document.getElementById("title1").innerHTML = `
        <h1 class="display-1"><a href="https://twitch.tv/${followList.data.login}" target="_blank" rel="noopener noreferrer">${displayName}</a> is not following anyone.</h1>
        <div class="alert alert-warning" role="alert">Cached follow list from ${new Date(fetchTime).toISOString()}</div>`;
        return;
      }

      let list = followList.data.following;
      if (list.length > 0) {
        document.getElementById("title1").innerHTML = `
        <h1 class="display-1"><a href="https://twitch.tv/${followList.data.login}" target="_blank" rel="noopener noreferrer">${displayName}</a> is following ${
          followList.data.total
        } people:</h1>
        <div class="alert alert-warning" role="alert">Cached follow list from ${new Date(
          fetchTime,
        ).toISOString()} Use the <kbd>=optout followlist</kbd> command in OkayegBOT's chat to opt out</div>`;

        for (let i = 0, j = list.length; i < j; i++) {
          let display_name = followList.data.following[i].display_name;
          let label = display_name;
          let login = followList.data.following[i].login;
          let profile_image_url = followList.data.following[i].profile_image_url ? followList.data.following[i].profile_image_url : "/pics/banned.png";
          let type = followList.data.following[i].broadcaster_type ? followList.data.following[i].broadcaster_type : "";
          let staff = followList.data.following[i].type == "staff";
          let description = followList.data.following[i].description ? followList.data.following[i].description : "";
          let followed_at = followList.data.following[i].followed_at ? followList.data.following[i].followed_at.replace("T", " ").replace("Z", " ") : "";
          if (display_name.toLowerCase() !== login.toLowerCase()) {
            label = `${login} (${display_name})`;
          }
          document.getElementById("list").innerHTML += `
          <div class="border ${profile_image_url == "/pics/banned.png" ? "border-danger" : "border-secondary"} emote">
          <a href="https://twitch.tv/${login}" target="_blank" rel="noopener noreferrer"><img src="${profile_image_url}" loading="lazy" title="${description}" alt="${display_name}">
          <div class="text-body-secondary text-center">${label}${type == "partner" ? svg : ""}${
            staff ? staffpic : ""
          }</div><div class="text-body-secondary text-center">Followed at: ${followed_at}</div>
          </div>`;
        }
      }
    } catch (error) {
      console.log("loadFollowList error", error);
    }
  }
} //loadFollowList

let ctx = "";
let myChart = "";

async function initGraph() {
  ctx = document.getElementById("chartCanvas").getContext("2d");
  let chicken = [];
  let shungite = [];
  let bajcoin = [];
  let copium = [];
  let time = [];

  try {
    let response = await fetch(`https://api.okayeg.com/stockhistory`);
    let stockHistory = await response.json();
    for (let index = 0, j = stockHistory.length; index < j; index++) {
      if (stockHistory[index].stock == "chicken") {
        chicken = [...chicken, ...stockHistory[index].data.history];
        time = [...time, ...stockHistory[index].data.historytime];
      } else if (stockHistory[index].stock == "shungite") {
        shungite = [...shungite, ...stockHistory[index].data.history];
      } else if (stockHistory[index].stock == "bajcoin") {
        bajcoin = [...bajcoin, ...stockHistory[index].data.history];
      } else if (stockHistory[index].stock == "copium") {
        copium = [...copium, ...stockHistory[index].data.history];
      }
    }

    for (let index = 0, j = time.length; index < j; index++) {
      time[index] = new Date(time[index] * 1000).toISOString().replace("T", " ").replace("Z", " ");
    }

    myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: time,
        datasets: [
          {
            label: "chicken",
            data: chicken,
            tension: 0.1,
            borderColor: "#4dc9f6",
            backgroundColor: "#4dc9f6",
          },
          {
            label: "shungite",
            data: shungite,
            tension: 0.1,
            borderColor: "#f67019",
            backgroundColor: "#f67019",
          },
          {
            label: "bajcoin",
            data: bajcoin,
            tension: 0.1,
            borderColor: "#f53794",
            backgroundColor: "#f53794",
          },
          {
            label: "copium",
            data: copium,
            tension: 0.1,
            borderColor: "#0ea600",
            backgroundColor: "#0ea600",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Okayegbot stock history",
          },
          tooltip: {
            enabled: true,
          },
          zoom: {
            pan: {
              enabled: true,
            },
            zoom: {
              wheel: {
                enabled: true,
                modifierKey: "ctrl",
              },
              pinch: {
                enabled: true,
              },
            },
          },
        },
      },
    });
  } catch (error) {
    console.log("initGraph error", error);
  }
} //initGraph

function resetZoom() {
  myChart.resetZoom();
} //resetZoom

function copyListCommand(id, event) {
  navigator.clipboard.writeText(`=nfe list ${id} [price]`);
  event.target.innerHTML = "Command copied :)";
  setTimeout(() => {
    event.target.innerHTML = `<i class="material-icons notranslate">content_copy</i>Copy list command`;
  }, 2000);
} //copyBuyCommand

async function loadStats() {
  try {
    let response = await fetch(`https://api.okayeg.com/donkstats`);
    let stats = await response.json();

    const data = {
      labels: ["Partners", "Affiliates", "Others"],
      datasets: [
        {
          label: "Channels",
          data: [stats.partners, stats.affiliates, stats.live - stats.partners - stats.affiliates],
          backgroundColor: ["rgba(191, 148, 255, 0.8)", "rgba(30, 130, 50, 0.8)", "rgba(38, 80, 158, 0.8)"],
          borderColor: ["rgba(191, 148, 255, 1)", "rgba(30, 130, 50, 1)", "rgba(38, 80, 158, 1)"],
          borderWidth: 1,
        },
      ],
    };
    const data2 = {
      labels: ["Partners", "Affiliates", "Others"],
      datasets: [
        {
          label: "Channels",
          data: [stats.partner_viewers, stats.affiliate_viewers, stats.viewers - stats.partner_viewers - stats.affiliate_viewers],
          backgroundColor: ["rgba(191, 148, 255, 0.8)", "rgba(30, 130, 50, 0.8)", "rgba(38, 80, 158, 0.8)"],
          borderColor: ["rgba(191, 148, 255, 1)", "rgba(30, 130, 50, 1)", "rgba(38, 80, 158, 1)"],
          borderWidth: 1,
        },
      ],
    };
    const data3 = {
      labels: [
        ">10,000 viewers",
        "2,000 → 10,000 viewers",
        "1,000 → 2,000 viewers",
        "500 → 1,000 viewers",
        "200 → 500 viewers",
        "100 → 200 viewers",
        "10 → 100 viewers",
        "5 → 10 viewers",
        "1 → 5 viewers",
        "1 viewer",
        "0 viewers",
      ],
      datasets: [
        {
          label: "Channels",
          data: [
            stats.tenthousand,
            stats.twothousand_tenthousand,
            stats.thousand_twothousand,
            stats.fivehundred_thousand,
            stats.twohundred_fivehundred,
            stats.hundred_twohundred,
            stats.ten_hundred,
            stats.five_ten,
            stats.one_five,
            stats.one,
            stats.zero,
          ],
          backgroundColor: [
            "rgba(165, 0, 38, 0.8)",
            "rgba(215, 48, 39, 0.8)",
            "rgba(244, 109, 67, 0.8)",
            "rgba(253, 174, 97, 0.8)",
            "rgba(254, 224, 139, 0.8)",
            "rgba(255, 255, 191, 0.8)",
            "rgba(217, 239, 139, 0.8)",
            "rgba(166, 217, 106, 0.8)",
            "rgba(102, 189, 99, 0.8)",
            "rgba(26, 152, 80, 0.8)",
            "rgba(0, 104, 55, 0.8)",
          ],
          borderColor: [
            "rgba(165, 0, 38, 1)",
            "rgba(215, 48, 39, 1)",
            "rgba(244, 109, 67, 1)",
            "rgba(253, 174, 97, 1)",
            "rgba(254, 224, 139, 1)",
            "rgba(255, 255, 191, 1)",
            "rgba(217, 239, 139, 1)",
            "rgba(166, 217, 106, 1)",
            "rgba(102, 189, 99, 1)",
            "rgba(26, 152, 80, 1)",
            "rgba(0, 104, 55, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    const config = {
      type: "pie",
      data: data,
      plugins: [ChartDataLabels],
      options: {
        plugins: {
          datalabels: {
            backgroundColor: function (context) {
              return context.dataset.backgroundColor;
            },
            borderColor: "white",
            borderRadius: 25,
            borderWidth: 1,
            color: "white",
            display: true,
            font: {
              weight: "bold",
            },
            formatter: (val, ctx) => {
              return `${ctx.chart.data.labels[ctx.dataIndex]}: ${val.toLocaleString()} (${roundToTwo((val / stats.live) * 100)}%)`;
            },
          },
          legend: { display: false },
          tooltip: { enabled: false },
        },
      },
    };

    const config2 = {
      type: "pie",
      data: data2,
      plugins: [ChartDataLabels],
      options: {
        plugins: {
          datalabels: {
            backgroundColor: function (context) {
              return context.dataset.backgroundColor;
            },
            borderColor: "white",
            borderRadius: 25,
            borderWidth: 1,
            color: "white",
            display: true,
            font: {
              weight: "bold",
            },
            formatter: (val, ctx) => {
              return `${ctx.chart.data.labels[ctx.dataIndex]}: ${val.toLocaleString()} (${roundToTwo((val / stats.viewers) * 100)}%)`;
            },
          },
          legend: { display: false },
          tooltip: { enabled: false },
        },
      },
    };

    const config3 = {
      type: "bar",
      data: data3,
      options: {
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: {
            display: true,
          },
          y: {
            display: true,
            type: "logarithmic",
          },
        },
      },
    };

    for (let element of document.getElementsByClassName("spinner-border")) {
      element.style.display = "none";
    }
    const channelsChart = new Chart(document.getElementById("channelsChart"), config);
    const viewersChart = new Chart(document.getElementById("viewersChart"), config2);
    const segmentsChart = new Chart(document.getElementById("segmentsChart"), config3);

    document.getElementById("totalChannels").innerHTML = `${stats.live.toLocaleString()}`;
    document.getElementById("totalViewers").innerHTML = `${stats.viewers.toLocaleString()}`;
    document.getElementById("totalGames").innerHTML = `${stats.sum_games.toLocaleString()}`;

    document.getElementById("partners").innerHTML = `${stats.partners.toLocaleString()} 
    <br>Partners make up only ${roundToTwo((stats.partners / stats.live) * 100)}% of streamers but have ${roundToTwo(
      (stats.partner_viewers / stats.viewers) * 100,
    )}% (${stats.partner_viewers.toLocaleString()}) of all viewers`;
    document.getElementById("affiliates").innerHTML = `${stats.affiliates.toLocaleString()} 
    <br>Affiliates make up ${roundToTwo((stats.affiliates / stats.live) * 100)}% of streamers and have ${roundToTwo(
      (stats.affiliate_viewers / stats.viewers) * 100,
    )}% (${stats.affiliate_viewers.toLocaleString()}) of all viewers`;
    document.getElementById("others").innerHTML = `${(stats.live - stats.partners - stats.affiliates).toLocaleString()} 
    <br>Others make up ${roundToTwo(((stats.live - stats.partners - stats.affiliates) / stats.live) * 100)}% of streamers and have ${roundToTwo(
      ((stats.viewers - stats.partner_viewers - stats.affiliate_viewers) / stats.viewers) * 100,
    )}% (${(stats.viewers - stats.partner_viewers - stats.affiliate_viewers).toLocaleString()}) of all viewers`;
    document.getElementById("zero").innerHTML = `${stats.zero.toLocaleString()} 
    <span class="text-body-secondary">(${roundToTwo((stats.zero / stats.live) * 100)}%)</span>`;
    document.getElementById("one").innerHTML = `${stats.one.toLocaleString()} 
    <span class="text-body-secondary">(${roundToTwo((stats.one / stats.live) * 100)}%)</span>`;
    document.getElementById("one_five").innerHTML = `${stats.one_five.toLocaleString()} 
    <span class="text-body-secondary">(${roundToTwo((stats.one_five / stats.live) * 100)}%)</span>`;
    document.getElementById("five_ten").innerHTML = `${stats.five_ten.toLocaleString()} 
    <span class="text-body-secondary">(${roundToTwo((stats.five_ten / stats.live) * 100)}%)</span>`;
    document.getElementById("ten_hundred").innerHTML = `${stats.ten_hundred.toLocaleString()} 
    <span class="text-body-secondary">(${roundToTwo((stats.ten_hundred / stats.live) * 100)}%)</span>`;
    document.getElementById("hundred_twohundred").innerHTML = `${stats.hundred_twohundred.toLocaleString()} 
    <span class="text-body-secondary">(${roundToTwo((stats.hundred_twohundred / stats.live) * 100)}%)</span>`;
    document.getElementById("twohundred_fivehundred").innerHTML = `${stats.twohundred_fivehundred.toLocaleString()} 
    <span class="text-body-secondary">(${roundToTwo((stats.twohundred_fivehundred / stats.live) * 100)}%)</span>`;
    document.getElementById("fivehundred_thousand").innerHTML = `${stats.fivehundred_thousand.toLocaleString()} 
    <span class="text-body-secondary">(${roundToTwo((stats.fivehundred_thousand / stats.live) * 100)}%)</span>`;
    document.getElementById("thousand_twothousand").innerHTML = `${stats.thousand_twothousand.toLocaleString()} 
    <span class="text-body-secondary">(${roundToTwo((stats.thousand_twothousand / stats.live) * 100)}%)</span>`;
    document.getElementById("twothousand_tenthousand").innerHTML = `${stats.twothousand_tenthousand.toLocaleString()} 
    <span class="text-body-secondary">(${roundToTwo((stats.twothousand_tenthousand / stats.live) * 100)}%)</span>`;
    document.getElementById("tenthousand").innerHTML = `${stats.tenthousand.toLocaleString()} 
    <span class="text-body-secondary">(${roundToTwo((stats.tenthousand / stats.live) * 100)}%)</span>`;

    document.getElementById("avg_viewcount").innerHTML = roundToTwo(stats.viewers / stats.live).toLocaleString();
    document.getElementById("median_viewcount").innerHTML = roundToTwo(stats.medianviewers).toLocaleString();
    document.getElementById("avg_uptime").innerHTML = convertTime(stats.avguptime);
    document.getElementById("median_uptime").innerHTML = convertTime(stats.medianuptime);

    for (let index = 0; index < 10; index++) {
      document.getElementById(`lang${index}`).innerHTML = getLanguage(stats.languages[index]._id);
      document.getElementById(`lang${index}_channels`).innerHTML = `${stats.languages[index].count.toLocaleString()}
      <span class="text-body-secondary">(${roundToTwo((stats.languages[index].count / stats.live) * 100)}%)</span>`;
      document.getElementById(`lang${index}_avg`).innerHTML = stats.languages[index].avg_viewers;
      document.getElementById(`lang${index}_max`).innerHTML = stats.languages[index].max_viewers.toLocaleString();
    }

    function load100Langs() {
      let list = "";
      for (let index = 10; index < stats.languages.length; index++) {
        list += `<div class="row">
          <div class="col align-self-center">
          ${getLanguage(stats.languages[index]._id)}
          </div>
          <div class="col align-self-start">
          ${stats.languages[index].count.toLocaleString()}
          <span class="text-body-secondary">(${roundToTwo((stats.languages[index].count / stats.live) * 100)}%)</span>
          </div>
          <div class="col align-self-start">
          ${stats.languages[index].avg_viewers}
          </div>
          <div class="col align-self-start">
          ${stats.languages[index].max_viewers.toLocaleString()}
          </div>
        </div>`;
      }
      document.getElementById("langDiv").innerHTML += list;
      document.getElementById("load100Langs").style.display = "none";
      document.getElementById("langHeader").innerHTML = "Top languages";
    }
    loadStats.load100Langs = load100Langs;

    for (let index = 0; index < 10; index++) {
      document.getElementById(`tag${index}`).innerHTML = stats.top_tags[index].tag;
      document.getElementById(`tag${index}_channels`).innerHTML = `${stats.top_tags[index].channels.toLocaleString()}
      <span class="text-body-secondary">(${roundToTwo((stats.top_tags[index].channels / stats.live) * 100)}%)</span>`;
      document.getElementById(`tag${index}_avg`).innerHTML = roundToTwo(stats.top_tags[index].viewers / stats.top_tags[index].channels).toLocaleString();
    }

    function load100Tags() {
      let list = "";
      for (let index = 10; index < 100; index++) {
        list += `
          <div class="row">
            <div class="col align-self-center">
            ${stats.top_tags[index].tag}
             </div>
            <div class="col align-self-start">
            ${stats.top_tags[index].channels.toLocaleString()}
            <span class="text-body-secondary">(${roundToTwo((stats.top_tags[index].channels / stats.live) * 100)}%)</span>
            </div>
            <div class="col align-self-start">
            <span class="placeholder-wave">${roundToTwo(stats.top_tags[index].viewers / stats.top_tags[index].channels).toLocaleString()}</span>
          </div>
          </div>`;
      }
      document.getElementById("tagsDiv").innerHTML += list;
      document.getElementById("load100Tags").style.display = "none";
      document.getElementById("tagCount").innerHTML = "100";
    }
    loadStats.load100Tags = load100Tags;

    document.getElementById("total_tags").innerHTML = `${stats.total_tags.toLocaleString()}`;
    document.getElementById("sum_tags").innerHTML = roundToTwo(stats.sum_tags / stats.live);

    document.getElementById("defaultpfp").innerHTML = `${stats.defaultpfp.toLocaleString()} 
    <span class="text-body-secondary">(${roundToTwo((stats.defaultpfp / stats.live) * 100)}%)</span>`;

    document.getElementById("nodesc").innerHTML = `${stats.nodesc.toLocaleString()} 
    <span class="text-body-secondary">(${roundToTwo((stats.nodesc / stats.live) * 100)}%)</span>`;

    document.getElementById("notitle").innerHTML = `${stats.notitle.toLocaleString()} 
    <span class="text-body-secondary">(${roundToTwo((stats.notitle / stats.live) * 100)}%)</span>`;

    document.getElementById("nogame").innerHTML = `${stats.nogame.toLocaleString()} 
    <span class="text-body-secondary">(${roundToTwo((stats.nogame / stats.live) * 100)}%)</span>`;

    document.getElementById("drops").innerHTML = `${stats.drops.toLocaleString()} 
    <span class="text-body-secondary">(${roundToTwo((stats.drops / stats.live) * 100)}%)</span>`;

    document.getElementById("ccl_DrugsIntoxication").innerHTML = `
    ${stats.ccls["DrugsIntoxication"].channels.toLocaleString()} channels
    <span class="text-body-secondary">(${roundToTwo((stats.ccls["DrugsIntoxication"].channels / stats.live) * 100)}%)</span> - 
    Average view count: ${roundToTwo(stats.ccls["DrugsIntoxication"].viewers / stats.ccls["DrugsIntoxication"].channels).toLocaleString()}`;
    document.getElementById("ccl_Gambling").innerHTML = `
    ${stats.ccls["Gambling"].channels.toLocaleString()} channels
    <span class="text-body-secondary">(${roundToTwo((stats.ccls["Gambling"].channels / stats.live) * 100)}%)</span> - 
    Average view count: ${roundToTwo(stats.ccls["Gambling"].viewers / stats.ccls["Gambling"].channels).toLocaleString()}`;
    document.getElementById("ccl_MatureGame").innerHTML = `
    ${stats.ccls["MatureGame"].channels.toLocaleString()} channels
    <span class="text-body-secondary">(${roundToTwo((stats.ccls["MatureGame"].channels / stats.live) * 100)}%)</span> - 
    Average view count: ${roundToTwo(stats.ccls["MatureGame"].viewers / stats.ccls["MatureGame"].channels).toLocaleString()}`;
    document.getElementById("ccl_ProfanityVulgarity").innerHTML = `
    ${stats.ccls["ProfanityVulgarity"].channels.toLocaleString()} channels
    <span class="text-body-secondary">(${roundToTwo((stats.ccls["ProfanityVulgarity"].channels / stats.live) * 100)}%)</span> - 
    Average view count: ${roundToTwo(stats.ccls["ProfanityVulgarity"].viewers / stats.ccls["ProfanityVulgarity"].channels).toLocaleString()}`;
    document.getElementById("ccl_SexualThemes").innerHTML = `
    ${stats.ccls["SexualThemes"].channels.toLocaleString()} channels
    <span class="text-body-secondary">(${roundToTwo((stats.ccls["SexualThemes"].channels / stats.live) * 100)}%)</span> - 
    Average view count: ${roundToTwo(stats.ccls["SexualThemes"].viewers / stats.ccls["SexualThemes"].channels).toLocaleString()}`;
    document.getElementById("ccl_ViolentGraphic").innerHTML = `
    ${stats.ccls["ViolentGraphic"].channels.toLocaleString()} channels
    <span class="text-body-secondary">(${roundToTwo((stats.ccls["ViolentGraphic"].channels / stats.live) * 100)}%)</span> - 
    Average view count: ${roundToTwo(stats.ccls["ViolentGraphic"].viewers / stats.ccls["ViolentGraphic"].channels).toLocaleString()}`;

    document.getElementById("oldest_user").innerHTML = `
    <div class="container-fluid">
    <div class="row">
      <div class="col-md-4">
      <a href="https://twitch.tv/${stats.oldest_user.username}" target="_blank" rel="noopener noreferrer">
        <img src="${stats.oldest_user.profile_image_url}" class="img-fluid rounded-start donkstats-pfp" title="${stats.oldest_user.display_name}" alt="${stats.oldest_user.display_name}"></a>
      </div>
      <div class="col">
        <div class="card-body">
          <h5 class="card-title"><a href="https://twitch.tv/${stats.oldest_user.username}" target="_blank" rel="noopener noreferrer">${
      stats.oldest_user.username == stats.oldest_user.display_name.toLowerCase() ? ` ${stats.oldest_user.display_name}` : ` ${stats.oldest_user.display_name} (${stats.oldest_user.username})`
    }${stats.oldest_user.broadcaster_type == "partner" ? svg : ""}${stats.oldest_user.type == "staff" ? staffpic : ""}</a></h5>
          <p class="card-text">
          Account created ${relativeTime(Date.now() - stats.oldest_user.age_timestamp)} ago <span class="text-body-secondary">(${new Date(stats.oldest_user.age_timestamp)
      .toISOString()
      .replace("T", " ")
      .replace("Z", "")})</span> <br>
          ${stats.oldest_user.game_name || "<span class='text-body-secondary'>No category</span>"} • ${stats.oldest_user.viewers.toLocaleString()} ${
      stats.oldest_user.viewers == 1 ? "Viewer" : "Viewers"
    }
          </p>
        </div>
      </div>
    </div>
  </div>`;

    document.getElementById("newest_user").innerHTML = `
  <div class="container-fluid">
  <div class="row">
    <div class="col-md-4">
    <a href="https://twitch.tv/${stats.newest_user.username}" target="_blank" rel="noopener noreferrer">
      <img src="${stats.newest_user.profile_image_url}" class="img-fluid rounded-start donkstats-pfp" title="${stats.newest_user.display_name}" alt="${stats.newest_user.display_name}"></a>
    </div>
    <div class="col">
      <div class="card-body">
        <h5 class="card-title"><a href="https://twitch.tv/${stats.newest_user.username}" target="_blank" rel="noopener noreferrer">${
      stats.newest_user.username == stats.newest_user.display_name.toLowerCase() ? ` ${stats.newest_user.display_name}` : ` ${stats.newest_user.display_name} (${stats.newest_user.username})`
    }${stats.newest_user.broadcaster_type == "partner" ? svg : ""}${stats.newest_user.type == "staff" ? staffpic : ""}</a></h5>
        <p class="card-text">
        Account created ${relativeTime(Date.now() - stats.newest_user.age_timestamp)} ago <span class=text-body-secondary>(${new Date(stats.newest_user.age_timestamp)
      .toISOString()
      .replace("T", " ")
      .replace("Z", "")})</span><br>
        ${stats.newest_user.game_name || "<span class='text-body-secondary'>No category</span>"} • ${stats.newest_user.viewers.toLocaleString()} ${
      stats.newest_user.viewers == 1 ? "Viewer" : "Viewers"
    }
        </p>
      </div>
    </div>
  </div>
</div>`;

    let most_streamed_link = await checkPic(`https://static-cdn.jtvnw.net/ttv-boxart/${stats.most_streamed.id}-285x380.jpg`);
    document.getElementById("most_streamed_img").src = `https://static-cdn.jtvnw.net/ttv-boxart/${stats.most_streamed.id}${most_streamed_link ? "" : "_IGDB"}-285x380.jpg`;
    document.getElementById("most_streamed_img").title = stats.most_streamed.name;
    document.getElementById("most_streamed_img").alt = stats.most_streamed.name;
    document.getElementById("most_streamed").innerHTML = `
    <h5 class="card-title">
    <a href="https://www.twitch.tv/directory/game/${encodeURIComponent(stats.most_streamed.name)}" target="_blank" rel="noopener noreferrer">${stats.most_streamed.name}</a>
    </h5>
    <p class="card-text">
    ${stats.most_streamed.viewers.toLocaleString()} Viewers <span class="text-body-secondary">(${roundToTwo((stats.most_streamed.viewers / stats.viewers) * 100)}%)</span><br>
    ${stats.most_streamed.channels.toLocaleString()} Live Channels <span class="text-body-secondary">(${roundToTwo((stats.most_streamed.channels / stats.live) * 100)}%)</span><br>
    </p>`;

    let highest_ratio_link = await checkPic(`https://static-cdn.jtvnw.net/ttv-boxart/${stats.highest_ratio.id}-285x380.jpg`);
    document.getElementById("highest_ratio_img").src = `https://static-cdn.jtvnw.net/ttv-boxart/${stats.highest_ratio.id}${highest_ratio_link ? "" : "_IGDB"}-285x380.jpg`;
    document.getElementById("highest_ratio_img").title = stats.highest_ratio.name;
    document.getElementById("highest_ratio_img").alt = stats.highest_ratio.name;
    document.getElementById("highest_ratio").innerHTML = `
    <h5 class="card-title">
    <a href="https://www.twitch.tv/directory/game/${encodeURIComponent(stats.highest_ratio.name)}" target="_blank" rel="noopener noreferrer">${stats.highest_ratio.name}</a>
    </h5>
    <p class="card-text">
    Only ${stats.highest_ratio.channels} live ${stats.highest_ratio.channels == 1 ? "channel" : "channels"} with a total of ${stats.highest_ratio.viewers.toLocaleString()} viewers</p>`;

    load_least_popular();
    async function load_least_popular(direction = "random") {
      let categoryIndex;
      switch (direction) {
        case "next":
          categoryIndex = parseInt(document.getElementById("least_popular").dataset.index, 10);
          categoryIndex++;
          break;
        case "back":
          categoryIndex = parseInt(document.getElementById("least_popular").dataset.index, 10);
          categoryIndex--;
          break;
        default:
          categoryIndex = Math.floor(Math.random() * stats.least_popular.length);
      }
      document.getElementById("least_popular").dataset.index = categoryIndex;
      let random = stats.least_popular[categoryIndex % stats.least_popular.length];
      let least_popular_link = await checkPic(`https://static-cdn.jtvnw.net/ttv-boxart/${random.game_id}-285x380.jpg`);

      document.getElementById("least_popular_img").src = `https://static-cdn.jtvnw.net/ttv-boxart/${random.game_id}${least_popular_link ? "" : "_IGDB"}-285x380.jpg`;
      document.getElementById("least_popular_img").title = stats.least_popular.name;
      document.getElementById("least_popular_img").alt = stats.least_popular.name;
      document.getElementById("least_popular").innerHTML = `
      <h4 class="card-title">
      <a href="https://www.twitch.tv/directory/game/${encodeURIComponent(random.game_name)}" target="_blank" rel="noopener noreferrer">${random.game_name}</a>
      </h4>
      <p class="card-text text-body-secondary">
      Multiple categories (${stats.least_popular.length}) meet this condition, use the buttons below to see more categories
      </p>
      <div class="btn-group float-end" role="group" aria-label="least popular categories browser">
          <button type="button" onclick="loadStats.load_least_popular('back')" class="btn btn-secondary"><i class="material-icons notranslate">arrow_back</i></button>
          <button type="button" onclick="loadStats.load_least_popular('next')" class="btn btn-secondary"><i class="material-icons notranslate">arrow_forward</i></button>
      </div>`;
    }
    loadStats.load_least_popular = load_least_popular;

    document.getElementById("info").innerHTML = `Stats updated on ${new Date(stats.time)}`;
    if (Date.now() - stats.time > 7200000) {
      document.getElementById("outdatedWarningText").innerHTML = `Stats are outdated, last update on ${new Date(stats.time)}. Try refreshing or contacting me :)`;
      document.getElementById("outdatedWarning").style.display = "";
    }
  } catch (error) {
    console.log(error);
  }

  enableTooltips();
} //loadStats

function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
} //roundToTwo

function convertTime(time) {
  let diff = (new Date() - time) / 1000;
  return new Date(diff * 1000).toISOString().substr(11, 8);
} //convertTime

function convertTime2(time) {
  let t = (Date.now() - time) / 1000;
  let seconds = Number(t);
  let d = Math.floor(seconds / (3600 * 24));
  let h = Math.floor((seconds % (3600 * 24)) / 3600);
  let m = Math.floor((seconds % 3600) / 60);
  let s = Math.floor(seconds % 60);
  let dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
  let hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  let mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  let sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  if (d >= 1) {
    return dDisplay + hDisplay.slice(0, -2);
  }
  if (h >= 1) {
    return dDisplay + hDisplay + mDisplay.slice(0, -2);
  }
  return dDisplay + hDisplay + mDisplay + sDisplay;
} //convertTime2

async function checkPic(link) {
  let response = await fetch(link);
  return response.url == link;
} //checkPic

async function loadUserInfo() {
  let input = location.hash;
  let username = input.replace("#", "").toLowerCase().replace(/\s/g, "");
  if (document.getElementById("username").value) {
    username = document.getElementById("username").value.toLowerCase().replace(/\s/g, "");
  } else {
    document.getElementById("username").value = username;
  }

  if (username) {
    document.getElementById("output").innerHTML = spinner;
    document.getElementById("info").style.display = "";

    try {
      let response = await fetch(`https://helper.donk.workers.dev/twitch/users?login=${username}`);
      let result = await response.json();
      if (result?.data[0]?.id) {
        document.getElementById("output").innerHTML = "";
        document.getElementById(
          "name",
        ).innerHTML = `<a href="https://twitch.tv/${result.data[0].login}" id="linkText" target="_blank" rel="noopener noreferrer">${result.data[0].display_name}</a>'s Info`;
        document.getElementById("userid").innerHTML = result.data[0].id;
        document.getElementById("login").innerHTML = result.data[0].login;
        document.getElementById("displayname").innerHTML = result.data[0].display_name;
        document.getElementById("usertype").innerHTML = result.data[0].type || `<span class="text-body-secondary">Normal user</span>`;
        document.getElementById("broadcastertype").innerHTML = result.data[0].broadcaster_type || `<span class="text-body-secondary">Normal broadcaster</span>`;
        document.getElementById("description").innerHTML = result.data[0].description;
        document.getElementById("accountage").innerHTML = `${relativeTime(Date.now() - new Date(result.data[0].created_at))} (${result.data[0].created_at})`;

        if (result.data[0].profile_image_url) {
          document.getElementById("profilepicture").classList = "text-center ratio ratio-1x1";
          document.getElementById(
            "profilepicture",
          ).innerHTML = `<img src="${result.data[0].profile_image_url}" class="rounded mx-auto d-block" title="${result.data[0].login}'s profile picture" alt="${result.data[0].login}'s profile picture" />`;
        } else {
          document.getElementById("profilepicture").classList = "text-center";
          document.getElementById("profilepicture").innerHTML = `<span class="text-body-secondary">No profile picture found</span>`;
        }
        if (result.data[0].offline_image_url) {
          document.getElementById("offlineimage").classList = "text-center ratio ratio-16x9";
          document.getElementById(
            "offlineimage",
          ).innerHTML = `<img src="${result.data[0].offline_image_url}" class="rounded mx-auto d-block" title="${result.data[0].login}'s offline image" alt="${result.data[0].login}'s offline image" />`;
        } else {
          document.getElementById("offlineimage").classList = "text-center";
          document.getElementById("offlineimage").innerHTML = `<span class="text-body-secondary">No offline image found</span>`;
        }

        let response2 = await fetch(`https://helper.donk.workers.dev/twitch/streams?user_id=${result.data[0].id}`);
        let result2 = await response2.json();
        if (result2?.data[0]) {
          //channel is live
          document.getElementById("channelstatus").innerHTML = `Live`;
          document.getElementById("uptime").innerHTML = relativeTime(Date.now() - new Date(result2.data[0].started_at));
          document.getElementById("category").innerHTML =
            `<a href="https://www.twitch.tv/directory/game/${result2.data[0].game_name}" target="_blank" rel="noopener noreferrer">${result2.data[0].game_name}</a>` ||
            `<span class="text-body-secondary">None</span>`;
          document.getElementById("title").innerHTML = result2.data[0].title || `<span class="text-body-secondary">None</span>`;
          document.getElementById("viewcount").innerHTML = `${result2.data[0].viewer_count.toLocaleString()} ${result2.data[0].viewer_count == 1 ? "viewer" : "viewers"}`;
          let tags = "";
          for (let index = 0; index < result2.data[0].tags.length; index++) {
            tags += `<span class="badge rounded-pill text-bg-secondary">${result2.data[0].tags[index]}</span> `;
          }
          document.getElementById("tags").innerHTML = tags || `<span class="text-body-secondary">None</span>`;
          document.getElementById("language").innerHTML = getLanguage(result2.data[0].language);
          if (result2.data[0].thumbnail_url) {
            document.getElementById("thumbnail").classList = "text-center ratio ratio-16x9";
            document.getElementById("thumbnail").innerHTML = `<img src="${result2.data[0].thumbnail_url.replace("{width}x{height}", "1280x720")}" class="rounded mx-auto d-block" 
          title="${result.data[0].login}'s Stream thumbnail" alt="${result.data[0].login}'s Stream thumbnail" />`;
          } else {
            document.getElementById("thumbnail").classList = "text-center";
            document.getElementById("thumbnail").innerHTML = `<span class="text-body-secondary">No thumbnail found</span>`;
          }
        } else {
          //channel is offline
          let response3 = await fetch(`https://helper.donk.workers.dev/twitch/channels?broadcaster_id=${result.data[0].id}`);
          let result3 = await response3.json();
          if (result3?.data[0]) {
            document.getElementById("channelstatus").innerHTML = `Offline`;
            document.getElementById("uptime").innerHTML = `<span class="text-body-secondary">Channel is offline</span>`;
            document.getElementById("category").innerHTML =
              `<a href="https://www.twitch.tv/directory/game/${result3.data[0].game_name}" target="_blank" rel="noopener noreferrer">${result3.data[0].game_name}</a>` ||
              `<span class="text-body-secondary">None</span>`;
            document.getElementById("title").innerHTML = result3.data[0].title || `<span class="text-body-secondary">None</span>`;
            document.getElementById("viewcount").innerHTML = `<span class="text-body-secondary">Channel is offline</span>`;
            let tags = "";
            for (let index = 0; index < result3.data[0].tags.length; index++) {
              tags += `<span class="badge rounded-pill text-bg-secondary">${result3.data[0].tags[index]}</span> `;
            }
            document.getElementById("tags").innerHTML = tags || `<span class="text-body-secondary">None</span>`;
            document.getElementById("language").innerHTML = getLanguage(result3.data[0].broadcaster_language);
            document.getElementById("thumbnail").classList = "text-center";
            document.getElementById("thumbnail").innerHTML = `<span class="text-body-secondary">No thumbnail found</span>`;
          }
        }

        let response4 = await fetch(`https://helper.donk.workers.dev/twitch/schedule?broadcaster_id=${result.data[0].id}`);
        let result4 = await response4.json();
        if (result4?.data?.segments) {
          document.getElementById("upcomingstream").innerHTML = `${relativeTime(
            new Date(result4.data.segments[0].end_time).getTime() - new Date(result4.data.segments[0].start_time).getTime(),
          )} ${result4.data.segments[0]?.category?.name || ""} stream titled "${result4.data.segments[0]?.title.trim() || ""}"  
          Starting in ${relativeTime(new Date(result4.data.segments[0].start_time).getTime() - Date.now())}`;
        } else {
          document.getElementById("upcomingstream").innerHTML = `<span class="text-body-secondary">Could not load schedule</span>`;
        }

        let response5 = await fetch(`https://helper.donk.workers.dev/twitch/users/extensions?user_id=${result.data[0].id}`);
        let result5 = await response5.json();
        if (result5?.data?.component[1]?.active || result5?.data?.component[2]?.active) {
          document.getElementById("componentextensions").innerHTML = "<br>";
          for (let key in result5.data.component) {
            if (result5.data.component[key].active) {
              document.getElementById("componentextensions").innerHTML += `
                <a href="https://dashboard.twitch.tv/extensions/${result5.data.component[key].id}" target="_blank" rel="noopener noreferrer">
                ${result5.data.component[key].name}</a><br>`;
            }
          }
        } else {
          document.getElementById("componentextensions").innerHTML = `<span class="text-body-secondary">None</span>`;
        }
        if (result5?.data?.overlay[1]?.active) {
          document.getElementById("panelextensions").innerHTML = "<br>";
          for (let key in result5.data.overlay) {
            if (result5.data.overlay[key].active) {
              document.getElementById("overlayextensions").innerHTML += `
                <a href="https://dashboard.twitch.tv/extensions/${result5.data.overlay[key].id}" target="_blank" rel="noopener noreferrer">
                ${result5.data.overlay[key].name}</a><br>`;
            }
          }
        } else {
          document.getElementById("overlayextensions").innerHTML = `<span class="text-body-secondary">None</span>`;
        }
        if (result5?.data?.panel[1]?.active || result5?.data?.panel[2]?.active || result5?.data?.panel[3]?.active) {
          document.getElementById("panelextensions").innerHTML = "<br>";
          for (let key in result5.data.panel) {
            if (result5.data.panel[key].active) {
              document.getElementById("panelextensions").innerHTML += `
                <a href="https://dashboard.twitch.tv/extensions/${result5.data.panel[key].id}" target="_blank" rel="noopener noreferrer">
                ${result5.data.panel[key].name}</a><br>`;
            }
          }
        } else {
          document.getElementById("panelextensions").innerHTML = `<span class="text-body-secondary">None</span>`;
        }

        let response6 = await fetch(`https://helper.donk.workers.dev/twitch/teams/channel?broadcaster_id=${result.data[0].id}`);
        let result6 = await response6.json();
        if (result6?.data) {
          document.getElementById("teams").innerHTML = ``;
          for (let index = 0; index < result6.data.length; index++) {
            document.getElementById("teams").innerHTML += `
            <h1 class="display-6"><a href="https://www.twitch.tv/team/${result6.data[index].team_name}" target="_blank" rel="noopener noreferrer">
            ${result6.data[index].team_display_name}</a></h1>
            <img src="${result6.data[index].thumbnail_url}" class="rounded ratio ratio-1x1 mx-auto d-block" title="${result6.data[index].team_display_name}'s team logo" alt="${result6.data[index].team_display_name}'s team logo" /><br>`;
          }
        } else {
          document.getElementById("teams").innerHTML = `<span class="text-body-secondary">None</span>`;
        }

        let response7 = await fetch(`https://helper.donk.workers.dev/twitch/chat/settings?broadcaster_id=${result.data[0].id}`);
        let result7 = await response7.json();
        if (result7?.data[0]?.emote_mode || result7?.data[0]?.follower_mode || result7?.data[0]?.slow_mode || result7?.data[0]?.subscriber_mode || result7?.data[0]?.unique_chat_mode) {
          document.getElementById("chatsettings").innerHTML = "<br>";
          document.getElementById("chatsettings").innerHTML += `
            ${result7.data[0].emote_mode ? "Emote only mode<br>" : ""}
            ${result7.data[0].follower_mode ? `Followers only mode (${relativeTime(result7.data[0].follower_mode_duration * 60000).trim() || "0 minutes"})<br>` : ""}
            ${result7.data[0].slow_mode ? `Slow mode (${relativeTime(result7.data[0].slow_mode_wait_time * 1000).trim()})<br>` : ""}
            ${result7.data[0].subscriber_mode ? "Subscribers only mode<br>" : ""}
            ${result7.data[0].unique_chat_mode ? "Unique-chat mode<br>" : ""}`;
        } else {
          document.getElementById("chatsettings").innerHTML = `<span class="text-body-secondary">None</span>`;
        }

        let response8 = await fetch(`https://helper.donk.workers.dev/twitch/chat/color?user_id=${result.data[0].id}`);
        let result8 = await response8.json();
        if (result8?.data) {
          document.getElementById("linkText").style.color = result8.data[0].color;
          let colors = {
            "#0000FF": "Blue",
            "#8A2BE2": "BlueViolet",
            "#5F9EA0": "CadetBlue",
            "#D2691E": "Chocolate",
            "#FF7F50": "Coral",
            "#1E90FF": "DodgerBlue",
            "#B22222": "Firebrick",
            "#008000": "Green",
            "#DAA520": "GoldenRod",
            "#FF69B4": "HotPink",
            "#FF4500": "OrangeRed",
            "#FF0000": "Red",
            "#2E8B57": "SeaGreen",
            "#00FF7F": "SpringGreen",
            "#9ACD32": "YellowGreen",
          };
          document.getElementById("chatcolor").innerHTML = `<span style="color: ${result8.data[0].color}">${result8.data[0].color} <span>
          <span class="text-body-secondary">${result8.data[0].color in colors ? `Default Twitch color "${colors[result8.data[0].color]}"` : "Custom color (Twitch Turbo/Prime user)"}</span>`;
        }
      } else {
        document.getElementById("output").innerHTML = `<p class="text-warning">Could not load ${username}'s info</p>`;
      }
    } catch (error) {
      console.log(error);
      document.getElementById("output").innerHTML = `<p class="text-warning">Could not load ${username}'s info</p>`;
    }
  }
} //loadUserInfo

async function findTimestamp() {
  document.getElementById("output").innerHTML = "";
  let input = document.getElementById("exactTime").value;
  let channel = document.getElementById("channel").value.toLowerCase().replace(/\s/g, "");
  if (!channel) {
    document.getElementById("output").innerHTML = "No Channel provided";
    return;
  }
  if (!input) {
    document.getElementById("output").innerHTML = "No time provided";
    return;
  }
  let target = new Date(input).getTime();
  try {
    let response = await fetch(`https://helper.donk.workers.dev/twitch/users?login=${channel}`);
    let result = await response.json();
    if (!result?.data[0]?.id) {
      document.getElementById("output").innerHTML = "Channel not found";
      return;
    }

    let response2 = await fetch(`https://helper.donk.workers.dev/twitch/videos?user_id=${result.data[0].id}&first=100`);
    let result2 = await response2.json();
    if (!result2?.data[0]) {
      document.getElementById("output").innerHTML = "Could not find any VODs for the given channel";
    }
    let found = false;
    for (let index = 0; index < result2.data.length; index++) {
      let startTime = new Date(result2.data[index].created_at).getTime();
      let duration = convertDuration(result2.data[index].duration) * 1000;
      let endTime = new Date(startTime + duration).getTime();
      if (target >= startTime && target <= endTime) {
        found = true;
        let timestamp = secondsToTwitchStupidTime(Math.round((target - startTime) / 1000));
        document.getElementById("output").innerHTML = `VOD link with timestamp: <a href="${result2.data[index].url}?t=${timestamp}" target="_blank" rel="noopener noreferrer">
        ${result2.data[index].url}?t=${timestamp}</a>
        <br><div id="embed" class="ratio ratio-16x9"></div>`;
        new Twitch.Embed("embed", {
          width: "100%",
          height: "100%",
          video: result2.data[index].id,
          time: timestamp,
          parent: ["okayeg.com"],
        });
      }
    }
    if (!found) {
      document.getElementById("output").innerHTML = "Could not find any VODs at the provided time";
    }
  } catch (error) {
    console.log(error);
    document.getElementById("output").innerHTML = "Something went wrong :( " + error?.message;
  }
} //findTimestamp

async function findClipTimestamp() {
  document.getElementById("output").innerHTML = "";
  try {
    let channel = document.getElementById("channelClip").value.toLowerCase().replace(/\s/g, "");
    let clip = document.getElementById("clip").value.replace(/\s/g, "");
    let clipURL = new URL(clip);
    let clipID =
      clipURL.hostname === "clips.twitch.tv"
        ? /^\/(\w+(?:\/[A-Z]\w+)?(?:[\-\w]*))(?:\/|$)/.exec(clipURL.pathname)
        : /^\/\w+\/clip\/(\w+(?:\/[A-Z]\w+)?(?:[\-\w]*))(?:\/|$)/.exec(clipURL.pathname);

    if (!channel) {
      document.getElementById("output").innerHTML = "No Channel provided";
      return;
    }
    if (!clip) {
      document.getElementById("output").innerHTML = "No clip provided";
      return;
    }
    if (!clipID[1]) {
      document.getElementById("output").innerHTML = "Could not find clip ID from provided link";
      return;
    }

    let response1 = await fetch(`https://helper.donk.workers.dev/twitch/users?login=${channel}`);
    let result1 = await response1.json();
    if (!result1?.data[0]?.id) {
      document.getElementById("output").innerHTML = "Channel not found";
      return;
    }

    let response = await fetch(`https://helper.donk.workers.dev/twitch/clips?id=${clipID[1]}`);
    let result = await response.json();
    if (!result?.data[0]?.broadcaster_id) {
      document.getElementById("output").innerHTML = "Could not find clip info";
      return;
    }

    if (result?.data[0]?.broadcaster_name?.toLowerCase() == channel) {
      document.getElementById("output").innerHTML = "Clip channel and provided channel must be different";
      return;
    }

    let target;
    if (result?.data[0]?.video_id && result?.data[0]?.vod_offset) {
      let response3 = await fetch(`https://helper.donk.workers.dev/twitch/videos?id=${result.data[0].video_id}`);
      let result3 = await response3.json();
      target = new Date(result3.data[0].created_at).getTime() + result.data[0].vod_offset * 1000;
    } else {
      target = new Date(result.data[0].created_at).getTime();
    }

    let response2 = await fetch(`https://helper.donk.workers.dev/twitch/videos?user_id=${result1.data[0].id}&first=100`);
    let result2 = await response2.json();
    if (!result2?.data[0]) {
      document.getElementById("output").innerHTML = "Could not find any VODs that were live at the time the clip was created";
    }
    let found = false;
    for (let index = 0; index < result2.data.length; index++) {
      let startTime = new Date(result2.data[index].created_at).getTime();
      let duration = convertDuration(result2.data[index].duration) * 1000;
      let endTime = new Date(startTime + duration).getTime();
      if (target >= startTime && target <= endTime) {
        found = true;
        let timestamp = secondsToTwitchStupidTime(Math.round((target - startTime) / 1000));
        document.getElementById("output").innerHTML = `VOD link with timestamp: <a href="${result2.data[index].url}?t=${timestamp}" target="_blank" rel="noopener noreferrer">
        ${result2.data[index].url}?t=${timestamp}</a>
        <br><div id="embed" class="ratio ratio-16x9"></div>`;
        new Twitch.Embed("embed", {
          width: "100%",
          height: "100%",
          video: result2.data[index].id,
          time: timestamp,
          parent: ["okayeg.com"],
        });
      }
    }
    if (!found) {
      document.getElementById("output").innerHTML = "Could not find any VODs that were live at the time the clip was created";
    }
  } catch (error) {
    console.log(error);
    document.getElementById("output").innerHTML = "Something went wrong :( " + error?.message;
  }
} //findClipTimestamp

function convertDuration(duration) {
  const durationRegex = /(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/;
  const match = durationRegex.exec(duration);
  if (!match) {
    throw new Error("Invalid duration format");
  }
  const [, hours, minutes, seconds] = match;
  let totalSeconds = 0;
  if (hours) {
    totalSeconds += parseInt(hours) * 60 * 60;
  }
  if (minutes) {
    totalSeconds += parseInt(minutes) * 60;
  }
  if (seconds) {
    totalSeconds += parseInt(seconds);
  }
  return totalSeconds;
} //convertDuration

function secondsToTimeString(seconds) {
  let string = "";
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  const sec = seconds % 60;
  if (hours) {
    string += hours + ":";
  }
  if (minutes) {
    string += minutes + ":";
  }
  if (sec && !minutes) {
    string += "00:";
  }
  if (sec) {
    string += sec;
  }
  return string;
} //secondsToTimeString

function secondsToTwitchStupidTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${hours}h${minutes}m${sec}s`;
} //secondsToTwitchStupidTime

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

  document.getElementById("map").innerHTML = "";
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

function loadGlobalRecap() {
  document.getElementById("global").style.display = "";
  document.getElementById("user").style.display = "none";
  window.scrollTo({ top: 0, behavior: "smooth" });
  history.replaceState(undefined, undefined, "#");
  document.getElementById("username").value = "";
} //loadGlobalRecap

/**
 * @description replace <, >, &, ', ", `, \ and / with HTML entities. - from https://github.com/validatorjs/validator.js
 * @param {*} str
 * @returns {*}
 */
function escapeString(str) {
  assertString(str);
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\//g, "&#x2F;")
    .replace(/\\/g, "&#x5C;")
    .replace(/`/g, "&#96;");
} //escapeString

function assertString(input) {
  let isString = typeof input === "string" || input instanceof String;
  if (!isString) {
    let invalidType = _typeof(input);
    if (input === null) invalidType = "null";
    else if (invalidType === "object") invalidType = input.constructor.name;
    throw new TypeError("Expected a string but received a ".concat(invalidType));
  }
} //assertString
