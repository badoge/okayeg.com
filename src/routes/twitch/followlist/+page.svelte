<script>
  import IcBaselineSearch from "~icons/ic/baseline-search";
  const staffpic = `<img src="/staff.png" loading="lazy" width="16px" height="16px" title="Twitch staff" alt="Twitch staff">`;
  const svg =
    '<svg style="fill: #a970ff; position: relative;" type="color-fill-current" width="16px" height="16px" version="1.1" viewBox="0 0 16 16" x="0px" y="0px"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 3.5L8 2L3.5 3.5L2 8L3.5 12.5L8 14L12.5 12.5L14 8L12.5 3.5ZM7.00008 11L11.5 6.5L10 5L7.00008 8L5.5 6.5L4 8L7.00008 11Z"></path></svg>';

  async function loadFollowList() {
    let input = location.hash;
    let username = input.replace("#", "").toLowerCase().replace(/\s/g, "");
    if (document.getElementById("username").value) {
      username = document.getElementById("username").value;
    } else {
      document.getElementById("username").value = username;
    }

    if (username) {
      document.getElementById("title1").style.display = "block";
      document.getElementById("listcontainer").style.display = "block";

      document.getElementById("title1").innerHTML = "";
      document.getElementById("list").innerHTML = "Loading...";

      try {
        let response = await fetch(`https://api.okayeg.com/followlist?username=${username}`);

        if (response.status !== 200) {
          document.getElementById("title1").innerHTML = `<h1 class="display-1">
        <a href="https://twitch.tv/${username}" target="_blank" rel="noopener noreferrer">${username}</a> was never looked up
        </h1>`;
          document.getElementById("list").innerHTML = "";
          return;
        }

        let followList = await response.json();
        let fetchTime = followList.time;
        let displayName = followList.data.display_name.toLowerCase() == followList.data.login ? followList.data.display_name : `${followList.data.display_name} (${followList.data.login})`;

        document.getElementById("list").innerHTML = "";
        if (followList.data.total == 0) {
          document.getElementById("title1").innerHTML = `
        <h1 class="display-1"><a href="https://twitch.tv/${followList.data.login}" target="_blank" rel="noopener noreferrer">${displayName}</a> is not following anyone.</h1>
        <div class="alert alert-warning" role="alert">Cached follow list from ${new Date(fetchTime).toISOString()}</div>`;
          return;
        }

        let list = followList.data.following;
        if (list.length > 0) {
          document.getElementById("title1").innerHTML = `
        <h1 class="display-1"><a href="https://twitch.tv/${followList.data.login}" target="_blank" rel="noopener noreferrer">${displayName}</a> is following ${
          followList.data.total
        } people:</h1>
        <div class="alert alert-warning" role="alert">Cached follow list from ${new Date(
          fetchTime,
        ).toISOString()} Use the <kbd>=optout followlist</kbd> command in OkayegBOT's chat to opt out</div>`;

          for (let i = 0, j = list.length; i < j; i++) {
            let display_name = followList.data.following[i].display_name;
            let label = display_name;
            let login = followList.data.following[i].login;
            let profile_image_url = followList.data.following[i].profile_image_url ? followList.data.following[i].profile_image_url : "/pics/banned.png";
            let type = followList.data.following[i].broadcaster_type ? followList.data.following[i].broadcaster_type : "";
            let staff = followList.data.following[i].type == "staff";
            let description = followList.data.following[i].description ? followList.data.following[i].description : "";
            let followed_at = followList.data.following[i].followed_at ? followList.data.following[i].followed_at.replace("T", " ").replace("Z", " ") : "";
            if (display_name.toLowerCase() !== login.toLowerCase()) {
              label = `${login} (${display_name})`;
            }
            document.getElementById("list").innerHTML += `
          <div class="border ${profile_image_url == "/pics/banned.png" ? "border-danger" : "border-secondary"} emote">
          <a href="https://twitch.tv/${login}" target="_blank" rel="noopener noreferrer"><img src="${profile_image_url}" loading="lazy" title="${description}" alt="${display_name}">
          <div class="text-body-secondary text-center">${label}${type == "partner" ? svg : ""}${
            staff ? staffpic : ""
          }</div><div class="text-body-secondary text-center">Followed at: ${followed_at}</div>
          </div>`;
          }
        }
      } catch (error) {
        console.log("loadFollowList error", error);
      }
    }
  } //loadFollowList
</script>

<svelte:head>
  <title>Follow list | OkayegBOT</title>
  <meta name="description" content="Check what channels any Twitch user is following - Very old data" />
  <meta property="og:title" content="Follow list | OkayegBOT" />
  <meta property="og:url" content="https://okayeg.com/twitch/followlist" />
  <meta property="og:description" content="Check what channels any Twitch user is following - Very old data" />
</svelte:head>

<div class="container-fluid">
  <div class="alert alert-danger alert-dismissible fade show" style="margin-top: 10px" role="alert">
    Only channels that were looked up before the API got shut down (2023/9/12) will be shown. Users that use the login button below will show up.
  </div>

  <div class="row">
    <div class="col-xl-4"></div>
    <div class="col-xl-4">
      <div class="card" style="margin-top: 10px">
        <div class="card-body">
          <h3>Lookup someone's follow list:</h3>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="username" placeholder="username" aria-describedby="desc" />
            <label for="username">Username</label>
            <div id="desc" class="form-text">View All Twitch channels a user is following.</div>
          </div>

          <button type="button" class="btn btn-success float-end" onclick={loadFollowList}><IcBaselineSearch />Lookup</button>
        </div>
      </div>
    </div>
    <div class="col-xl-4"></div>
  </div>

  <div class="row">
    <div class="col-xl-1"></div>
    <div class="col-xl-10">
      <div id="title1"></div>
      <div id="listcontainer" style="display: none">
        <div id="list" class="emotecontainer"></div>
      </div>
    </div>
    <div class="col-xl-1"></div>
  </div>
</div>
