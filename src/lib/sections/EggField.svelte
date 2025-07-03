<script>
  import { fly } from "svelte/transition";
  import { onMount } from "svelte";
  import game from "$lib/utils/state";
  import GameOverInfo from "$lib/sections/GameOverInfo.svelte";
  import FieldCell from "$lib/elements/FieldCell.svelte";

  let gameOverModalTimer = $state();
  let mdlGameOver = $state();
  $effect(() => {
    if (!$game._gameOverScreenSeen && $game.gameOver) {
      gameOverModalTimer = setTimeout(() => {
        mdlGameOver.showModal();
        $game._gameOverScreenSeen = true;
      }, 800);
    }
  });

  onMount(() => {
    return () => {
      clearTimeout(gameOverModalTimer);
      mdlGameOver?.close();
    };
  });

  const SvelteComponent = $derived($game.topBarComponent);
</script>

<div in:fly={{ duration: 200, y: 20 }}>
  <SvelteComponent />
  <div class="field" style:grid-template-columns={`repeat(${$game.field.width}, min-content)`}>
    {#each $game.field.cells as cell, cellIndex}
      <FieldCell {cell} focused={$game.activeCell === cellIndex} />
    {/each}
  </div>
</div>

<!-- gameover modal -->
<dialog id="mdlGameOver" class="modal" bind:this={mdlGameOver}>
  <div class="modal-box">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 class="text-xl font-bold"><img class="inline align-text-bottom me-1" src="/icon/favicon-32x32.png" alt="Okayeg" width="28" height="28" /> Game over!</h3>
    <GameOverInfo />
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>

<style>
  .field {
    width: 100%;
    padding: 8px;
    display: grid;
    grid-template-columns: repeat(6, min-content);
    grid-gap: 8px;
    justify-content: center;
    font-size: 1.5em;
    font-family: "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }

  @media all and (max-width: 400px) {
    .field {
      gap: 2px;
    }
  }
</style>
