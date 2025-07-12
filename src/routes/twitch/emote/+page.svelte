<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/state";

  import IcBaselineSearch from "~icons/ic/baseline-search";

  let emoteInput = "";
  let emoteID = "dank";

  /**
   * @param {SubmitEvent & { currentTarget: EventTarget & HTMLFormElement; }} event
   */
  function lookup(event) {
    event.preventDefault();

    let regexV1 = /^\d+$/;
    let regexV2 = /emotesv2_[a-z0-9]{32}/;
    let regexCDN = /emoticons\/v[12]\/([\w\d]*)\//;
    const isEmoteID = regexV1.test(emoteInput) || regexV2.test(emoteInput) || regexCDN.test(emoteInput);
    if (isEmoteID) {
      if (regexCDN.test(emoteInput)) {
        emoteID = emoteInput.match(regexCDN)[1];
      } else if (regexV2.test(emoteInput)) {
        emoteID = emoteInput.match(regexV2)[0];
      } else if (regexV1.test(emoteInput)) {
        emoteID = emoteInput.match(regexV1)[0];
      }
    } else {
      emoteID = "";
      return;
    }

    goto(`/twitch/emote/${emoteID?.toLowerCase().replace(/\s/g, "")}`);
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
      <input type="text" class="input join-item validator" placeholder="Emote" bind:value={emoteInput} required />
      <button class="btn join-item btn-primary" type="submit" disabled={`/twitch/emote/${emoteInput}` === page.url.pathname}><IcBaselineSearch />Lookup</button>
    </form>
    <p class="label">View info about any Twitch emote - id and url only for now :)</p>
  </fieldset>
</div>

{#if emoteID === ""}
  <p class="text-center text-2xl">Invalid emote ID</p>
{/if}
