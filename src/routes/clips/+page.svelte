<script>
  import { onMount } from "svelte";
  import { getLanguage } from "$lib/functions";

  onMount(async () => {
    let clipsDiv = document.getElementById("clipsDiv");
    if (!clipsDiv) {
      return;
    }

    try {
      let response = await fetch(`https://api.okayeg.com/clips`);
      let data = await response.json();
      let clips = data.clips;
      let games = data.games;

      if (!clips || !games) {
        clipsDiv.innerHTML = "Could not load clips :(";
        return;
      }
      console.log(clips);
      let clipList = "";
      for (let index = 0, j = clips.length; index < j; index++) {
        clipList += `
        <li class="list-row">
            <div><a href="${clips[index].url}" target="_blank" rel="noopener noreferrer"><img class="w-120" src="${clips[index].thumbnail_url}" /></a></div>
            <div>
                <div class="text-lg text-start">
                    <strong>Title:</strong> ${clips[index].title}<br>
                    <strong>Category:</strong> ${games.find((o) => o.id === clips[index].game_id)?.name || "🤷"}<br>
                    <strong>Channel:</strong> <a class="link" href="https://twitch.tv/${clips[index].broadcaster_name}" target="_blank" rel="noopener noreferrer">${clips[index].broadcaster_name}</a><br>
                    <strong>View count:</strong> ${clips[index].view_count.toLocaleString()}<br>
                    <strong>Created at:</strong> ${new Date(clips[index].created_at).toUTCString()}<br>
                    <strong>Clipped by:</strong> <a class="link" href="https://twitch.tv/${clips[index].creator_name}" target="_blank" rel="noopener noreferrer">${clips[index].creator_name}</a><br>
                    <strong>Language:</strong> ${getLanguage(clips[index].language || "en")}<br>
                    <strong>Duration:</strong> ${clips[index].duration}<br>
                    <strong>URL:</strong> <a class="link" href="${clips[index].url}" target="_blank" rel="noopener noreferrer">${clips[index].url}</a><br>
                </div>
                <div class="text-end absolute top-0 right-0 m-1 opacity-40">#${index + 1}</div>
            </div>
        </li>`;
      }
      clipsDiv.innerHTML = `
      <p class="text-2xl">Top ${clips.length} clips from ${games[100].startdate} to ${games[101].enddate}</p>
      <p class="text-sm">Clips are collected by fetching the top 100 games on twitch every hour during the week then fetching the top 20 clips in the games that were in the list of top 100 games the most throughout the week.<p>
        <ul class="list bg-base-100 rounded-box shadow-md">
            ${clipList}
        </ul>`;
    } catch (error) {
      console.log("loadClips error", error);
      clipsDiv.innerHTML = "Could not load clips :(";
    }
  });
</script>

<svelte:head>
  <title>Clips | OkayegBOT</title>
  <meta name="description" content="A list of the top 100 clips on Twitch in the past week" />
  <meta property="og:title" content="Clips | OkayegBOT" />
  <meta property="og:url" content="https://okayeg.com/clips" />
  <meta property="og:description" content="A list of the top 100 clips on Twitch in the past week" />
</svelte:head>

<div class="flex m-5 text-center">
  <div class="flex-1 shrink"></div>

  <div class="w-300 shrink" id="clipsDiv">
    <span class="loading loading-spinner loading-xl"></span>
  </div>
  <div class="flex-1 shrink"></div>
</div>
