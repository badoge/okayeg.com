<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/state";

  import IcBaselinePersonSearch from "~icons/ic/baseline-person-search";

  let username = "";

  /**
   * @param {SubmitEvent & { currentTarget: EventTarget & HTMLFormElement; }} event
   */
  function lookup(event) {
    event.preventDefault();
    goto(`/profile/${username?.toLowerCase().replace(/\s/g, "")}`);
  }
</script>

<svelte:head>
  <title>Twitch user info | OkayegBOT</title>
  <meta name="description" content="View all of a Twitch user's public info" />
  <meta property="og:title" content="Twitch user info | OkayegBOT" />
  <meta property="og:url" content="https://okayeg.com/twitch/user" />
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
