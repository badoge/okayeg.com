<script>
  import { onMount } from "svelte";
  import { addOrdinalSuffix, relativeTime } from "$lib/functions";

  onMount(async () => {
    let seasonSelect = document.getElementById("seasonSelect");
    let season = document.getElementById("season");
    let endTime = document.getElementById("endTime");
    if (!seasonSelect || !season || !endTime) {
      return;
    }

    try {
      let response = await fetch(`https://api.okayeg.com/leaderboard`);
      let leaderboard = await response.json();

      if (!leaderboard) {
        return;
      }

      // @ts-ignore
      seasonSelect.remove(0);
      for (let i = leaderboard.season; i >= 0; i--) {
        let option = document.createElement("option");
        option.value = i;
        option.text = `Season ${i}`;
        if (i == leaderboard.season) {
          option.selected = true;
        }
        seasonSelect.appendChild(option);
      }
      season.innerHTML = `Season ${leaderboard.season} Leaderboard`;
      endTime.innerHTML = `Ends in ${relativeTime(leaderboard.timeLeft * 1000)}`;

      for (let index = 0; index < 10; index++) {
        document.getElementById(`user${index + 1}`).innerHTML = `
        <a class="link" href="https://twitch.tv/${leaderboard.current[index].username}" target="_blank" rel="noopener noreferrer">
            ${leaderboard.current[index].username}
        </a>`;
        document.getElementById(`user${index + 1}PFP`).dataset.userid = leaderboard.current[index].id;
        document.getElementById(`user${index + 1}Egs`).innerHTML = `${leaderboard.current[index].egs.toLocaleString()} egs`;
      }

      await loadLBPFPs();
      seasonSelect.addEventListener("change", async function () {
        season.innerHTML = `Season ${seasonSelect.value} Leaderboard`;
        endTime.innerHTML = parseInt(seasonSelect.value, 10) === parseInt(leaderboard.season, 10) ? `Ends in ${relativeTime(leaderboard.timeLeft * 1000)}` : "";
        let selectedLeaderboard = leaderboard.allTime[0].leaderboard[seasonSelect.value].users;
        if (parseInt(seasonSelect.value, 10) === parseInt(leaderboard.season, 10)) {
          selectedLeaderboard = leaderboard.current;
        }
        for (let index = 0; index < 10; index++) {
          document.getElementById(`user${index + 1}`).innerHTML = `<a class="link" href="https://twitch.tv/${selectedLeaderboard[index].username}" target="_blank" rel="noopener noreferrer">
        ${selectedLeaderboard[index].username}</a>`;
          document.getElementById(`user${index + 1}PFP`).dataset.userid = selectedLeaderboard[index].id;
          document.getElementById(`user${index + 1}Egs`).innerHTML = `${selectedLeaderboard[index].egs.toLocaleString()} egs`;
        }
        document.getElementById("loadTop100").style.display = "";
        document.getElementById("top100").style.display = "none";
        await loadLBPFPs();
      });

      document.getElementById("loadTop100").addEventListener("click", function () {
        document.getElementById("loadTop100").style.display = "none";
        let selectedLeaderboard = leaderboard.allTime[0].leaderboard[seasonSelect.value].users;
        if (seasonSelect.value == leaderboard.season) {
          selectedLeaderboard = leaderboard.current;
        }
        let string = "";
        for (let index = 10; index < 100; index++) {
          string += `
          <tr>
            <th>${addOrdinalSuffix(index + 1)} Place</th>
            <td>
                <a class="link" href="https://twitch.tv/${selectedLeaderboard[index].username}" target="_blank" rel="noopener noreferrer">
                    ${selectedLeaderboard[index].username}
                </a>
            </td>
            <td>
                ${selectedLeaderboard[index].egs.toLocaleString()} egs
            </td>
          </tr>`;
        }
        document.getElementById("top100Table").innerHTML = string;
        document.getElementById("top100").style.display = "";
      });
    } catch (error) {
      console.log("getLeaderboard error" + error);
    }
  });

  async function loadLBPFPs() {
    let ids = document.querySelectorAll(".lb-pfp");
    ids = [...ids].map((e) => e.dataset.userid);
    let response = await fetch(`https://helper.donk.workers.dev/twitch/users?id=${ids.join(",")}`);
    let users = await response.json();
    for (let index = 1; index <= 10; index++) {
      let pfp = users.data.find((x) => x.id === document.getElementById(`user${index}PFP`).dataset.userid)?.profile_image_url || "/okayeg.png";
      document.getElementById(`user${index}PFP`).src = pfp;
    }
  } //loadLBPFPs
