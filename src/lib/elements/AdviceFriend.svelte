<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { fly } from "svelte/transition";

  let { content, interactive = false } = $props();
  console.log(content);

  const dispatch = createEventDispatcher();

  let animator = $state(false); // toggles animation block

  onMount(() => {
    animator = true;
  });

  const transitionParams = {
    duration: 200,
    x: -200,
  };
</script>

{#if animator}
  <div class="chat chat-start" in:fly={transitionParams} out:fly={transitionParams}>
    <div class="chat-bubble chat-bubble-accent">
      {@html content}
    </div>
  </div>

  <div class="okayeg" in:fly={transitionParams} out:fly={transitionParams}>
    <img src="/okayeg.png" width="512" height="512" alt="Okayeg" />
  </div>
{/if}

<style>
  .okayeg {
    position: fixed;
    z-index: 9900;
    bottom: 0px;
    left: 0px;
    width: 120px;
    max-width: 33%;
    cursor: crosshair;
  }

  .chat {
    position: fixed;
    z-index: 9900;
    bottom: 20px;
    left: 125px;
    max-width: 33%;
  }

  .okayeg img {
    width: 100%;
    height: 100%;
  }
</style>
