<script>
  import game from "$lib/utils/state";
  import { formatTimer } from "$lib/utils/common";
  import BaseStatsTable from "$lib/elements/BaseStatsTable.svelte";
  import IcBaselineTimer from "~icons/ic/baseline-timer";
  import IcBaselineAdsClick from "~icons/ic/baseline-ads-click";
</script>

<BaseStatsTable>
  <tr>
    <td>Attempts:</td>
    <td>{$game.stats.games}</td>
  </tr>
  <tr>
    <td>Finished runs:</td>
    <td>{$game.stats.runs}</td>
  </tr>
  <tr>
    <td>Average run:</td>
    <td>
      <IcBaselineTimer class="inline" />
      ~{formatTimer($game.stats.avgTime, true)} <br />
      <IcBaselineAdsClick class="inline" />
      {$game.stats.avgClicks.toFixed(2)} clicks
    </td>
  </tr>
  <tr>
    <td>Last run:</td>
    <td>
      <IcBaselineTimer class="inline" />
      {formatTimer($game.stats.lastTime, true)}
      {#if $game.stats.lastTime > 0 && $game.stats.lastTime === $game.stats.bestTime}
        <div class="tooltip" data-tip="Your best time!">🎖️</div>
      {/if}
      <br />
      <IcBaselineAdsClick class="inline" />
      {$game.stats.lastClicks} clicks
      {#if $game.stats.lastClicks > 0 && $game.stats.lastClicks === $game.stats.bestClicks}
        <div class="tooltip" data-tip="Your lowest click count!">🎖️</div>
      {/if}
    </td>
  </tr>
  <tr>
    <td>Best (lowest) time:</td>
    <td>
      <IcBaselineTimer class="inline" />
      {formatTimer($game.stats.bestTime, true)}
    </td>
  </tr>
  <tr>
    <td>Best (lowest) click count:</td>
    <td>
      <IcBaselineAdsClick class="inline" />
      {$game.stats.bestClicks}
    </td>
  </tr>
</BaseStatsTable>
