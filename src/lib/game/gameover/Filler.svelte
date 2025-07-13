<script>
  import IcBaselineTimer from "~icons/ic/baseline-timer";
  import IcBaselineAdsClick from "~icons/ic/baseline-ads-click";
  import game from "$lib/utils/state";
  import { formatTimer } from "$lib/utils/common";
  import Stats from "$lib/game/stats/Filler.svelte";
</script>

<p>Stats for this run:</p>
<ul class="my-2">
  <li>
    <IcBaselineTimer class="inline" />
    Time elapsed:
    <b class="text-primary">{formatTimer($game.stats.lastTime, true)}</b>
    {#if $game.stats.lastTime > 0 && $game.stats.lastTime === $game.stats.bestTime}
      <span class="badge bg-success">🎖️ New best!</span>
    {/if}
  </li>
  <li>
    <IcBaselineAdsClick class="inline" />
    Solved in <b class="text-primary">{$game.stats.lastClicks}</b> clicks
    {#if $game.stats.lastClicks > 0 && $game.stats.lastClicks === $game.stats.bestClicks}
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
