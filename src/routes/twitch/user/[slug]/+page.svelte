<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { relativeTime, getLanguage } from "$lib/functions.js";

  import IcBaselinePersonSearch from "~icons/ic/baseline-person-search";

  let { data } = $props();
  let username = $state(data.slug.toLowerCase().replace(/\s/g, ""));
  let user = $derived("");
  let stream = $derived("");
  let schedule = $derived("");
  let extensions = $derived("");
  let teams = $derived("");
  let chatSettings = $derived("");
  let chatColor = $derived("");

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

  /**
   * @param {SubmitEvent & { currentTarget: EventTarget & HTMLFormElement; }} event
   */
  function lookup(event) {
    event.preventDefault();
    goto(`/twitch/user/${username?.toLowerCase().replace(/\s/g, "")}`);
    loadUserInfo();
  }

  onMount(() => {
    if (username) {
      loadUserInfo();
    }
  });

  async function loadUserInfo() {
    try {
      let response = await fetch(`https://helper.donk.workers.dev/twitch/users?login=${username}`);
      let result = await response.json();
      if (!result || !result?.data[0]?.id) {
        user = "";
      } else {
        user = result?.data[0];
      }

      let response2 = await fetch(`https://helper.donk.workers.dev/twitch/streams?user_id=${user.id}`);
      let result2 = await response2.json();
      if (!result2 || !result2?.data[0]) {
        stream = "";
      } else {
        stream = result2?.data[0];
      }

      if (!stream) {
        //channel is offline so use this other endpoint
        //endpoint has less data so check if they exist before adding to the page
        //also some names are different
        let response3 = await fetch(`https://helper.donk.workers.dev/twitch/channels?broadcaster_id=${user.id}`);
        let result3 = await response3.json();

        if (!result3 || !result3?.data[0]) {
          stream = "";
        } else {
          stream = result3?.data[0];
        }
      }

      let response4 = await fetch(`https://helper.donk.workers.dev/twitch/schedule?broadcaster_id=${user.id}`);
      let result4 = await response4.json();
      if (!result4?.data?.segments?.length) {
        schedule = "";
      } else {
        schedule = result4?.data?.segments;
      }

      let response5 = await fetch(`https://helper.donk.workers.dev/twitch/users/extensions?user_id=${user.id}`);
      let result5 = await response5.json();

      if (!result5?.data) {
        extensions = "";
      } else {
        extensions = result5?.data;
      }

      let response6 = await fetch(`https://helper.donk.workers.dev/twitch/teams/channel?broadcaster_id=${user.id}`);
      let result6 = await response6.json();
      if (!result6?.data) {
        teams = "";
      } else {
        teams = result6?.data;
      }

      let response7 = await fetch(`https://helper.donk.workers.dev/twitch/chat/settings?broadcaster_id=${user.id}`);
      let result7 = await response7.json();
      if (result7?.data[0]?.emote_mode || result7?.data[0]?.follower_mode || result7?.data[0]?.slow_mode || result7?.data[0]?.subscriber_mode || result7?.data[0]?.unique_chat_mode) {
        chatSettings = result7?.data[0];
      } else {
        chatSettings = "";
      }

      let response8 = await fetch(`https://helper.donk.workers.dev/twitch/chat/color?user_id=${user.id}`);
      let result8 = await response8.json();
      if (result8?.data[0]) {
        chatColor = result8?.data[0];
      } else {
        chatColor = "";
      }
    } catch (error) {
      console.log(error);
      document.getElementById("output").innerHTML = `<p class="text-warning">Could not load ${username}'s info</p>`;
    }
  } //loadUserInfo
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
    <legend class="fieldset-legend">Twitch user info</legend>
    <form class="join" onsubmit={(event) => lookup(event)}>
      <input type="text" class="input join-item validator" placeholder="Username" bind:value={username} required />
      <button class="btn join-item btn-primary" type="submit" disabled={`/twitch/user/${username}` === page.url.pathname}><IcBaselinePersonSearch />Lookup</button>
    </form>
    <p class="label">View any Twitch user's public info</p>
  </fieldset>
</div>

<h1 class="display-3">
  <a href="https://twitch.tv/{user.login}" style="color: {chatColor.color}" target="_blank" rel="noopener noreferrer">{user.display_name}</a>'s Info
</h1>
<h1 class="display-6">
  <b>
    User ID
    <i class="material-icons notranslate" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="An ID that identifies the user. Stays the same even after a username change.">
      help_outline
    </i>:
  </b>
  {user.id}
</h1>
<h1 class="display-6">
  <b
    >Username<i class="material-icons notranslate" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="The user's login name. Contains lowercase alphanumeric characters only.">
      help_outline
    </i>:
  </b>
  {user.login}
