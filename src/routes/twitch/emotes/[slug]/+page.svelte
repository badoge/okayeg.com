<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { escapeString, months, getTwitchUser } from "$lib/functions.js";

  import IcBaselinePersonSearch from "~icons/ic/baseline-person-search";
  import MdiTwitch from "~icons/mdi/twitch";
  import IcBaselineInfo from "~icons/ic/baseline-info";
  import IcBaselineSettings from "~icons/ic/baseline-settings";

  let { data } = $props();
  let username = $state(data.slug.toLowerCase().replace(/\s/g, ""));

  onMount(() => {
    if (username) {
      loadChannelEmotes();
    }
  });

  let output = $state("");
  let user = $state({});
  let displayName = $state("");
  let t1Emotes = $state([]);
  let t2Emotes = $state([]);
  let t3Emotes = $state([]);
  let followerEmotes = $state([]);
  let bitsEmotes = $state([]);
  let t1Badges = $state([]);
  let t2Badges = $state([]);
  let t3Badges = $state([]);
  let bitsBadges = $state([]);
  let bttvResponse = $state({});
  let ffzEmotes = $state([]);
  let ffzModBadge = $state("");
  let ffzVipBadge = $state("");
  let seventvEmotes = $state([]);
  let seventvID = $state("");

  /**
   * @param {SubmitEvent & { currentTarget: EventTarget & HTMLFormElement; }} event
   */
  function lookup(event) {
    event.preventDefault();
    goto(`/twitch/emotes/${username?.toLowerCase().replace(/\s/g, "")}`);
    output = "";
    user = {};
    displayName = "";
    t1Emotes = [];
    t2Emotes = [];
    t3Emotes = [];
    followerEmotes = [];
    bitsEmotes = [];
    t1Badges = [];
    t2Badges = [];
    t3Badges = [];
    bitsBadges = [];
    bttvResponse = {};
    ffzEmotes = [];
    ffzModBadge = "";
    ffzVipBadge = "";
    seventvEmotes = [];
    seventvID = "";

    loadChannelEmotes();
  }

  async function loadChannelEmotes() {
    if (!username) {
      return;
    }

    user = await getTwitchUser(username);
    if (!user) {
      output = `<h1 class="text-2xl text-center">Channel not found</h1>`;
      return;
    } else {
      displayName = user.display_name.toLowerCase() == user.login ? user.display_name : `${user.display_name} (${user.login})`;
    }

    try {
      let response = await fetch(`https://helper.donk.workers.dev/twitch/chat/emotes?broadcaster_id=${user.id}`);
      let result = await response.json();
      if (result?.data?.length > 0) {
        result.data.sort((a, b) => a.name.localeCompare(b.name));
        for (let i = 0, j = result.data.length; i < j; i++) {
          if (result.data[i].tier == "1000") {
            t1Emotes.push(result.data[i]);
          }
          if (result.data[i].tier == "2000") {
            t2Emotes.push(result.data[i]);
          }
          if (result.data[i].tier == "3000") {
            t3Emotes.push(result.data[i]);
          }
          if (result.data[i].emote_type == "follower") {
            followerEmotes.push(result.data[i]);
          }
          if (result.data[i].emote_type == "bitstier") {
            bitsEmotes.push(result.data[i]);
          }
        }
      }
    } catch (error) {
      console.log("twitch emotes error", error);
    }

    try {
      let response = await fetch(`https://helper.donk.workers.dev/twitch/chat/badges?broadcaster_id=${user.id}`);
      let result = await response.json();
      if (result?.data?.length > 0) {
        let subBadges = [];
        if (result?.data[0]?.versions?.length > 0) {
          if (result.data[0].set_id == "subscriber") {
            subBadges = result.data[0].versions;
          }
          if (result.data[0].set_id == "bits") {
            bitsBadges = result.data[0].versions;
          }
        }
        if (result?.data[1]?.versions?.length > 0) {
          if (result.data[1].set_id == "subscriber") {
            subBadges = result.data[1].versions;
          }
          if (result.data[1].set_id == "bits") {
            bitsBadges = result.data[1].versions;
          }
        }
        subBadges.sort(function (a, b) {
          return parseInt(a.id, 10) - parseInt(b.id, 10);
        });
        bitsBadges.sort(function (a, b) {
          return parseInt(a.id, 10) - parseInt(b.id, 10);
        });

        for (let i = 0, j = subBadges.length; i < j; i++) {
          if (subBadges[i].id >= 3000) {
            t3Badges.push(subBadges[i]);
          } else if (subBadges[i].id >= 2000) {
            t2Badges.push(subBadges[i]);
          } else {
            t1Badges.push(subBadges[i]);
          }
        }
      }
    } catch (error) {
      console.log("twitch badges error", error);
    }

    try {
      let response = await fetch(`https://api.betterttv.net/3/cached/users/twitch/${user.id}`);
      bttvResponse = await response.json();
      if (bttvResponse?.channelEmotes?.length > 0 || bttvResponse?.sharedEmotes?.length > 0) {
        bttvResponse.channelEmotes.sort((a, b) => a.code.localeCompare(b.code));
        bttvResponse.sharedEmotes.sort((a, b) => a.code.localeCompare(b.code));
      }
    } catch (error) {
      console.log("bttv error", error);
    }

    try {
      let response = await fetch(`https://api.frankerfacez.com/v1/room/id/${user.id}`);
      let result = await response.json();
      console.log(result);
      if (response.status == 200) {
        if (result?.room?.set && result.sets[result?.room?.set]?.emoticons?.length > 0) {
          let setid = result.room.set;
          let sets = result.sets[setid];
          sets.emoticons.sort((a, b) => a.name.localeCompare(b.name));

          for (let i = 0, j = sets.emoticons.length; i < j; i++) {
            let url = sets.emoticons[i].urls["4"];
            if (sets.emoticons[i].animated) {
              url = sets.emoticons[i].animated["4"];
            }
            ffzEmotes.push({ id: sets.emoticons[i].id, url: url, name: sets.emoticons[i].name });
          } //ffz emotes
        }

        if (result?.room?.mod_urls?.["4"]) {
          ffzModBadge = result.room.mod_urls["4"];
        } //ffz mod badge

        if (result?.room?.vip_badge?.["4"]) {
          ffzVipBadge = result.room.vip_badge["4"];
        } //ffz vip badge
      }
    } catch (error) {
      console.log("ffz error", error);
    }

    try {
      let response = await fetch(`https://7tv.io/v3/users/twitch/${user.id}`);
      let result = await response.json();
      if (response.status == 200 && result?.emote_set?.emotes?.length > 0) {
        seventvID = result.user.id;
        result.emote_set.emotes.sort((a, b) => a.name.localeCompare(b.name));
        for (let i = 0, j = result.emote_set.emotes.length; i < j; i++) {
          let files = result.emote_set.emotes[i].data.host.files.filter((e) => e.format == "AVIF");
          seventvEmotes.push({ id: result.emote_set.emotes[i].id, name: result.emote_set.emotes[i].name, url: `${result.emote_set.emotes[i].data.host.url}/${files[3].name}` });
        }
      } //7tv
    } catch (error) {
      console.log("7tv error", error);
    }
  } //loadChannelEmotes
