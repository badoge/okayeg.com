<script>
  import IcBaselineArrowBack from "~icons/ic/baseline-arrow-back";
  import IcBaselineHelpOutline from "~icons/ic/baseline-help-outline";
  import IcBaselineLeaderboard from "~icons/ic/baseline-leaderboard";
  import IcBaselineSettings from "~icons/ic/baseline-settings";
  import { settings, recordSeenGame } from "$lib/utils/settings";
  import game from "$lib/utils/state";
  import Settings from "$lib/sections/Settings.svelte";
  import HelpModal from "$lib/sections/HelpModal.svelte";
  import StatsModal from "$lib/sections/StatsModal.svelte";

  function returnToMenu() {
    $game.pause();
    $game = null;
  }

  let aboutClickerBtn = $state(); // controls automatic "about" helper showing on first visit of a game
  $effect(() => {
    if ($game) {
      if (!$settings.seenGames.includes($game.id)) {
        recordSeenGame($game.id);
        aboutClickerBtn?.click();
      }
    }
  });
</script>

<div class="header">
  <div class="header-side">
    <div class="tooltip tooltip-bottom" data-tip={$game ? "Return to main menu" : ""}>
      <button disabled={!$game} onclick={returnToMenu}>
        <IcBaselineArrowBack class="text-2xl" />
      </button>
    </div>

    <div class="tooltip tooltip-bottom" data-tip="About">
      <button data-bs-toggle="modal" data-bs-target="#mdlHelp" onclick={() => mdlHelp.showModal()} bind:this={aboutClickerBtn}>
        <IcBaselineHelpOutline class="text-2xl" />
      </button>
    </div>
  </div>

  <h1>Egdle</h1>

  <div class="header-side">
    <div class="tooltip tooltip-bottom" data-tip={$game ? "View stats" : ""}>
      <button disabled={!$game} onclick={() => mdlStats.showModal()}>
        <IcBaselineLeaderboard class="text-2xl" />
      </button>
    </div>

    <div class="tooltip tooltip-bottom" data-tip="Settings">
      <button onclick={() => mdlSettings.showModal()}>
        <IcBaselineSettings class="text-2xl" />
      </button>
    </div>
  </div>
</div>

<!-- settings modal -->
<dialog id="mdlSettings" class="modal">
  <div class="modal-box">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 class="text-xl font-bold"><IcBaselineSettings class="inline align-text-bottom" /> Settings</h3>
    <Settings />
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>

<!-- helper modal -->
<dialog id="mdlHelp" class="modal">
  <div class="modal-box">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 class="text-xl font-bold"><IcBaselineHelpOutline class="inline align-text-bottom" /> About</h3>
    <HelpModal />
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>

<!-- stats modal -->
<dialog id="mdlStats" class="modal">
  <div class="modal-box">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 class="text-xl font-bold"><IcBaselineLeaderboard class="inline align-text-bottom" /> Stats</h3>
    <StatsModal />
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>

<style>
  .header {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    color: var(--bs-dark-text);
    padding: 8px;
    border-bottom: 1px solid rgba(192, 192, 192, 0.5);
    margin: 8px 0;
  }
  .header-side {
    display: flex;
    flex-flow: row wrap;
    gap: 24px;
  }

  .header h1 {
    margin: 4px 8px;
    flex: 1 0 auto;
    text-align: center;
    text-transform: uppercase;
    font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;
    font-weight: 700;
    font-size: 40px;
    letter-spacing: 0.3rem;
  }

  .header button {
    border: 0;
    background: transparent;
    color: inherit;
    margin: 0 auto;
    text-shadow: none;
    transition: text-shadow 0.1s ease;
  }
  .header button:hover {
    text-shadow: 0px 0px 4px silver;
  }
  .header button:disabled {
    opacity: 0.3;
    pointer-events: none;
  }

  @media all and (max-width: 480px) {
    .header h1 {
      font-size: 24px;
    }
  }
</style>
