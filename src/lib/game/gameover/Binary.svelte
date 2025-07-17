<script>
  import Stats from "$lib/game/stats/Binary.svelte";
  import game from "$lib/utils/state";
  import { formatTimer } from "$lib/utils/common";
  import IcBaselineTimer from "~icons/ic/baseline-timer";
  import IcBaselineAdsClick from "~icons/ic/baseline-ads-click";
  import DailyCountdown from "$lib/elements/DailyCountdown.svelte";
</script>

{#if $game.result}
  <h6 class="my-2">🥳 You did it! Well done!</h6>

  <p>Stats for today's puzzle:</p>
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
      Solved in
      <b class="text-primary">{$game.stats.lastClicks}</b> clicks
      {#if $game.stats.lastClicks > 0 && $game.stats.lastClicks === $game.stats.bestClicks}
        <span class="badge bg-success">🎖️ New best!</span>
      {/if}
    </li>
  </ul>
{/if}

<Stats />

<DailyCountdown caption="New puzzle will be available in:" />

<style>
  :global(img) {
    vertical-align: text-bottom;
  }
</style>
