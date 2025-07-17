<script>
  import { onMount } from "svelte";
  import { relativeTime } from "$lib/functions";
  import IcBaselineAccountCircle from "~icons/ic/baseline-account-circle";

  onMount(async () => {
    let botStats = document.getElementById("botStats");

    if (!botStats) {
      return;
    }

    try {
      let response = await fetch(`https://api.okayeg.com/stats`);
      let data = await response.json();
      console.log(data);
      botStats.innerHTML = `
      Connected to  ${data.channels} channels<br>
      RAM usage: ${data.ramUsage}MB<br>
      Bot uptime: ${data.botUptime}<br>
      Server uptime: ${data.serverUptime}<br>
      Season ${data.season} ends in ${relativeTime(data.seasonEnd * 1000)}`;
    } catch (error) {
      botStats.innerHTML = "Could not load the stats :(";
      console.log("loadBotStats error", error);
    }
  });
</script>

<svelte:head>
  <title>About | OkayegBOT</title>
  <meta name="description" content="OkayegBOT is a twitch chat bot that lets you collect egs. It also has a lot of other useful commands :)" />
  <meta property="og:title" content="About | OkayegBOT" />
  <meta property="og:url" content="https://okayeg.com" />
  <meta property="og:description" content="OkayegBOT is a twitch chat bot that lets you collect egs. It also has a lot of other useful commands :)" />
</svelte:head>

<div class="grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 place-items-center m-5">
  <div class="card card-border bg-base-200 border-accent w-70 h-80 bg-base-100 shadow-md">
    <div class="card-body">
      <h2 class="card-title">About</h2>
      <p>
        This is a Twitch chat bot that lets people collect egs <img class="w-10 inline" src="/okayeg.png" alt="Okayeg" title="Okayeg" /> <br />It also has many useful commands :) check the
        commands list
        <a class="link" href="/commands">here</a>
        <br />
        This site has a bunch of useful <a class="link" href="/twitch">Twitch related pages</a> also :)
      </p>
    </div>
  </div>

  <div class="card card-border bg-base-200 border-accent w-70 h-80 bg-base-100 shadow-md">
    <div class="card-body">
      <h2 class="card-title">How to add the bot to your channel</h2>
      <div class="prose">
        <ul>
          <li>
            Mod the bot by typing<br />
            <kbd class="kbd kbd-lg">/mod okayegbot</kbd> in your chat. <a class="link" style="font-size: 10px" target="_blank" rel="noopener noreferrer" href="/mod">why?</a>
          </li>
          <li>Type <kbd class="kbd kbd-lg">=join</kbd> in the <a class="link" href="https://www.twitch.tv/popout/okayegbot/chat">bot's chat.</a></li>
          <li>Done :)</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="card card-border bg-base-200 border-accent w-70 h-80 bg-base-100 shadow-md">
    <div class="card-body">
      <h2 class="card-title">Bot stats</h2>
      <div id="botStats">
        <div class="skeleton h-4 w-50 my-2"></div>
        <div class="skeleton h-4 w-50 my-2"></div>
        <div class="skeleton h-4 w-50 my-2"></div>
        <div class="skeleton h-4 w-50 my-2"></div>
        <div class="skeleton h-4 w-50 my-2"></div>
      </div>
    </div>
  </div>

  <div class="card card-border bg-base-200 border-accent w-70 h-80 bg-base-100 shadow-md">
    <div class="card-body">
      <h2 class="card-title">Contact info</h2>
      <p>
        Bot by <a class="link" target="_blank" rel="noopener noreferrer" href="https://www.twitch.tv/badoge">badoge</a> :) <br />
        If you find any issues or if you have suggestions or questions, you can contact me: <br />
        <a class="link" target="_blank" rel="noopener noreferrer" href="https://www.twitch.tv/popout/badoge/chat?popout=">in this chat</a><br />
        or on <a class="link" target="_blank" rel="noopener noreferrer" href="https://discord.gg/FR8bgQdPUT">Discord</a><br />
        or on <a class="link" target="_blank" rel="noopener noreferrer" href="https://github.com/badoge/okayeg.com/issues/new">GitHub</a><br />
        or using the <kbd class="kbd">=suggest</kbd> command<br />
        or by <a class="link" href="mailto:contact@okayeg.com">email</a>
      </p>
    </div>
  </div>
</div>

<div class="flex justify-center">
  <div class="prose">
    <h2>FAQ</h2>

    <blockquote><p>How do I remove the bot from my channel?</p></blockquote>
    <p>Type <kbd class="kbd kbd-lg">=leave</kbd> in your chat.</p>

    <blockquote><p>How do I disable the lottery announcements?</p></blockquote>
    <p>You can use the <kbd class="kbd kbd-lg">=mute</kbd> command to disable them.</p>

    <blockquote><p>How do I disable the live/offline notifications?</p></blockquote>
    <p>You can use the <kbd class="kbd kbd-lg">=mute</kbd> command to disable them.</p>

    <blockquote><p>How do I disable the "command is disabled" messages?</p></blockquote>
    <p>You can use the <kbd class="kbd kbd-lg">=mute</kbd> command to disable them.</p>

    <blockquote><p>Can I use the bot while I'm live?</p></blockquote>
    <p>You can use the <kbd class="kbd kbd-lg">=allowonline</kbd> command to allow the bot to run while your channel is live.</p>

    <blockquote><p>Where did my egs go?</p></blockquote>
    <p>
      Egs get reset every month, You can check your all time stats on your <a class="link" href="/profile"><IcBaselineAccountCircle class="inline" />Profile</a>
    </p>

    <blockquote><p>I changed my username, will I lose my egs?</p></blockquote>
    <p>No, the bot will update your username the next time you use any command.</p>

    <blockquote><p>I changed my username, do I need to add the bot to my channel again?</p></blockquote>
    <p>No, the bot checks for name changes every couple hours and will rejoin automatically.</p>

    <blockquote><p>Why did the bot leave my channel?</p></blockquote>
    <p>There are a couple reasons why the bot might leave your channel:</p>
    <ul>
      <li>You or one of your mods banned the bot.</li>
      <li>You got suspended from Twitch.</li>
      <li>Bot has not been used for a very long time.</li>
    </ul>

    <blockquote><p>Why did I get banned?</p></blockquote>
    <p>You can get banned for:</p>
    <ul>
      <li>Banning or timing out the bot in your chat.</li>
      <li>Automating =eg to farm egs.</li>
      <li>Using bots to farm egs.</li>
      <li>Abusing commands.</li>
    </ul>

    <blockquote><p>What programming language is the bot written in?</p></blockquote>
    <p>JavaScript (Node.js)</p>

    <blockquote><p>Where is the bot hosted?</p></blockquote>
    <p>The bot is hosted on Hetzner us-west</p>

    <blockquote><p>Is the bot open source?</p></blockquote>
    <p>
      <img
        src="/yeahbut.gif"
        title="yeah but open source software is like a 3rd party thing and I don't know"
        alt="yeah but open source software is like a 3rd party thing and I don't know"
        class="h-10"
      />
    </p>

    <h3>More questions?</h3>
    <p>Use one of the contact methods listed above or use the <kbd class="kbd kbd-lg">=suggest</kbd> command to ask me anything.</p>
  </div>
</div>
