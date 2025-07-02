<script>
  import currentGame from "$lib/utils/state";
  import tippy from "$lib/utils/tippy";
  import { forceUpdateDOM } from "$lib/utils/state";
  import { showConfirmAdviceFriend } from "$lib/utils/adviceFriend";
  import IcBaselineFlag from "~icons/ic/baseline-flag";
  import IcBaselineAdsClick from "~icons/ic/baseline-ads-click";
  import IcBaselineTimer from "~icons/ic/baseline-timer";
  import IcBaselineFrontHand from "~icons/ic/baseline-front-hand";
  import IcBaselineTry from "~icons/ic/baseline-try";
  import GameStartCountdown from "$lib/elements/GameStartCountdown.svelte";

  // cannot do double subscription, have to resolve this reference:
  const displayTimerStore = $currentGame.displayTime;

  let countdown = $state(false);

  function startNewRun() {
    $currentGame?.startNewRun();
  }

  function doStart() {
    $currentGame.disabledSettings.add("gridSizes");
    countdown = true;
    forceUpdateDOM();
  }

  function doStop() {
    $currentGame.reset();
    forceUpdateDOM();
  }

  function askForStop() {
    showConfirmAdviceFriend("No stats will be recorded. Stop this game?", "Yes, please", doStop);
  }
</script>

<div class="bar">
  <div class="section left">
    <span use:tippy={{ content: "Time elapsed" }}>
      <IcBaselineTimer class="inline align-text-bottom" />
    </span>
    <b class="timer text-primary">
      {$displayTimerStore}
    </b>
    <span class="padder mx-1"></span>
    <span use:tippy={{ content: "Swap count" }}>
      <IcBaselineAdsClick class="inline align-text-bottom" />
    </span>
    <b class="text-primary">{$currentGame.clicks}</b>
  </div>
  <div class="section mid">
    {#if !$currentGame.result}
      {#if countdown}
        <GameStartCountdown bind:isVisible={countdown} runFunction={startNewRun} />
      {:else if $currentGame.gameOver}
        <button class="btn btn-primary" onclick={doStart}>
          <IcBaselineFlag />
          Start game
        </button>
      {:else}
        <button class="btn btn-warning" onclick={askForStop}>
          <IcBaselineFrontHand />
          End the run
        </button>
      {/if}
    {/if}
  </div>
  <div class="section right">
    <span
      class="btn btn-secondary"
      use:tippy={{
        trigger: "click",
        content: `<img src="/example/puzzle-pic.png" alt="Puzzle" width="250" height="250">`,
      }}
    >
      <IcBaselineTry />
      Peek image
    </span>
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
    padding: 2px 8px;
    font-size: 16px;
    vertical-align: bottom;
  }

  .mid,
  .right {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .timer {
    transition: color 1s ease-out;
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
      font-size: 10px;
    }
    .mid,
    .right {
      gap: 2px;
    }
  }
</style>
