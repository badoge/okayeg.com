<script>
  import IcBaselineSearch from "~icons/ic/baseline-search";
  import IcBaselineLink from "~icons/ic/baseline-link";
  import MdiTwitch from "~icons/mdi/twitch";

  let channel = "";

  function secondsToTwitchStupidTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${hours}h${minutes}m${sec}s`;
  } //secondsToTwitchStupidTime

  function convertDuration(duration) {
    const durationRegex = /(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/;
    const match = durationRegex.exec(duration);
    if (!match) {
      throw new Error("Invalid duration format");
    }
    const [, hours, minutes, seconds] = match;
    let totalSeconds = 0;
    if (hours) {
      totalSeconds += parseInt(hours) * 60 * 60;
    }
    if (minutes) {
      totalSeconds += parseInt(minutes) * 60;
    }
    if (seconds) {
      totalSeconds += parseInt(seconds);
    }
    return totalSeconds;
  } //convertDuration

  async function findTimestamp() {
    document.getElementById("output").innerHTML = "";
    let input = document.getElementById("exactTime").value;
    let channel = document.getElementById("channel").value.toLowerCase().replace(/\s/g, "");
    if (!channel) {
      document.getElementById("output").innerHTML = "No Channel provided";
      return;
    }
    if (!input) {
      document.getElementById("output").innerHTML = "No time provided";
      return;
    }
    let target = new Date(input).getTime();
    try {
      let response = await fetch(`https://helper.donk.workers.dev/twitch/users?login=${channel}`);
      let result = await response.json();
      if (!result?.data[0]?.id) {
        document.getElementById("output").innerHTML = "Channel not found";
        return;
      }

      let response2 = await fetch(`https://helper.donk.workers.dev/twitch/videos?user_id=${result.data[0].id}&first=100`);
      let result2 = await response2.json();
      if (!result2?.data[0]) {
        document.getElementById("output").innerHTML = "Could not find any VODs for the given channel";
      }
      let found = false;
      for (let index = 0; index < result2.data.length; index++) {
        let startTime = new Date(result2.data[index].created_at).getTime();
        let duration = convertDuration(result2.data[index].duration) * 1000;
        let endTime = new Date(startTime + duration).getTime();
        if (target >= startTime && target <= endTime) {
          found = true;
          let timestamp = secondsToTwitchStupidTime(Math.round((target - startTime) / 1000));
          document.getElementById("output").innerHTML = `VOD link with timestamp: <a href="${result2.data[index].url}?t=${timestamp}" target="_blank" rel="noopener noreferrer">
        ${result2.data[index].url}?t=${timestamp}</a>
        <br><div id="embed" class="ratio ratio-16x9"></div>`;
          new Twitch.Embed("embed", {
            width: "100%",
            height: "100%",
            video: result2.data[index].id,
            time: timestamp,
            parent: ["okayeg.com"],
          });
        }
      }
      if (!found) {
        document.getElementById("output").innerHTML = "Could not find any VODs at the provided time";
      }
    } catch (error) {
      console.log(error);
      document.getElementById("output").innerHTML = "Something went wrong :( " + error?.message;
    }
  } //findTimestamp

  async function findClipTimestamp() {
    document.getElementById("output").innerHTML = "";
    try {
      let channel = document.getElementById("channelClip").value.toLowerCase().replace(/\s/g, "");
      let clip = document.getElementById("clip").value.replace(/\s/g, "");
      let clipURL = new URL(clip);
      let clipID =
        clipURL.hostname === "clips.twitch.tv"
          ? /^\/(\w+(?:\/[A-Z]\w+)?(?:[\-\w]*))(?:\/|$)/.exec(clipURL.pathname)
          : /^\/\w+\/clip\/(\w+(?:\/[A-Z]\w+)?(?:[\-\w]*))(?:\/|$)/.exec(clipURL.pathname);

      if (!channel) {
        document.getElementById("output").innerHTML = "No Channel provided";
        return;
      }
      if (!clip) {
        document.getElementById("output").innerHTML = "No clip provided";
        return;
      }
      if (!clipID[1]) {
        document.getElementById("output").innerHTML = "Could not find clip ID from provided link";
        return;
      }

      let response1 = await fetch(`https://helper.donk.workers.dev/twitch/users?login=${channel}`);
      let result1 = await response1.json();
      if (!result1?.data[0]?.id) {
        document.getElementById("output").innerHTML = "Channel not found";
        return;
      }

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

      let target;
      if (result?.data[0]?.video_id && result?.data[0]?.vod_offset) {
        let response3 = await fetch(`https://helper.donk.workers.dev/twitch/videos?id=${result.data[0].video_id}`);
        let result3 = await response3.json();
        target = new Date(result3.data[0].created_at).getTime() + result.data[0].vod_offset * 1000;
      } else {
        target = new Date(result.data[0].created_at).getTime();
      }

      let response2 = await fetch(`https://helper.donk.workers.dev/twitch/videos?user_id=${result1.data[0].id}&first=100`);
      let result2 = await response2.json();
      if (!result2?.data[0]) {
        document.getElementById("output").innerHTML = "Could not find any VODs that were live at the time the clip was created";
      }
      let found = false;
      for (let index = 0; index < result2.data.length; index++) {
        let startTime = new Date(result2.data[index].created_at).getTime();
        let duration = convertDuration(result2.data[index].duration) * 1000;
        let endTime = new Date(startTime + duration).getTime();
        if (target >= startTime && target <= endTime) {
          found = true;
          let timestamp = secondsToTwitchStupidTime(Math.round((target - startTime) / 1000));
          document.getElementById("output").innerHTML = `VOD link with timestamp: <a href="${result2.data[index].url}?t=${timestamp}" target="_blank" rel="noopener noreferrer">
        ${result2.data[index].url}?t=${timestamp}</a>
        <br><div id="embed" class="ratio ratio-16x9"></div>`;
          new Twitch.Embed("embed", {
            width: "100%",
            height: "100%",
            video: result2.data[index].id,
            time: timestamp,
            parent: ["okayeg.com"],
          });
        }
      }
      if (!found) {
        document.getElementById("output").innerHTML = "Could not find any VODs that were live at the time the clip was created";
      }
    } catch (error) {
      console.log(error);
      document.getElementById("output").innerHTML = "Something went wrong :( " + error?.message;
    }
  } //findClipTimestamp

  //   document.getElementById("exactTime").oninput = function (event) {
  //     let date = new Date(event.target.value);
  //     let diff = Date.now() - date.getTime();
  //     let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  //     let hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  //     let minutes = Math.floor((diff / (1000 * 60)) % 60);
  //     document.getElementById("timeMinutes").value = minutes;
  //     document.getElementById("timeHours").value = hours;
  //     document.getElementById("timeDays").value = days;
  //   };

  //   document.getElementById("timeMinutes").oninput = function (event) {
  //     let minutes = document.getElementById("timeMinutes").value;
  //     let hours = document.getElementById("timeHours").value;
  //     let days = document.getElementById("timeDays").value;
  //     let now = new Date();
  //     let timeZoneOffset = now.getTimezoneOffset();
  //     let timeZoneOffsetMs = timeZoneOffset * 60 * 1000;
  //     let targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - days, now.getHours() - hours, now.getMinutes() - minutes, now.getSeconds());
  //     targetDate.setTime(targetDate.getTime() - timeZoneOffsetMs);
  //     document.getElementById("exactTime").value = targetDate.toISOString().slice(0, 16);
  //   };

  //   document.getElementById("timeHours").oninput = function (event) {
  //     let minutes = document.getElementById("timeMinutes").value;
  //     let hours = document.getElementById("timeHours").value;
  //     let days = document.getElementById("timeDays").value;
  //     let now = new Date();
  //     let timeZoneOffset = now.getTimezoneOffset();
  //     let timeZoneOffsetMs = timeZoneOffset * 60 * 1000;
  //     let targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - days, now.getHours() - hours, now.getMinutes() - minutes, now.getSeconds());
  //     targetDate.setTime(targetDate.getTime() - timeZoneOffsetMs);
  //     document.getElementById("exactTime").value = targetDate.toISOString().slice(0, 16);
  //   };

  //   document.getElementById("timeDays").oninput = function (event) {
  //     let minutes = document.getElementById("timeMinutes").value;
  //     let hours = document.getElementById("timeHours").value;
  //     let days = document.getElementById("timeDays").value;
  //     let now = new Date();
  //     let timeZoneOffset = now.getTimezoneOffset();
  //     let timeZoneOffsetMs = timeZoneOffset * 60 * 1000;
  //     let targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - days, now.getHours() - hours, now.getMinutes() - minutes, now.getSeconds());
  //     targetDate.setTime(targetDate.getTime() - timeZoneOffsetMs);
  //     document.getElementById("exactTime").value = targetDate.toISOString().slice(0, 16);
  //};
