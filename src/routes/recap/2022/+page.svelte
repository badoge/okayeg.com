<script>
  import { onMount } from "svelte";
  import IcBaselinePublic from "~icons/ic/baseline-public";
  import IcBaselinePersonSearch from "~icons/ic/baseline-person-search";
</script>

<svelte:head>
  <title>OkayegBOT 2022 Recap</title>
  <meta name="description" content="OkayegBOT 2022 Recap" />
  <meta property="og:title" content="OkayegBOT 2022 Recap" />
  <meta property="og:url" content="https://okayeg.com/recap/2022" />
  <meta property="og:description" content="OkayegBOT 2022 Recap" />
</svelte:head>

<div class="flex text-center justify-center">
  <div class=" w-200 flex-col shrink">
    <h1 class="text-6xl my-6">OkayegBOT Yearly Recaps</h1>
    <p class="text-primary text-sm">From season 24 till season 35 (Nov 2022 to Nov 2023)<br />Season 35 marks the bot's 3 year anniversary :)</p>

    <p class="text-info">Your own personalized recap can be viewed using the form at the bottom</p>
    <h3 class="text-3xl">Bot stats from the past year</h3>

    <div class="w-full grid grid-cols-1 gap-3 m-3">
      <div class="card lg:card-side bg-base-200 shadow-sm">
        <figure>
          <img src="/recap/players.png" alt="players" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">Player stats</h2>
          <p>Total player count: 9,435</p>
          <div class="card-actions justify-end">Out of the 9,435 players, only 145 didn't miss a single season the past year</div>
        </div>
      </div>

      <div class="card lg:card-side bg-base-200 shadow-sm">
        <figure>
          <img src="/recap/egs.png" alt="egs" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">egs</h2>
          <p>Total egs earned: 6,900,276</p>
          <p>15,032 egs were eaten using the <kbd>=eat</kbd> command</p>
        </div>
      </div>

      <div class="card lg:card-side bg-base-200 shadow-sm">
        <figure>
          <img src="/recap/commands.png" alt="commands" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">Command stats</h2>
          <p>The <kbd>=eg</kbd> commaned was used 321,582 times</p>
          <p>The command gave out positive egs 225,426 times - zero egs 64,191 times - negative egs 31,965 times</p>
          <p>All other commands were used 514,213 times</p>
        </div>
      </div>

      <div class="card lg:card-side bg-base-200 shadow-sm">
        <figure>
          <img src="/recap/stocks.png" alt="stocks" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">Stocks</h2>
          <p>Some investors held on to their shares and refused to sell them before the end of a season</p>
          <p>6,858 shares of shungite - 7,091 shares of chicken - 13,563 shares of bajcoin - 9,209 shares of copium</p>
        </div>
      </div>

      <div class="card lg:card-side bg-base-200 shadow-sm">
        <figure>
          <img src="/recap/coinflip.png" alt="coinflip" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">Coinflips</h2>
          <p>The coin was flipped 135,437 times but players won 67,837 times only</p>
        </div>
      </div>

      <div class="card lg:card-side bg-base-200 shadow-sm">
        <figure>
          <img src="/recap/lottery.png" alt="lottery" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">Lottery</h2>
          <p>56,502 lottery tickets were bought</p>
          <p>
            The luckiest player was <a href="https://twitch.tv/biankaorban" target="_blank">biankaorban</a>, They bought a total of 865 tickets throughout the year and won the lottery 14
            times!
          </p>
          <p>
            The unluckiest player was <a href="https://twitch.tv/4kjone" target="_blank">4Kjone</a>, They bought a total of 2,506 tickets throughout the year but didn't win a single time
          </p>
        </div>
      </div>

      <div class="card lg:card-side bg-base-200 shadow-sm">
        <figure>
          <img src="/recap/trading.png" alt="trading" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">Trading</h2>
          <p>56,502 lottery tickets were bought</p>
          <p>18,208,427 egs were sent and received</p>
        </div>
      </div>

      <div class="card lg:card-side bg-base-200 shadow-sm">
        <figure>
          <img style="height: 200px; margin-top: -70px" src="/nerd.png" alt="trivia" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">Trivia</h2>
          <p>31,433 trivia questions were answered correctly</p>
        </div>
      </div>

      <div class="card lg:card-side bg-base-200 shadow-sm">
        <figure>
          <img src="/recap/duels.png" alt="duels" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">Duels</h2>
          <p>Players dueled 2,720 times</p>
        </div>
      </div>

      <div class="card lg:card-side bg-base-200 shadow-sm">
        <figure>
          <img src="/recap/roulette.png" alt="roulette" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">Roulette</h2>
          <p>The roulette wheel was spun 14,900 times but players won 4,921 times only</p>
        </div>
      </div>
    </div>

    <div class="flex justify-between">
      <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 justify-self-start">
        <legend class="fieldset-legend">Individual recap</legend>
        <div class="join">
          <input type="text" class="input join-item" placeholder="Username" />
          <button class="btn join-item btn-primary"><IcBaselinePersonSearch />Lookup</button>
        </div>
        <p class="label">not updated for the new site yet :) - View any player's OkayegBOT recap for 2023</p>
      </fieldset>

      <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 justify-self-end">
        <legend class="fieldset-legend">Global recap</legend>
        <button type="button" class="btn btn-primary float-start"><IcBaselinePublic />Global recap</button>
        <p class="label">Stats from all users for 2023</p>
      </fieldset>
    </div>
  </div>
</div>
