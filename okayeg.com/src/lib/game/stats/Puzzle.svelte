<script>
  import game from "$lib/utils/state";
  import { formatTimer } from "$lib/utils/common";
  import tippy from "$lib/utils/tippy";
  import BaseStatsTable from "$lib/elements/BaseStatsTable.svelte";
  import IcBaselineTimer from "~icons/ic/baseline-timer";
  import IcBaselineAdsClick from "~icons/ic/baseline-ads-click";

  let statRef = $derived($game.stats[$game.options.gridSizes[$game.settings.gridSizes]]);
  
</script>

<BaseStatsTable>
  <tr>
    <td colspan="2">
      <h5 class="text-secondary my-2">
        For <span class="fw-bold text-success">{$game.options.gridSizes[$game.settings.gridSizes]}</span> grid:
      </h5>
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
      <IcBaselineTimer />
      ~{formatTimer(statRef.avgTime, true)} <br />
      <IcBaselineAdsClick />
      {statRef.avgClicks.toFixed(2)} swaps
    </td>
  </tr>
  <tr>
    <td>Last run:</td>
    <td>
      <IcBaselineTimer />
      {formatTimer(statRef.lastTime, true)}
      {#if statRef.lastTime > 0 && statRef.lastTime === statRef.bestTime}
        <span class="cursor-default" use:tippy={{ content: "Your best time!" }}>🎖️</span>
      {/if}
      <br />
      <IcBaselineAdsClick />
      {statRef.lastClicks} swaps
      {#if statRef.lastClicks > 0 && statRef.lastClicks === statRef.bestClicks}
        <span class="cursor-default" use:tippy={{ content: "Your lowest action count!" }}>🎖️</span>
      {/if}
    </td>
  </tr>
  <tr>
    <td>Best (lowest) time:</td>
    <td>
      <IcBaselineTimer />
      {formatTimer(statRef.bestTime, true)}
    </td>
  </tr>
  <tr>
    <td>Best (lowest) swap count:</td>
    <td>
      <IcBaselineAdsClick />
      {statRef.bestClicks}
    </td>
  </tr>
</BaseStatsTable>
