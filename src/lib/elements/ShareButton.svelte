<script>
  import IcBaselineErrorOutline from "~icons/ic/baseline-error-outline";
  import IcBaselineCheckCircleOutline from "~icons/ic/baseline-check-circle-outline";
  import IcBaselineShare from "~icons/ic/baseline-share";
  import { isMobileClient } from "$lib/utils/common";
  import game from "$lib/utils/state";

  const share = $state({
    error: false,
    result: "",
    ready: true,
  });

  /**
   * @param {string} result
   */
  function reEnableShareBtn(result) {
    share.result = result;
    setTimeout(() => {
      share.result = "";
      share.ready = true;
    }, 2000);
  }

  function doShare() {
    try {
      if (!share.ready) return;
      share.ready = false;

      const data = $game.getShareableData();

      // mobile frogs have their native way of sharing things
      if (isMobileClient()) {
        const shareable = { text: data };
        if (navigator.share && navigator.canShare && navigator.canShare(shareable)) {
          navigator
            .share(shareable)
            .catch((e) => {
              // AbortError is not malicious
              if (e instanceof Error)
                switch (e.name) {
                  case "AbortError":
                    return; // user aborted sharing
                  default:
                    throw e; // other errors should be dealt with!
                }
            })
            .then(
              () => reEnableShareBtn("Results shared!"),
              (e) => console.error("Sharing failed", e),
            );
          return;
        }
      }

      // desktop friends - let's hope they use modern browsers
      navigator.clipboard.writeText(data).then(
        () => reEnableShareBtn("Copied to clipboard!"),
        (e) => console.error("Clipboard sharing failed", e),
      );
    } catch (e) {
      console.error("Share failed (browser error): ", e);
      share.error = true;
    }
  }
</script>

<button class="btn btn-primary" class:btn-happy={share.result} class:btn-danger={share.error} disabled={!share.ready} onclick={doShare}>
  {#if share.error}
    <IcBaselineErrorOutline />
    Sharing failed!
  {:else if share.result}
    <IcBaselineCheckCircleOutline />
    {share.result}
  {:else if share.ready}
    <IcBaselineShare />
    Share your stats
  {:else}
    <span class="loading loading-spinner text-accent self-center"></span>
  {/if}
</button>

<style>
  .btn {
    min-width: 50%;
    filter: none;
    transition:
      opacity 0.3s ease-out,
      filter 0.4s ease-out;
  }
  .btn-happy {
    filter: saturate(2);
    font-weight: 500;
  }
</style>
