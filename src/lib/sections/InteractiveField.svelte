<script>
  import { fly } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { onMount } from "svelte";
  import game from "$lib/utils/state";
  import GameOverInfo from "$lib/sections/GameOverInfo.svelte";
  import FieldCell from "$lib/elements/FieldCell.svelte";

  let gameOverModalTimer = $state();
  let mdlGameOver = $state();

  const cellAnimTiming = $state({
    in: 0,
    out: 150,
  });

  $effect(() => {
    if (!$game._gameOverScreenSeen && $game.gameOver) {
      gameOverModalTimer = setTimeout(() => {
        mdlGameOver.showModal();
        $game._gameOverScreenSeen = true;
      }, 300);
    }
  });

  onMount(() => {
    cellAnimTiming.in = 200; // enables cell animation for when the field is rendered

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
    {#each $game.field.cells as cell (cell)}
      <div class="cell-container" in:fly={{ duration: cellAnimTiming.in, y: -150 }} animate:flip={{ delay: 0, duration: 300 }}>
        <FieldCell {cell} allowFlicks={$game.settings.allowFlicks} focused={$game.activeCell === cell} isPuzzlePiece={$game.id === "puzzle"} />
      </div>
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
  }

  @media all and (max-width: 400px) {
    .field {
      gap: 2px;
    }
  }
</style>
