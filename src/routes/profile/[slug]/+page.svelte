<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { copyCommand } from "$lib/functions.js";

  import IcBaselinePersonSearch from "~icons/ic/baseline-person-search";
  import IcBaselineContentCopy from "~icons/ic/baseline-content-copy";

  let { data } = $props();
  let username = $state(data.slug.toLowerCase().replace(/\s/g, ""));
  let profile = $derived("loading");

  let enabledCommands = 0;
  let disabledCommands = 0;

  // for (let index = 0; index < document.images.length; index++) {
  //   if (document.images[index].alt.startsWith("NFE")) {
  //     document.images[index].addEventListener("contextmenu", (e) => {
  //       e.preventDefault();
  //       alert(
  //         "You think its funny to take screenshots of people's NFEs, huh? Property theft is a joke to you? I'll have you know that the egchain doesn't lie. I own it. Even if you save it, it's my property. You are mad that you don't own the art I own. Delete that screenshot.",
  //       );
  //       return false;
  //     });
  //   }
  // }

  /**
   * @param {SubmitEvent & { currentTarget: EventTarget & HTMLFormElement; }} event
   */
  function lookup(event) {
    event.preventDefault();
    goto(`/profile/${username?.toLowerCase().replace(/\s/g, "")}`);
    getProfile();
  }

  onMount(() => {
    if (username) {
      getProfile();
    }
  });

  async function getProfile() {
    try {
      let response = await fetch(`https://api.okayeg.com/profile?username=${username}`);
      profile = await response.json();
      console.log(profile);
      if (response.status !== 200) {
        profile = "error";
      }
    } catch (error) {
      profile = "error";
      console.log(error);
    }
  }
</script>

<svelte:head>
  <title>Profile | OkayegBOT</title>
  <meta name="description" content="View your OkayegBOT profile which contains your stats and NFEs and channel settings" />
  <meta property="og:title" content="Profile | OkayegBOT" />
  <meta property="og:url" content="https://okayeg.com/profile" />
  <meta property="og:description" content="View your OkayegBOT profile which contains your stats and NFEs and channel settings" />
</svelte:head>

<div class="flex justify-center mt-5">
  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
    <legend class="fieldset-legend">OkayegBOT user profile</legend>
    <form class="join" onsubmit={(event) => lookup(event)}>
      <input type="text" class="input join-item validator" placeholder="Username" bind:value={username} required />
      <button class="btn join-item btn-primary" type="submit" disabled={`/profile/${username}` === page.url.pathname}><IcBaselinePersonSearch />Lookup</button>
    </form>
    <p class="label">View any user's OkayegBOT profile. Includes channel settings, user stats and NFEs</p>
  </fieldset>
</div>