</script>

<svelte:head>
  <title>{username}'s Twitch emotes | OkayegBOT</title>
  <meta name="description" content="View a Twitch channel's Twitch/BTTV/FFZ/7TV emotes and badges" />
  <meta property="og:title" content="{username}'s Twitch emotes | OkayegBOT" />
  <meta property="og:url" content="https://beta.okayeg.com/twitch/emotes/{username}" />
  <meta property="og:description" content="View a Twitch channel's Twitch/BTTV/FFZ/7TV emotes and badges" />
</svelte:head>

<div class="flex justify-center mt-5">
  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
    <legend class="fieldset-legend">Twitch channel emotes</legend>
    <form class="join" onsubmit={(event) => lookup(event)}>
      <input type="text" class="input join-item validator" placeholder="Username" bind:value={username} required />
      <button class="btn join-item btn-primary" type="submit" disabled={`/twitch/emotes/${username}` === page.url.pathname}><IcBaselinePersonSearch />Lookup</button>
    </form>
    <p class="label">
      View any Twitch channel's sub, <a class="link" href="https://betterttv.com/" target="_blank" rel="noopener noreferrer">BTTV,</a>
      <a class="link" href="https://www.frankerfacez.com/" target="_blank" rel="noopener noreferrer">FFZ</a>
      and <a class="link" href="https://7tv.app/" target="_blank" rel="noopener noreferrer">7TV</a> emotes and badges
    </p>
  </fieldset>
