<script>
  import { onMount } from "svelte";
  import { page } from "$app/state";
  //page.params.username

  import IcBaselineSearch from "~icons/ic/baseline-search";
  import IcBaselinePublic from "~icons/ic/baseline-public";

  function loadGlobalRecap() {
    document.getElementById("global").style.display = "";
    document.getElementById("user").style.display = "none";
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.replaceState(undefined, undefined, "#");
    document.getElementById("username").value = "";
  } //loadGlobalRecap

  onMount(async () => {
    return;

    if (!username && !document.getElementById("username").value) {
      return;
    }

    if (document.getElementById("username").value) {
      username = document.getElementById("username").value.toLowerCase().replace(/\s/g, "");
    } else {
      document.getElementById("username").value = username;
    }

    document.getElementById("global").style.display = "none";
    document.getElementById("user").style.display = "";

    let response1 = await fetch(`/data/usersrecap.json`);
    let response2 = await fetch(`/data/globalrecap.json`);

    let usersRecap = await response1.json();
    let globalRecap = await response2.json();

    let user = usersRecap.find((e) => e.username === username);

    if (!username) {
      loadGlobalRecap();
      return;
    }
    if (!user) {
      document.getElementById("recapusername").innerHTML = `
    Player not found <img src="/sadeg.png" alt="sadeg" />
    <br><small class="text-body-secondary" style="font-size: 0.3em;">If you changed your username recently try searching for your old username</small>`;
      document.getElementById("seasons").innerHTML = ``;
      document.getElementById("egs").style.display = "none";
      document.getElementById("commands").style.display = "none";
      document.getElementById("stocks").style.display = "none";
      document.getElementById("coinflips").style.display = "none";
      document.getElementById("lottery").style.display = "none";
      document.getElementById("trading").style.display = "none";
      document.getElementById("trivia").style.display = "none";
      document.getElementById("duels").style.display = "none";
      document.getElementById("roulette").style.display = "none";
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    document.getElementById("egscount").innerHTML = "";
    document.getElementById("egseaten").innerHTML = "";
    document.getElementById("egrank").innerHTML = "";
    document.getElementById("egcmd").innerHTML = "";
    document.getElementById("egcmdstats").innerHTML = "";
    document.getElementById("cmd").innerHTML = "";
    document.getElementById("stockcount").innerHTML = "";
    document.getElementById("coinflipstats").innerHTML = "";
    document.getElementById("lotterystats").innerHTML = "";
    document.getElementById("tradingstats").innerHTML = "";
    document.getElementById("triviastats").innerHTML = "";
    document.getElementById("duelstats").innerHTML = "";
    document.getElementById("roulettestats").innerHTML = "";

    let medals = { 0: "🥇", 1: "🥈", 2: "🥉" };
    console.log(user);

    document.getElementById("recapusername").innerHTML = `${user.username}'s recap`;

    if (user.seasons.length == 12) {
      document.getElementById("seasons").innerHTML = "Played in all 12 seasons! (1 of 145 players only)";
    } else {
      document.getElementById("seasons").innerHTML = `Played in ${user.seasons.length == 1 ? "only" : ""} ${user.seasons.length} of the 12 seasons`;
    }

    if (user?.eguses) {
      document.getElementById("egscount").innerHTML = `Total egs earned: ${user.egs.toLocaleString()}`;
      if (user.egseaten) {
        let eatrank = globalRecap.egseatenArray.indexOf(user.egseaten);

        document.getElementById("egseaten").innerHTML = `
      ${user.egseaten.toLocaleString()} egs were eaten using the <kbd>=eat</kbd> command - 
      Rank #${(eatrank + 1).toLocaleString()} ${eatrank < 3 ? medals[eatrank] : ""} 
      ${globalRecap.egseatenArray[eatrank + 1] == globalRecap.egseatenArray[eatrank] ? "(tied)" : ""}`;
      }
      let rank = globalRecap.egsArray.indexOf(user.egs);
      if (rank > -1) {
        document.getElementById("egrank").innerHTML = `Your rank is #${(rank + 1).toLocaleString()} ${rank < 3 ? medals[rank] : ""} 
      ${globalRecap.egsArray[rank + 1] == globalRecap.egsArray[rank] ? "(tied)" : ""}`;
      }

      document.getElementById("egs").style.display = "";
    } else {
      document.getElementById("egs").style.display = "none";
    }

    if (user.uses || user?.eguses) {
      if (user?.eguses) {
        let rank = globalRecap.egusesArray.indexOf(user?.eguses);

        document.getElementById("egcmd").innerHTML = `
      You used the <kbd>=eg</kbd> command ${(user?.eguses || 0).toLocaleString()} ${user?.eguses == 1 ? "time" : "times"} - 
      Rank #${(rank + 1).toLocaleString()} ${rank < 3 ? medals[rank] : ""}  ${globalRecap.egusesArray[rank + 1] == globalRecap.egusesArray[rank] ? "(tied)" : ""}`;

        document.getElementById("egcmdstats").innerHTML = `
      The command gave you positive egs ${user.plus.toLocaleString()} ${user.plus == 1 ? "time" : "times"} - 
      zero egs ${user.zero.toLocaleString()} ${user.zero == 1 ? "time" : "times"} - 
      negative egs ${user.negative.toLocaleString()} ${user.negative == 1 ? "time" : "times"}`;
      }

      let rank = globalRecap.usesArray.indexOf(user.uses);

      document.getElementById("cmd").innerHTML = `
    All other commands were used ${(user.uses - (user?.eguses || 0)).toLocaleString()} ${user.uses - (user?.eguses || 0) == 1 ? "time" : "times"} - 
    Rank #${(rank + 1).toLocaleString()} ${rank < 3 ? medals[rank] : ""}  ${globalRecap.usesArray[rank + 1] == globalRecap.usesArray[rank] ? "(tied)" : ""}`;

      document.getElementById("commands").style.display = "";
    } else {
      document.getElementById("commands").style.display = "none";
    }

    if (user.shungite || user.chicken || user.bajcoin || user.copium) {
      let shungiterank = globalRecap.shungiteArray.indexOf(user.shungite);
      let chickenrank = globalRecap.chickenArray.indexOf(user.chicken);
      let bajcoinrank = globalRecap.bajcoinArray.indexOf(user.bajcoin);
      let copiumrank = globalRecap.copiumArray.indexOf(user.copium);

      if (shungiterank != -1) {
        document.getElementById("stockcount").innerHTML += `
      ${user.shungite.toLocaleString()} shungite - 
      Rank #${(shungiterank + 1).toLocaleString()} ${shungiterank < 3 ? medals[shungiterank] : ""}  ${
        globalRecap.shungiteArray[shungiterank + 1] == globalRecap.shungiteArray[shungiterank] ? "(tied)" : ""
      }<br>`;
      }

      if (chickenrank != -1) {
        document.getElementById("stockcount").innerHTML += `
      ${user.chicken.toLocaleString()} chicken - 
      Rank #${(chickenrank + 1).toLocaleString()} ${chickenrank < 3 ? medals[chickenrank] : ""}  ${
        globalRecap.chickenArray[chickenrank + 1] == globalRecap.chickenArray[chickenrank] ? "(tied)" : ""
      }<br>`;
      }
      if (bajcoinrank != -1) {
        document.getElementById("stockcount").innerHTML += `
      ${user.bajcoin.toLocaleString()} bajcoin - 
      Rank #${(bajcoinrank + 1).toLocaleString()} ${bajcoinrank < 3 ? medals[bajcoinrank] : ""}  ${
        globalRecap.bajcoinArray[bajcoinrank + 1] == globalRecap.bajcoinArray[bajcoinrank] ? "(tied)" : ""
      }<br>`;
      }
      if (copiumrank != -1) {
        document.getElementById("stockcount").innerHTML += `
      ${user.copium.toLocaleString()} copium - 
      Rank #${(copiumrank + 1).toLocaleString()} ${copiumrank < 3 ? medals[copiumrank] : ""}  ${
        globalRecap.copiumArray[copiumrank + 1] == globalRecap.copiumArray[copiumrank] ? "(tied)" : ""
      }`;
      }

      document.getElementById("stocks").style.display = "";
    } else {
      document.getElementById("stocks").style.display = "none";
    }

    if (user.coinflips) {
      let rank = globalRecap.coinflipsArray.indexOf(user.coinflips);
      let winrank = globalRecap.coinflipwinsArray.indexOf(user.coinflipwins);
      let winrate = roundToTwo((user.coinflipwins / user.coinflips) * 100);
      let winraterank = globalRecap.coinflipwinrateArray.indexOf(winrate);
      let winratestring = "";
      let winsstring = "";
      if (user.coinflips > 10) {
        winratestring = `<br>
      Winrate: ${winrate}% - 
      Rank #${(winraterank + 1).toLocaleString()} ${winraterank < 3 ? medals[winraterank] : ""}  ${
        globalRecap.coinflipwinrateArray[winraterank + 1] == globalRecap.coinflipwinrateArray[winraterank] ? "(tied)" : ""
      }<br>`;
      }

      if (user.coinflipwins) {
        winsstring = `
      Won ${user.coinflipwins.toLocaleString()} ${user.coinflipwins == 1 ? "coinflip only" : "coinflips"} - 
      Rank #${(winrank + 1).toLocaleString()} ${winrank < 3 ? medals[winrank] : ""}  ${
        globalRecap.coinflipwinsArray[winrank + 1] == globalRecap.coinflipwinsArray[winrank] ? "(tied)" : ""
      }<br>
      Biggest win: ${user.biggestcoinflipwin.toLocaleString()}  - Biggest loss: ${user.biggestcoinfliploss.toLocaleString()}`;
      } else {
        winsstring = `Lost all coinflips :(<br>Biggest loss: ${user.biggestcoinfliploss.toLocaleString()}`;
      }

      document.getElementById("coinflipstats").innerHTML = `
    ${user.coinflips.toLocaleString()} coinflips - 
    Rank #${(rank + 1).toLocaleString()} ${rank < 3 ? medals[rank] : ""}  ${globalRecap.coinflipsArray[rank + 1] == globalRecap.coinflipsArray[rank] ? "(tied)" : ""}<br>
    ${winsstring}
    ${winratestring}`;
      document.getElementById("coinflips").style.display = "";
    } else {
      document.getElementById("coinflips").style.display = "none";
    }

    if (user.lotteryjoins) {
      let rank = globalRecap.lotteryjoinsArray.indexOf(user.lotteryjoins);
      let wins = "";
      if (user.lotterywins == 0) {
        let rank = globalRecap.unluckylotteryArray.indexOf(user.lotteryjoins);
        wins = `You did not win a single lottery - You were the ${rank == 0 ? "" : `${addOrdinalSuffix(rank + 1)}`} most unlucky player ${rank < 3 ? medals[rank] : ""} 
      ${globalRecap.unluckylotteryArray[rank + 1] == globalRecap.unluckylotteryArray[rank] ? "(tied)" : ""}`;
      } else {
        let rank = globalRecap.lotterywinsArray.indexOf(user.lotterywins);
        wins = `
      Won ${user.lotterywins} ${user.lotterywins == 1 ? "time" : "times"} - 
      Rank #${(rank + 1).toLocaleString()} ${rank < 3 ? medals[rank] : ""}  ${globalRecap.lotterywinsArray[rank + 1] == globalRecap.lotterywinsArray[rank] ? "(tied)" : ""}<br>`;
      }

      document.getElementById("lotterystats").innerHTML = `
    ${user.lotteryjoins.toLocaleString()} lottery tickets bought - 
    Rank #${(rank + 1).toLocaleString()} ${rank < 3 ? medals[rank] : ""}  ${globalRecap.lotteryjoinsArray[rank + 1] == globalRecap.lotteryjoinsArray[rank] ? "(tied)" : ""}<br>
    ${wins}`;
      document.getElementById("lottery").style.display = "";
    } else {
      document.getElementById("lottery").style.display = "none";
    }

    if (user.egsgiven || user.egsreceived) {
      document.getElementById("tradingstats").innerHTML =
        `${user.egsgiven.toLocaleString()} egs sent to other players -  ${user.egsreceived.toLocaleString()} egs received from other players`;
      document.getElementById("trading").style.display = "";
    } else {
      document.getElementById("trading").style.display = "none";
    }

    if (user.trivia) {
      let rank = globalRecap.triviaArray.indexOf(user.trivia);

      document.getElementById("triviastats").innerHTML = `
    ${user.trivia.toLocaleString()} trivia questions answered - 
    Rank #${(rank + 1).toLocaleString()} ${rank < 3 ? medals[rank] : ""}  ${globalRecap.triviaArray[rank + 1] == globalRecap.triviaArray[rank] ? "(tied)" : ""}`;
      document.getElementById("trivia").style.display = "";
    } else {
      document.getElementById("trivia").style.display = "none";
    }

    if (user.duels) {
      let rank = globalRecap.duelsArray.indexOf(user.duels);
      let winrank = globalRecap.duelswonArray.indexOf(user.duelswon);
      let winrate = roundToTwo((user.duelswon / user.duels) * 100);
      let winraterank = globalRecap.duelwinrateArray.indexOf(winrate);
      let winratestring = "";
      let duelswonstring = "";
      if (user.duels > 10) {
        winratestring = `<br>
      Winrate: ${winrate}% - 
      Rank #${(winraterank + 1).toLocaleString()} ${winraterank < 3 ? medals[winraterank] : ""}  ${
        globalRecap.duelwinrateArray[winraterank + 1] == globalRecap.duelwinrateArray[winraterank] ? "(tied)" : ""
      }<br>`;
      }

      if (user.duelswon) {
        duelswonstring = `
      Won ${user.duelswon.toLocaleString()} ${user.duelswon == 1 ? "duel" : "duels"} - 
      Rank #${(winrank + 1).toLocaleString()} ${winrank < 3 ? medals[winrank] : ""}  ${globalRecap.duelswonArray[winrank + 1] == globalRecap.duelswonArray[winrank] ? "(tied)" : ""}<br>
      Biggest victory: ${user.biggestduelwin.toLocaleString()}  - Biggest defeat: ${user.biggestduelloss.toLocaleString()}`;
      } else {
        duelswonstring = `Lost all duels :(<br>Biggest defeat: ${user.biggestduelloss.toLocaleString()}`;
      }

      document.getElementById("duelstats").innerHTML = `
    ${user.duels.toLocaleString()} duels fought - 
    Rank #${(rank + 1).toLocaleString()} ${rank < 3 ? medals[rank] : ""}  ${globalRecap.duelsArray[rank + 1] == globalRecap.duelsArray[rank] ? "(tied)" : ""}<br>
    ${duelswonstring}
    ${winratestring}`;
      document.getElementById("duels").style.display = "";
    } else {
      document.getElementById("duels").style.display = "none";
    }

    if (user.roulettes) {
      let rank = globalRecap.rouletteswonArray.indexOf(user.rouletteswon);
      let winrate = roundToTwo((user.rouletteswon / user.roulettes) * 100);
      let winraterank = globalRecap.roulettewinrateArray.indexOf(winrate);
      let winratestring = "";
      let rouletteswonstring = "";
      if (user.roulettes > 10) {
        winratestring = `
      Winrate: ${winrate}% - 
      Rank #${(winraterank + 1).toLocaleString()} ${winraterank < 3 ? medals[winraterank] : ""}  ${
        globalRecap.roulettewinrateArray[winraterank + 1] == globalRecap.roulettewinrateArray[winraterank] ? "(tied)" : ""
      }<br>`;
      }

      if (user.rouletteswon) {
        rouletteswonstring = `
      Won ${user.rouletteswon.toLocaleString()} ${user.rouletteswon == 1 ? "time" : "times"} - 
      Rank #${(rank + 1).toLocaleString()} ${rank < 3 ? medals[rank] : ""}  ${globalRecap.rouletteswonArray[rank + 1] == globalRecap.rouletteswonArray[rank] ? "(tied)" : ""}<br>
      Biggest win: ${user.biggestduelwin.toLocaleString()}  - Biggest loss: ${user.biggestrouletteloss.toLocaleString()}<br>`;
      } else {
        rouletteswonstring = `Lost all spins :(<br>Biggest loss: ${user.biggestrouletteloss.toLocaleString()}`;
      }

      document.getElementById("roulettestats").innerHTML = `
    Roulette wheel spun ${user.roulettes.toLocaleString()} ${user.roulettes == 1 ? "time" : "times"}<br>
    ${rouletteswonstring}
    ${winratestring}`;
      document.getElementById("roulette").style.display = "";
    } else {
      document.getElementById("roulette").style.display = "none";
    }

    history.replaceState(undefined, undefined, `#${username}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
</script>

<svelte:head>
  <title>OkayegBOT Yearly Recaps</title>
  <meta name="description" content="OkayegBOT Yearly Recaps" />
  <meta property="og:title" content="OkayegBOT Yearly Recaps" />
  <meta property="og:url" content="https://okayeg.com/recap" />
  <meta property="og:description" content="OkayegBOT Yearly Recaps" />
</svelte:head>

<div class="flex justify-center">
  <div class="container-fluid">
    <div class="row mb-3">
      <div class="col-xl-3"></div>
      <div class="col-xl-6 text-center">
        <h1 class="display-1">OkayegBOT Yearly Recaps</h1>
        <small class="text-body-secondary">From season 24 till season 35 (Nov 2022 to Nov 2023)</small><br />
        <small class="text-body-secondary">Season 35 marks the bot's 3 year anniversary :)</small>

        <div id="user" style="display: none">
          <h6 class="text-info">A global recap can be viewed using button at the bottom</h6>
          <br />
          <h1 class="display-4" id="recapusername">username's recap</h1>

          <p class="lead" id="seasons"></p>

          <div class="card mb-3" id="egs" style="display: none">
            <div class="row g-0">
              <div class="col-md">
                <img src="/recap/egs.png" class="img-fluid rounded-start float-start h-100" alt="okayeg" />
              </div>
              <div class="col-md">
                <div class="card-body">
                  <h5 class="card-title">egs</h5>
                  <p class="card-text" id="egscount"></p>
                  <p class="card-text">
                    <small class="text-body-secondary" id="egseaten"></small>
                  </p>
                  <p class="card-text" id="egrank"></p>
                </div>
              </div>
            </div>
          </div>
          <div class="card mb-3" id="commands" style="display: none">
            <div class="row g-0">
              <div class="col-md">
                <img src="/recap/commands.png" class="img-fluid rounded-start float-start h-100" alt="okayeg" />
              </div>
              <div class="col-md">
                <div class="card-body">
                  <h5 class="card-title">Command stats</h5>
                  <p class="card-text" id="egcmd"></p>
                  <p class="card-text">
                    <small class="text-body-secondary" id="egcmdstats"></small>
                  </p>
                  <p class="card-text" id="cmd"></p>
                </div>
              </div>
            </div>
          </div>
          <div class="card mb-3" id="stocks" style="display: none">
            <div class="row g-0">
              <div class="col-md">
                <img src="/recap/stocks.png" class="img-fluid rounded-start float-start h-100" alt="okayeg" />
              </div>
              <div class="col-md">
                <div class="card-body">
                  <h5 class="card-title">Stocks</h5>
                  <p class="card-text" id="stockcount"></p>
                  <p class="card-text">
                    <small class="text-body-secondary">(Shares that you held till the end of a season)</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="card mb-3" id="coinflips" style="display: none">
            <div class="row g-0">
              <div class="col-md">
                <img src="/recap/coinflip.png" class="img-fluid rounded-start float-start h-100" alt="okayeg" />
              </div>
              <div class="col-md">
                <div class="card-body">
                  <h5 class="card-title">Coinflips</h5>
                  <p class="card-text" id="coinflipstats"></p>
                </div>
              </div>
            </div>
          </div>
          <div class="card mb-3" id="lottery" style="display: none">
            <div class="row g-0">
              <div class="col-md">
                <img src="/recap/lottery.png" class="img-fluid rounded-start float-start h-100" alt="okayeg" />
              </div>
              <div class="col-md">
                <div class="card-body">
                  <h5 class="card-title">Lottery</h5>
                  <p class="card-text" id="lotterystats"></p>
                </div>
              </div>
            </div>
          </div>
          <div class="card mb-3" id="trading" style="display: none">
            <div class="row g-0">
              <div class="col-md">
                <img src="/recap/trading.png" class="img-fluid rounded-start float-start h-100" alt="okayeg" />
              </div>
              <div class="col-md">
                <div class="card-body">
                  <h5 class="card-title">Trading</h5>
                  <p class="card-text" id="tradingstats"></p>
                </div>
              </div>
            </div>
          </div>
          <div class="card mb-3" id="trivia" style="display: none">
            <div class="row g-0">
              <div class="col-md">
                <img src="/nerd.png" class="img-fluid rounded-start float-start" alt="okayegNerd" style="height: 200px; margin-top: -70px" />
              </div>
              <div class="col-md">
                <div class="card-body">
                  <h5 class="card-title">Trivia</h5>
                  <p class="card-text" id="triviastats"></p>
                </div>
              </div>
            </div>
          </div>
          <div class="card mb-3" id="duels" style="display: none">
            <div class="row g-0">
              <div class="col-md">
                <img src="/recap/duels.png" class="img-fluid rounded-start float-start h-100" alt="okayeg" style="margin-top: -20px" />
              </div>
              <div class="col-md">
                <div class="card-body">
                  <h5 class="card-title">Duels</h5>
                  <p class="card-text" id="duelstats"></p>
                </div>
              </div>
            </div>
          </div>
          <div class="card mb-3" id="roulette" style="display: none">
            <div class="row g-0">
              <div class="col-md">
                <img src="/recap/roulette.png" class="img-fluid rounded-start float-start h-100" alt="okayeg" />
              </div>
              <div class="col-md">
                <div class="card-body">
                  <h5 class="card-title">Roulette</h5>
                  <p class="card-text" id="roulettestats"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-3"></div>
    </div>
    <div class="row">
      <div class="col-xl-4"></div>
      <div class="col-xl-4">
        <div class="card" style="margin-top: 10px">
          <div class="card-body">
            <h3>View a player's recap</h3>
            <div class="form-floating mb-3">
              <input type="text" class="form-control" id="username" placeholder="Username" aria-describedby="desc" />
              <label for="username">Username</label>
              <div id="desc" class="form-text">View any player's OkayegBOT recap for the past year.</div>
            </div>
            <button type="button" class="btn btn-primary float-start"><IcBaselinePublic />Global recap</button>
            <button type="button" class="btn btn-success float-end"><IcBaselineSearch />Lookup</button>
          </div>
        </div>
      </div>
      <div class="col-xl-4"></div>
    </div>
  </div>
</div>
