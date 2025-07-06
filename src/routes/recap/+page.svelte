<script>
  import { onMount } from "svelte";
  import IcBaselinePublic from "~icons/ic/baseline-public";
  import IcBaselinePersonSearch from "~icons/ic/baseline-person-search";

  onMount(async () => {
    return;
    let input = location.hash;
    let username = input.replace("#", "").toLowerCase().replace(/\s/g, "");

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
  <title>OkayegBOT Recap 2023</title>
  <meta name="description" content="OkayegBOT Recap 2023" />
  <meta property="og:title" content="OkayegBOT Recap 2023" />
  <meta property="og:url" content="https://okayeg.com/recap" />
  <meta property="og:description" content="OkayegBOT Recap 2023" />
</svelte:head>

<div class="flex text-center justify-center">
  <div class=" w-200 flex-col shrink">
    <h1 class="text-6xl my-6">OkayegBOT 2023 recap</h1>
    <p class="text-primary text-sm">From season 24 till season 35 (Nov 2022 to Nov 2023)<br />Season 35 marks the bot's 3 year anniversary :)</p>

    <p class="text-info">Your own personalized recap can be viewed using the form at the bottom</p>
    <h3 class="text-3xl">Bot stats from the past year</h3>

    <div class="w-full grid grid-cols-1 gap-3 m-3">
      <div class="card lg:card-side bg-base-200 shadow-sm">
        <figure>
          <img src="/recap/players.png" alt="players" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">Player stats</h2>
          <p>Total player count: 9,435</p>
          <div class="card-actions justify-end">Out of the 9,435 players, only 145 didn't miss a single season the past year</div>
        </div>
      </div>

      <div class="card lg:card-side bg-base-200 shadow-sm">
        <figure>
          <img src="/recap/egs.png" alt="egs" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">egs</h2>
          <p>Total egs earned: 6,900,276</p>
          <p>15,032 egs were eaten using the <kbd>=eat</kbd> command</p>
        </div>
      </div>

      <div class="card lg:card-side bg-base-200 shadow-sm">
        <figure>
          <img src="/recap/commands.png" alt="commands" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">Command stats</h2>
          <p>The <kbd>=eg</kbd> commaned was used 321,582 times</p>
          <p>The command gave out positive egs 225,426 times - zero egs 64,191 times - negative egs 31,965 times</p>
          <p>All other commands were used 514,213 times</p>
        </div>
      </div>

      <div class="card lg:card-side bg-base-200 shadow-sm">
        <figure>
          <img src="/recap/stocks.png" alt="stocks" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">Stocks</h2>
          <p>Some investors held on to their shares and refused to sell them before the end of a season</p>
          <p>6,858 shares of shungite - 7,091 shares of chicken - 13,563 shares of bajcoin - 9,209 shares of copium</p>
        </div>
      </div>

      <div class="card lg:card-side bg-base-200 shadow-sm">
        <figure>
          <img src="/recap/coinflip.png" alt="coinflip" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">Coinflips</h2>
          <p>The coin was flipped 135,437 times but players won 67,837 times only</p>
        </div>
      </div>

      <div class="card lg:card-side bg-base-200 shadow-sm">
        <figure>
          <img src="/recap/lottery.png" alt="lottery" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">Lottery</h2>
          <p>56,502 lottery tickets were bought</p>
          <p>
            The luckiest player was <a href="https://twitch.tv/biankaorban" target="_blank">biankaorban</a>, They bought a total of 865 tickets throughout the year and won the lottery 14
            times!
          </p>
          <p>
            The unluckiest player was <a href="https://twitch.tv/4kjone" target="_blank">4Kjone</a>, They bought a total of 2,506 tickets throughout the year but didn't win a single time
          </p>
        </div>
      </div>

      <div class="card lg:card-side bg-base-200 shadow-sm">
        <figure>
          <img src="/recap/trading.png" alt="trading" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">Trading</h2>
          <p>56,502 lottery tickets were bought</p>
          <p>18,208,427 egs were sent and received</p>
        </div>
      </div>

      <div class="card lg:card-side bg-base-200 shadow-sm">
        <figure>
          <img style="height: 200px; margin-top: -70px" src="/nerd.png" alt="trivia" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">Trivia</h2>
          <p>31,433 trivia questions were answered correctly</p>
        </div>
      </div>

      <div class="card lg:card-side bg-base-200 shadow-sm">
        <figure>
          <img src="/recap/duels.png" alt="duels" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">Duels</h2>
          <p>Players dueled 2,720 times</p>
        </div>
      </div>

      <div class="card lg:card-side bg-base-200 shadow-sm">
        <figure>
          <img src="/recap/roulette.png" alt="roulette" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">Roulette</h2>
          <p>The roulette wheel was spun 14,900 times but players won 4,921 times only</p>
        </div>
      </div>
    </div>

    <div class="flex justify-between">
      <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 justify-self-start">
        <legend class="fieldset-legend">Individual recap</legend>
        <div class="join">
          <input type="text" class="input join-item" placeholder="Username" />
          <button class="btn join-item bg-primary"><IcBaselinePersonSearch />Lookup</button>
        </div>
        <p class="label">View any player's OkayegBOT recap for 2023</p>
      </fieldset>

      <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 justify-self-end">
        <legend class="fieldset-legend">Global recap</legend>
        <button type="button" class="btn btn-primary float-start"><IcBaselinePublic />Global recap</button>
        <p class="label">Stats from all users for 2023</p>
      </fieldset>
    </div>
  </div>
</div>
