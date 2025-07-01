<script>
  import { onMount } from "svelte";

  onMount(async () => {
    let placeholder = document.getElementById("placeholder");
    let table = document.getElementById("table");

    if (!placeholder || !table) {
      return;
    }

    try {
      let response = await fetch(`https://api.okayeg.com/commands`);
      let commands = await response.json();
      for (let i = 0; i < commands.length; i++) {
        let aliases = commands[i].aliases
          .map((/** @type {string} */ el) => "=" + el)
          .join(", ")
          .replaceAll("=+", "+");
        let desc = `${commands[i].desc}
      ${commands[i].enabled == 0 ? "<br><span class='text-warning'>Currently disabled</span>" : ""}`;
        let name = `=${commands[i]._id}
      ${aliases ? "<br><small class='neutral-content'>Alias: " + aliases + "</small>" : ""}`;
        if (commands[i].cat == 5) {
          document.getElementById("tableBody")?.insertAdjacentHTML(
            "afterbegin",
            `
            <tr>
              <td>${name}</td>
              <td>${desc}</td>
            </tr>`,
          );
        }
      }

      placeholder.style.display = "none";
      table.style.display = "";
    } catch (error) {
      placeholder.style.display = "none";
      table.style.display = "";
      table.innerHTML = "Could not load commands :(";
      console.log(error);
    }

    new Twitch.Embed("twitch-embed", {
      width: "100%",
      height: "100%",
      channel: "okayegbot",
      parent: ["okayeg.com"],
    });
  });
</script>

<svelte:head>
  <title>Stream | OkayegBOT</title>
  <meta name="description" content="Experimental interactive stream that lets viewers fight against each other to earn egs. It also shows the bot's stats and events" />
  <meta property="og:title" content="Stream | OkayegBOT" />
  <meta property="og:url" content="https://okayeg.com/stream" />
  <meta property="og:description" content="Experimental interactive stream that lets viewers fight against each other to earn egs. It also shows the bot's stats and events" />
  <script src="https://embed.twitch.tv/embed/v1.js"></script>
</svelte:head>

<div class="mockup-browser border-base-300 border m-10">
  <div class="mockup-browser-toolbar">
    <div class="input">https://twitch.tv/okayegbot</div>
  </div>
  <div class="grid border-t border-base-300 h-150"><div id="twitch-embed"></div></div>
</div>

<div class="prose mx-10"><h3>Stream commands:</h3></div>

<div id="placeholder" class="skeleton h-50 overflow-x-auto mx-10"></div>

<div id="table" class="overflow-x-auto border rounded-box bg-base-100 mx-10" style="display: none;">
  <table class="table">
    <thead>
      <tr>
        <th>Command</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody id="tableBody"></tbody>
  </table>
</div>