</h1>
<h1 class="display-6">
  <b
    >Display name<i
      class="material-icons notranslate"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      data-bs-title="The user's display name. May contain uppercase letters or spaces and Chinese, Japanese, or Korean characters."
    >
      help_outline
    </i>:
  </b>
  {user.display_name}
</h1>
<h1 class="display-6">
  <b
    >User type<i
      class="material-icons notranslate"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      data-bs-title="The type of user. Possible values are: admin (Twitch administrator) | global_mod | staff (Twitch staff) | empty (Normal user)"
    >
      help_outline
    </i>:
  </b>
  {user.type || `<span class="text-body-secondary">Normal user</span>`}
</h1>
<h1 class="display-6">
  <b
    >Broadcaster type<i
      class="material-icons notranslate"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      data-bs-title="The type of broadcaster. Possible values are: affiliate (An affiliate broadcaster) | partner (A partner broadcaster) | empty (A normal broadcaster)"
    >
      help_outline
    </i>:
  </b>
  {user.broadcaster_type || `<span class="text-body-secondary">Normal broadcaster</span>`}
</h1>
<h1 class="display-6">
  <b>Description<i class="material-icons notranslate" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="The user's description of their channel."> help_outline </i>: </b>
  {user.description}
</h1>
<h1 class="display-6">
  <b
    >Account age<i class="material-icons notranslate" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="The time since the creation of the user's account"> help_outline </i>:
  </b>
  {relativeTime(Date.now() - new Date(user.created_at))} ({user.created_at})
</h1>

<h1 class="display-6">
  <b>Profile picture<i class="material-icons notranslate" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="The user's profile image."> help_outline </i>: </b>
  <br />
  <span class="text-center ratio ratio-1x1" id="profilepicture">
    <img src={user.profile_image_url} class="rounded mx-auto d-block" title="{user.login}'s profile picture" alt="{user.login}'s profile picture" />
  </span>
</h1>
<b
  >Offline image<i
    class="material-icons notranslate"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    data-bs-title="The user's offline image. Takes place of the video player while the channel is offline."
  >
    help_outline
  </i>
  :
</b>
<br />

