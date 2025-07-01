<script>
  import { run } from 'svelte/legacy';

  import IcBaselineArrowBack from "~icons/ic/baseline-arrow-back";
  import IcBaselineHelpOutline from "~icons/ic/baseline-help-outline";
  import IcBaselineLeaderboard from "~icons/ic/baseline-leaderboard";
  import IcBaselineSettings from "~icons/ic/baseline-settings";
  import { settings, recordSeenGame } from "$lib/utils/settings";
  import tippy from "$lib/utils/tippy";
  import game from "$lib/utils/state";
  import Settings from "./Settings.svelte";
  import HelpModal from "./HelpModal.svelte";
  import StatsModal from "./StatsModal.svelte";

  function returnToMenu() {
    $game.pause();
    $game = null;
  }

  let aboutClickerBtn = $state(); // controls automatic "about" helper showing on first visit of a game
  run(() => {
    if ($game) {
      if (!$settings.seenGames.includes($game.id)) {
        recordSeenGame($game.id);
        aboutClickerBtn?.click();
      }
    }
  });

  function showSettingsModal() {
    mdlSettings.showModal();
  }
</script>

<div class="header">
  <div class="header-side">
    <button disabled={!$game} onclick={returnToMenu} use:tippy={{ content: "Return to main menu", placement: "bottom" }}>
      <IcBaselineArrowBack class="text-3xl" />
    </button>
    <button use:tippy={{ content: "About", placement: "bottom" }} data-bs-toggle="modal" data-bs-target="#mdlHelp" bind:this={aboutClickerBtn}>
      <IcBaselineHelpOutline class="text-3xl" />
    </button>
  </div>

  <h1>Egdle</h1>

  <div class="header-side">
    <button disabled={!$game} use:tippy={{ content: "View stats", placement: "bottom" }} data-bs-toggle="modal" data-bs-target="#mdlStats">
      <IcBaselineLeaderboard class="text-3xl" />
    </button>
    <button use:tippy={{ content: "Settings", placement: "bottom" }} data-bs-toggle="modal" onclick={showSettingsModal}>
      <IcBaselineSettings class="text-3xl" />
    </button>
  </div>
</div>

<!-- settings modal -->
<!-- <div class="modal fade" id="mdlSettings" tabindex="-1" aria-labelledby="mdlSettingsTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable">
    <Settings />
  </div>
</div> -->

<dialog id="mdlSettings" class="modal">
  <div class="modal-box">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <Settings />
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>

<!-- helper modal -->
<div class="modal fade" id="mdlHelp" tabindex="-1" aria-labelledby="mdlHelpTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable">
    <HelpModal />
  </div>
</div>

<!-- stats modal -->
<div class="modal fade" id="mdlStats" tabindex="-1" aria-labelledby="mdlStatsTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable">
    <StatsModal />
  </div>
</div>

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
