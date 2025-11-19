<script>
  import { onMount } from "svelte";
  import MdiTwitch from "~icons/mdi/twitch";
  import IcBaselineVideocam from "~icons/ic/baseline-videocam";
  import IcOutlineCasino from "~icons/ic/outline-casino";
  import IcBaselineEquals from "~icons/ic/baseline-equals";
  import CommandsTable from "$lib/CommandsTable.svelte";

  let commands = $state({
    general: [],
    eg: [],
    twitch: [],
    random: [],
    broadcaster: [],
  });

  onMount(async () => {
    try {
      let response = await fetch(`https://api.okayeg.com/commands`);
      let result = await response.json();
      result.sort((/** @type {{ _id: string; }} */ a, /** @type {{ _id: string; }} */ b) => (a._id > b._id ? 1 : b._id > a._id ? -1 : 0));

      for (let i = 0; i < result.length; i++) {
        switch (result[i].cat) {
          case 1:
            commands.general.push(result[i]);
            break;
          case 2:
            commands.eg.push(result[i]);
            break;
          case 3:
            commands.twitch.push(result[i]);
            break;
          case 4:
            commands.random.push(result[i]);
            break;
          case 6:
            commands.broadcaster.push(result[i]);
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

    {#if commands.general?.length == 0}
      <div class="skeleton h-50"></div>
    {:else if commands.general === null}
      <span class="text-error text-xl">Could not load commands :(</span>
    {:else}
      <div class="border rounded-box bg-base-100">
        <CommandsTable commands={commands.general} />
      </div>
    {/if}

    <div class="text-4xl font-extrabold mt-15"><img class="h-8 inline align-text-bottom" src="/okayeg.png" alt="Okayeg" title="Okayeg" /> eg commands</div>
    <div class="text-md font-thin">egs reset each month, previous standings are available <a class="link" href="/leaderboard">here</a></div>
    {#if commands.eg?.length == 0}
      <div class="skeleton h-50"></div>
    {:else if commands.eg === null}
      <span class="text-error text-xl">Could not load commands :(</span>
    {:else}
      <div class=" border rounded-box bg-base-100">
        <CommandsTable commands={commands.eg} />
      </div>
    {/if}

    <div class="text-4xl font-extrabold mt-15"><MdiTwitch class="inline align-text-bottom" />Twitch commands</div>
    {#if commands.twitch?.length == 0}
      <div class="skeleton h-50"></div>
    {:else if commands.twitch === null}
      <span class="text-error text-xl">Could not load commands :(</span>
    {:else}
      <div class=" border rounded-box bg-base-100">
        <CommandsTable commands={commands.twitch} />
      </div>
    {/if}

    <div class="text-4xl font-extrabold mt-15"><IcOutlineCasino class="inline align-text-bottom" />Random commands</div>
    {#if commands.random?.length == 0}
      <div class="skeleton h-50"></div>
    {:else if commands.random === null}
      <span class="text-error text-xl">Could not load commands :(</span>
    {:else}
      <div class=" border rounded-box bg-base-100">
        <CommandsTable commands={commands.random} />
      </div>
    {/if}

    <div class="text-4xl font-extrabold mt-15"><IcBaselineVideocam class="inline align-text-bottom" />Broadcaster commands</div>
    {#if commands.broadcaster?.length == 0}
      <div class="skeleton h-50"></div>
    {:else if commands.broadcaster === null}
      <span class="text-error text-xl">Could not load commands :(</span>
    {:else}
      <div class=" border rounded-box bg-base-100">
        <CommandsTable commands={commands.broadcaster} />
      </div>
    {/if}
  </div>
  <div class="flex-1 shrink"></div>
</div>
