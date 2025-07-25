<script>
  import { onMount, unmount } from "svelte";
  import currentGame from "$lib/utils/state";
  import { showConfirmAdviceFriend } from "$lib/utils/adviceFriend";
  import { forceUpdateDOM } from "$lib/utils/state";
  import GameStartCountdown from "$lib/elements/GameStartCountdown.svelte";
  import IcBaselineFlag from "~icons/ic/baseline-flag";
  import IcBaselineRestartAlt from "~icons/ic/baseline-restart-alt";
  import IcBaselineAdsClick from "~icons/ic/baseline-ads-click";
  import IcBaselineTimer from "~icons/ic/baseline-timer";

  import { cellColors } from "../consts";

  // cannot do double subscription, have to resolve this reference:
  const displayTimerStore = $currentGame.displayTime;

  function startNewRun() {
    $currentGame?.startNewRun();
  }

  let countdown = $state(false);
  function doStart() {
    $currentGame.resetTimer();
    $currentGame.field.reset().disableCells();
    forceUpdateDOM();
    countdown = true;
  }

  let adviceFriendRef = null;
  function askForRestart() {
    if (adviceFriendRef) unmount(adviceFriendRef);
    adviceFriendRef = showConfirmAdviceFriend("Do you really want to reset the run?", "Yes, I do", doStart);
  }

  function setActiveColor(color) {
    $currentGame.doColorFill(color);
  }

  onMount(() => {
    return () => {
      if (adviceFriendRef) unmount(adviceFriendRef);
    };
  });
</script>

<div class="bar min-h-14">
  <div class="section left">
    <div class="tooltip" data-tip="Time elapsed">
      <IcBaselineTimer class="inline align-text-bottom" />
    </div>
    <b class="text-primary">{$displayTimerStore}</b>
  </div>
  <div class="section mid">
    {#if !$currentGame.result}
      {#if countdown}
        <GameStartCountdown runFunction={startNewRun} bind:isVisible={countdown} />
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
    <div class="tooltip" data-tip="Click count">
      <IcBaselineAdsClick class="inline align-text-bottom" />
    </div>
    <b class="text-primary">{$currentGame.clicks}</b>
  </div>
</div>

<div class="bar">
  <div class="section mid" class:disabled={$currentGame.gameOver}>
    {#each $currentGame.colors as color}
      <button
        class="btn color-picker"
        disabled={color === $currentGame.activeColor}
        style:background-color={cellColors[color]}
        style:box-shadow-color={cellColors[color]}
        onclick={() => setActiveColor(color)}
      >
        {#if $currentGame.settings.visualAidMode}
          {color}
        {/if}
      </button>
    {/each}
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

  .section.disabled {
    opacity: 0.5;
    pointer-events: none;
  }
  .color-picker {
    width: 75px;
    max-width: 15%;
    height: 35px;
    border: 1px solid gray;
    box-shadow: none;
    text-transform: uppercase;
    font-size: 10px;
    font-weight: bold;
    color: inherit;
    filter: brightness(1) contrast(2);
    opacity: 1;
    transform: none;
    transition:
      opacity 0.2s ease,
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      transform 0.2s ease;
  }
  .color-picker:disabled {
    border-color: transparent;
    opacity: 0.5;
    cursor: not-allowed;
  }
  .color-picker:hover {
    filter: brightness(1) contrast(2) saturate(1.1);
    box-shadow: 0px 0px 12px var(--bs-border-color-translucent);
  }
  .color-picker:active {
    transform: scale(0.9);
  }

  @media all and (max-width: 400px) {
    .bar {
      flex-flow: row wrap;
      padding: 0;
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
      gap: 8px;
    }
    .color-picker {
      width: 50px;
      min-width: 33%;
      height: 50px;
      padding: 0;
    }
  }
</style>