</script>

<svelte:head>
  <title>Twitch VOD time converter | OkayegBOT</title>
  <meta name="description" content="A simple tool that helps you find a Twitch VOD timestamp from real time or from a clip of a different channel" />
  <meta property="og:title" content="Twitch VOD time converter | OkayegBOT" />
  <meta property="og:url" content="https://okayeg.com/twitch/time" />
  <meta property="og:description" content="A simple tool that helps you find a Twitch VOD timestamp from real time or from a clip of a different channel" />
</svelte:head>

<div class="card card-dash bg-base-300 w-fit m-5 mx-auto">
  <div class="card-body">
    <h2 class="card-title">Find VOD timestamp from real time</h2>
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
              <input type="number" id="timeMinutes" placeholder="0" min="0" />
              <span class="label">minutes</span>
            </label>
            <label class="input join-item">
              <input type="number" id="timeHours" placeholder="0" min="0" />
              <span class="label">hours</span>
            </label>
            <label class="input join-item">
              <input type="number" id="timeDays" placeholder="0" min="0" />
              <span class="label">days ago</span>
            </label>
          </div>
        </fieldset>

        <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend class="fieldset-legend">Exact time</legend>
          <p>Find point in VOD that happened at</p>
          <input type="datetime-local" class="input" id="exactTime" />
        </fieldset>
      </div>
      <span class="text-xs text-center opacity-50 -mt-5">Relative time and Exact time will update each other when you change one of them</span>
      <div class="divider">OR</div>

      <div class="flex flex-row mx-auto">
        <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend class="fieldset-legend">Twitch clip</legend>
          <p>Find VOD timestamp from a clip from another channel</p>
          <label class="input">
            <IcBaselineLink />
            <input id="clip" type="url" placeholder="Twitch clip link" />
          </label>
        </fieldset>
      </div>
    </div>
    <div class="divider divider-neutral"></div>

    <div class="card-actions justify-end">
      <button type="button" class="btn btn-success" onclick={findTimestamp()}><IcBaselineSearch />Find timestamp</button>
    </div>
  </div>
</div>

<div>
  output
  <div class="flex justify-center mt-5" id="output"></div>
</div>
