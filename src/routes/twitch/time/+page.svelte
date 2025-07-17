<script>
  import IcBaselineSearch from "~icons/ic/baseline-search";
  import IcBaselineLink from "~icons/ic/baseline-link";
  import MdiTwitch from "~icons/mdi/twitch";
  import { convertDuration, secondsToTwitchStupidTime } from "$lib/functions";

  let channel = $state();
  let minutesString = $state("0");
  let hoursString = $state("0");
  let daysString = $state("0");
  let exactTimeString = $state();

  let minutes = $derived(parseInt(minutesString, 10));
  let hours = $derived(parseInt(hoursString, 10));
  let days = $derived(parseInt(daysString, 10));
  let exactTime = $derived(new Date(exactTimeString));

  async function findTimestamp() {
    try {
      document.getElementById("output").innerHTML = "";
      document.getElementById("link").innerHTML = `https://twitch.tv/okayegbot`;
      document.getElementById("link").href = `https://twitch.tv/okayegbot`;

      channel = channel?.toLowerCase()?.replace(/\s/g, "");
      if (!channel) {
        document.getElementById("output").innerHTML = "No Channel provided";
        return;
      }

      let clip = document.getElementById("clip")?.value.replace(/\s/g, "") || "";
      let clipURL = clip ? new URL(clip) : "";
      let clipID =
        clipURL?.hostname === "clips.twitch.tv"
          ? /^\/(\w+(?:\/[A-Z]\w+)?(?:[\-\w]*))(?:\/|$)/.exec(clipURL?.pathname)
          : /^\/\w+\/clip\/(\w+(?:\/[A-Z]\w+)?(?:[\-\w]*))(?:\/|$)/.exec(clipURL?.pathname);

      if (clip && !clipID?.[1]) {
        document.getElementById("output").innerHTML = "Could not find clip ID from provided link";
        return;
      }

      if (!minutes && !hours && !days && !clip) {
        document.getElementById("output").innerHTML = "No time/clip provided";
        return;
      }

      if ((minutes || hours || days) && clip) {
        document.getElementById("output").innerHTML = "Provide a time or clip only";
        return;
      }
      let target;

      if (clip && clipID?.[1]) {
        let response = await fetch(`https://helper.donk.workers.dev/twitch/clips?id=${clipID[1]}`);
        let result = await response.json();
        if (!result?.data[0]?.broadcaster_id) {
          document.getElementById("output").innerHTML = "Could not find clip info";
          return;
        }
        if (result?.data[0]?.broadcaster_name?.toLowerCase() == channel) {
          document.getElementById("output").innerHTML = "Clip channel and provided channel must be different";
          return;
        }

        if (result?.data[0]?.video_id && result?.data[0]?.vod_offset) {
          let response3 = await fetch(`https://helper.donk.workers.dev/twitch/videos?id=${result.data[0].video_id}`);
          let result3 = await response3.json();
          target = new Date(result3.data[0].created_at).getTime() + result.data[0].vod_offset * 1000;
        } else {
          target = new Date(result.data[0].created_at).getTime();
        }
      } else {
        target = exactTime.getTime();
      }

      let response = await fetch(`https://helper.donk.workers.dev/twitch/users?login=${channel}`);
      let result = await response.json();
      if (!result?.data[0]?.id) {
        document.getElementById("output").innerHTML = "Channel not found";
        return;
      }

      let response2 = await fetch(`https://helper.donk.workers.dev/twitch/videos?user_id=${result.data[0].id}&first=100`);
      let result2 = await response2.json();
      if (!result2?.data[0]) {
        if (clip) {
          document.getElementById("output").innerHTML = "Could not find any VODs that were live at the time the clip was created";
        } else {
          document.getElementById("output").innerHTML = "Could not find any VODs for the given channel at the provided time";
        }
      }
      let found = false;
      for (let index = 0; index < result2.data.length; index++) {
        let startTime = new Date(result2.data[index].created_at).getTime();
        let duration = convertDuration(result2.data[index].duration) * 1000;
        let endTime = new Date(startTime + duration).getTime();
        if (target >= startTime && target <= endTime) {
          found = true;
          let timestamp = secondsToTwitchStupidTime(Math.round((target - startTime) / 1000));
          document.getElementById("output").innerHTML = "";
          document.getElementById("link").innerHTML = `${result2.data[index].url}?t=${timestamp}`;
          document.getElementById("link").href = `${result2.data[index].url}?t=${timestamp}`;

          new Twitch.Embed("output", {
            width: "100%",
            height: "100%",
            video: result2.data[index].id,
            time: timestamp,
            parent: ["okayeg.com"],
          });
        }
      }
      if (!found) {
        if (clip) {
          document.getElementById("output").innerHTML = "Could not find any VODs that were live at the time the clip was created";
        } else {
          document.getElementById("output").innerHTML = "Could not find any VODs at the provided time";
        }
        document.getElementById("link").innerHTML = `https://twitch.tv/okayegbot`;
        document.getElementById("link").href = `https://twitch.tv/okayegbot`;
      }
    } catch (error) {
      console.log(error);
      document.getElementById("output").innerHTML = "Something went wrong :( " + error?.message;
      document.getElementById("link").innerHTML = `https://twitch.tv/okayegbot`;
      document.getElementById("link").href = `https://twitch.tv/okayegbot`;
    }
  } //findTimestamp

  function updateExactTime() {
    let now = new Date();
    let timeZoneOffset = now.getTimezoneOffset();
    let timeZoneOffsetMs = timeZoneOffset * 60 * 1000;
    let targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - days, now.getHours() - hours, now.getMinutes() - minutes, now.getSeconds());
    targetDate.setTime(targetDate.getTime() - timeZoneOffsetMs);
    exactTimeString = targetDate.toISOString().slice(0, 16);
  }

  function updateRelativeTime() {
    let diff = Date.now() - exactTime.getTime();
    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    let hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    let minutes = Math.floor((diff / (1000 * 60)) % 60);
    minutesString = minutes.toString();
    hoursString = hours.toString();
    daysString = days.toString();
  }
