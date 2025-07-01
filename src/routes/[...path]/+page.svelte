<script>
  import { page } from "$app/state";
  /** @type {{ [key: string]: any }} */
  let aliases = {
    api: ["api"],
    bounty: ["bounty"],
    egdle: ["egdle"],
    clips: ["clips", "clip", "topclips"],
    commands: ["commands", "command"],
    leaderboard: ["leaderboard", "lb", "season", "seasons"],
    profile: ["profile", "settings"],
    stocks: ["stocks", "stock", "price", "prices"],
    market: ["market", "nfe", "marketplace", "nfes", "store"],
    stream: ["stream"],
    "twitch/stats": ["stats", "donkstats", "donkstat", "stat", "twitch/stat", "twitch/donkstat", "twitch/donkstats"],
    "twitch/emotes": ["emotes", "emote", "channelemotes", "channelemote", "twitch/emote", "twitch/channelemotes", "twitch/channelemote"],
    "twitch/emotes-global": [
      "emotes-global",
      "global",
      "emotes_global",
      "emotesglobal",
      "globalemotes",
      "global-emotes",
      "global_emotes",
      "twitch/global",
      "twitch/emotes_global",
      "twitch/emotesglobal",
      "twitch/globalemotes",
      "twitch/global-emotes",
      "twitch/global_emotes",
    ],
    "twitch/subs": ["subs", "sub", "price", "prices", "localsubs", "localprices", "twitch/sub", "twitch/price", "twitch/prices", "twitch/localsubs"],
    "twitch/user": ["user", "users", "userinfo", "usersinfo", "twitch/users", "twitch/userinfo", "twitch/usersinfo"],
    "twitch/time": ["time", "timer", "vod", "vodtime", "vodtimer", "twitch/timer", "twitch/vod", "twitch/vodtime", "twitch/vodtimer"],
    "twitch/followlist": ["followlist", "followers", "following", "follow", "follows", "twitch/followers", "twitch/following", "twitch/follow", "twitch/follows"],
  };
  let path = page.url.pathname.replace("/", "").replace(".html", "").toLowerCase();
  let hint = $state("");

  for (let key in aliases) {
    if (aliases[key].indexOf(path) !== -1) {
      hint = `Did you mean <a class="link" href="/${key}">okayeg.com/${key}</a>?`;
    }
  }
</script>

<svelte:head>
  <title>404 | OkayegBOT</title>
  <meta name="description" content="OkayegBOT twitch chat bot" />
  <meta property="og:title" content="404 | OkayegBOT" />
  <meta property="og:url" content="https://okayeg.com" />
  <meta property="og:description" content="OkayegBOT twitch chat bot" />
</svelte:head>

<div class="flex justify-center m-10">
  <div class="prose justify-items-center text-center">
    <h1>404</h1>
    <h1>NOTHING HERE</h1>
    <img src="/okayeg.png" alt="Okayeg" title="Okayeg" />
    <h3>{@html hint}</h3>
  </div>
</div>
