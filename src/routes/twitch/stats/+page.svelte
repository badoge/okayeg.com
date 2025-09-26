<script>
  import { onMount } from "svelte";
  import { Chart } from "chart.js";
  import * as ChartDataLabels from "chartjs-plugin-datalabels";

  import IcBaselineLanguage from "~icons/ic/baseline-language";
  import IcBaselineArrowBack from "~icons/ic/baseline-arrow-back";
  import IcBaselineArrowForward from "~icons/ic/baseline-arrow-forward";
  import IcBaselineGroups from "~icons/ic/baseline-groups";
  import IcBaselineArrowDropDown from "~icons/ic/baseline-arrow-drop-down";
  import IcBaselineAccountCircle from "~icons/ic/baseline-account-circle";
  import IcBaselineSubtitlesOff from "~icons/ic/baseline-subtitles-off";
  import IcBaselineRedeem from "~icons/ic/baseline-redeem";
  import IcBaselineSportsEsports from "~icons/ic/baseline-sports-esports";
  import IcBaselineSmokingRooms from "~icons/ic/baseline-smoking-rooms";
  import IcBaselineCasino from "~icons/ic/baseline-casino";
  import IcBaselineVideogameAsset from "~icons/ic/baseline-videogame-asset";
  import IcBaselineMoodBad from "~icons/ic/baseline-mood-bad";
  import IcBaseline18UpRating from "~icons/ic/baseline-18-up-rating";
  import IcBaselineSportsKabaddi from "~icons/ic/baseline-sports-kabaddi";
  import IcBaselineSell from "~icons/ic/baseline-sell";
  import IcBaselineHelpOutline from "~icons/ic/baseline-help-outline";

  const staffpic = `<img src="/staff.png" loading="lazy" width="16px" height="16px" title="Twitch staff" alt="Twitch staff">`;
  const svg =
    '<svg style="fill: #a970ff; position: relative;" type="color-fill-current" width="16px" height="16px" version="1.1" viewBox="0 0 16 16" x="0px" y="0px"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 3.5L8 2L3.5 3.5L2 8L3.5 12.5L8 14L12.5 12.5L14 8L12.5 3.5ZM7.00008 11L11.5 6.5L10 5L7.00008 8L5.5 6.5L4 8L7.00008 11Z"></path></svg>';

  onMount(() => {
    loadStats();
  });

  async function checkPic(link) {
    let response = await fetch(link);
    return response.url == link;
  } //checkPic

  function convertTime(time) {
    let diff = (new Date() - time) / 1000;
    return new Date(diff * 1000).toISOString().substr(11, 8);
  } //convertTime

  async function load_least_popular(direction = "random") {
    let categoryIndex;
    switch (direction) {
      case "next":
        categoryIndex = parseInt(document.getElementById("least_popular").dataset.index, 10);
        categoryIndex++;
        break;
      case "back":
        categoryIndex = parseInt(document.getElementById("least_popular").dataset.index, 10);
        categoryIndex--;
        break;
      default:
        categoryIndex = Math.floor(Math.random() * stats.least_popular.length);
    }
    document.getElementById("least_popular").dataset.index = categoryIndex;
    let random = stats.least_popular[categoryIndex % stats.least_popular.length];
    let least_popular_link = await checkPic(`https://static-cdn.jtvnw.net/ttv-boxart/${random.game_id}-285x380.jpg`);

    document.getElementById("least_popular_img").src = `https://static-cdn.jtvnw.net/ttv-boxart/${random.game_id}${least_popular_link ? "" : "_IGDB"}-285x380.jpg`;
    document.getElementById("least_popular_img").title = stats.least_popular.name;
    document.getElementById("least_popular_img").alt = stats.least_popular.name;
    document.getElementById("least_popular").innerHTML = `
      <h4 class="card-title">
      <a href="https://www.twitch.tv/directory/game/${encodeURIComponent(random.game_name)}" target="_blank" rel="noopener noreferrer">${random.game_name}</a>
      </h4>
      <p class="card-text text-body-secondary">
      Multiple categories (${stats.least_popular.length}) meet this condition, use the buttons below to see more categories
      </p>
      <div class="btn-group float-end" role="group" aria-label="least popular categories browser">
          <button type="button" onclick="load_least_popular('back')" class="btn btn-secondary"><i class="material-icons notranslate">arrow_back</i></button>
          <button type="button" onclick="load_least_popular('next')" class="btn btn-secondary"><i class="material-icons notranslate">arrow_forward</i></button>
      </div>`;
  }

  function load100Langs() {
    let list = "";
    for (let index = 10; index < stats.languages.length; index++) {
      list += `<div class="row">
          <div class="col align-self-center">
          ${getLanguage(stats.languages[index]._id)}
          </div>
          <div class="col align-self-start">
          ${stats.languages[index].count.toLocaleString()}
          <span class="text-body-secondary">(${roundToTwo((stats.languages[index].count / stats.live) * 100)}%)</span>
          </div>
          <div class="col align-self-start">
          ${stats.languages[index].avg_viewers}
          </div>
          <div class="col align-self-start">
          ${stats.languages[index].max_viewers.toLocaleString()}
          </div>
        </div>`;
    }
    document.getElementById("langDiv").innerHTML += list;
    document.getElementById("load100Langs").style.display = "none";
    document.getElementById("langHeader").innerHTML = "Top languages";
  }

  function load100Tags() {
    let list = "";
    for (let index = 10; index < 100; index++) {
      list += `
          <div class="row">
            <div class="col align-self-center">
            ${stats.top_tags[index].tag}
             </div>
            <div class="col align-self-start">
            ${stats.top_tags[index].channels.toLocaleString()}
            <span class="text-body-secondary">(${roundToTwo((stats.top_tags[index].channels / stats.live) * 100)}%)</span>
            </div>
            <div class="col align-self-start">
            <span class="placeholder-wave">${roundToTwo(stats.top_tags[index].viewers / stats.top_tags[index].channels).toLocaleString()}</span>
          </div>
          </div>`;
    }
    document.getElementById("tagsDiv").innerHTML += list;
    document.getElementById("load100Tags").style.display = "none";
    document.getElementById("tagCount").innerHTML = "100";
  }

  async function loadStats() {
    try {
      let response = await fetch(`https://api.okayeg.com/donkstats`);
      let stats = await response.json();

      const data = {
        labels: ["Partners", "Affiliates", "Others"],
        datasets: [
          {
            label: "Channels",
            data: [stats.partners, stats.affiliates, stats.live - stats.partners - stats.affiliates],
            backgroundColor: ["rgba(191, 148, 255, 0.8)", "rgba(30, 130, 50, 0.8)", "rgba(38, 80, 158, 0.8)"],
            borderColor: ["rgba(191, 148, 255, 1)", "rgba(30, 130, 50, 1)", "rgba(38, 80, 158, 1)"],
            borderWidth: 1,
          },
        ],
      };
      const data2 = {
        labels: ["Partners", "Affiliates", "Others"],
        datasets: [
          {
            label: "Channels",
            data: [stats.partner_viewers, stats.affiliate_viewers, stats.viewers - stats.partner_viewers - stats.affiliate_viewers],
            backgroundColor: ["rgba(191, 148, 255, 0.8)", "rgba(30, 130, 50, 0.8)", "rgba(38, 80, 158, 0.8)"],
            borderColor: ["rgba(191, 148, 255, 1)", "rgba(30, 130, 50, 1)", "rgba(38, 80, 158, 1)"],
            borderWidth: 1,
          },
        ],
      };
      const data3 = {
        labels: [
          ">10,000 viewers",
          "2,000 → 10,000 viewers",
          "1,000 → 2,000 viewers",
          "500 → 1,000 viewers",
          "200 → 500 viewers",
          "100 → 200 viewers",
          "10 → 100 viewers",
          "5 → 10 viewers",
          "1 → 5 viewers",
          "1 viewer",
          "0 viewers",
        ],
        datasets: [
          {
            label: "Channels",
            data: [
              stats.tenthousand,
              stats.twothousand_tenthousand,
              stats.thousand_twothousand,
              stats.fivehundred_thousand,
              stats.twohundred_fivehundred,
              stats.hundred_twohundred,
              stats.ten_hundred,
              stats.five_ten,
              stats.one_five,
              stats.one,
              stats.zero,
            ],
            backgroundColor: [
              "rgba(165, 0, 38, 0.8)",
              "rgba(215, 48, 39, 0.8)",
              "rgba(244, 109, 67, 0.8)",
              "rgba(253, 174, 97, 0.8)",
              "rgba(254, 224, 139, 0.8)",
              "rgba(255, 255, 191, 0.8)",
              "rgba(217, 239, 139, 0.8)",
              "rgba(166, 217, 106, 0.8)",
              "rgba(102, 189, 99, 0.8)",
              "rgba(26, 152, 80, 0.8)",
              "rgba(0, 104, 55, 0.8)",
            ],
            borderColor: [
              "rgba(165, 0, 38, 1)",
              "rgba(215, 48, 39, 1)",
              "rgba(244, 109, 67, 1)",
              "rgba(253, 174, 97, 1)",
              "rgba(254, 224, 139, 1)",
              "rgba(255, 255, 191, 1)",
              "rgba(217, 239, 139, 1)",
              "rgba(166, 217, 106, 1)",
              "rgba(102, 189, 99, 1)",
              "rgba(26, 152, 80, 1)",
              "rgba(0, 104, 55, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };

      const config = {
        type: "pie",
        data: data,
        plugins: [ChartDataLabels],
        options: {
          plugins: {
            datalabels: {
              backgroundColor: function (context) {
                return context.dataset.backgroundColor;
              },
              borderColor: "white",
              borderRadius: 25,
              borderWidth: 1,
              color: "white",
              display: true,
              font: {
                weight: "bold",
              },
              formatter: (val, ctx) => {
                return `${ctx.chart.data.labels[ctx.dataIndex]}: ${val.toLocaleString()} (${roundToTwo((val / stats.live) * 100)}%)`;
              },
            },
            legend: { display: false },
            tooltip: { enabled: false },
          },
        },
      };

      const config2 = {
        type: "pie",
        data: data2,
        plugins: [ChartDataLabels],
        options: {
          plugins: {
            datalabels: {
              backgroundColor: function (context) {
                return context.dataset.backgroundColor;
              },
              borderColor: "white",
              borderRadius: 25,
              borderWidth: 1,
              color: "white",
              display: true,
              font: {
                weight: "bold",
              },
              formatter: (val, ctx) => {
                return `${ctx.chart.data.labels[ctx.dataIndex]}: ${val.toLocaleString()} (${roundToTwo((val / stats.viewers) * 100)}%)`;
              },
            },
            legend: { display: false },
            tooltip: { enabled: false },
          },
        },
      };

      const config3 = {
        type: "bar",
        data: data3,
        options: {
          plugins: {
            legend: { display: false },
          },
          scales: {
            x: {
              display: true,
            },
            y: {
              display: true,
              type: "logarithmic",
            },
          },
        },
      };

      for (let element of document.getElementsByClassName("spinner-border")) {
        element.style.display = "none";
      }
      const channelsChart = new Chart(document.getElementById("channelsChart"), config);
      const viewersChart = new Chart(document.getElementById("viewersChart"), config2);
      const segmentsChart = new Chart(document.getElementById("segmentsChart"), config3);

      document.getElementById("totalChannels").innerHTML = `${stats.live.toLocaleString()}`;
      document.getElementById("totalViewers").innerHTML = `${stats.viewers.toLocaleString()}`;
      document.getElementById("totalGames").innerHTML = `${stats.sum_games.toLocaleString()}`;

      document.getElementById("partners").innerHTML = `${stats.partners.toLocaleString()} 
    <br>Partners make up only ${roundToTwo((stats.partners / stats.live) * 100)}% of streamers but have ${roundToTwo(
      (stats.partner_viewers / stats.viewers) * 100,
    )}% (${stats.partner_viewers.toLocaleString()}) of all viewers`;
      document.getElementById("affiliates").innerHTML = `${stats.affiliates.toLocaleString()} 
    <br>Affiliates make up ${roundToTwo((stats.affiliates / stats.live) * 100)}% of streamers and have ${roundToTwo(
      (stats.affiliate_viewers / stats.viewers) * 100,
    )}% (${stats.affiliate_viewers.toLocaleString()}) of all viewers`;
      document.getElementById("others").innerHTML = `${(stats.live - stats.partners - stats.affiliates).toLocaleString()} 
    <br>Others make up ${roundToTwo(((stats.live - stats.partners - stats.affiliates) / stats.live) * 100)}% of streamers and have ${roundToTwo(
      ((stats.viewers - stats.partner_viewers - stats.affiliate_viewers) / stats.viewers) * 100,
    )}% (${(stats.viewers - stats.partner_viewers - stats.affiliate_viewers).toLocaleString()}) of all viewers`;
      document.getElementById("zero").innerHTML = `${stats.zero.toLocaleString()} 
    <span class="text-body-secondary">(${roundToTwo((stats.zero / stats.live) * 100)}%)</span>`;
      document.getElementById("one").innerHTML = `${stats.one.toLocaleString()} 
    <span class="text-body-secondary">(${roundToTwo((stats.one / stats.live) * 100)}%)</span>`;
      document.getElementById("one_five").innerHTML = `${stats.one_five.toLocaleString()} 
    <span class="text-body-secondary">(${roundToTwo((stats.one_five / stats.live) * 100)}%)</span>`;
      document.getElementById("five_ten").innerHTML = `${stats.five_ten.toLocaleString()} 
    <span class="text-body-secondary">(${roundToTwo((stats.five_ten / stats.live) * 100)}%)</span>`;
      document.getElementById("ten_hundred").innerHTML = `${stats.ten_hundred.toLocaleString()} 
    <span class="text-body-secondary">(${roundToTwo((stats.ten_hundred / stats.live) * 100)}%)</span>`;
      document.getElementById("hundred_twohundred").innerHTML = `${stats.hundred_twohundred.toLocaleString()} 
    <span class="text-body-secondary">(${roundToTwo((stats.hundred_twohundred / stats.live) * 100)}%)</span>`;
      document.getElementById("twohundred_fivehundred").innerHTML = `${stats.twohundred_fivehundred.toLocaleString()} 
    <span class="text-body-secondary">(${roundToTwo((stats.twohundred_fivehundred / stats.live) * 100)}%)</span>`;
      document.getElementById("fivehundred_thousand").innerHTML = `${stats.fivehundred_thousand.toLocaleString()} 
    <span class="text-body-secondary">(${roundToTwo((stats.fivehundred_thousand / stats.live) * 100)}%)</span>`;
      document.getElementById("thousand_twothousand").innerHTML = `${stats.thousand_twothousand.toLocaleString()} 
    <span class="text-body-secondary">(${roundToTwo((stats.thousand_twothousand / stats.live) * 100)}%)</span>`;
      document.getElementById("twothousand_tenthousand").innerHTML = `${stats.twothousand_tenthousand.toLocaleString()} 
    <span class="text-body-secondary">(${roundToTwo((stats.twothousand_tenthousand / stats.live) * 100)}%)</span>`;
      document.getElementById("tenthousand").innerHTML = `${stats.tenthousand.toLocaleString()} 
    <span class="text-body-secondary">(${roundToTwo((stats.tenthousand / stats.live) * 100)}%)</span>`;

      document.getElementById("avg_viewcount").innerHTML = roundToTwo(stats.viewers / stats.live).toLocaleString();
      document.getElementById("median_viewcount").innerHTML = roundToTwo(stats.medianviewers).toLocaleString();
      document.getElementById("avg_uptime").innerHTML = convertTime(stats.avguptime);
      document.getElementById("median_uptime").innerHTML = convertTime(stats.medianuptime);

      for (let index = 0; index < 10; index++) {
        document.getElementById(`lang${index}`).innerHTML = getLanguage(stats.languages[index]._id);
        document.getElementById(`lang${index}_channels`).innerHTML = `${stats.languages[index].count.toLocaleString()}
      <span class="text-body-secondary">(${roundToTwo((stats.languages[index].count / stats.live) * 100)}%)</span>`;
        document.getElementById(`lang${index}_avg`).innerHTML = stats.languages[index].avg_viewers;
        document.getElementById(`lang${index}_max`).innerHTML = stats.languages[index].max_viewers.toLocaleString();
      }

      for (let index = 0; index < 10; index++) {
        document.getElementById(`tag${index}`).innerHTML = stats.top_tags[index].tag;
        document.getElementById(`tag${index}_channels`).innerHTML = `${stats.top_tags[index].channels.toLocaleString()}
      <span class="text-body-secondary">(${roundToTwo((stats.top_tags[index].channels / stats.live) * 100)}%)</span>`;
        document.getElementById(`tag${index}_avg`).innerHTML = roundToTwo(stats.top_tags[index].viewers / stats.top_tags[index].channels).toLocaleString();
      }

      document.getElementById("total_tags").innerHTML = `${stats.total_tags.toLocaleString()}`;
      document.getElementById("sum_tags").innerHTML = roundToTwo(stats.sum_tags / stats.live);

      document.getElementById("defaultpfp").innerHTML = `${stats.defaultpfp.toLocaleString()} 
    <span class="text-body-secondary">(${roundToTwo((stats.defaultpfp / stats.live) * 100)}%)</span>`;

      document.getElementById("nodesc").innerHTML = `${stats.nodesc.toLocaleString()} 
    <span class="text-body-secondary">(${roundToTwo((stats.nodesc / stats.live) * 100)}%)</span>`;

      document.getElementById("notitle").innerHTML = `${stats.notitle.toLocaleString()} 
    <span class="text-body-secondary">(${roundToTwo((stats.notitle / stats.live) * 100)}%)</span>`;

      document.getElementById("nogame").innerHTML = `${stats.nogame.toLocaleString()} 
    <span class="text-body-secondary">(${roundToTwo((stats.nogame / stats.live) * 100)}%)</span>`;

      document.getElementById("drops").innerHTML = `${stats.drops.toLocaleString()} 
    <span class="text-body-secondary">(${roundToTwo((stats.drops / stats.live) * 100)}%)</span>`;

      document.getElementById("ccl_DrugsIntoxication").innerHTML = `
    ${stats.ccls["DrugsIntoxication"].channels.toLocaleString()} channels
    <span class="text-body-secondary">(${roundToTwo((stats.ccls["DrugsIntoxication"].channels / stats.live) * 100)}%)</span> - 
    Average view count: ${roundToTwo(stats.ccls["DrugsIntoxication"].viewers / stats.ccls["DrugsIntoxication"].channels).toLocaleString()}`;
      document.getElementById("ccl_Gambling").innerHTML = `
    ${stats.ccls["Gambling"].channels.toLocaleString()} channels
    <span class="text-body-secondary">(${roundToTwo((stats.ccls["Gambling"].channels / stats.live) * 100)}%)</span> - 
    Average view count: ${roundToTwo(stats.ccls["Gambling"].viewers / stats.ccls["Gambling"].channels).toLocaleString()}`;
      document.getElementById("ccl_MatureGame").innerHTML = `
    ${stats.ccls["MatureGame"].channels.toLocaleString()} channels
    <span class="text-body-secondary">(${roundToTwo((stats.ccls["MatureGame"].channels / stats.live) * 100)}%)</span> - 
    Average view count: ${roundToTwo(stats.ccls["MatureGame"].viewers / stats.ccls["MatureGame"].channels).toLocaleString()}`;
      document.getElementById("ccl_ProfanityVulgarity").innerHTML = `
    ${stats.ccls["ProfanityVulgarity"].channels.toLocaleString()} channels
    <span class="text-body-secondary">(${roundToTwo((stats.ccls["ProfanityVulgarity"].channels / stats.live) * 100)}%)</span> - 
    Average view count: ${roundToTwo(stats.ccls["ProfanityVulgarity"].viewers / stats.ccls["ProfanityVulgarity"].channels).toLocaleString()}`;
      document.getElementById("ccl_SexualThemes").innerHTML = `
    ${stats.ccls["SexualThemes"].channels.toLocaleString()} channels
    <span class="text-body-secondary">(${roundToTwo((stats.ccls["SexualThemes"].channels / stats.live) * 100)}%)</span> - 
    Average view count: ${roundToTwo(stats.ccls["SexualThemes"].viewers / stats.ccls["SexualThemes"].channels).toLocaleString()}`;
      document.getElementById("ccl_ViolentGraphic").innerHTML = `
    ${stats.ccls["ViolentGraphic"].channels.toLocaleString()} channels
    <span class="text-body-secondary">(${roundToTwo((stats.ccls["ViolentGraphic"].channels / stats.live) * 100)}%)</span> - 
    Average view count: ${roundToTwo(stats.ccls["ViolentGraphic"].viewers / stats.ccls["ViolentGraphic"].channels).toLocaleString()}`;

      document.getElementById("oldest_user").innerHTML = `
    <div class="container-fluid">
    <div class="row">
      <div class="col-md-4">
      <a href="https://twitch.tv/${stats.oldest_user.username}" target="_blank" rel="noopener noreferrer">
        <img src="${stats.oldest_user.profile_image_url}" class="img-fluid rounded-start donkstats-pfp" title="${stats.oldest_user.display_name}" alt="${stats.oldest_user.display_name}"></a>
      </div>
      <div class="col">
        <div class="card-body">
          <h5 class="card-title"><a href="https://twitch.tv/${stats.oldest_user.username}" target="_blank" rel="noopener noreferrer">${
            stats.oldest_user.username == stats.oldest_user.display_name.toLowerCase()
              ? ` ${stats.oldest_user.display_name}`
              : ` ${stats.oldest_user.display_name} (${stats.oldest_user.username})`
          }${stats.oldest_user.broadcaster_type == "partner" ? svg : ""}${stats.oldest_user.type == "staff" ? staffpic : ""}</a></h5>
          <p class="card-text">
          Account created ${relativeTime(Date.now() - stats.oldest_user.age_timestamp)} ago <span class="text-body-secondary">(${new Date(stats.oldest_user.age_timestamp)
            .toISOString()
            .replace("T", " ")
            .replace("Z", "")})</span> <br>
          ${stats.oldest_user.game_name || "<span class='text-body-secondary'>No category</span>"} • ${stats.oldest_user.viewers.toLocaleString()} ${
            stats.oldest_user.viewers == 1 ? "Viewer" : "Viewers"
          }
          </p>
        </div>
      </div>
    </div>
  </div>`;

      document.getElementById("newest_user").innerHTML = `
  <div class="container-fluid">
  <div class="row">
    <div class="col-md-4">
    <a href="https://twitch.tv/${stats.newest_user.username}" target="_blank" rel="noopener noreferrer">
      <img src="${stats.newest_user.profile_image_url}" class="img-fluid rounded-start donkstats-pfp" title="${stats.newest_user.display_name}" alt="${stats.newest_user.display_name}"></a>
    </div>
    <div class="col">
      <div class="card-body">
        <h5 class="card-title"><a href="https://twitch.tv/${stats.newest_user.username}" target="_blank" rel="noopener noreferrer">${
          stats.newest_user.username == stats.newest_user.display_name.toLowerCase()
            ? ` ${stats.newest_user.display_name}`
            : ` ${stats.newest_user.display_name} (${stats.newest_user.username})`
        }${stats.newest_user.broadcaster_type == "partner" ? svg : ""}${stats.newest_user.type == "staff" ? staffpic : ""}</a></h5>
        <p class="card-text">
        Account created ${relativeTime(Date.now() - stats.newest_user.age_timestamp)} ago <span class=text-body-secondary>(${new Date(stats.newest_user.age_timestamp)
          .toISOString()
          .replace("T", " ")
          .replace("Z", "")})</span><br>
        ${stats.newest_user.game_name || "<span class='text-body-secondary'>No category</span>"} • ${stats.newest_user.viewers.toLocaleString()} ${
          stats.newest_user.viewers == 1 ? "Viewer" : "Viewers"
        }
        </p>
      </div>
    </div>
  </div>
</div>`;

      let most_streamed_link = await checkPic(`https://static-cdn.jtvnw.net/ttv-boxart/${stats.most_streamed.id}-285x380.jpg`);
      document.getElementById("most_streamed_img").src = `https://static-cdn.jtvnw.net/ttv-boxart/${stats.most_streamed.id}${most_streamed_link ? "" : "_IGDB"}-285x380.jpg`;
      document.getElementById("most_streamed_img").title = stats.most_streamed.name;
      document.getElementById("most_streamed_img").alt = stats.most_streamed.name;
      document.getElementById("most_streamed").innerHTML = `
    <h5 class="card-title">
    <a href="https://www.twitch.tv/directory/game/${encodeURIComponent(stats.most_streamed.name)}" target="_blank" rel="noopener noreferrer">${stats.most_streamed.name}</a>
    </h5>
    <p class="card-text">
    ${stats.most_streamed.viewers.toLocaleString()} Viewers <span class="text-body-secondary">(${roundToTwo((stats.most_streamed.viewers / stats.viewers) * 100)}%)</span><br>
    ${stats.most_streamed.channels.toLocaleString()} Live Channels <span class="text-body-secondary">(${roundToTwo((stats.most_streamed.channels / stats.live) * 100)}%)</span><br>
    </p>`;

      let highest_ratio_link = await checkPic(`https://static-cdn.jtvnw.net/ttv-boxart/${stats.highest_ratio.id}-285x380.jpg`);
      document.getElementById("highest_ratio_img").src = `https://static-cdn.jtvnw.net/ttv-boxart/${stats.highest_ratio.id}${highest_ratio_link ? "" : "_IGDB"}-285x380.jpg`;
      document.getElementById("highest_ratio_img").title = stats.highest_ratio.name;
      document.getElementById("highest_ratio_img").alt = stats.highest_ratio.name;
      document.getElementById("highest_ratio").innerHTML = `
    <h5 class="card-title">
    <a href="https://www.twitch.tv/directory/game/${encodeURIComponent(stats.highest_ratio.name)}" target="_blank" rel="noopener noreferrer">${stats.highest_ratio.name}</a>
    </h5>
    <p class="card-text">
    Only ${stats.highest_ratio.channels} live ${stats.highest_ratio.channels == 1 ? "channel" : "channels"} with a total of ${stats.highest_ratio.viewers.toLocaleString()} viewers</p>`;

      load_least_popular();

      document.getElementById("info").innerHTML = `Stats updated on ${new Date(stats.time)}`;
      if (Date.now() - stats.time > 7200000) {
        document.getElementById("outdatedWarningText").innerHTML = `Stats are outdated, last update on ${new Date(stats.time)}. Try refreshing or contacting me :)`;
        document.getElementById("outdatedWarning").style.display = "";
      }
    } catch (error) {
      console.log(error);
    }
  } //loadStats
</script>

<svelte:head>
  <title>Donk stats | OkayegBOT</title>
  <meta name="description" content="A collection of various stats about Twitch and its streamers and viewers" />
  <meta property="og:title" content="Donk stats | OkayegBOT" />
  <meta property="og:url" content="https://okayeg.com/twitch/stats" />
  <meta property="og:description" content="A collection of various stats about Twitch and its streamers and viewers" />
</svelte:head>

<div class="container-fluid">
  <div class="row">
    <div class="p-2" id="outdatedWarning" style="display: none">
      <div class="alert alert-warning" role="alert" id="outdatedWarningText"></div>
    </div>
    <div class="card m-2 p-0" style="width: 40rem">
      <div class="card-header">General stats</div>
      <div class="card-body">
        🔴 Total live channels:
        <span id="totalChannels">
          <span class="placeholder-wave">
            <span class="placeholder col-2"></span>
          </span>
        </span>
        <br />
        <IcBaselineGroups /> Total viewers:
        <span id="totalViewers">
          <span class="placeholder-wave"> <span class="placeholder col-2"></span> </span>
        </span>

        <div id="chartContainer" style="height: 20rem; display: inline-flex; text-align: center">
          <div style="width: 18rem; margin-right: 20px">
            Streamers
            <canvas id="channelsChart"></canvas>
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          <div style="width: 18rem">
            Viewers watching
            <canvas id="viewersChart"></canvas>
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>

        <br />
        Partners:
        <span id="partners">
          <span class="placeholder-wave"> <span class="placeholder col-1"></span> </span>
        </span>
        <br />
        Affiliates:
        <span id="affiliates">
          <span class="placeholder-wave"> <span class="placeholder col-2"></span> </span>
        </span>
        <br />
        Others:
        <span id="others">
          <span class="placeholder-wave"> <span class="placeholder col-2"></span> </span>
        </span>
      </div>
    </div>

    <div class="card m-2 p-0" style="width: 30rem">
      <div class="card-header">Number of channels at different viewer counts</div>
      <div class="card-body">
        <canvas id="segmentsChart"></canvas>
        <div class="spinner-border" role="status" style="position: absolute; left: 13.5rem; top: 5rem">
          <span class="visually-hidden">Loading...</span>
        </div>

        <div class="container text-center p-0 m-0">
          <div class="row">
            <div class="col align-self-center">Viewer segment</div>
            <div class="col align-self-start">Number of channels</div>
          </div>
          <hr />

          <div class="row">
            <div class="col align-self-center">>10,000 viewers:</div>
            <div class="col align-self-start" id="tenthousand">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
          </div>
          <div class="row">
            <div class="col align-self-center">2,000 → 10,000 viewers:</div>
            <div class="col align-self-start" id="twothousand_tenthousand">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
          </div>
          <div class="row">
            <div class="col align-self-center">1,000 → 2,000 viewers:</div>
            <div class="col align-self-start" id="thousand_twothousand">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
          </div>
          <div class="row">
            <div class="col align-self-center">500 → 1,000 viewers:</div>
            <div class="col align-self-start" id="fivehundred_thousand">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
          </div>
          <div class="row">
            <div class="col align-self-center">200 → 500 viewers:</div>
            <div class="col align-self-start" id="twohundred_fivehundred">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
          </div>
          <div class="row">
            <div class="col align-self-center">100 → 200 viewers:</div>
            <div class="col align-self-start" id="hundred_twohundred">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
          </div>
          <div class="row">
            <div class="col align-self-center">10 → 100 viewers:</div>
            <div class="col align-self-start" id="ten_hundred">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
          </div>
          <div class="row">
            <div class="col align-self-center">5 → 10 viewers:</div>
            <div class="col align-self-start" id="five_ten">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
          </div>
          <div class="row">
            <div class="col align-self-center">1 → 5 viewers:</div>
            <div class="col align-self-start" id="one_five">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
          </div>
          <div class="row">
            <div class="col align-self-center">1 viewer:</div>
            <div class="col align-self-start" id="one">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
          </div>
          <div class="row">
            <div class="col align-self-center">0 viewers:</div>
            <div class="col align-self-start" id="zero">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
          </div>
        </div>
        Average view count:
        <span id="avg_viewcount">
          <span class="placeholder-wave"> <span class="placeholder col-2"></span> </span>
        </span>
        <br />
        Median view count:
        <span id="median_viewcount">
          <span class="placeholder-wave"> <span class="placeholder col-2"></span> </span>
        </span>
        <br />

        Average uptime:
        <span id="avg_uptime">
          <span class="placeholder-wave"> <span class="placeholder col-2"></span> </span>
        </span>
        <br />

        Median uptime:
        <span id="median_uptime">
          <span class="placeholder-wave"> <span class="placeholder col-2"></span> </span>
        </span>
      </div>
    </div>

    <div class="card m-2 p-0" style="width: 40rem; max-height: 45rem; overflow: auto">
      <div class="card-header"><IcBaselineLanguage /> <span id="langHeader">Top 10 languages</span></div>
      <div class="card-body">
        <div class="container text-center p-0 m-0" id="langDiv">
          <div class="row">
            <div class="col align-self-center">Language</div>
            <div class="col align-self-start">Number of channels</div>
            <div class="col align-self-start">Average view count</div>
            <div class="col align-self-start">Highest view count</div>
          </div>
          <hr />

          <div class="row">
            <div class="col align-self-center" id="lang0">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="lang0_channels">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="lang0_avg">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="lang0_max">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
          </div>
          <div class="row">
            <div class="col align-self-center" id="lang1">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="lang1_channels">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="lang1_avg">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="lang1_max">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
          </div>

          <div class="row">
            <div class="col align-self-center" id="lang2">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="lang2_channels">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="lang2_avg">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="lang2_max">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
          </div>

          <div class="row">
            <div class="col align-self-center" id="lang3">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="lang3_channels">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="lang3_avg">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="lang3_max">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
          </div>

          <div class="row">
            <div class="col align-self-center" id="lang4">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="lang4_channels">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="lang4_avg">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="lang4_max">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
          </div>

          <div class="row">
            <div class="col align-self-center" id="lang5">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="lang5_channels">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="lang5_avg">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="lang5_max">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
          </div>

          <div class="row">
            <div class="col align-self-center" id="lang6">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="lang6_channels">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="lang6_avg">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="lang6_max">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
          </div>

          <div class="row">
            <div class="col align-self-center" id="lang7">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="lang7_channels">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="lang7_avg">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="lang7_max">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
          </div>

          <div class="row">
            <div class="col align-self-center" id="lang8">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="lang8_channels">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="lang8_avg">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="lang8_max">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
          </div>

          <div class="row">
            <div class="col align-self-center" id="lang9">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="lang9_channels">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="lang9_avg">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="lang9_max">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
          </div>
          <div style="text-align: center" id="load100Langs">
            <a onclick={load100Langs} class="link-info" style="cursor: pointer"> Load all languages<IcBaselineArrowDropDown /> </a>
          </div>
        </div>
      </div>
    </div>

    <div class="card m-2 p-0" style="width: 28rem">
      <div class="card-header">General stats</div>
      <div class="card-body">
        <IcBaselineAccountCircle /> Channels using default profile picture:
        <span id="defaultpfp">
          <span class="placeholder-wave"> <span class="placeholder col-2"></span> </span>
        </span>
        <br />
        <IcBaselineSubtitlesOff /> Channels with no description:
        <span id="nodesc">
          <span class="placeholder-wave"> <span class="placeholder col-2"></span> </span>
        </span>
        <br />
        <IcBaselineSubtitlesOff /> Streams with no title:
        <span id="notitle">
          <span class="placeholder-wave"> <span class="placeholder col-2"></span> </span>
        </span>
        <br />
        <IcBaselineSubtitlesOff /> Streams with no category:
        <span id="nogame">
          <span class="placeholder-wave"> <span class="placeholder col-2"></span> </span>
        </span>
        <br />
        <IcBaselineRedeem /> Channels with drops enabled:
        <span id="drops">
          <span class="placeholder-wave"> <span class="placeholder col-2"></span> </span>
        </span>
        <br />
        <IcBaselineSportsEsports /> Total unique categories:
        <span id="totalGames">
          <span class="placeholder-wave"> <span class="placeholder col-2"></span> </span>
        </span>
      </div>
    </div>

    <div class="card m-2 p-0" style="width: 32rem">
      <div class="card-header">Content Classification Labels</div>
      <div class="card-body">
        <IcBaselineSmokingRooms /> <strong>Drugs, Intoxication, or Excessive Tobacco Use</strong>

        <div
          class="tooltip align-text-bottom"
          data-tip="Excessive tobacco glorification or promotion, any marijuana consumption/use, legal drug and alcohol induced intoxication, discussions of illegal drugs"
        >
          <IcBaselineHelpOutline />
        </div>
        <br />
        <span id="ccl_DrugsIntoxication">
          <span class="placeholder-wave"> <span class="placeholder col-2"></span> </span>
        </span>
        <br />
        <IcBaselineCasino /> <strong>Gambling</strong>

        <div class="tooltip align-text-bottom" data-tip="Participating in online or in-person gambling, poker or fantasy sports, that involve the exchange of real money">
          <IcBaselineHelpOutline />
        </div>
        <br />
        <span id="ccl_Gambling">
          <span class="placeholder-wave"> <span class="placeholder col-2"></span> </span>
        </span>
        <br />
        <IcBaselineVideogameAsset /> <strong>Mature-rated game</strong>

        <div class="tooltip align-text-bottom" data-tip="Games that are rated Mature or less suitable for a younger audience. (automatically applied based on current game)">
          <IcBaselineHelpOutline />
        </div>
        <br />
        <span id="ccl_MatureGame">
          <span class="placeholder-wave"> <span class="placeholder col-2"></span> </span>
        </span>
        <br />
        <IcBaselineMoodBad /> <strong>Significant Profanity or Vulgarity</strong>

        <div class="tooltip align-text-bottom" data-tip="Prolonged, and repeated use of obscenities, profanities, and vulgarities, especially as a regular part of speech">
          <IcBaselineHelpOutline />
        </div>
        <br />
        <span id="ccl_ProfanityVulgarity">
          <span class="placeholder-wave"> <span class="placeholder col-2"></span> </span>
        </span>
        <br />
        <IcBaseline18UpRating /> <strong>Sexual Themes</strong>

        <div class="tooltip align-text-bottom" data-tip="Content that focuses on sexualized physical attributes and activities, sexual topics, or experiences">
          <IcBaselineHelpOutline />
        </div>
        <br />
        <span id="ccl_SexualThemes">
          <span class="placeholder-wave"> <span class="placeholder col-2"></span> </span>
        </span>
        <br />
        <IcBaselineSportsKabaddi /> <strong>Violent and Graphic Depictions</strong>

        <div class="tooltip align-text-bottom" data-tip="Simulations and/or depictions of realistic violence, gore, extreme injury, or death">
          <IcBaselineHelpOutline />
        </div>
        <br />
        <span id="ccl_ViolentGraphic">
          <span class="placeholder-wave"> <span class="placeholder col-2"></span> </span>
        </span>
        <br />
      </div>
    </div>

    <div class="card m-2 p-0" style="width: 35rem; max-height: 29rem; overflow: auto">
      <div class="card-header">
        <IcBaselineSell />Top <span id="tagCount">10</span> tags <small class="text-body-secondary">Excluding language tags</small>
      </div>
      <div class="card-body">
        <div class="container text-center p-0 m-0" id="tagsDiv">
          <div class="row">
            <div class="col align-self-center">Tag</div>
            <div class="col align-self-start">Number of channels</div>
            <div class="col align-self-start">Average view count</div>
          </div>
          <hr />
          <div class="row">
            <div class="col align-self-center" id="tag0">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="tag0_channels">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="tag0_avg">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
          </div>

          <div class="row">
            <div class="col align-self-center" id="tag1">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="tag1_channels">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="tag1_avg">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
          </div>

          <div class="row">
            <div class="col align-self-center" id="tag2">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="tag2_channels">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="tag2_avg">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
          </div>

          <div class="row">
            <div class="col align-self-center" id="tag3">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="tag3_channels">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="tag3_avg">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
          </div>

          <div class="row">
            <div class="col align-self-center" id="tag4">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="tag4_channels">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="tag4_avg">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
          </div>

          <div class="row">
            <div class="col align-self-center" id="tag5">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="tag5_channels">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="tag5_avg">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
          </div>

          <div class="row">
            <div class="col align-self-center" id="tag6">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="tag6_channels">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="tag6_avg">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
          </div>

          <div class="row">
            <div class="col align-self-center" id="tag7">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="tag7_channels">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="tag7_avg">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
          </div>

          <div class="row">
            <div class="col align-self-center" id="tag8">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="tag8_channels">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="tag8_avg">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
          </div>

          <div class="row">
            <div class="col align-self-center" id="tag9">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="tag9_channels">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
            <div class="col align-self-start" id="tag9_avg">
              <span class="placeholder-wave"> <span class="placeholder col-4"></span> </span>
            </div>
          </div>
        </div>

        Total unique tags:
        <span id="total_tags">
          <span class="placeholder-wave"> <span class="placeholder col-2"></span> </span>
        </span>
        <br />
        Average number of unique tags per channel:
        <span id="sum_tags">
          <span class="placeholder-wave"> <span class="placeholder col-2"></span> </span>
        </span>
        <div style="text-align: center" id="load100Tags">
          <a onclick={load100Tags} class="link-info" style="cursor: pointer"> Load top 100 tags<IcBaselineArrowDropDown /> </a>
        </div>
      </div>
    </div>

    <div class="card m-2 p-0" style="width: 35rem">
      <div class="card-header">Newest live channel</div>
      <div class="card-body">
        <span id="newest_user">
          <span class="placeholder-wave"> <span class="placeholder col-6"></span> </span>
        </span>
      </div>
    </div>

    <div class="card m-2 p-0" style="width: 35rem">
      <div class="card-header">Oldest live channel</div>
      <div class="card-body">
        <span id="oldest_user">
          <span class="placeholder-wave"> <span class="placeholder col-6"></span> </span>
        </span>
      </div>
    </div>

    <div class="card m-2 p-0" style="width: 35rem">
      <div class="card-header">Most streamed category</div>
      <div class="row g-0">
        <div class="col-md-5">
          <img id="most_streamed_img" class="img-fluid donkstats-category" alt="Loading..." />
        </div>
        <div class="col-md-7">
          <div class="card-body" id="most_streamed">
            <span class="placeholder-wave"> <span class="placeholder col-6"></span> </span>
          </div>
        </div>
      </div>
    </div>

    <div class="card m-2 p-0" style="width: 35rem">
      <div class="card-header">Category with the highest viewer to streamer ratio</div>
      <div class="row g-0">
        <div class="col-md-5">
          <img id="highest_ratio_img" class="img-fluid donkstats-category" alt="Loading..." />
        </div>
        <div class="col-md-7">
          <div class="card-body" id="highest_ratio">
            <span class="placeholder-wave"> <span class="placeholder col-6"></span> </span>
          </div>
        </div>
      </div>
    </div>

    <div class="card m-2 p-0" style="width: 35rem">
      <div class="card-header">Least popular categories <small class="text-body-secondary">Categories with 1 live channel and 0 viewers</small></div>
      <div class="row g-0">
        <div class="col-md-5">
          <img id="least_popular_img" class="img-fluid donkstats-category" alt="Loading..." />
        </div>
        <div class="col-md-7">
          <div class="card-body" id="least_popular">
            <span class="placeholder-wave"> <span class="placeholder col-6"></span> </span>
          </div>
        </div>
      </div>
    </div>

    <div class="card m-2 p-0" style="width: 20rem">
      <div class="card-header">Info</div>
      <div class="card-body">
        <span id="info">
          <span class="placeholder-wave"> <span class="placeholder col-6"></span> </span>
        </span>
        <br />
        Stats will update every 30 minutes, as long as I have it running :) If you see that the stats are way older than 30mins clear your cache or contact me
      </div>
    </div>
  </div>
</div>

<style>
  .donkstats-pfp {
    height: 200px;
    width: 200px;
    object-fit: contain;
  }

  .donkstats-pfp-small {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    object-fit: contain;
  }

  .donkstats-category {
    border-end-start-radius: 6px;
  }

  .donkstats-thumbnail {
    object-fit: contain;
    margin: 10px;
  }
</style>
