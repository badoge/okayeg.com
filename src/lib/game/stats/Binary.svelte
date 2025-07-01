<script>
  import BaseStatsTable from "$lib/elements/BaseStatsTable.svelte";
  import IcBaselineTimer from "~icons/ic/baseline-timer";
  import IcBaselineAdsClick from "~icons/ic/baseline-ads-click";
  import game from "$lib/utils/state";
  import tippy from "$lib/utils/tippy";
  import { formatTimer } from "$lib/utils/common";
</script>

<BaseStatsTable>
  <tr>
    <td>Attempts:</td>
    <td class="data">{$game.stats.games}</td>
  </tr>
  <tr>
    <td>Completed fields:</td>
    <td class="data">{$game.stats.wins} ({Math.floor((100 * $game.stats.wins) / Math.max($game.stats.games, 1))}%)</td>
  </tr>
  {#if $game.stats.lastIssue}
    <tr>
      <td>
        Last run:
        <br />
        <i>issue <b>#{$game.stats.lastIssue}</b></i>
      </td>
      <td>
        <IcBaselineTimer />
        {formatTimer($game.stats.lastTime, true)}
        {#if $game.stats.lastTime > 0 && $game.stats.lastTime === $game.stats.bestTime}
          <span class="cursor-default" use:tippy={{ content: "Your best time!" }}>🎖️</span>
        {/if}
        <br />
        <IcBaselineAdsClick />
        {$game.stats.lastClicks} clicks
        {#if $game.stats.lastClicks > 0 && $game.stats.lastClicks === $game.stats.bestClicks}
          <span class="cursor-default" use:tippy={{ content: "Your lowest click count!" }}>🎖️</span>
        {/if}
      </td>
    </tr>
  {/if}
  <tr>
    <td>Average run:</td>
    <td>
      <IcBaselineTimer />
      ~{formatTimer($game.stats.avgTime, true)} <br />
      <IcBaselineAdsClick />
      {$game.stats.avgClicks.toFixed(2)} clicks
    </td>
  </tr>
  <tr>
    <td>Best (lowest) time:</td>
    <td>
      <IcBaselineTimer />
      {formatTimer($game.stats.bestTime, true)}
    </td>
  </tr>
  <tr>
    <td>Best (lowest) click count:</td>
    <td>
      <IcBaselineAdsClick />
      {$game.stats.bestClicks}
    </td>
  </tr>
</BaseStatsTable>
