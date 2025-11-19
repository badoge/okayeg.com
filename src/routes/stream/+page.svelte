<script>
  import { onMount } from "svelte";
  import CommandsTable from "$lib/CommandsTable.svelte";
  import IcBaselineLiveTv from "~icons/ic/baseline-live-tv";

  let commands = $state({
    stream: [],
  });

  onMount(async () => {
    try {
      let response = await fetch(`https://api.okayeg.com/commands`);
      let result = await response.json();
      result.sort((/** @type {{ _id: string; }} */ a, /** @type {{ _id: string; }} */ b) => (a._id > b._id ? 1 : b._id > a._id ? -1 : 0));

      for (let i = 0; i < result.length; i++) {
        switch (result[i].cat) {
          case 5:
            commands.stream.push(result[i]);
            break;
          default:
            break;
        }
      }
    } catch (error) {
      for (const key in commands) {
        commands[key] = null;
      }
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

<div class="mx-10">
  <div class="text-2xl font-extrabold"><IcBaselineLiveTv class="inline align-text-bottom" /> Stream commands</div>

  {#if commands.stream?.length == 0}
    <div class="skeleton h-50 overflow-x-auto"></div>
  {:else if commands.stream === null}
    <span class="text-error text-xl">Could not load commands :(</span>
  {:else}
    <div class="overflow-x-auto border rounded-box bg-base-100">
      <CommandsTable commands={commands.stream} />
    </div>
  {/if}
</div>
