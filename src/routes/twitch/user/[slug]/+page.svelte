<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { relativeTime, getLanguage } from "$lib/functions.js";

  import IcBaselinePersonSearch from "~icons/ic/baseline-person-search";
  import IcBaselineHelpOutline from "~icons/ic/baseline-help-outline";

  let { data } = $props();
  let username = $state(data.slug.toLowerCase().replace(/\s/g, ""));
  let user = $derived("");
  let stream = $derived("");
  let schedule = $derived("");
  let extensions = $derived("");
  let teams = $derived("");
  let chatSettings = $derived("");
  let chatColor = $derived("");

  let displayName = $derived("");
  let profilePic = $derived("");

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
        displayName = user.display_name;
        profilePic = user.profile_image_url;
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
  <title>{displayName}'s Twitch info | OkayegBOT</title>
  <meta name="description" content="View all of a Twitch user's public info" />
  <meta property="og:title" content="{displayName}'s Twitch info | OkayegBOT" />
  <meta property="og:url" content={profilePic} />
  <meta property="og:description" content="View all of a Twitch user's public info" />
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

<div class="flex m-5">
  <div class="flex-1"></div>

  <div class="flex flex-col justify-center w-250 mt-5">
    <div class="text-6xl mb-5">
      <a href="https://twitch.tv/{user.login}" style="color: {chatColor.color}" target="_blank" rel="noopener noreferrer">{user.display_name}</a>'s Info
    </div>
    <div class="text-xl">
      <strong>
        User ID
        <div class="tooltip align-text-bottom" data-tip="An ID that identifies the user. Stays the same even after a username change">
          <IcBaselineHelpOutline />
        </div>
        :
      </strong>
      {user.id}
    </div>
    <div class="text-xl">
      <strong>
        Username
        <div class="tooltip align-text-bottom" data-tip="The user's login name. Contains lowercase alphanumeric characters only">
          <IcBaselineHelpOutline />
        </div>
        :
      </strong>
      {user.login}
    </div>
    <div class="text-xl">
      <strong>
        Display name
        <div class="tooltip align-text-bottom" data-tip="The user's display name. May contain uppercase letters or spaces and Chinese, Japanese, or Korean characters">
          <IcBaselineHelpOutline />
        </div>
        :
      </strong>
      {user.display_name}
    </div>
    <div class="text-xl">
      <strong>
        User type
        <div class="tooltip align-text-bottom" data-tip="The type of user. Possible values are: admin (Twitch administrator) | global_mod | staff (Twitch staff) | empty (Normal user)">
          <IcBaselineHelpOutline />
        </div>
        :
      </strong>
      {#if user.type}
        {user.type}
      {:else}
        <span class="opacity-50">Normal user</span>
      {/if}
    </div>
    <div class="text-xl">
      <strong>
        Broadcaster type
        <div
          class="tooltip align-text-bottom"
          data-tip="The type of broadcaster. Possible values are: affiliate (An affiliate broadcaster) | partner (A partner broadcaster) | empty (A normal broadcaster)"
        >
          <IcBaselineHelpOutline />
        </div>
        :
      </strong>
      {#if user.broadcaster_type}
        {user.broadcaster_type}
      {:else}
        <span class="opacity-50">Normal broadcaster</span>
      {/if}
    </div>
    <div class="text-xl">
      <strong>
        Description
        <div class="tooltip align-text-bottom" data-tip="The user's description of their channel">
          <IcBaselineHelpOutline />
        </div>
        :
      </strong>
      {#if user.description}
        {user.description}
      {:else}
        <span class="opacity-50">No description</span>
      {/if}
    </div>
    <div class="text-xl">
      <strong>
        Account age
        <div class="tooltip align-text-bottom" data-tip="The time since the creation of the user's account">
          <IcBaselineHelpOutline />
        </div>
        :
      </strong>
      {relativeTime(Date.now() - new Date(user.created_at))} ({user.created_at})
    </div>

    <div class="text-xl">
      <strong>
        Profile picture <div class="tooltip align-text-bottom" data-tip="The user's profile image">
          <IcBaselineHelpOutline />
        </div>
        :
      </strong>
      <img src={user.profile_image_url} class="mx-auto w-100" title="{user.login}'s profile picture" alt="{user.login}'s profile picture" />
    </div>
    <div class="text-xl">
      <strong>
        Offline image
        <div class="tooltip align-text-bottom" data-tip="The user's offline image. Takes place of the video player while the channel is offline">
          <IcBaselineHelpOutline />
        </div>
        :
      </strong>
      {#if user.offline_image_url}
        <img src={user.offline_image_url} class="mx-auto w-200" title="{user.login}'s offline image" alt="{user.login}'s offline image" />
      {:else}
        <div class="opacity-50">No offline image</div>
      {/if}
    </div>

    <!-- stream id - only exists if the channel is live -->
    {#if stream?.id}
      <div class="text-xl">
        <strong>
          Channel status
          <div class="tooltip align-text-bottom" data-tip="Is the channel live or offline">
            <IcBaselineHelpOutline />
          </div>
          :
        </strong>
        <div class="inline-grid *:[grid-area:1/1] align-middle">
          <div class="status status-error animate-ping"></div>
          <div class="status status-error"></div>
        </div>
        Live
      </div>

      <div class="text-xl">
        <strong>
          Uptime <div class="tooltip align-text-bottom" data-tip="How long has the channel been live">
            <IcBaselineHelpOutline />
          </div>
          :
        </strong>
        {relativeTime(Date.now() - new Date(stream.started_at))}
      </div>

      <div class="text-xl">
        <strong>
          View count
          <div class="tooltip align-text-bottom" data-tip="The number of users watching the stream">
            <IcBaselineHelpOutline />
          </div>
          :
        </strong>
        {stream?.viewer_count?.toLocaleString()}
        {stream?.viewer_count == 1 ? "viewer" : "viewers"}
      </div>
    {:else}
      <div class="text-xl">
        <strong>
          Channel status
          <div class="tooltip align-text-bottom" data-tip="Is the channel live or offline">
            <IcBaselineHelpOutline />
          </div>
          :
        </strong>
        Offline
      </div>
    {/if}

    <div class="text-xl">
      <strong>
        Category <div class="tooltip align-text-bottom" data-tip="What category the stream is in">
          <IcBaselineHelpOutline />
        </div>
        :
      </strong>
      {#if stream.game_name}
        <a class="link" href="https://www.twitch.tv/directory/game/{stream.game_name}" target="_blank" rel="noopener noreferrer">{stream.game_name}</a>
      {:else}
        <span class="opacity-50">None</span>
      {/if}
    </div>

    <div class="text-xl">
      <strong>
        Title
        <div class="tooltip align-text-bottom" data-tip="The title of the stream">
          <IcBaselineHelpOutline />
        </div>
        :
      </strong>
      {#if stream.title}
        {stream.title}
      {:else}
        <span class="opacity-50">None</span>
      {/if}
    </div>

    <div class="text-xl">
      <strong>
        Tags
        <div class="tooltip align-text-bottom" data-tip="The tags that the user has applied to their channel">
          <IcBaselineHelpOutline />
        </div>
        :
      </strong>
      {#if stream?.tags?.length}
        {#each stream.tags as tag}
          <span class="badge badge-ghost me-1">{tag}</span>
        {/each}
      {:else}
        <span class="opacity-50">None</span>
      {/if}
    </div>

    <div class="text-xl">
      <strong
        >Language
        <div class="tooltip align-text-bottom" data-tip="The stream's language">
          <IcBaselineHelpOutline />
        </div>
        :
      </strong>
      {#if stream?.language}
        {getLanguage(stream?.language)}
      {:else if stream?.broadcaster_language}
        {getLanguage(stream?.broadcaster_language)}
      {:else}
        <span class="opacity-50">Unknown</span>
      {/if}
    </div>

    {#if stream?.thumbnail_url}
      <div class="text-xl">
        <strong
          >Stream thumbnail
          <div class="tooltip align-text-bottom" data-tip="A screenshot from the last 5 minutes of the stream">
            <IcBaselineHelpOutline />
          </div>
          :
        </strong>
        <img
          src={stream?.thumbnail_url.replace("{width}x{height}", "1280x720")}
          class="w-200 mx-auto d-block"
          title="{user.login}'s Stream thumbnail"
          alt="{user.login}'s Stream thumbnail"
        />
      </div>
    {/if}

    {#if schedule}
      <div class="text-xl">
        <strong>
          Upcoming stream <div class="tooltip align-text-bottom" data-tip="The next scheduled stream that the streamer has set up">
            <IcBaselineHelpOutline />
          </div>
          :
        </strong>
        {relativeTime(new Date(schedule[0].end_time).getTime() - new Date(schedule[0].start_time).getTime())}
        {schedule[0]?.category?.name || ""} stream titled "{schedule[0]?.title.trim() || ""}" Starting in {relativeTime(new Date(schedule[0].start_time).getTime() - Date.now())}
      </div>
    {/if}

    {#if extensions.panel?.["1"]?.active || extensions.panel?.["2"]?.active || extensions.panel?.["3"]?.active}
      <div class="text-xl">
        <strong>
          Panel extensions
          <div class="tooltip align-text-bottom" data-tip="Panel extensions appear under the stream">
            <IcBaselineHelpOutline />
          </div>
          :
        </strong>
        {#each Object.entries(extensions.panel) as [index, extension]}
          {#if extension.active}
            <a class="link" href="https://dashboard.twitch.tv/extensions/{extension.id}" target="_blank" rel="noopener noreferrer"> {extension.name}</a><br />
          {/if}
        {/each}
      </div>
    {/if}

    {#if extensions?.component?.["1"]?.active || extensions?.component?.["2"]?.active}
      <div class="text-xl">
        <strong>
          Component extensions
          <div class="tooltip align-text-bottom" data-tip="Component extensions are placed on video player and expand when the user interacts with them">
            <IcBaselineHelpOutline />
          </div>
          :
        </strong>
        {#each Object.entries(extensions.component) as [index, extension]}
          {#if extension.active}
            <a class="link" href="https://dashboard.twitch.tv/extensions/{extension.id}" target="_blank" rel="noopener noreferrer"> {extension.name}</a><br />
          {/if}
        {/each}
      </div>
    {/if}

    {#if extensions.overlay?.["1"]?.active}
      <div class="text-xl">
        <strong>
          Overlay extensions
          <div class="tooltip align-text-bottom" data-tip="Overlay extensions appear over the whole video player">
            <IcBaselineHelpOutline />
          </div>
          :
        </strong>
        <a class="link" href="https://dashboard.twitch.tv/extensions/{extensions.overlay[1].id}" target="_blank" rel="noopener noreferrer"> {extensions.overlay[1].name}</a>
      </div>
    {/if}

    {#if teams?.length}
      <div class="text-xl">
        <strong>
          Teams
          <div class="tooltip align-text-bottom" data-tip="The teams that the user joined. Users can join multiple teams but only one can be displayed on the channel">
            <IcBaselineHelpOutline />
          </div>
          :
        </strong>
        {#each teams as team}
          <div class="text-center">
            <a class="link text-center" href="https://www.twitch.tv/team/{team.team_name}" target="_blank" rel="noopener noreferrer"> {team.team_display_name}</a>
            <img src={team.thumbnail_url} class="mx-auto d-block w-100" title="{team.team_display_name}'s team logo" alt="{team.team_display_name}'s team logo" /><br />
          </div>
        {/each}
      </div>
    {/if}

    {#if chatSettings}
      <div class="text-xl">
        <strong>
          Chat settings
          <div class="tooltip align-text-bottom" data-tip="The chat settings has the user changed">
            <IcBaselineHelpOutline />
          </div>
          :
        </strong>
        {chatSettings?.emote_mode ? "Emote only mode" : ""}<br />
        {chatSettings?.follower_mode ? `Followers only mode (${relativeTime(chatSettings.follower_mode_duration * 60000).trim() || "0 minutes"})` : ""}<br />
        {chatSettings?.slow_mode ? `Slow mode (${relativeTime(chatSettings.slow_mode_wait_time * 1000).trim()})` : ""}<br />
        {chatSettings?.subscriber_mode ? "Subscribers only mode" : ""}<br />
        {chatSettings?.unique_chat_mode ? "Unique-chat mode" : ""}<br />
      </div>
    {/if}

    {#if chatColor}
      <div class="text-xl">
        <strong>
          Chat color <div class="tooltip align-text-bottom" data-tip="The chat color that the user picked">
            <IcBaselineHelpOutline />
          </div>
          :
        </strong>
        <span style="color: {chatColor.color}">
          {chatColor.color}
        </span>
        {#if chatColor.color in colors}
          Default Twitch color "{colors[chatColor.color]}"
        {:else if !chatColor.color}
          <span class="opacity-50">No color selected</span>
        {:else}
          Custom color (Twitch Turbo/Prime user)
        {/if}
      </div>
    {/if}
  </div>
  <div class="flex-1"></div>
</div>
