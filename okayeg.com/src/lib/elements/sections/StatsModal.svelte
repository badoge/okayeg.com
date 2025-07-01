<script>
  import ShareButton from "$lib/elements/ShareButton.svelte";
  import IcBaselineLeaderboard from "~icons/ic/baseline-leaderboard";
  import game from "$lib/utils/state";
</script>

<div class="modal-content">
  <div class="modal-header">
    <h5 class="modal-title fs-5" id="mdlStatsTitle"><IcBaselineLeaderboard />Stats</h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-body">
    {#if $game}
      <h5 class="text-center mb-3">{$game.name}</h5>
      {@const SvelteComponent = $game.statsComponent}
      <SvelteComponent />
    {:else}
      ℹ️ Choose a game to see relevant stats
    {/if}
  </div>
  <div class="modal-footer">
    <ShareButton />
  </div>
</div>
