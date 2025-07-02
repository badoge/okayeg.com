<script>
  import game from "$lib/utils/state";
  import { formatTimer } from "$lib/utils/common";
  import BaseStatsTable from "$lib/elements/BaseStatsTable.svelte";
  import IcBaselineTimer from "~icons/ic/baseline-timer";
  import IcBaselineAdsClick from "~icons/ic/baseline-ads-click";

  let statRef = $derived($game.stats[$game.options.gridSizes[$game.settings.gridSizes]]);
</script>

<BaseStatsTable>
  <tr>
    <td colspan="2">
      <p class="text-xl my-2">
        For <span class="font-bold text-primary">{$game.options.gridSizes[$game.settings.gridSizes]}</span> grid:
      </p>
    </td>
  </tr>
  <tr>
    <td>Attempts:</td>
    <td>{statRef.games}</td>
  </tr>
  <tr>
    <td>Finished runs:</td>
    <td>{statRef.runs}</td>
  </tr>
  <tr>
    <td>Average run:</td>
    <td>
      <IcBaselineTimer class="inline" />
      ~{formatTimer(statRef.avgTime, true)} <br />
      <IcBaselineAdsClick class="inline" />
      {statRef.avgClicks.toFixed(2)} swaps
    </td>
  </tr>
  <tr>
    <td>Last run:</td>
    <td>
      <IcBaselineTimer class="inline" />
      {formatTimer(statRef.lastTime, true)}
      {#if statRef.lastTime > 0 && statRef.lastTime === statRef.bestTime}
        <div class="tooltip" data-tip="Your best time!">🎖️</div>
      {/if}
      <br />
      <IcBaselineAdsClick class="inline" />
      {statRef.lastClicks} swaps
      {#if statRef.lastClicks > 0 && statRef.lastClicks === statRef.bestClicks}
        <div class="tooltip" data-tip="Your lowest action count!">🎖️</div>
      {/if}
    </td>
  </tr>
  <tr>
    <td>Best (lowest) time:</td>
    <td>
      <IcBaselineTimer class="inline" />
      {formatTimer(statRef.bestTime, true)}
    </td>
  </tr>
  <tr>
    <td>Best (lowest) swap count:</td>
    <td>
      <IcBaselineAdsClick class="inline" />
      {statRef.bestClicks}
    </td>
  </tr>
</BaseStatsTable>