</div>
<div class="flex flex-row">
  <aside class="sticky top-0 h-fit m-5 pt-5">
    <ul class="menu bg-base-200 w-50 rounded-box">
      <li>
        <details open>
          <summary>
            <MdiTwitch class="inline" />
            Twitch emotes
          </summary>
          <ul>
            <li>
              <a href="#tier1Emotes">
                <MdiTwitch />
                Tier 1 sub emotes
              </a>
            </li>
            <li>
              <a href="#tier2Emotes">
                <MdiTwitch />
                Tier 2 sub emotes
              </a>
            </li>
            <li>
              <a href="#tier3Emotes">
                <MdiTwitch />
                Tier 3 sub emotes
              </a>
            </li>
            <li>
              <a href="#followerEmotes">
                <MdiTwitch />
                Follower emotes
              </a>
            </li>
            <li>
              <a href="#bitsEmotes">
                <MdiTwitch />
                Bits tier emotes
              </a>
            </li>
          </ul>
        </details>
      </li>

      <li>
        <details open>
          <summary>
            <MdiTwitch class="inline" />
            Twitch badges
          </summary>
          <ul>
            <li>
              <a href="#tier1Badges">
                <MdiTwitch />
                Tier 1 sub badges
              </a>
            </li>
            <li>
              <a href="#tier2Badges">
                <MdiTwitch />
                Tier 2 sub badges
              </a>
            </li>
            <li>
              <a href="#tier3Badges">
                <MdiTwitch />
                Tier 3 sub badges
              </a>
            </li>
            <li>
              <a href="#bitsBadges">
                <MdiTwitch />
                Bits badges
              </a>
            </li>
            <li>
              <details>
                <summary>FFZ custom badges</summary>
                <ul>
                  <li>
                    <a href="#modBadge">Mod badge</a>
                  </li>
                  <li>
                    <a href="#vipBadge">VIP badge</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <a href="#bttv">BTTV emotes</a>
      </li>
      <li>
        <a href="#ffz">FFZ emotes</a>
      </li>
      <li>
        <a href="#seventv">7TV emotes</a>
      </li>
    </ul>

    <div class="card bg-base-200 w-50 shadow-lg mt-3">
      <div class="card-body">
        <h2 class="card-title"><IcBaselineSettings />Settings</h2>
        soon™
      </div>
    </div>
  </aside>

  <main class="m-5 pt-5">
    <section>
      {#if output}
        {@html output}
      {/if}
    </section>

    <section class="mb-5">
      {#if user?.login}
        <h1 class="text-3xl mb-3">
          <a class="link" href="https://twitch.tv/{user.login}" target="_blank" rel="noopener noreferrer">{displayName}</a>'s Subscriber Emotes
        </h1>
      {/if}

      <section id="tier1Emotes">
        {#if t1Emotes.length}
          <h3 class="text-xl">
            Tier 1 emotes <span class="opacity-50">({t1Emotes.length} {t1Emotes.length == 1 ? "emote" : "emotes"})</span>
          </h3>
          <div class="emotecontainer mb-3">
            {#each t1Emotes as emote}
              <div class="border border-accent emote">
                <img src="https://static-cdn.jtvnw.net/emoticons/v2/{emote.id}/default/dark/3.0" loading="lazy" title={emote.name} alt={emote.name} />
                <div class="emotetext text-center">{escapeString(emote.name)}</div>
              </div>
            {/each}
          </div>
        {:else if displayName}
          <div class="text-xl opacity-50">{displayName} doesn't have any tier 1 sub emotes</div>
        {/if}
      </section>

      <section id="tier2Emotes">
        {#if t2Emotes.length}
          <h3 class="text-xl">
            Tier 2 emotes <span class="opacity-50">({t2Emotes.length} {t2Emotes.length == 1 ? "emote" : "emotes"})</span>
          </h3>
          <div class="emotecontainer mb-3">
            {#each t2Emotes as emote}
              <div class="border border-accent emote">
                <img src="https://static-cdn.jtvnw.net/emoticons/v2/{emote.id}/default/dark/3.0" loading="lazy" title={emote.name} alt={emote.name} />
                <div class="emotetext text-center">{escapeString(emote.name)}</div>
              </div>
            {/each}
          </div>
        {:else if displayName}
          <div class="text-xl opacity-50">{displayName} doesn't have any tier 2 sub emotes</div>
        {/if}
      </section>

      <section id="tier3Emotes">
        {#if t3Emotes.length}
          <h3 class="text-xl">
            Tier 3 emotes <span class="opacity-50">({t3Emotes.length} {t3Emotes.length == 1 ? "emote" : "emotes"})</span>
          </h3>
          <div class="emotecontainer mb-3">
            {#each t3Emotes as emote}
              <div class="border border-accent emote">
                <img src="https://static-cdn.jtvnw.net/emoticons/v2/{emote.id}/default/dark/3.0" loading="lazy" title={emote.name} alt={emote.name} />
                <div class="emotetext text-center">{escapeString(emote.name)}</div>
              </div>
            {/each}
          </div>
        {:else if displayName}
          <div class="text-xl opacity-50">{displayName} doesn't have any tier 3 sub emotes</div>
        {/if}
      </section>

      <section id="followerEmotes">
        {#if followerEmotes.length}
          <h3 class="text-xl">
            Follower emotes <span class="opacity-50">({followerEmotes.length} {followerEmotes.length == 1 ? "emote" : "emotes"})</span>
          </h3>
          <div class="emotecontainer mb-3">
            {#each followerEmotes as emote}
              <div class="border border-accent emote">
                <img src="https://static-cdn.jtvnw.net/emoticons/v2/{emote.id}/default/dark/3.0" loading="lazy" title={emote.name} alt={emote.name} />
                <div class="emotetext text-center">{escapeString(emote.name)}</div>
              </div>
            {/each}
          </div>
        {:else if displayName}
          <div class="text-xl opacity-50">{displayName} doesn't have any follower emotes</div>
        {/if}
      </section>

      <section id="bitsEmotes">
        {#if bitsEmotes.length}
          <h3 class="text-xl">
            Bits tier emotes <span class="opacity-50">({bitsEmotes.length} {bitsEmotes.length == 1 ? "emote" : "emotes"})</span>
          </h3>
          <div class="emotecontainer mb-3">
            {#each bitsEmotes as emote}
              <div class="border border-accent emote">
                <img src="https://static-cdn.jtvnw.net/emoticons/v2/{emote.id}/default/dark/3.0" loading="lazy" title={emote.name} alt={emote.name} />
                <div class="emotetext text-center">{escapeString(emote.name)}</div>
              </div>
            {/each}
          </div>
        {:else if displayName}
          <div class="text-xl opacity-50">{displayName} doesn't have any bits tier emotes</div>
        {/if}
      </section>
    </section>

    <section class="mb-5">
      <section id="tier1Badges">
        {#if t1Badges.length}
          <h3 class="text-xl">Tier 1 Sub badges <span class="opacity-50">({t1Badges.length} {t1Badges.length == 1 ? "badge" : "badges"})</span></h3>
          <div class="emotecontainer mb-3">
            {#each t1Badges as badge}
              <div class="border border-accent emote">
                <img src={badge.image_url_4x} alt="{months[badge.id]} badge" title="{months[badge.id]} badge" loading="lazy" />
                <div class="text-center">{months[badge.id]}</div>
              </div>
            {/each}
          </div>
        {:else if displayName}
          <div class="text-xl opacity-50">{displayName} doesn't have any tier 1 sub badges</div>
        {/if}
      </section>

      <section id="tier2Badges">
        {#if t2Badges.length}
          <h3 class="text-xl">Tier 2 Sub badges <span class="opacity-50">({t2Badges.length} {t2Badges.length == 1 ? "badge" : "badges"})</span></h3>
          <div class="emotecontainer mb-3">
            {#each t2Badges as badge}
              <div class="border border-accent emote">
                <img src={badge.image_url_4x} alt="{months[badge.id]} badge" title="{months[badge.id]} badge" loading="lazy" />
                <div class="text-center">{months[badge.id]}</div>
              </div>
            {/each}
          </div>
        {:else if displayName}
          <div class="text-xl opacity-50">{displayName} doesn't have any tier 2 sub badges</div>
        {/if}
      </section>

      <section id="tier3Badges">
        {#if t3Badges.length}
          <h3 class="text-xl">Tier 3 Sub badges <span class="opacity-50">({t3Badges.length} {t3Badges.length == 1 ? "badge" : "badges"})</span></h3>
          <div class="emotecontainer mb-3">
            {#each t3Badges as badge}
              <div class="border border-accent emote">
                <img src={badge.image_url_4x} alt="{months[badge.id]} badge" title="{months[badge.id]} badge" loading="lazy" />
                <div class="text-center">{months[badge.id]}</div>
              </div>
            {/each}
          </div>
        {:else if displayName}
          <div class="text-xl opacity-50">{displayName} doesn't have any tier 3 sub badges</div>
        {/if}
      </section>

      <section id="bitsBadges">
        {#if bitsBadges.length}
          <h3 class="text-xl">Bit badges <span class="opacity-50">({bitsBadges.length} {bitsBadges.length == 1 ? "badge" : "badges"})</span></h3>
          <div class="emotecontainer mb-3">
            {#each bitsBadges as badge}
              <div class="border border-accent emote">
                <img src={badge.image_url_4x} alt="{months[badge.id]} badge" title="{months[badge.id]} badge" loading="lazy" />
                <div class="text-center">{months[badge.id]}</div>
              </div>
            {/each}
          </div>
        {:else if displayName}
          <div class="text-xl opacity-50">{displayName} doesn't have any bit badges</div>
        {/if}
      </section>

      <section id="modBadge">
        {#if ffzModBadge}
          <h3 class="text-xl">
            Custom mod badge<span class="tooltip align-text-bottom" data-tip="Custom badge for channel mods. Unlocked by subscribing to FFZ"><IcBaselineInfo /></span>
          </h3>
          <div class="emotecontainer mb-3">
            <div class="border border-accent emote">
              <img src={ffzModBadge} loading="lazy" alt="Mod badge" title="Mod badge" />
              <div class="text-center">Mod badge</div>
            </div>
          </div>
        {:else if displayName}
          <div class="text-xl opacity-50">
            {displayName} doesn't have a custom mod badge
            <span class="tooltip tooltip-right align-text-bottom" data-tip="Custom badge for channel mods. Unlocked by subscribing to FFZ"><IcBaselineInfo /></span>
          </div>
        {/if}
      </section>

      <section id="vipBadge">
        {#if ffzVipBadge}
          <h3 class="text-xl">
            Custom VIP badge<span class="tooltip align-text-bottom" data-tip="Custom badge for channel VIPs. Unlocked by subscribing to FFZ"><IcBaselineInfo /></span>
          </h3>
          <div class="emotecontainer mb-3">
            <div class="border border-accent emote">
              <img src={ffzVipBadge} loading="lazy" alt="VIP badge" title="VIP badge" />
              <div class="text-center">VIP badge</div>
            </div>
          </div>
        {:else if displayName}
          <div class="text-xl opacity-50">
            {displayName} doesn't have a custom VIP badge
            <span class="tooltip tooltip-right align-text-bottom" data-tip="Custom badge for channel VIPs. Unlocked by subscribing to FFZ"><IcBaselineInfo /></span>
          </div>
        {/if}
      </section>
    </section>

    <section id="bttv" class="mb-5">
      {#if bttvResponse?.id}
        <h1 class="text-3xl mb-3">
          <a class="link" href="https://betterttv.com/users/{bttvResponse.id}" target="_blank" rel="noopener noreferrer">{displayName}</a>'s BTTV Emotes
        </h1>
        {#if bttvResponse?.channelEmotes?.length}
          <h3 class="text-xl">
            BTTV channel emotes <span class="tooltip align-text-bottom" data-tip="Channel emotes are emotes that were uploaded to BTTV by {user.login}"><IcBaselineInfo /></span>
            <span class="opacity-50">({bttvResponse.channelEmotes.length} {bttvResponse.channelEmotes.length == 1 ? "emote" : "emotes"})</span>
          </h3>
          <div class="emotecontainer mb-3">
            {#each bttvResponse.channelEmotes as emote}
              <div class="border border-accent emote">
                <a href="https://betterttv.com/emotes/{emote.id}" target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn.betterttv.net/emote/{emote.id}/3x" loading="lazy" alt={emote.code} title={emote.code} />
                </a>
                <div class="emotetextwide text-center">{escapeString(emote.code)}</div>
              </div>
            {/each}
          </div>
        {:else if displayName}
          <div class="text-xl opacity-50">{displayName} doesn't have any <a class="link" href="https://betterttv.com/" target="_blank" rel="noopener noreferrer">BTTV</a> channel emotes</div>
        {/if}

        {#if bttvResponse?.sharedEmotes?.length}
          <h3 class="text-xl">
            BTTV shared emotes <span class="tooltip align-text-bottom" data-tip="Shared emotes are emotes that were uploaded to BTTV by other users"><IcBaselineInfo /></span>
            <span class="opacity-50">({bttvResponse.sharedEmotes.length} {bttvResponse.sharedEmotes.length == 1 ? "emote" : "emotes"})</span>
          </h3>
          <div class="emotecontainer mb-3">
            {#each bttvResponse.sharedEmotes as emote}
              <div class="border border-accent emote">
                <a href="https://betterttv.com/emotes/{emote.id}" target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn.betterttv.net/emote/{emote.id}/3x" loading="lazy" alt={emote.code} title={emote.code} />
                </a>
                <div class="emotetextwide text-center">{escapeString(emote.code)}</div>
              </div>
            {/each}
          </div>
        {:else if displayName}
          <div class="text-xl opacity-50">{displayName} doesn't have any <a class="link" href="https://betterttv.com/" target="_blank" rel="noopener noreferrer">BTTV</a> shared emotes</div>
        {/if}
      {:else if displayName}
        <div class="text-xl opacity-50">{displayName} doesn't have any <a class="link" href="https://betterttv.com/" target="_blank" rel="noopener noreferrer">BTTV</a> emotes</div>
      {/if}
    </section>

    <section id="ffz" class="mb-5">
      {#if ffzEmotes?.length}
        <h3 class="text-3xl">
          <a class="link" href="https://www.frankerfacez.com/channel/${user.login}" target="_blank" rel="noopener noreferrer">{displayName}</a>'s FFZ Emotes
          <span class="opacity-50">({ffzEmotes.length} {ffzEmotes.length == 1 ? "emote" : "emotes"})</span>
        </h3>
        <div class="emotecontainer mb-3">
          {#each ffzEmotes as emote}
            <div class="border border-accent emote">
              <a href="https://www.frankerfacez.com/emoticon/{emote.id}" target="_blank" rel="noopener noreferrer">
                <img src={emote.url} loading="lazy" alt={emote.name} title={emote.name} />
              </a>
              <div class="emotetextwide text-center">{escapeString(emote.name)}</div>
            </div>
          {/each}
        </div>
      {:else if displayName}
        <div class="text-xl opacity-50">{displayName} doesn't have any <a class="link" href="https://www.frankerfacez.com/" target="_blank" rel="noopener noreferrer">FFZ</a> emotes</div>
      {/if}
    </section>

    <section id="seventv" class="mb-5">
      {#if seventvID}
        <h3 class="text-3xl">
          <a class="link" href="https://7tv.app/users/{seventvID}" target="_blank" rel="noopener noreferrer">{displayName}</a>'s 7TV Emotes
          <span class="opacity-50">({seventvEmotes.length} {seventvEmotes.length == 1 ? "emote" : "emotes"})</span>
        </h3>
        <div class="emotecontainer mb-3">
          {#each seventvEmotes as emote}
            <div class="border border-accent emote">
              <a href="https://7tv.app/emotes/${emote.id}" target="_blank" rel="noopener noreferrer">
                <img src={emote.url} loading="lazy" alt={emote.name} title={emote.name} />
              </a>
              <div class="emotetextwide text-center">{escapeString(emote.name)}</div>
            </div>
          {/each}
        </div>
      {:else if displayName}
        <div class="text-xl opacity-50">{displayName} doesn't have any <a class="link" href="https://7tv.app/" target="_blank" rel="noopener noreferrer">7TV</a> emotes</div>
      {/if}
    </section>
  </main>
</div>
