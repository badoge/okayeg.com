<script>
  import { onMount, unmount } from "svelte";
  import currentGame from "$lib/utils/state";
  import { forceUpdateDOM } from "$lib/utils/state";
  import { showConfirmAdviceFriend } from "$lib/utils/adviceFriend";
  import IcBaselineFlag from "~icons/ic/baseline-flag";
  import IcBaselineRestartAlt from "~icons/ic/baseline-restart-alt";
  import IcBaselineTimer from "~icons/ic/baseline-timer";
  import IcBaselineAdsClick from "~icons/ic/baseline-ads-click";
  import GameStartCountdown from "$lib/elements/GameStartCountdown.svelte";

  // cannot do double subscription, have to resolve this reference:
  const displayTimerStore = $currentGame.displayTime;

  let countdown = $state(false);
  let adviceFriendRef = null;

  function startNewRun() {
    $currentGame?.startNewRun();
  }

  function doStart() {
    countdown = true;
  }

  function doRestart() {
    $currentGame.reset();
    forceUpdateDOM();
    doStart();
  }

  function askForRestart() {
    if (adviceFriendRef) unmount(adviceFriendRef);
    adviceFriendRef = showConfirmAdviceFriend("Do you really want to reset the run?", "Yes, I do", doRestart);
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
    <b class="text-primary">
      {$displayTimerStore}
    </b>
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
        <button class="btn btn-warning" onclick={askForRestart}>
          <IcBaselineRestartAlt />
          Start over
        </button>
      {/if}
    {/if}
  </div>
  <div class="section right">
    <div class="tooltip" data-tip="Score">
      <IcBaselineAdsClick class="inline align-text-bottom" />
    </div>
    <b class="text-primary">{$currentGame.clicks}</b> / <b>{$currentGame.field.size}</b>
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
