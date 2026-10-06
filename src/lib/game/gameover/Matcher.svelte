<script>
  import Stats from "#lib/game/stats/Matcher.svelte";
  import game from "#lib/utils/state.js";
  import { resultFlavorTexts as flavors } from "#lib/game/consts.js";
  import DailyCountdown from "#lib/elements/DailyCountdown.svelte";
</script>

<h6>🥳 Matching finished! 🥚</h6>
<p>
  You have cleared the field in
  <b class="text-primary">{$game.stats.lastClicks}</b>
  clicks.
  <br />
  {@html flavors[Math.min(Math.max(0, Math.floor(($game.stats.lastClicks - $game.field.size) / 5)), flavors.length - 1)]}
</p>

<Stats />

<DailyCountdown />

<style>
  p {
    margin: 16px 0;
  }
  :global(img) {
    vertical-align: text-bottom;
  }
</style>
