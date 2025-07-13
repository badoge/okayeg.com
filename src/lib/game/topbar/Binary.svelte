<script>
  import { scale } from "svelte/transition";
  import currentGame from "$lib/utils/state";
  import GameStartCountdown from "$lib/elements/GameStartCountdown.svelte";
  import IcBaselineFlag from "~icons/ic/baseline-flag";
  import IcBaselineCheck from "~icons/ic/baseline-check";
  import IcBaselineError from "~icons/ic/baseline-error";
  import IcBaselineAdsClick from "~icons/ic/baseline-ads-click";
  import IcBaselineTimer from "~icons/ic/baseline-timer";

  // cannot do double subscription, have to resolve this reference:
  const displayTimerStore = $currentGame.displayTime;

  function startNewRun() {
    $currentGame?.startNewRun();
  }

  let countdown = $state(false);
  function doStart() {
    countdown = true;
  }
</script>

<div class="bar">
  <div class="section left">
    {$currentGame.emote}
    {$currentGame.name}
    <b>#{$currentGame.issue}</b>
  </div>
  <div class="section mid">
    {#if !$currentGame.startTime}
      {#if countdown}
        <GameStartCountdown bind:isVisible={countdown} runFunction={startNewRun} />
      {:else}
        <button class="btn btn-primary" onclick={doStart}>
          <IcBaselineFlag />
          Start game
        </button>
      {/if}
    {:else if $currentGame.result}
      <div class="tooltip" data-tip="Puzzle solved!">
        <div class="badge badge-primary"><IcBaselineCheck class="text-2xl" /></div>
      </div>
    {:else if $currentGame.fieldError}
      <div class="tooltip">
        <div class="tooltip-content">
          {@html $currentGame.fieldError}
        </div>
        <IcBaselineError class="text-2xl text-warning" />
      </div>
    {/if}
  </div>
  <div class="section right">
    <div class="right-flex">
      <div class="tooltip" data-tip="Click counter">
        <IcBaselineAdsClick />
      </div>
      <b class="text-primary">{$currentGame.clicks}</b>
    </div>
    <div class="right-flex">
      <div class="padder"></div>
      <div class="tooltip" data-tip="Time elapsed">
        <IcBaselineTimer />
      </div>
      <b class="text-primary">
        {$displayTimerStore}
      </b>
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

  .mid {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .right {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    gap: 1rem;
  }
  .right b {
    margin-left: 4px;
  }
  .right-flex {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
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
    .right {
      flex-flow: column nowrap;
      align-items: center;
    }
  }
</style>
