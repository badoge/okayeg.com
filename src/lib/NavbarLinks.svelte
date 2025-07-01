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
</script>

<li><a href="/"><IcBaselineInfo />About </a></li>
<li><a href="/commands"><IcBaselineEquals />Commands</a></li>
<li><a href="/leaderboard"><IconoirLeaderboardStar />Leaderboard</a></li>
<li><a href="/stocks"><IcOutlineTrendingUp />Stocks</a></li>
<li><a href="/market"><IcBaselineStorefront />NFE market</a></li>
<li><a href="/api"><IcBaselineApi />API</a></li>
<li><a href="/profile"><IcBaselineAccountCircle />Profile</a></li>
<div class="divider divider-horizontal divider-accent m-0"></div>
<li>
  <details>
    <summary><MdiTwitch />Twitch data</summary>
    <ul class="bg-accent text-secondary-content rounded-box w-55 p-2 z-1 mt-2 shadow-sm">
      <li><a href="/twitch"><strong>Twitch related pages</strong></a></li>
      <div class="divider divider-neutral m-0"></div>
      <li><a href="/twitch/emote"><MingcuteEmojiLine />Emote info</a></li>
      <li><a href="/twitch/emotes"><IcOutlineEmojiEmotions />Channel emotes</a></li>
      <li><a href="/twitch/global/emotes"><IcBaselinePublic />Global emotes</a></li>
      <li><a href="/twitch/stats"><IcBaselineQueryStats />Donk stats</a></li>
      <li><a href="/twitch/subs"><IcBaselineAttachMoney />Local sub prices</a></li>
      <li><a href="/twitch/time"><IcBaselineHistory />VOD time</a></li>
      <li><a href="/twitch/user"><IcBaselinePerson />User info</a></li>
    </ul>
  </details>
</li>
<div class="divider divider-horizontal divider-accent m-0"></div>

<li><a href="/egdle"><IcBaselineEgg />Egdle</a></li>

<style>
  li {
    font-size: 1.1rem;
  }
</style>
