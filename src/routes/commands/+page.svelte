<script>
  import { onMount } from "svelte";
  import MdiTwitch from "~icons/mdi/twitch";
  import IcBaselineVideocam from "~icons/ic/baseline-videocam";
  import IcOutlineCasino from "~icons/ic/outline-casino";
  import IcBaselineEquals from "~icons/ic/baseline-equals";

  onMount(async () => {
    let tableBodies = document.querySelectorAll("tbody");
    let placeholders = document.querySelectorAll(".table-placeholder");
    let tables = document.querySelectorAll(".commands-table");
    if (tableBodies.length !== 5 || placeholders.length !== 5 || tables.length !== 5) {
      return;
    }

    try {
      let response = await fetch(`https://api.okayeg.com/commands`);
      let commands = await response.json();
      commands.sort((/** @type {{ _id: string; }} */ a, /** @type {{ _id: string; }} */ b) => (a._id > b._id ? -1 : b._id > a._id ? 1 : 0));

      for (let i = 0; i < commands.length; i++) {
        //temp donkness to keep the live site working before the update
        if (commands[i].cat == 5) {
          continue;
        }
        if (commands[i].cat == 6) {
          commands[i].cat = 5;
        }
        commands[i].cat--;

        let aliases = commands[i].aliases
          .map((/** @type {string} */ el) => "=" + el)
          .join(", ")
          .replaceAll("=+", "+");
        let desc = `
        ${commands[i].desc}
        ${commands[i].whisperable == 1 ? "<br><span class='text-xs'>Whisperable</span>" : ""}
        ${commands[i].enabled == 0 ? "<br><span class='text-xs'>Currently disabled</span>" : ""}`;
        let name = `
        <span class='text-lg font-bold'>=${commands[i]._id}</span>
        ${aliases ? `<br><span class='text-xs'>Alias: ${aliases}</span>` : ""}`;

        tableBodies[commands[i].cat].insertAdjacentHTML(
          "afterbegin",
          `
          <tr>
            <td>${name}</td>
            <td class="text-lg">${desc}</td>
          </tr>`,
        );
      }

      for (let index = 0; index < tables.length; index++) {
        // @ts-ignore
        tables[index].style.display = "";
        // @ts-ignore
        placeholders[index].style.display = "none";
      }
    } catch (error) {
      for (let index = 0; index < tables.length; index++) {
        tables[index].innerHTML = "Could not load commands :(";
        // @ts-ignore
        tables[index].style.display = "";
        // @ts-ignore
        placeholders[index].style.display = "none";
      }
      console.log(error);
    }
  });
</script>

<svelte:head>
  <title>Commands | OkayegBOT</title>
  <meta name="description" content="List of OkayegBOT chat commands" />
  <meta property="og:title" content="Commands | OkayegBOT" />
  <meta property="og:url" content="https://okayeg.com/commands" />
  <meta property="og:description" content="List of OkayegBOT chat commands" />
</svelte:head>

<div class="flex justify-center m-5">
  <div class="flex-1 shrink"></div>

  <div class="w-250 shrink">
    <div class="text-4xl font-extrabold"><IcBaselineEquals class="inline align-text-bottom" />General commands</div>
    <div class="table-placeholder skeleton h-50 overflow-x-auto"></div>
    <div class="commands-table overflow-x-auto border rounded-box bg-base-100" style="display: none;">
      <table class="table">
        <thead>
          <tr>
            <th>Command</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>

    <div class="text-4xl font-extrabold mt-15"><img class="h-8 inline align-text-bottom" src="/okayeg.png" alt="Okayeg" title="Okayeg" /> eg commands</div>
    <div class="text-md font-thin">egs reset each month, previous standings are available <a class="link" href="/leaderboard">here</a></div>
    <div class="table-placeholder skeleton h-50 overflow-x-auto"></div>
    <div class="commands-table overflow-x-auto border rounded-box bg-base-100" style="display: none;">
      <table class="table">
        <thead>
          <tr>
            <th>Command</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>

    <div class="text-4xl font-extrabold mt-15"><MdiTwitch class="inline align-text-bottom" />Twitch commands</div>
    <div class="table-placeholder skeleton h-50 overflow-x-auto"></div>
    <div class="commands-table overflow-x-auto border rounded-box bg-base-100" style="display: none;">
      <table class="table">
        <thead>
          <tr>
            <th>Command</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>

    <div class="text-4xl font-extrabold mt-15"><IcOutlineCasino class="inline align-text-bottom" />Random commands</div>
    <div class="table-placeholder skeleton h-50 overflow-x-auto"></div>
    <div class="commands-table overflow-x-auto border rounded-box bg-base-100" style="display: none;">
      <table class="table">
        <thead>
          <tr>
            <th>Command</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>

    <div class="text-4xl font-extrabold mt-15"><IcBaselineVideocam class="inline align-text-bottom" />Broadcaster commands</div>
    <div class="table-placeholder skeleton h-50 overflow-x-auto"></div>
    <div class="commands-table overflow-x-auto border rounded-box bg-base-100" style="display: none;">
      <table class="table">
        <thead>
          <tr>
            <th>Command</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  </div>
  <div class="flex-1 shrink"></div>
</div>
