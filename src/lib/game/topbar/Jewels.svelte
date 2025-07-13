<script>
  import { tweened } from "svelte/motion";
  import currentGame from "$lib/utils/state";
  import IcBaselineFlag from "~icons/ic/baseline-flag";
  import IcBaselineRestartAlt from "~icons/ic/baseline-restart-alt";
  import IcBaselinePin from "~icons/ic/baseline-pin";
  import { showConfirmAdviceFriend } from "$lib/utils/adviceFriend";
  import { forceUpdateDOM } from "$lib/utils/state";

  const timer = $currentGame.time;
  let progress = $state(100);
  $effect(() => {
    progress = Math.max(0, (100 * $timer) / $currentGame.maxTime);
  });

  const gameScore = tweened($currentGame.score, {
    duration: 200,
  });
  $effect(() => {
    gameScore.set($currentGame.score);
  });

  function startNewRun() {
    $currentGame?.startNewRun();
  }

  let isRestartHappening = $state(false);
  function doRestart() {
    isRestartHappening = true;

    $currentGame.reset();
    forceUpdateDOM();

    setTimeout(() => {
      isRestartHappening = false;
      startNewRun();
    }, 500);
  }
  function askForRestart() {
    showConfirmAdviceFriend("Do you really want to restart?", "Yes, I do", doRestart);
  }
</script>

<div class="timer-bar">
  <progress
    class="progress h-5"
    style:width={progress + "%"}
    class:progress-primary={progress > 35}
    class:progress-warning={progress < 35 && progress > 15}
    class:progress-error={progress < 15}
    value="0"
    max="100"
  ></progress>
</div>

<div class="bar min-h-14">
  <div class="section left">
    {$currentGame.emote}
    {$currentGame.name}
  </div>
  <div class="section mid">
    {#if !$currentGame.result}
      {#if $currentGame.gameOver}
        <button class="btn btn-primary" onclick={startNewRun}>
          <IcBaselineFlag />
          Start game
        </button>
      {:else if !isRestartHappening}
        <button class="btn btn-warning" onclick={askForRestart}>
          <IcBaselineRestartAlt />
          Start over
        </button>
      {/if}
    {/if}
  </div>
  <div class="section right">
    <div class="tooltip" data-tip="Score">
      <IcBaselinePin class="inline align-text-bottom" />
    </div>
    <b class="score text-primary">
      {$gameScore | 0}
    </b>
  </div>
</div>

<style>
  .bar {
    padding: 8px 0;
    display: flex;
    flex-flow: row wrap;
  }
  .section {
    width: 33.3%;
    flex: 1 0 auto;
    text-align: center;
    font-size: 20px;
  }
  .btn {
    height: 2rem;
    padding: 2px 8px;
    font-size: 16px;
    vertical-align: bottom;
  }

  .mid {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .score {
    transition: color 1s ease-out;
  }

  .timer-bar {
    width: 100%;
    padding: 0;
    margin: 0;
  }
  .progress {
    transition: color 1s ease-in;
  }

  @media all and (max-width: 400px) {
    .bar {
      flex-flow: row wrap;
    }
    .section {
      margin: 8px 0;
      font-size: 12px;
    }
    .btn {
      height: 1rem;
      font-size: 10px;
    }
    .mid {
      gap: 2px;
    }
  }
</style>
