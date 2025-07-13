<script>
  import { onMount, unmount } from "svelte";
  import currentGame from "$lib/utils/state";
  import { forceUpdateDOM } from "$lib/utils/state";
  import { showConfirmAdviceFriend } from "$lib/utils/adviceFriend";
  import IcBaselineFlag from "~icons/ic/baseline-flag";
  import IcBaselineAdsClick from "~icons/ic/baseline-ads-click";
  import IcBaselineTimer from "~icons/ic/baseline-timer";
  import IcBaselineFrontHand from "~icons/ic/baseline-front-hand";
  import IcBaselinePreview from "~icons/ic/baseline-preview";
  import GameStartCountdown from "$lib/elements/GameStartCountdown.svelte";

  // cannot do double subscription, have to resolve this reference:
  const displayTimerStore = $currentGame.displayTime;

  let countdown = $state(false);
  let adviceFriendRef = null;

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
    if (adviceFriendRef) unmount(adviceFriendRef);
    adviceFriendRef = showConfirmAdviceFriend("No stats will be recorded. Stop this game?", "Yes, please", doStop);
  }

  onMount(() => {
    return () => {
      if (adviceFriendRef) unmount(adviceFriendRef);
    };
  });
</script>

<div class="bar">
  <div class="section left">
    <div class="tooltip" data-tip="Time elapsed">
      <IcBaselineTimer class="inline align-text-bottom" />
    </div>
    <b class="timer text-primary">
      {$displayTimerStore}
    </b>
    <span class="padder mx-1"></span>
    <div class="tooltip" data-tip="Swap count">
      <IcBaselineAdsClick class="inline align-text-bottom" />
    </div>
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
    <div class="tooltip tooltip-bottom">
      <div class="tooltip-content p-4">
        <img src="/example/puzzle-pic.png" alt="Puzzle" width="250" height="250" />
      </div>
      <button class="btn btn-secondary"> <IcBaselinePreview class="text-2xl" />Peek image </button>
    </div>
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
      height: 1rem;
      font-size: 10px;
    }
    .mid,
    .right {
      gap: 2px;
    }
  }
</style>
