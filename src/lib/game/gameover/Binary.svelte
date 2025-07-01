<script>
  import Stats from "$lib/game/stats/Binary.svelte";
  import game from "$lib/utils/state";
  import { formatTimer } from "$lib/utils/common";
  import IcBaselineTimer from "~icons/ic/baseline-timer";
  import IcBaselineAdsClick from "~icons/ic/baseline-ads-click";
  import DailyCountdown from "$lib/elements/DailyCountdown.svelte";
</script>

{#if $game.result}
  <h6>🥳 You did it! Well done!</h6>
  <p>Stats for this run:</p>
  <ul>
    <li>
      <IcBaselineTimer />
      Time elapsed:
      <b class="text-success">{formatTimer($game.stats.lastTime, true)}</b>
      {#if $game.stats.lastTime > 0 && $game.stats.lastTime === $game.stats.bestTime}
        <span class="badge bg-success">🎖️ New best!</span>
      {/if}
    </li>
    <li>
      <IcBaselineAdsClick />
      <b class="text-success">{$game.stats.lastClicks}</b> clicks
      {#if $game.stats.lastClicks > 0 && $game.stats.lastClicks === $game.stats.bestClicks}
        <span class="badge bg-success">🎖️ New best!</span>
      {/if}
    </li>
  </ul>
{/if}

<Stats />

<DailyCountdown caption="New puzzle will be available in:" />

<style>
  p {
    margin: 16px 0 0 0;
  }
  :global(img) {
    vertical-align: text-bottom;
  }
</style>
