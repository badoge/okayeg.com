<script>
  import { today } from "$lib/game/consts";
  import IcBaselineAlarm from "~icons/ic/baseline-alarm";
  import IcBaselineAlarmOn from "~icons/ic/baseline-alarm-on";

  /**
   * @typedef {Object} Props
   * @property {string} [caption]
   */

  /** @type {Props} */
  let { caption = "Field will be reset in:" } = $props();

  const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

  let timeLeft = $state(""),
    timeDiff = $state(0);

  function getTimeToReset() {
    timeDiff = Math.floor((tomorrow.getTime() - Date.now()) / 1000);
    if (timeDiff <= 0) {
      timeDiff = -1;
      clearInterval(updaterTimer);
    }

    const hh = String(Math.floor(timeDiff / 3600)).padStart(2, "0");
    const mm = String(Math.floor((timeDiff % 3600) / 60)).padStart(2, "0");
    const ss = String(timeDiff % 60).padStart(2, "0");
    timeLeft = `${hh}:${mm}:${ss}`;
  }

  const updaterTimer = setInterval(getTimeToReset, 1000);
  getTimeToReset(); // immediate first run
</script>

<div>
  {#if timeDiff >= 0}
    <IcBaselineAlarm class="inline" />
    {caption}
    <b class="text-primary">{timeLeft}</b>
  {:else}
    <IcBaselineAlarmOn class="inline" />
    New issue is ready!
    <a href={window.location.href} target="_self">Refresh</a>
    to play now!
  {/if}
</div>
