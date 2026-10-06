<script>
  import Stats from "#lib/game/stats/Jewels.svelte";
  import game from "#lib/utils/state.js";
</script>

<p class="mb-4">
  🥚 Your final score is:
  <b class="text-primary">{$game.score}</b>

  {#if $game.score > 0 && $game.stats.lastScore === $game.stats.bestScore}
    <span class="ms-2 badge bg-success">🎖️ New best score!</span>
  {/if}
</p>

<Stats />
