<script>
  import { fade } from "svelte/transition";
  import { appReady, settings } from "$lib/utils/settings";
  import { nullFunction } from "$lib/game/consts";
  import { tracker } from "$lib/utils/dailyTracker";

  import { getInstance as egdle } from "$lib/game/classic";
  import { getInstance as binary } from "$lib/game/binary";
  import { getInstance as matcher } from "$lib/game/matcher";
  import { getInstance as jewels } from "$lib/game/jewels";
  import { getInstance as pattern } from "$lib/game/pattern";
  import { getInstance as filler } from "$lib/game/filler";
  import { getInstance as puzzle } from "$lib/game/puzzle";
  import { getInstance as aimlab } from "$lib/game/aimlab";

  import game from "$lib/utils/state";

  import IcBaselineDiscord from "~icons/ic/baseline-discord";

  const variants = [
    {
      title: "Daily games",
      list: [
        {
          id: "egdle",
          init: egdle,
          name: "Classic",
          desc: "Find the hidden egg in as few taps as possible",
        },
        {
          id: "matcher",
          init: matcher,
          name: "Pairs",
          desc: "Click around and locate all matching eggs on the field",
        },
        {
          id: "binary",
          init: binary,
          name: "Binary",
          desc: "Fill the grid with eggs of two colors while following a couple of rules",
        },
      ],
    },
    {
      title: "Other games",
      list: [
        {
          id: "jewels",
          init: jewels,
          name: "Crush",
          desc: "Move the eggs around to create combos and increase your score",
        },
        {
          id: "aimlab",
          init: aimlab,
          name: "Reflex",
          desc: "Collect the randomly appearing eggs as quickly as possible",
        },
        {
          id: "pattern",
          init: pattern,
          name: "Patterns",
          desc: "A fun test: how many eggs can you store in your memory?",
        },
        {
          id: "filler",
          init: filler,
          name: "Filler",
          desc: "Fill the screen with eggs as quickly and efficiently as possible",
        },
        {
          id: "puzzle",
          init: puzzle,
          name: "Puzzle",
          desc: "Restore the original picture by moving puzzle pieces around",
        },
      ],
    },
  ];

  /**
   * @param {{ id?: string; init: any; name?: string; desc?: string; }} variant
   */
  function setGame(variant) {
    $game = variant.init();
    $game?.unpause();
  }
</script>

<div class="main" in:fade={{ duration: 200 }}>
  {#each variants as section}
    <h2 class="text-primary uppercase text-3xl text-center">{section.title}</h2>
    <ul class="list bg-base-100 rounded-box shadow-md mb-10">
      {#each section.list as game}
        <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
        <li
          class="list-row mb-1"
          class:disabled={game.init === nullFunction}
          onclick={() => setGame(game)}
          onkeypress={(event) => {
            if (event.key === "Enter") setGame(game);
          }}
        >
          <div><img class="size-20" src={`panel/${game.id}.png`} alt={game.id} /></div>
          <div class="list-col-grow">
            <div class="text-2xl font-bold">
              {game.name}
              <h3 class="inline">
                {#if $appReady && !$settings.seenGames.includes(game.id)}
                  <div class="badge badge-success">New!</div>
                {/if}
              </h3>
            </div>
            <div class="opacity-70">{game.desc}</div>
          </div>

          {#if $tracker.done.includes(game.id)}
            <div class="tooltip m-auto" data-tip="Today's game solved">
              <div class="text-2xl">✅</div>
            </div>
          {/if}
        </li>
      {/each}
    </ul>
  {/each}
</div>

<footer class="footer footer-horizontal footer-center mt-20">
  <aside>
    <p class="font-bold">Have an idea for a game? Want to share your feedback?</p>
    <p>
      Contact me at <span style="color: #5865f2;"><IcBaselineDiscord class="inline align-middle" /> @g7eternal</span> or
      <a class="link" href="https://github.com/g7eternal/egdle2/issues" title="Go to Github" target="_blank"> create a ticket </a> with your ideas
    </p>
  </aside>
</footer>

<style>
  li:hover {
    opacity: 70%;
    cursor: pointer;
  }

  li.disabled {
    display: none;
  }
</style>
