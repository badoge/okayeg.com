<script>
  import ShareButton from "$lib/elements/ShareButton.svelte";
  import game from "$lib/utils/state";
</script>

<div class="option-block">
  {#if $game}
    <p class="text-xl text-center mb-3">{$game.name}</p>
    {@const SvelteComponent = $game.statsComponent}
    <SvelteComponent />
  {:else}
    <p>ℹ️ Choose a game to see relevant stats</p>
  {/if}
  <div class="text-center mt-4">
    <ShareButton />
  </div>
</div>