</script>

<svelte:head>
  <title>Leaderboard | OkayegBOT</title>
  <meta name="description" content="Leaderboard for previous OkayegBOT seasons" />
  <meta property="og:title" content="Leaderboard | OkayegBOT" />
  <meta property="og:url" content="https://okayeg.com/leaderboard" />
  <meta property="og:description" content="Leaderboard for previous OkayegBOT seasons" />
</svelte:head>

<div class="flex justify-center m-5">
  <div class="flex-1 shrink"></div>

  <div class="w-150 shrink text-center">
    <span class="text-5xl font-thin" id="season">
      Season <div class="skeleton w-14 h-12 inline-block align-bottom"></div>
      Leaderboard
    </span>
    <br />
    <span class="text-sm" id="endTime">
      Ends in <div class="skeleton w-60 h-4 inline-block align-text-bottom"></div>
    </span>
    <br />
    <select id="seasonSelect" class="select select-sm select-accent mt-2 mb-10" aria-label="season selector">
      <option selected>Loading...</option>
    </select>

    <div class="card card-xl sm:card-side bg-base-200 shadow-xl border lb-1st">
      <figure class="w-60">
        <img src="/okayeg.png" id="user1PFP" class="lb-pfp" alt="twitch avatar" />
      </figure>
      <div class="card-body text-start m-auto">
        <h2 class="card-title font-bold">1st Place</h2>
        <span class="text-2xl" id="user1">
          <div class="skeleton w-50 h-6 inline-block align-text-bottom"></div>
        </span>
        <span class="text-2xl" id="user1Egs">
          <div class="skeleton w-50 h-6 inline-block align-text-bottom"></div>
        </span>
      </div>
    </div>

    <div class="card card-xl sm:card-side bg-base-200 shadow-xl border lb-2nd">
      <figure class="w-60">
        <img src="/okayeg.png" id="user2PFP" class="lb-pfp" alt="twitch avatar" />
      </figure>
      <div class="card-body text-start m-auto">
        <h2 class="card-title font-bold">2nd Place</h2>
        <span class="text-2xl" id="user2">
          <div class="skeleton w-50 h-6 inline-block align-text-bottom"></div>
        </span>
        <span class="text-2xl" id="user2Egs">
          <div class="skeleton w-50 h-6 inline-block align-text-bottom"></div>
        </span>
      </div>
    </div>

    <div class="card card-xl sm:card-side bg-base-200 shadow-xl border lb-3rd">
      <figure class="w-60">
        <img src="/okayeg.png" id="user3PFP" class="lb-pfp" alt="twitch avatar" />
      </figure>
      <div class="card-body text-start m-auto">
        <h2 class="card-title font-bold">3rd Place</h2>
        <span class="text-2xl" id="user3">
          <div class="skeleton w-50 h-6 inline-block align-text-bottom"></div>
        </span>
        <span class="text-2xl" id="user3Egs">
          <div class="skeleton w-50 h-6 inline-block align-text-bottom"></div>
        </span>
      </div>
    </div>

    <div class="card card-xl sm:card-side bg-base-200 shadow-xl border lb-top10">
      <figure class="w-60">
        <img src="/okayeg.png" id="user4PFP" class="lb-pfp" alt="twitch avatar" />
      </figure>
      <div class="card-body text-start m-auto">
        <h2 class="card-title font-bold">4th Place</h2>
        <span class="text-2xl" id="user4">
          <div class="skeleton w-50 h-6 inline-block align-text-bottom"></div>
        </span>
        <span class="text-2xl" id="user4Egs">
          <div class="skeleton w-50 h-6 inline-block align-text-bottom"></div>
        </span>
      </div>
    </div>

    <div class="card card-xl sm:card-side bg-base-200 shadow-xl border lb-top10">
      <figure class="w-60">
        <img src="/okayeg.png" id="user5PFP" class="lb-pfp" alt="twitch avatar" />
      </figure>
      <div class="card-body text-start m-auto">
        <h2 class="card-title font-bold">5th Place</h2>
        <span class="text-2xl" id="user5">
          <div class="skeleton w-50 h-6 inline-block align-text-bottom"></div>
        </span>
        <span class="text-2xl" id="user5Egs">
          <div class="skeleton w-50 h-6 inline-block align-text-bottom"></div>
        </span>
      </div>
    </div>

    <div class="card card-xl sm:card-side bg-base-200 shadow-xl border lb-top10">
      <figure class="w-60">
        <img src="/okayeg.png" id="user6PFP" class="lb-pfp" alt="twitch avatar" />
      </figure>
      <div class="card-body text-start m-auto">
        <h2 class="card-title font-bold">6th Place</h2>
        <span class="text-2xl" id="user6">
          <div class="skeleton w-50 h-6 inline-block align-text-bottom"></div>
        </span>
        <span class="text-2xl" id="user6Egs">
          <div class="skeleton w-50 h-6 inline-block align-text-bottom"></div>
        </span>
      </div>
    </div>

    <div class="card card-xl sm:card-side bg-base-200 shadow-xl border lb-top10">
      <figure class="w-60">
        <img src="/okayeg.png" id="user7PFP" class="lb-pfp" alt="twitch avatar" />
      </figure>
      <div class="card-body text-start m-auto">
        <h2 class="card-title font-bold">7th Place</h2>
        <span class="text-2xl" id="user7">
          <div class="skeleton w-50 h-6 inline-block align-text-bottom"></div>
        </span>
        <span class="text-2xl" id="user7Egs">
          <div class="skeleton w-50 h-6 inline-block align-text-bottom"></div>
        </span>
      </div>
    </div>

    <div class="card card-xl sm:card-side bg-base-200 shadow-xl border lb-top10">
      <figure class="w-60">
        <img src="/okayeg.png" id="user8PFP" class="lb-pfp" alt="twitch avatar" />
      </figure>
      <div class="card-body text-start m-auto">
        <h2 class="card-title font-bold">8th Place</h2>
        <span class="text-2xl" id="user8">
          <div class="skeleton w-50 h-6 inline-block align-text-bottom"></div>
        </span>
        <span class="text-2xl" id="user8Egs">
          <div class="skeleton w-50 h-6 inline-block align-text-bottom"></div>
        </span>
      </div>
    </div>

    <div class="card card-xl sm:card-side bg-base-200 shadow-xl border lb-top10">
      <figure class="w-60">
        <img src="/okayeg.png" id="user9PFP" class="lb-pfp" alt="twitch avatar" />
      </figure>
      <div class="card-body text-start m-auto">
        <h2 class="card-title font-bold">9th Place</h2>
        <span class="text-2xl" id="user9">
          <div class="skeleton w-50 h-6 inline-block align-text-bottom"></div>
        </span>
        <span class="text-2xl" id="user9Egs">
          <div class="skeleton w-50 h-6 inline-block align-text-bottom"></div>
        </span>
      </div>
    </div>

    <div class="card card-xl sm:card-side bg-base-200 shadow-xl border lb-top10">
      <figure class="w-60">
        <img src="/okayeg.png" id="user10PFP" class="lb-pfp" alt="twitch avatar" />
      </figure>
      <div class="card-body text-start m-auto">
        <h2 class="card-title font-bold">10th Place</h2>
        <span class="text-2xl" id="user10">
          <div class="skeleton w-50 h-6 inline-block align-text-bottom"></div>
        </span>
        <span class="text-2xl" id="user10Egs">
          <div class="skeleton w-50 h-6 inline-block align-text-bottom"></div>
        </span>
      </div>
    </div>

    <div class="card mt-5">
      <div class="card-body">
        <button type="button" id="loadTop100" class="btn btn-secondary">Load top 100</button>
        <div id="top100" style="display: none">
          <table class="table">
            <tbody id="top100Table"></tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div class="flex-1 shrink"></div>
</div>

<style>
  .lb-1st {
    border-color: #ffdd20;
    margin-bottom: 5px;
  }

  .lb-2nd {
    border-color: #c4c4c4;
    margin-bottom: -10px;
    transform: scale(0.9);
  }

  .lb-3rd {
    border-color: #ce7b28;
    margin-bottom: -25px;
    transform: scale(0.8);
  }

  .lb-top10 {
    margin-bottom: -35px;
    transform: scale(0.7);
  }
</style>