</script>

<svelte:head>
  <title>Twitch VOD time converter | OkayegBOT</title>
  <meta name="description" content="A simple tool that helps you find a Twitch VOD timestamp from real time or from a clip of a different channel" />
  <meta property="og:title" content="Twitch VOD time converter | OkayegBOT" />
  <meta property="og:url" content="https://okayeg.com/twitch/time" />
  <meta property="og:description" content="A simple tool that helps you find a Twitch VOD timestamp from real time or from a clip of a different channel" />
  <script src="https://embed.twitch.tv/embed/v1.js"></script>
</svelte:head>

<div class="card card-dash bg-base-300 w-fit m-5 mx-auto">
  <div class="card-body">
    <h2 class="card-title">Find VOD timestamp from real world time or a Twitch clip</h2>
    <div class="flex flex-col">
      <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mb-5 mx-auto">
        <legend class="fieldset-legend">Channel</legend>
        <label class="input">
          <MdiTwitch />
          <input type="text" id="channel" placeholder="Channel" bind:value={channel} required />
        </label>
        <p class="label">The Twitch channel you want to watch</p>
      </fieldset>

      <div class="divider divider-neutral"></div>

      <div class="flex flex-row mb-5">
        <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 me-4">
          <legend class="fieldset-legend">Relative time</legend>
          <p>Find point in VOD that happened</p>
          <div class="join w-150">
            <label class="input join-item">
              <input type="number" id="daysString" placeholder="0" min="0" bind:value={daysString} oninput={() => updateExactTime()} />
              <span class="label">days</span>
            </label>
            <label class="input join-item">
              <input type="number" id="hoursString" placeholder="0" min="0" bind:value={hoursString} oninput={() => updateExactTime()} />
              <span class="label">hours</span>
            </label>
            <label class="input join-item">
              <input type="number" id="minutesString" placeholder="0" min="0" bind:value={minutesString} oninput={() => updateExactTime()} />
              <span class="label">minutes ago</span>
            </label>
          </div>
        </fieldset>

        <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend class="fieldset-legend">Exact time</legend>
          <p>Find point in VOD that happened at</p>
          <input type="datetime-local" class="input" id="exactTimeString" bind:value={exactTimeString} oninput={() => updateRelativeTime()} />
        </fieldset>
      </div>
      <span class="text-xs text-center opacity-50 -mt-5">Relative time and Exact time will update each other when you change one of them</span>
      <div class="divider">OR</div>

      <div class="flex flex-row">
        <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
          <legend class="fieldset-legend">Twitch clip</legend>
          <p>Find VOD timestamp from a clip from another channel</p>
          <label class="input w-full">
            <IcBaselineLink />
            <input id="clip" type="url" placeholder="Twitch clip link" />
          </label>
          <span class="text-xs text-center opacity-50">
            If the clip's original VOD is not available, the clip's creation time will be used to find the timestamp, which is not as accurate.
          </span>
        </fieldset>
      </div>
    </div>
    <div class="divider divider-neutral"></div>

    <div class="card-actions justify-end">
      <button type="button" class="btn btn-success" onclick={() => findTimestamp()}><IcBaselineSearch />Find timestamp</button>
    </div>
  </div>
</div>

<div class="mockup-browser border-base-300 border m-10">
  <div class="mockup-browser-toolbar">
    <a class="input link w-100" id="link" target="_blank" rel="noopener noreferrer" href="https://twitch.tv/okayegbot">https://twitch.tv/okayegbot</a>
  </div>
  <div class="grid border-t border-base-300 h-200 bg-base-200">
    <div class="text-center text-2xl h-full" id="output">Fill in the data above to get an embed here :)</div>
  </div>
</div>
