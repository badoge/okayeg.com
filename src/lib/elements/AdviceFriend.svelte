<script>
  import { onMount } from "svelte";
  import { nullFunction } from "$lib/game/consts";
  import { fly } from "svelte/transition";
  import { backOut } from "svelte/easing";
  let { title = null, content, interactive = false, actionCallback = nullFunction, buttonText = "OK" } = $props();

  let animator = $state(false); // toggles animation block

  onMount(() => {
    animator = true;
    return hideAdvice;
  });

  const transitionInParams = {
    duration: 300,
    x: -200,
  };
  const transitionInParamsChat = {
    duration: 300,
    y: 300,
    delay: 200,
    easing: backOut,
  };

  const transitionOutParams = {
    duration: 300,
    x: -200,
  };
  const transitionOutParamsChat = {
    duration: 300,
    x: -300,
  };

  function hideAdvice() {
    animator = false;
  }
</script>

{#if animator}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="okayeg advice-friend" in:fly={transitionInParams} out:fly={transitionOutParams} onclick={hideAdvice}>
    <img src="/okayeg.png" width="512" height="512" alt="Okayeg" />
  </div>

  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="chat chat-start advice-friend" in:fly={transitionInParamsChat} out:fly={transitionOutParamsChat} onclick={hideAdvice}>
    <div class="chat-bubble chat-bubble-accent">
      {#if interactive}
        <span class="text-lg font-bold">{@html content}</span>
        <br />
        <button class="btn btn-warning float-end" onclick={actionCallback}>{buttonText}</button>
      {:else if title}
        <span class="text-lg font-bold">{title}</span>
        <br />
        {@html content}
      {:else}
        {@html content}
      {/if}
    </div>
  </div>
{/if}

<style>
  .okayeg {
    position: fixed;
    z-index: 9900;
    bottom: 0px;
    left: 0px;
    width: 120px;
    max-width: 40%;
    cursor: crosshair;
  }

  .chat {
    position: fixed;
    z-index: 9900;
    bottom: 20px;
    left: 125px;
    max-width: 40%;
    width: 400px;
  }

  .okayeg img {
    width: 100%;
    height: 100%;
  }
</style>
