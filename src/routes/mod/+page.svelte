<svelte:head>
  <title>OkayegBOT</title>
  <meta name="description" content="Important info about a new Twitch update that affects the bot :)" />
  <meta property="og:title" content="OkayegBOT" />
  <meta property="og:url" content="https://okayeg.com/mod" />
  <meta property="og:description" content="Important info about a new Twitch update that affects the bot :)" />
</svelte:head>

<div class="flex justify-center">
  <div class="prose lg:prose-xl m-10">
    <h3 class="text-primary">What is happening?</h3>
    <p>Twitch added a limit on how many channels the bot can join, the limit does not include channels the bot is modded in.</p>
    <h3 class="text-primary">What should I do?</h3>
    <p>You should mod the bot by typing <kbd class="kbd kbd-lg">/mod okayegbot</kbd> in your chat.</p>
    <h3 class="text-primary">What if I don't?</h3>
    <p>The bot will leave your channel.</p>

    <h4>
      See
      <a class="link" target="_blank" rel="noopener noreferrer" href="https://discuss.dev.twitch.com/t/giving-broadcasters-control-concurrent-join-limits-for-irc-and-eventsub/54997">
        this forum post
      </a>
      for more info.
    </h4>
  </div>
</div>
