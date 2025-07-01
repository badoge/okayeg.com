<script>
  import ShareButton from "$lib/elements/ShareButton.svelte";
  import currentGame from "$lib/utils/state";

  const SvelteComponent = $derived($currentGame.gameOverComponent);
</script>

<div class="modal-content">
  <div class="modal-header">
    <h5 class="modal-title fs-5" id="mdlGameOverTitle">
      <img class="align-text-bottom me-1" src="/pics/icon/favicon-32x32.png" alt="Okayeg" width="28" height="28" />
      Game over!
    </h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-body">
    <SvelteComponent />
  </div>
  <div class="modal-footer">
    <ShareButton />
  </div>
</div>
