<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/state";

  import IcBaselinePersonSearch from "~icons/ic/baseline-person-search";

  let emote = "";

  /**
   * @param {SubmitEvent & { currentTarget: EventTarget & HTMLFormElement; }} event
   */
  function lookup(event) {
    event.preventDefault();
    goto(`/twitch/emote/${emote?.toLowerCase().replace(/\s/g, "")}`);
  }
</script>

<svelte:head>
  <title>Emote | OkayegBOT</title>
  <meta name="description" content="View a Twitch emote's info" />
  <meta property="og:url" content="https://okayeg.com/twitch/emote" />
  <meta property="og:description" content="View a Twitch emote's info" />
</svelte:head>

<div class="flex justify-center mt-5">
  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
    <legend class="fieldset-legend">Twitch emote info</legend>
    <form class="join" onsubmit={(event) => lookup(event)}>
      <input type="text" class="input join-item validator" placeholder="Emote" bind:value={emote} required />
      <button class="btn join-item btn-primary" type="submit" disabled={`/twitch/emote/${emote}` === page.url.pathname}><IcBaselinePersonSearch />Lookup</button>
    </form>
    <p class="label">View info about any Twitch emote - id only for now :)</p>
  </fieldset>
</div>
