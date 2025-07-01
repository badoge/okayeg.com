<script>
  import { onMount } from "svelte";
  import { appReady } from "$lib/utils/settings";
  import game from "$lib/utils/state";

  import MainMenu from "$lib/sections/MainMenu.svelte";
  import NavBar from "$lib/sections/NavBar.svelte";
  import EggField from "$lib/sections/EggField.svelte";
  import InteractiveField from "$lib/sections/InteractiveField.svelte";

  function doOpenGame(event) {
    $game = event.detail;
  }

  let pageReady = $state(false);
  onMount(() => {
    pageReady = true;
  });
</script>

<svelte:head>
  <title>🥚 Egdle</title>
  <meta name="description" content="Eg-related game. Eg mixes, news, big plays, tilts. Everything that is somewhat related to eg." />
  <meta name="keywords" content="egdle, okayeg, egg, eg, game, daily" />
  <meta property="og:title" content="🥚 Egdle" />
  <meta property="og:url" content="https://okayeg.com/egdle" />
  <meta property="og:description" content="Eg-related game. Eg mixes, news, big plays, tilts. Everything that is somewhat related to eg." />
  <link rel="manifest" href="/manifest.webmanifest" />
  <link rel="stylesheet" href="/css/egdle.css" />
</svelte:head>

{#if pageReady && $appReady}
  <div class="app">
    <NavBar />

    {#if $game}
      {@const SvelteComponent = $game.usesInteractiveField ? InteractiveField : EggField}
      <SvelteComponent />
    {:else}
      <MainMenu on:opengame={doOpenGame} />
    {/if}
  </div>
{:else}
  <div class="loader"><span class="loading loading-spinner text-accent self-center"></span></div>
{/if}

<style>
  :global(body) {
    transition:
      background-color 0.2s ease,
      color 0.2s ease;
  }

  .app {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-flow: column nowrap;
  }

  .loader {
    height: 50vh;
    min-height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
