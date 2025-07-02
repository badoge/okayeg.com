<script>
  import ShareButton from "$lib/elements/ShareButton.svelte";
  import currentGame from "$lib/utils/state";

  const SvelteComponent = $derived($currentGame.gameOverComponent);
</script>

<div class="option-block">
  <SvelteComponent />
  <div class="text-center mt-4">
    <ShareButton />
  </div>
</div>
