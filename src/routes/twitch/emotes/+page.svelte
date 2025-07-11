<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/state";

  import IcBaselinePersonSearch from "~icons/ic/baseline-person-search";

  let username = "";

  function lookup(event) {
    event.preventDefault();
    goto(`/twitch/emotes/${username?.toLowerCase().replace(/\s/g, "")}`);
  }
</script>

<svelte:head>
  <title>Emotes | OkayegBOT</title>
  <meta name="description" content="View the local Twitch subscription prices with currency conversion" />
  <meta name="description" content="View a Twitch channel's Twitch/BTTV/FFZ/7TV emotes and badges" />
  <meta property="og:url" content="https://okayeg.com/twitch/emotes" />
  <meta property="og:description" content="View a Twitch channel's Twitch/BTTV/FFZ/7TV emotes and badges" />
</svelte:head>

<div class="flex justify-center mt-5">
  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
    <legend class="fieldset-legend">Twitch channel emotes</legend>
    <form class="join" onsubmit={(event) => lookup(event)}>
      <input type="text" class="input join-item validator" placeholder="Username" bind:value={username} required />
      <button class="btn join-item btn-primary" type="submit" disabled={`/twitch/emotes/${username}` === page.url.pathname}><IcBaselinePersonSearch />Lookup</button>
    </form>
    <p class="label">View any Twitch channel's sub, BTTV, FFZ and 7TV emotes</p>
  </fieldset>
</div>
