<script>
  import IcBaselineQueryStats from "~icons/ic/baseline-query-stats";
  import IcBaselineEmojiEmotions from "~icons/ic/baseline-emoji-emotions";
  import IcBaselinePublic from "~icons/ic/baseline-public";
  import IcBaselineAttachMoney from "~icons/ic/baseline-attach-money";
  import IcBaselinePerson from "~icons/ic/baseline-person";
  import IcBaselineHistory from "~icons/ic/baseline-history";
</script>

<svelte:head>
  <title>Twitch data | OkayegBOT</title>
  <meta name="description" content="OkayegBOT is a twitch chat bot that lets you collect egs. It also has a lot of other useful commands :)" />
  <meta property="og:title" content="Twitch data | OkayegBOT" />
  <meta property="og:url" content="https://okayeg.com/twitch" />
  <meta property="og:description" content="OkayegBOT is a twitch chat bot that lets you collect egs. It also has a lot of other useful commands :)" />
</svelte:head>

<div class="flex m-5">
  <div class="flex-1"></div>

  <div class="flex flex-col justify-center w-250 mt-5">
    <h1 class="text-4xl text-center">Twitch related pages</h1>
    <!-- <a class="text-2xl link mt-5" href="/twitch/stats"><IcBaselineQueryStats class="inline" /> Donk stats</a>
    <p>A collection of various stats about Twitch and its streamers and viewers</p> -->

    <a class="text-2xl link mt-5" href="/twitch/emotes"><IcBaselineEmojiEmotions class="inline" /> Channel emotes</a>
    <p>View a Twitch channel's Twitch/BTTV/FFZ/7TV emotes and badges</p>

    <a class="text-2xl link mt-5" href="/twitch/emote"><IcBaselineEmojiEmotions class="inline" /> Emote info</a>
    <p>Info about a single emote</p>

    <a class="text-2xl link mt-5" href="/twitch/global/emotes"><IcBaselinePublic class="inline" /> Global emotes</a>
    <p>View the current global Twitch/BTTV/FFZ/7TV emotes</p>

    <a class="text-2xl link mt-5" href="/twitch/subs"><IcBaselineAttachMoney class="inline" /> Local sub prices</a>
    <p>View the local Twitch subscription prices with currency conversion</p>

    <a class="text-2xl link mt-5" href="/twitch/user"><IcBaselinePerson class="inline" /> User info</a>
    <p>View all of a Twitch user's public info</p>

    <a class="text-2xl link mt-5" href="/twitch/time"><IcBaselineHistory class="inline" /> VOD time</a>
    <p>A simple tool that helps you find a Twitch VOD timestamp from real time or from a clip of a different channel</p>
  </div>

  <div class="flex-1"></div>
</div>
