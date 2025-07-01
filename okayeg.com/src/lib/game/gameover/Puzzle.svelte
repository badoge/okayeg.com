<script>
  import IcBaselineTimer from "~icons/ic/baseline-timer";
  import IcBaselineAdsClick from "~icons/ic/baseline-ads-click";
  import game from "$lib/utils/state";
  import { formatTimer } from "$lib/utils/common";
  import Stats from "../stats/Puzzle.svelte";

  let statRef = $derived($game.stats[$game.options.gridSizes[$game.settings.gridSizes]]);
  
</script>

<p>👍 Good job! You've solved the puzzle!</p>
<ul>
  <li>
    <IcBaselineTimer />
    Time elapsed:
    <b class="text-success">{formatTimer(statRef.lastTime, true)}</b>
    {#if statRef.lastTime > 0 && statRef.lastTime === statRef.bestTime}
      <span class="badge bg-success">🎖️ New best!</span>
    {/if}
  </li>
  <li>
    <IcBaselineAdsClick />
    <b class="text-success">{statRef.lastClicks}</b> swaps
    {#if statRef.lastClicks > 0 && statRef.lastClicks === statRef.bestClicks}
      <span class="badge bg-success">🎖️ New best!</span>
    {/if}
  </li>
</ul>

<Stats />

<style>
  p {
    margin: 0 0 4px 0;
  }
  ul {
    padding: 0;
    margin-bottom: 16px;
  }
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
