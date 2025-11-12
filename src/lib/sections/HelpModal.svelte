<script>
  import IcBaselineSettings from "~icons/ic/baseline-settings";
  import IcBaselineHelpOutline from "~icons/ic/baseline-help-outline";
  import IcBaselineFavorite from "~icons/ic/baseline-favorite";
  import game from "$lib/utils/state";
</script>

<div>
  {#if $game}
    <h4 class="text-2xl text-center m-3">
      {$game.emote || ""}
      {$game.name}
    </h4>
    {@const SvelteComponent = $game.helperComponent}
    <div class="inner">
      <SvelteComponent />
    </div>
  {:else}
    <h4 class="text-2xl text-center m-3">
      <img class="inline me-1" src="/icon/favicon-32x32.png" alt="Okayeg" />
      <strong>Egdle</strong> Game Hub 🥚
    </h4>

    <p>
      A collection of mini-games with eggs.<br />
      Egg mixes, news, big plays, tilts. Everything that is somewhat related to egg.
    </p>
    <p>
      Information about each game is available inside: select any game, then click the
      <b><IcBaselineHelpOutline class="inline align-text-bottom" /> Help</b> icon.
    </p>
    <p>
      Most games will require basic interaction by means of <em>clicking</em> or <em>tapping</em>. Use left mouse button to click stuff, or your touch screen to tap stuff. Simple enough,
      right?
    </p>
    <p>
      <b><IcBaselineSettings class="inline align-text-bottom" /> Settings</b> menu allows you to customize your experience. Some options are only available once you get into the game.
    </p>
  {/if}

  <div class="divider"></div>
  <p class="text-sm opacity-80">
    <a class="link" href="https://github.com/g7eternal/egdle2" rel="noreferrer" target="_blank">Egdle Game Hub</a>
    created with <IcBaselineFavorite class="inline align-text-bottom text-error" /> by
    <a class="link" href="https://g7eternal.com/" rel="noreferrer" target="_blank" translate="no">G7Eternal</a>
  </p>
</div>

<style>
  p,
  .inner :global(p) {
    padding-block: 0.25rem;
  }
  a.link {
    text-decoration: none;
    color: var(--color-primary);
  }
</style>
