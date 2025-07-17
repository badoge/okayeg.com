<script>
  import IcBaselineTimer from "~icons/ic/baseline-timer";
  import IcBaselineAdsClick from "~icons/ic/baseline-ads-click";
  import game from "$lib/utils/state";
  import { formatTimer } from "$lib/utils/common";
  import Stats from "$lib/game/stats/Puzzle.svelte";

  let statRef = $derived($game.stats[$game.options.gridSizes[$game.settings.gridSizes]]);
</script>

<p class="mb-4">👍 Good job! You've solved the puzzle!</p>
<ul class="my-2">
  <li>
    <IcBaselineTimer class="inline" />
    Time elapsed:
    <b class="text-primary">{formatTimer(statRef.lastTime, true)}</b>
    {#if statRef.lastTime > 0 && statRef.lastTime === statRef.bestTime}
      <span class="badge bg-success">🎖️ New best!</span>
    {/if}
  </li>
  <li>
    <IcBaselineAdsClick class="inline" />
    Solved in <b class="text-primary">{statRef.lastClicks}</b> swaps
    {#if statRef.lastClicks > 0 && statRef.lastClicks === statRef.bestClicks}
      <span class="badge bg-success">🎖️ New best!</span>
    {/if}
  </li>
</ul>

<Stats />

<style>
  li {
    list-style-type: none;
    margin-bottom: 4px;
  }
  ul :global(.material-icons) {
    margin-right: 0.2rem;
  }
  .badge {
    margin-left: 4px;
  }
</style>