<div class="flex justify-center mt-5">
  {#if profile?.channelInfo}
    <div class="card bg-base-200 card-lg shadow-lg">
      <div class="card-body">
        <h2 class="card-title">{profile.username}'s channel settings</h2>
        <div class="profile-card">
          <h3>Cooldowns</h3>
          <ul>
            <li>
              Global cooldown: {profile.channelInfo.cd}s
            </li>
            <li>
              Per-user cooldown: {profile.channelInfo.usercd}s
            </li>
            <ul>
              <li>Can be changed using <kbd class="kbd">=cooldown [global] [per-user]</kbd></li>
            </ul>
          </ul>
          <h3>
            Bot allowed to run while channel is live: {profile.channelInfo.allowonline === 1 ? "YES" : "NO"}
          </h3>
          <ul>
            <ul>
              <li>Can be toggled using <kbd class="kbd">=allowonline</kbd></li>
            </ul>
          </ul>

          <h3>
            Live/offline notifications & disabled command alerts: {profile.channelInfo.muted === 1 ? "Unmuted" : "Muted"}
          </h3>
          <ul>
            <ul>
              <li>Can be toggled using <kbd class="kbd">=mute</kbd></li>
            </ul>
          </ul>

          <h3>Channel stats</h3>
          <li>
            Commands used: {profile.channelInfo.uses.toLocaleString()}
          </li>

          <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
          <div tabindex="0" class="collapse collapse-arrow bg-base-100 border-base-300 border mt-5">
            <div class="collapse-title font-semibold">Enabled commands ({enabledCommands})</div>
            <div class="collapse-content text-sm">
              <ul>
                {#each profile.commands as command}
                  {#if command.toggleable === 1}
                    {#if profile.channelInfo[command._id] == null || profile.channelInfo[command._id] === 1}
                      <span style="display: none;">{enabledCommands++}</span>
                      <li>{command._id}</li>
                      <ul><li>Can be disabled using <kbd class="kbd">=toggle {command._id}</kbd></li></ul>
                    {/if}
                  {/if}
                {/each}
              </ul>
            </div>
          </div>
          <p class="opacity-40">You can enable all commands at once using <kbd class="kbd">=toggle allon</kbd></p>

          <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
          <div tabindex="0" class="collapse collapse-arrow bg-base-100 border-base-300 border mt-5">
            <div class="collapse-title font-semibold">Disabled commands ({disabledCommands})</div>
            <div class="collapse-content text-sm">
              <ul>
                {#each profile.commands as command}
                  {#if command.toggleable === 1}
                    {#if profile.channelInfo[command._id] === 0}
                      <span style="display: none;">{disabledCommands++}</span>
                      <li>{command._id}</li>
                      <ul><li>Can be enabled using <kbd class="kbd">=toggle {command._id}</kbd></li></ul>
                    {/if}
                  {/if}
                {/each}
              </ul>
            </div>
          </div>
          <p class="opacity-40">You can disable all commands at once using <kbd class="kbd">=toggle alloff</kbd></p>
        </div>
      </div>
    </div>
  {:else if profile == "loading"}
    <span class="loading loading-spinner loading-xl"></span>
  {/if}

  {#if profile?.userInfo}
    <div class="card bg-base-200 card-lg shadow-lg">
      <div class="card-body">
        <h2 class="card-title">{profile.username}'s current season stats</h2>
        <div class="card-body profile-card">
          <h4>{profile.season}</h4>

          <table class="table table-striped table-sm">
            <tbody>
              <tr>
                <td>🥚</td>
                <td>
                  {profile.userInfo.egs.toLocaleString()}
                  {profile.userInfo.egs == 1 ? "eg" : "egs"}<br />
                  +egs: {profile.userInfo.plus.toLocaleString()}, 0egs: {profile.userInfo.zero.toLocaleString()}, -egs: {profile.userInfo.negative.toLocaleString()}<br />
                  {profile.userInfo.egseaten.toLocaleString()}
                  {profile.userInfo.egseaten == 1 ? "eg" : "egs"} eaten
                </td>
              </tr>
              <tr>
                <td>Commands used</td>
                <td>
                  =eg used {(profile.userInfo?.eguses || 0).toLocaleString()}
                  {profile.userInfo?.eguses == 1 ? "time" : "times"}<br />
                  Other commands used {profile.userInfo.uses.toLocaleString()}
                  {profile.userInfo.uses == 1 ? "time" : "times"}
                </td>
              </tr>
              <tr>
                <td>Coin flips</td>
                <td>
                  Played {profile.userInfo.coinflips.toLocaleString()}
                  {profile.userInfo.coinflips == 1 ? "time" : "times"}<br />
                  Won {profile.userInfo.coinflipwins}
                  {profile.userInfo.coinflipwins == 1 ? "time" : "times"} ({Math.round((profile.userInfo.coinflipwins / profile.userInfo.coinflips) * 100) || 0}% win rate)<br />
                  Biggest win: {profile.userInfo.biggestcoinflipwin}
                  {profile.userInfo.biggestcoinflipwin == 1 ? "eg" : "egs"}<br />
                  Biggest loss: {profile.userInfo.biggestcoinfliploss}
                  {profile.userInfo.biggestcoinfliploss == 1 ? "eg" : "egs"}<br />
                </td>
              </tr>
              <tr>
                <td>Roulettes</td>
                <td>
                  Played {profile.userInfo.roulettes.toLocaleString()}
                  {profile.userInfo.roulettes == 1 ? "time" : "times"}<br />
                  Won {profile.userInfo.rouletteswon}
                  {profile.userInfo.rouletteswon == 1 ? "time" : "times"} ({Math.round((profile.userInfo.rouletteswon / profile.userInfo.roulettes) * 100) || 0}% win rate)<br />
                  Biggest win: {profile.userInfo.biggestroulettewin}
                  {profile.userInfo.biggestroulettewin == 1 ? "eg" : "egs"}<br />
                  Biggest loss: {profile.userInfo.biggestrouletteloss}
                  {profile.userInfo.biggestrouletteloss == 1 ? "eg" : "egs"}<br />
                </td>
              </tr>
              <tr>
                <td>Duels</td>
                <td>
                  Played {profile.userInfo.duels.toLocaleString()}
                  {profile.userInfo.duels == 1 ? "time" : "times"}<br />
                  Won {profile.userInfo.duelswon}
                  {profile.userInfo.duelswon == 1 ? "time" : "times"} ({Math.round((profile.userInfo.duelswon / profile.userInfo.duels) * 100) || 0}% win rate)<br />
                  Biggest win: {profile.userInfo.biggestduelwin}
                  {profile.userInfo.biggestduelwin == 1 ? "eg" : "egs"}<br />
                  Biggest loss: {profile.userInfo.biggestduelloss}
                  {profile.userInfo.biggestduelloss == 1 ? "eg" : "egs"}<br />
                </td>
              </tr>
              <tr>
                <td>Lottery</td>
                <td>
                  Joined lottery {profile.userInfo.lotteryjoins.toLocaleString()}
                  {profile.userInfo.lotteryjoins == 1 ? "time" : "times"}<br />
                  Won lottery {profile.userInfo.lotterywins}
                  {profile.userInfo.lotterywins == 1 ? "time" : "times"}
                </td>
              </tr>
              <tr>
                <td>Stocks</td>
                <td>
                  {profile.userInfo.shungite}
                  {profile.userInfo.shungite == 1 ? "share" : "shares"} of ⛰ shungite<br />
                  {profile.userInfo.chicken}
                  {profile.userInfo.chicken == 1 ? "share" : "shares"} of 🐔 chicken<br />
                  {profile.userInfo.bajcoin}
                  {profile.userInfo.bajcoin == 1 ? "share" : "shares"} of ⛏ bajcoin<br />
                  {profile.userInfo.copium}
                  {profile.userInfo.copium == 1 ? "share" : "shares"} of ⛽😷 copium
                </td>
              </tr>
              <tr>
                <td>Trades</td>
                <td>
                  {profile.userInfo.egsgiven.toLocaleString()}
                  {profile.userInfo.egsgiven == 1 ? "eg" : "egs"} sent<br />
                  {profile.userInfo.egsreceived.toLocaleString()}
                  {profile.userInfo.egsreceived == 1 ? "eg" : "egs"} received<br />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  {:else if profile == "loading"}
    <span class="loading loading-spinner loading-xl"></span>
  {/if}

  {#if profile?.userInfoAll}
    <div class="card bg-base-200 card-lg shadow-lg">
      <div class="card-body">
        <h2 class="card-title">{profile.username}'s all time stats</h2>
        <div class="profile-card">
          <h4>All time stats</h4>
          <table class="table table-striped table-sm">
            <tbody>
              <tr>
                <td>🥚</td>
                <td>
                  {profile.userInfoAll.egs.toLocaleString()}
                  {profile.userInfoAll.egs == 1 ? "eg" : "egs"}<br />
                  +egs: {profile.userInfoAll.plus.toLocaleString()}, 0egs: {profile.userInfoAll.zero.toLocaleString()}, -egs: {profile.userInfoAll.negative.toLocaleString()}<br />
                  {profile.userInfoAll.egseaten.toLocaleString()}
                  {profile.userInfoAll.egseaten == 1 ? "eg" : "egs"} eaten
                </td>
              </tr>
              <tr>
                <td>Commands used</td>
                <td>
                  =eg used {(profile.userInfoAll?.eguses || 0).toLocaleString()}
                  {profile.userInfoAll?.eguses == 1 ? "time" : "times"}<br />
                  Other commands used {profile.userInfoAll.uses.toLocaleString()}
                  {profile.userInfoAll.uses == 1 ? "time" : "times"}
                </td>
              </tr>
              <tr>
                <td>Coin flips</td>
                <td>
                  Played {profile.userInfoAll.coinflips.toLocaleString()}
                  {profile.userInfoAll.coinflips == 1 ? "time" : "times"}<br />
                  Won {profile.userInfoAll.coinflipwins}
                  {profile.userInfoAll.coinflipwins == 1 ? "time" : "times"} ({Math.round((profile.userInfoAll.coinflipwins / profile.userInfoAll.coinflips) * 100) || 0}% win rate)<br />
                  Biggest win: {profile.userInfoAll.biggestcoinflipwin}
                  {profile.userInfoAll.biggestcoinflipwin == 1 ? "eg" : "egs"}<br />
                  Biggest loss: {profile.userInfoAll.biggestcoinfliploss}
                  {profile.userInfoAll.biggestcoinfliploss == 1 ? "eg" : "egs"}<br />
                </td>
              </tr>
              <tr>
                <td>Roulettes</td>
                <td>
                  Played {profile.userInfoAll.roulettes.toLocaleString()}
                  {profile.userInfoAll.roulettes == 1 ? "time" : "times"}<br />
                  Won {profile.userInfoAll.rouletteswon}
                  {profile.userInfoAll.rouletteswon == 1 ? "time" : "times"} ({Math.round((profile.userInfoAll.rouletteswon / profile.userInfoAll.roulettes) * 100) || 0}% win rate)<br />
                  Biggest win: {profile.userInfoAll.biggestroulettewin}
                  {profile.userInfoAll.biggestroulettewin == 1 ? "eg" : "egs"}<br />
                  Biggest loss: {profile.userInfoAll.biggestrouletteloss}
                  {profile.userInfoAll.biggestrouletteloss == 1 ? "eg" : "egs"}<br />
                </td>
              </tr>
              <tr>
                <td>Duels</td>
                <td>
                  Played {profile.userInfoAll.duels.toLocaleString()}
                  {profile.userInfoAll.duels == 1 ? "time" : "times"}<br />
                  Won {profile.userInfoAll.duelswon}
                  {profile.userInfoAll.duelswon == 1 ? "time" : "times"} ({Math.round((profile.userInfoAll.duelswon / profile.userInfoAll.duels) * 100) || 0}% win rate)<br />
                  Biggest win: {profile.userInfoAll.biggestduelwin}
                  {profile.userInfoAll.biggestduelwin == 1 ? "eg" : "egs"}<br />
                  Biggest loss: {profile.userInfoAll.biggestduelloss}
                  {profile.userInfoAll.biggestduelloss == 1 ? "eg" : "egs"}<br />
                </td>
              </tr>
              <tr>
                <td>Lottery</td>
                <td>
                  Joined lottery {profile.userInfoAll.lotteryjoins.toLocaleString()}
                  {profile.userInfoAll.lotteryjoins == 1 ? "time" : "times"}<br />
                  Won lottery {profile.userInfoAll.lotterywins}
                  {profile.userInfoAll.lotterywins == 1 ? "time" : "times"}
                </td>
              </tr>
              <tr>
                <td>Stocks</td>
                <td>
                  {profile.userInfoAll.shungite}
                  {profile.userInfoAll.shungite == 1 ? "share" : "shares"} of ⛰ shungite<br />
                  {profile.userInfoAll.chicken}
                  {profile.userInfoAll.chicken == 1 ? "share" : "shares"} of 🐔 chicken<br />
                  {profile.userInfoAll.bajcoin}
                  {profile.userInfoAll.bajcoin == 1 ? "share" : "shares"} of ⛏ bajcoin<br />
                  {profile.userInfoAll.copium}
                  {profile.userInfoAll.copium == 1 ? "share" : "shares"} of ⛽😷 copium
                </td>
              </tr>
              <tr>
                <td>Trades</td>
                <td>
                  {profile.userInfoAll.egsgiven.toLocaleString()}
                  {profile.userInfoAll.egsgiven == 1 ? "eg" : "egs"} sent<br />
                  {profile.userInfoAll.egsreceived.toLocaleString()}
                  {profile.userInfoAll.egsreceived == 1 ? "eg" : "egs"} received<br />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  {:else if profile == "loading"}
    <span class="loading loading-spinner loading-xl"></span>
  {/if}

  {#if profile?.nfes?.length}
    <div class="card bg-base-200 w-100 card-lg shadow-sm">
      <div class="card-body">
        <h2 class="card-title">{profile.username}'s NFEs</h2>
        <div class="profile-card">
          <div class="nfecontainer">
            {#each profile.nfes as nfe}
              <div class="card bg-base-100 w-70 m-1 shadow-sm">
                <figure>
                  <img src="data:image/gif;base64,{nfe.image}" class="w-100" alt="NFE {nfe._id}" title="NFE {nfe._id}" />
                </figure>
                <div class="card-body">
                  <h2 class="card-title">
                    {nfe.rarity || "Unknown rarity"} NFE
                  </h2>
                  <div class="card-actions justify-center">
                    <button type="button" class="btn btn-secondary" onclick={(event) => copyCommand(nfe._id, "list", event)}>
                      <IcBaselineContentCopy />Copy list command
                    </button>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  {:else if profile == "loading"}
    <span class="loading loading-spinner loading-xl"></span>
  {/if}

  {#if profile == "error"}
    <p>Something went wrong :(</p>
  {/if}
</div>

<style>
  .profile-card {
    height: 60vh;
    overflow: auto;
  }

  .nfecontainer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    text-align: center;
  }
</style>
