<script>
  import currentGame from "$lib/utils/state";

  let overflow = $state(0);
  $effect(() => {
    overflow = $currentGame.clicks - $currentGame.field.size;
  });
</script>

<div class="bar">
  <div class="section left">
    {$currentGame.emote}
    {$currentGame.name}
    <b>#{$currentGame.issue}</b>
  </div>
  <div class="section right">
    Clicks:
    <b class="text-primary">{$currentGame.clicks}</b>
    &nbsp;
    {#if overflow >= 0}
      <span class:text-warning={overflow > 24} class:text-secondary={overflow < 12}>
        +{overflow}
      </span>
    {/if}
  </div>
</div>

<style>
  .bar {
    padding: 8px 0;
    display: flex;
    flex-flow: row wrap;
  }
  .section {
    flex: 1 0 auto;
    text-align: center;
    font-size: 20px;
  }

  @media all and (max-width: 400px) {
    .bar {
      flex-flow: column nowrap;
    }
    .section {
      margin: 8px 0;
    }
  }
</style>
