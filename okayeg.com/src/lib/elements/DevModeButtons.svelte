<script>
  import IcBaselineExtension from "~icons/ic/baseline-extension";
  import IcBaselineGradient from "~icons/ic/baseline-gradient";
  import IcBaselinePreview from "~icons/ic/baseline-preview";
  import IcBaselineRestartAlt from "~icons/ic/baseline-restart-alt";
  import currentGame, { forceUpdateDOM } from "$lib/utils/state";
  import { tryShowDailyEggFact } from "$lib/utils/dailyFact";
  import { Confetti } from "svelte-confetti";

  function doFullAppReset() {
    localStorage.clear();
    window.location.reload();
  }

  function doEggReveal() {
    if (!$currentGame) return;
    $currentGame.field.showCells();
    forceUpdateDOM();
  }

  function doPuzzleSolve() {
    if (!$currentGame) return;
    $currentGame.field.cells.sort((a, b) => a.puzzleId - b.puzzleId);
    $currentGame.field.cells.push($currentGame.field.cells.shift()); // move the empty cell to the end
    forceUpdateDOM();
  }

  let debugConfetti = $state(false);
  function doConfettiTest() {
    debugConfetti = !debugConfetti;
  }

  const chromaKeys = ["", "lime", "cyan", "red", "blue", "purple"];
  let chromaIndex = 0;
  function forceChromaKey() {
    chromaIndex = (chromaIndex + 1) % chromaKeys.length;
    const key = chromaKeys[chromaIndex];

    document.body.style.backgroundColor = key;
    document.body.classList.toggle("chroma-keyed", key.length > 0);
  }
</script>

<div class="d-flex flex-wrap justify-content-center">
  {#if $currentGame?.id === "puzzle"}
    <button class="btn btn-success" onclick={doPuzzleSolve}>
      <IcBaselineExtension />
      Instantly solve the puzzle
    </button>
  {/if}

  <button class="btn btn-outline-secondary" onclick={doConfettiTest}>
    {#if debugConfetti}
      <Confetti rounded size="12" amount="30" noGravity x={[-0.3, 0.3]} y={[0, 0.5]} duration="1400" colorArray={["#ffda4a78", "#ffcf8a77", "#ffe99e69", "#ba9f6676", "#e6be6097"]} />
    {/if}
    🎉 Confetti
  </button>

  <button class="btn btn-outline-secondary" onclick={tryShowDailyEggFact}> 🥚 Show random egg fact </button>

  <button class="btn btn-secondary" onclick={forceChromaKey}>
    <IcBaselineGradient />
    Toggle chroma key
  </button>

  <button class="btn btn-primary" onclick={doEggReveal}>
    <IcBaselinePreview />
    Reveal all cells
  </button>

  <button class="btn btn-warning" onclick={doFullAppReset}>
    <IcBaselineRestartAlt />
    Clear all data and restart
  </button>
</div>

<style>
  button {
    margin: 8px;
  }
</style>
