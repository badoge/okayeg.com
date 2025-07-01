<script>
  import currentGame from "$lib/utils/state";
  import IcBaselineTimer from "~icons/ic/baseline-timer";
  import Stats from "$lib/game/stats/Aimlab.svelte";

  const timeStore = $currentGame.displayTime;
</script>

<p>
  Enough clicking around. The run has ended.
  <br />
  Your time is:
  <IcBaselineTimer />
  <b class="text-success">{$timeStore}</b>
</p>

<Stats />

<style>
  p {
    margin: 0 0 16px 0;
  }
</style>