{#if user.offline_image_url}
  <span class="text-center ratio ratio-16x9">
    <img src={user.offline_image_url} class="rounded mx-auto d-block" title="{user.login}'s offline image" alt="{user.login}'s offline image" />
  </span>
{:else}
  <span class="text-center">
    <span class="text-body-secondary">No offline image found</span>
  </span>
{/if}

{#if stream}
  <b>Channel status<i class="material-icons notranslate" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Is the channel live or offline."> help_outline </i>: </b>
  <div class="inline-grid *:[grid-area:1/1]">
    <div class="status status-error animate-ping"></div>
    <div class="status status-error"></div>
  </div>
  Live
  <h1 class="display-6">
    <b>Category<i class="material-icons notranslate" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="What category the stream is in."> help_outline </i>: </b>
    {#if stream.game_name}
      <a href="https://www.twitch.tv/directory/game/{stream.game_name}" target="_blank" rel="noopener noreferrer">{stream.game_name}</a>
    {:else}
      <span class="text-body-secondary">None</span>
    {/if}
  </h1>

  <h1 class="display-6">
    <b>Title<i class="material-icons notranslate" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="The title of the stream."> help_outline </i>: </b>
    {#if stream.title}
      {stream.title}
    {:else}
      <span class="text-body-secondary">None</span>
    {/if}
  </h1>
  <h1 class="display-6">
    <b>Uptime<i class="material-icons notranslate" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="How long has the channel been live."> help_outline </i>: </b>
    {relativeTime(Date.now() - new Date(stream.started_at))}
  </h1>
  <h1 class="display-6">
    <b>View count<i class="material-icons notranslate" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="The number of users watching the stream."> help_outline </i>: </b>
    {stream?.viewer_count?.toLocaleString()}
    {stream?.viewer_count == 1 ? "viewer" : "viewers"}
  </h1>

  <h1 class="display-6">
    <b
      >Tags<i class="material-icons notranslate" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="The tags that the user has applied to their channel."> help_outline </i>:
    </b>

    {#if stream?.tags?.length}
      {#each stream.tags as tag}
        <span class="badge">{tag}</span>
      {/each}
    {:else}
      <span class="text-body-secondary">None</span>
    {/if}
  </h1>
{/if}

<h1 class="display-6">
  <b>Language<i class="material-icons notranslate" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="The language that the stream uses. "> help_outline </i>: </b>
  {getLanguage("en")}
</h1>

{#if stream?.thumbnail_url}
  <h1 class="display-6">
    <b
      >Stream thumbnail<i class="material-icons notranslate" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="A screenshot from the last 5 minutes of the stream.">
        help_outline
      </i>
      :
    </b>
    <br />
    <span class="text-center ratio ratio-16x9">
      <img
        src={stream?.thumbnail_url.replace("{width}x{height}", "1280x720")}
        class="rounded mx-auto d-block"
        title="{user.login}'s Stream thumbnail"
        alt="{user.login}'s Stream thumbnail"
      />
    </span>
  </h1>
{/if}

{#if schedule}
  <h1 class="display-6">
    <b
      >Upcoming stream<i class="material-icons notranslate" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="The next scheduled stream that the streamer has set up.">
        help_outline
      </i>:
    </b>
    {relativeTime(new Date(schedule[0].end_time).getTime() - new Date(schedule[0].start_time).getTime())}
    {schedule[0]?.category?.name || ""} stream titled "{schedule[0]?.title.trim() || ""}" Starting in {relativeTime(new Date(schedule[0].start_time).getTime() - Date.now())}
  </h1>
{/if}

{#if extensions.panel?.["1"]?.active || extensions.panel?.["2"]?.active || extensions.panel?.["3"]?.active}
  <h1 class="display-6">
    <b>
      Panel extensions<i class="material-icons notranslate" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Panel extensions appear under the stream."> help_outline </i>:
    </b>

    {#each Object.entries(extensions.panel) as [index, extension]}
      {#if extension.active}
        <a href="https://dashboard.twitch.tv/extensions/{extension.id}" target="_blank" rel="noopener noreferrer"> {extension.name}</a><br />
      {/if}
    {/each}
  </h1>
{/if}

{#if extensions?.component?.["1"]?.active || extensions?.component?.["2"]?.active}
  <h1 class="display-6">
    <b
      >Component extensions<i
        class="material-icons notranslate"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        data-bs-title="Component extensions are placed on video player and expand when the user interacts with them."
      >
        help_outline
      </i>:
    </b>

    {#each Object.entries(extensions.component) as [index, extension]}
      {#if extension.active}
        <a href="https://dashboard.twitch.tv/extensions/{extension.id}" target="_blank" rel="noopener noreferrer"> {extension.name}</a><br />
      {/if}
    {/each}
  </h1>
{/if}

{#if extensions.overlay?.["1"]?.active}
  <h1 class="display-6">
    <b
      >Overlay extensions<i class="material-icons notranslate" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Overlay extensions appear over the whole video player.">
        help_outline
      </i>:
    </b>
    <a href="https://dashboard.twitch.tv/extensions/{extensions.overlay[1].id}" target="_blank" rel="noopener noreferrer"> {extensions.overlay[1].name}</a><br />
  </h1>
{/if}

{#if teams?.length}
  <h1 class="display-6">
    <b
      >Teams<i
        class="material-icons notranslate"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        data-bs-title="The teams that the user joined. Users can join multiple teams but only 1 team can be displayed on the channel"
      >
        help_outline
      </i>:
    </b>

    {#each teams as team}
      <h1 class="display-6"><a href="https://www.twitch.tv/team/{team.team_name}" target="_blank" rel="noopener noreferrer"> {team.team_display_name}</a></h1>
      <img src={team.thumbnail_url} class="rounded ratio ratio-1x1 mx-auto d-block" title="{team.team_display_name}'s team logo" alt="{team.team_display_name}'s team logo" /><br />
    {/each}
  </h1>
{/if}

{#if chatSettings}
  <h1 class="display-6">
    <b>Chat settings<i class="material-icons notranslate" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="The chat settings has the user changed."> help_outline </i>: </b>
    {chatSettings.emote_mode ? "Emote only mode<br>" : ""}
    {chatSettings.follower_mode ? `Followers only mode (${relativeTime(chatSettings.follower_mode_duration * 60000).trim() || "0 minutes"})<br>` : ""}
    {chatSettings.slow_mode ? `Slow mode (${relativeTime(chatSettings.slow_mode_wait_time * 1000).trim()})<br>` : ""}
    {chatSettings.subscriber_mode ? "Subscribers only mode<br>" : ""}
    {chatSettings.unique_chat_mode ? "Unique-chat mode<br>" : ""}
  </h1>
{/if}

{#if chatColor}
  <h1 class="display-6">
    <b>Chat color<i class="material-icons notranslate" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="The chat color that the user picked."> help_outline </i>: </b>
    <span style="color: {chatColor.color}">
      {chatColor.color}
    </span>

    {#if chatColor.color in colors}
      Default Twitch color "{colors[chatColor.color]}"
    {:else}
      Custom color (Twitch Turbo/Prime user)
    {/if}
  </h1>
{/if}
