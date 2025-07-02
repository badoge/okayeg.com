<script>
  import IcBaselineInfo from "~icons/ic/baseline-info";
  import IcBaselineEquals from "~icons/ic/baseline-equals";
  import IconoirLeaderboardStar from "~icons/iconoir/leaderboard-star";
  import IcOutlineTrendingUp from "~icons/ic/outline-trending-up";
  import IcBaselineStorefront from "~icons/ic/baseline-storefront";
  import IcBaselineApi from "~icons/ic/baseline-api";
  import IcBaselineAccountCircle from "~icons/ic/baseline-account-circle";
  import MdiTwitch from "~icons/mdi/twitch";
  import IcBaselineQueryStats from "~icons/ic/baseline-query-stats";
  import IcOutlineEmojiEmotions from "~icons/ic/outline-emoji-emotions";
  import MingcuteEmojiLine from "~icons/mingcute/emoji-line";
  import IcBaselinePublic from "~icons/ic/baseline-public";
  import IcBaselineAttachMoney from "~icons/ic/baseline-attach-money";
  import IcBaselinePerson from "~icons/ic/baseline-person";
  import IcBaselineHistory from "~icons/ic/baseline-history";
  import IcBaselineEgg from "~icons/ic/baseline-egg";
  import { page } from "$app/state";

  const route = $derived(page.route.id);
</script>

<li><a class={route === "/" ? "bg-accent text-accent-content" : ""} href="/"><IcBaselineInfo />About</a></li>
<li><a class={route === "/commands" ? "bg-accent text-accent-content" : ""} href="/commands"><IcBaselineEquals />Commands</a></li>
<li><a class={route === "/leaderboard" ? "bg-accent text-accent-content" : ""} href="/leaderboard"><IconoirLeaderboardStar />Leaderboard</a></li>
<li><a class={route === "/stocks" ? "bg-accent text-accent-content" : ""} href="/stocks"><IcOutlineTrendingUp />Stocks</a></li>
<li><a class={route === "/market" ? "bg-accent text-accent-content" : ""} href="/market"><IcBaselineStorefront />NFE market</a></li>
<li><a class={route === "/api" ? "bg-accent text-accent-content" : ""} href="/api"><IcBaselineApi />API</a></li>
<li><a class={route === "/profile" ? "bg-accent text-accent-content" : ""} href="/profile"><IcBaselineAccountCircle />Profile</a></li>
<div class="divider divider-horizontal divider-accent m-0"></div>
<li>
  <details>
    <summary class={route?.startsWith("/twitch") ? "bg-accent text-accent-content" : ""}><MdiTwitch />Twitch data</summary>
    <ul class="bg-accent text-secondary-content rounded-box w-55 p-2 z-1 mt-2 shadow-sm">
      <li><a class={route === "/twitch" ? "bg-neutral text-neutral-content" : ""} href="/twitch"><strong>Twitch related pages</strong></a></li>
      <div class="divider divider-neutral m-0"></div>
      <li><a class={route === "/twitch/emote" ? "bg-neutral text-neutral-content" : ""} href="/twitch/emote"><MingcuteEmojiLine />Emote info</a></li>
      <li><a class={route === "/twitch/emotes" ? "bg-neutral text-neutral-content" : ""} href="/twitch/emotes"><IcOutlineEmojiEmotions />Channel emotes</a></li>
      <li><a class={route === "/twitch/global/emotes" ? "bg-neutral text-neutral-content" : ""} href="/twitch/global/emotes"><IcBaselinePublic />Global emotes</a></li>
      <li><a class={route === "/twitch/stats" ? "bg-neutral text-neutral-content" : ""} href="/twitch/stats"><IcBaselineQueryStats />Donk stats</a></li>
      <li><a class={route === "/twitch/subs" ? "bg-neutral text-neutral-content" : ""} href="/twitch/subs"><IcBaselineAttachMoney />Local sub prices</a></li>
      <li><a class={route === "/twitch/time" ? "bg-neutral text-neutral-content" : ""} href="/twitch/time"><IcBaselineHistory />VOD time</a></li>
      <li><a class={route === "/twitch/user" ? "bg-neutral text-neutral-content" : ""} href="/twitch/user"><IcBaselinePerson />User info</a></li>
    </ul>
  </details>
</li>
<div class="divider divider-horizontal divider-accent m-0"></div>

<li><a class={route === "/egdle" ? "bg-accent text-accent-content" : ""} href="/egdle"><IcBaselineEgg />Egdle</a></li>

<style>
  li {
    font-size: 1.1rem;
  }
</style>
