<script>
  import { scale } from "svelte/transition";

  /**
   * @typedef {Object} Props
   * @property {boolean} [isVisible]
   * @property {any} runFunction
   */

  /** @type {Props} */
  let { isVisible = $bindable(false), runFunction } = $props();

  let countdown = $state(3);

  const countTimer = setInterval(() => {
    countdown -= 1;
    if (countdown === 0) runFunction();
    if (countdown < 0) {
      clearInterval(countTimer);
      isVisible = false;
    }
  }, 1000);
</script>

<!-- timer representation -->
{#key countdown}
  <div class="countdown" in:scale>{countdown || "GO!"}</div>
{/key}

<style>
  .countdown {
    transform: scale(1.3);
    font-weight: 500;
    color: var(--bs-primary-text);
  }
</style>
