<script>
  import { escapeString, months } from "$lib/functions";
  import IcBaselinePublic from "~icons/ic/baseline-public";
  import IcBaselineSearch from "~icons/ic/baseline-search";

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
</script>

<svelte:head>
  <title>Emotes | OkayegBOT</title>
  <meta name="description" content="View the local Twitch subscription prices with currency conversion" />
  <meta name="description" content="View a Twitch channel's Twitch/BTTV/FFZ/7TV emotes and badges" />
  <meta property="og:url" content="https://okayeg.com/twitch/emotes" />
  <meta property="og:description" content="View a Twitch channel's Twitch/BTTV/FFZ/7TV emotes and badges" />
</svelte:head>

<div class="container-fluid">
  <div class="row">
    <div class="col-xl-4"></div>
    <div class="col-xl-4">
      <div class="card" style="margin-top: 10px">
        <div class="card-body">
          <h3>Lookup a channel's emotes</h3>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="channel" placeholder="Channel" aria-describedby="desc" />
            <label for="channel">Channel</label>
            <div id="desc" class="form-text">View any Twitch channel's sub, BTTV, FFZ and 7TV emotes.</div>
          </div>
          <a class="btn btn-primary" href="/twitch/emotes-global.html" role="button"><IcBaselinePublic />Global Emotes</a>
          <button style="margin-top: 10px" type="button" class="btn btn-success float-end" onclick={loadChannelEmotes()}><IcBaselineSearch />Lookup</button>
        </div>
      </div>
    </div>
    <div class="col-xl-4"></div>
  </div>
  <div class="row">
    <div class="col-xl-1"></div>
    <div class="col-xl-10">
      <div id="output"></div>
      <div id="twitch"></div>
      <div id="badges"></div>
      <div id="bttv"></div>
      <div id="ffz"></div>
      <div id="seventv"></div>
    </div>
    <div class="col-xl-1"></div>
  </div>
</div>

<style>
  .emotetextwide {
    max-width: 384px;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .emotetext {
    max-width: 112px;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>
