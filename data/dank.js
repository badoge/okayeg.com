const fs = require("fs");

let s24 = JSON.parse(fs.readFileSync("24.json"));
let s25 = JSON.parse(fs.readFileSync("25.json"));
let s26 = JSON.parse(fs.readFileSync("26.json"));
let s27 = JSON.parse(fs.readFileSync("27.json"));
let s28 = JSON.parse(fs.readFileSync("28.json"));
let s29 = JSON.parse(fs.readFileSync("29.json"));
let s30 = JSON.parse(fs.readFileSync("30.json"));
let s31 = JSON.parse(fs.readFileSync("31.json"));
let s32 = JSON.parse(fs.readFileSync("32.json"));
let s33 = JSON.parse(fs.readFileSync("33.json"));
let s34 = JSON.parse(fs.readFileSync("34.json"));
let s35 = JSON.parse(fs.readFileSync("35.json"));

let seasons = [s24, s25, s26, s27, s28, s29, s30, s31, s32, s33, s34, s35];
let users = [];

for (let i = 0; i < seasons.length; i++) {
  const season = seasons[i];
  let seasonNumber = 24 + i;

  for (let j = 0; j < season.length; j++) {
    const user = season[j];
    const k = users.findIndex((e) => e._id === user._id);

    if (
      !user.egs &&
      !user.eguses &&
      !user.egseaten &&
      !user.uses &&
      !user.coinflips &&
      !user.coinflipwins &&
      !user.biggestcoinflipwin &&
      !user.biggestcoinfliploss &&
      !user.plus &&
      !user.zero &&
      !user.negative &&
      !user.lotteryjoins &&
      !user.lotterywins &&
      !user.egsgiven &&
      !user.egsreceived &&
      !user.shungite &&
      !user.chicken &&
      !user.bajcoin &&
      !user.copium &&
      !user.trivia &&
      !user.duels &&
      !user.duelswon &&
      !user.biggestduelwin &&
      !user.biggestduelloss &&
      !user.roulettes &&
      !user.rouletteswon &&
      !user.biggestroulettewin &&
      !user.biggestrouletteloss
    ) {
      continue;
    }

    if (k > -1) {
      users[k].username = user.username;
      users[k].egs += user.egs;
      users[k].eguses += user.eguses;
      users[k].egseaten += user.egseaten;
      users[k].uses += user.uses;
      users[k].coinflips += user.coinflips;
      users[k].coinflipwins += user.coinflipwins;
      users[k].biggestcoinflipwin = user.biggestcoinflipwin > users[k].biggestcoinflipwin ? user.biggestcoinflipwin : users[k].biggestcoinflipwin;
      users[k].biggestcoinfliploss = user.biggestcoinfliploss > users[k].biggestcoinfliploss ? user.biggestcoinfliploss : users[k].biggestcoinfliploss;
      users[k].plus += user.plus;
      users[k].zero += user.zero;
      users[k].negative += user.negative;
      users[k].lotteryjoins += user.lotteryjoins;
      users[k].lotterywins += user.lotterywins;
      users[k].egsgiven += user.egsgiven;
      users[k].egsreceived += user.egsreceived;
      users[k].shungite += user.shungite;
      users[k].chicken += user.chicken;
      users[k].bajcoin += user.bajcoin;
      users[k].copium += user.copium;
      users[k].trivia += user.trivia || 0; //new fields that are not in early seasons so set to 0 if null
      users[k].duels += user.duels || 0;
      users[k].duelswon += user.duelswon || 0;
      users[k].biggestduelwin = user.biggestduelwin > users[k].biggestduelwin ? user.biggestduelwin : users[k].biggestduelwin;
      users[k].biggestduelloss = user.biggestduelloss > users[k].biggestduelloss ? user.biggestduelloss : users[k].biggestduelloss;
      users[k].roulettes += user.roulettes || 0;
      users[k].rouletteswon += user.rouletteswon || 0;
      users[k].biggestroulettewin = user.biggestroulettewin > users[k].biggestroulettewin ? user.biggestroulettewin : users[k].biggestroulettewin;
      users[k].biggestrouletteloss = user.biggestrouletteloss > users[k].biggestrouletteloss ? user.biggestrouletteloss : users[k].biggestrouletteloss;
      users[k].seasons.push(seasonNumber);
    } else {
      users.push({
        _id: user._id,
        username: user.username,
        egs: user.egs,
        eguses: user.eguses,
        egseaten: user.egseaten,
        uses: user.uses,
        coinflips: user.coinflips,
        coinflipwins: user.coinflipwins,
        biggestcoinflipwin: user.biggestcoinflipwin,
        biggestcoinfliploss: user.biggestcoinfliploss,
        plus: user.plus,
        zero: user.zero,
        negative: user.negative,
        lotteryjoins: user.lotteryjoins,
        lotterywins: user.lotterywins,
        egsgiven: user.egsgiven,
        egsreceived: user.egsreceived,
        shungite: user.shungite,
        chicken: user.chicken,
        bajcoin: user.bajcoin,
        copium: user.copium,
        trivia: user.trivia || 0, //new fields that are not in early seasons so set to 0 if null
        duels: user.duels || 0,
        duelswon: user.duelswon || 0,
        biggestduelwin: user.biggestduelwin || 0,
        biggestduelloss: user.biggestduelloss || 0,
        roulettes: user.roulettes || 0,
        rouletteswon: user.rouletteswon || 0,
        biggestroulettewin: user.biggestroulettewin || 0,
        biggestrouletteloss: user.biggestrouletteloss || 0,
        seasons: [seasonNumber],
      });
    }
  }
}

let global = {
  users: 0,
  egs: 0,
  eguses: 0,
  egseaten: 0,
  uses: 0,
  coinflips: 0,
  coinflipwins: 0,
  plus: 0,
  zero: 0,
  negative: 0,
  lotteryjoins: 0,
  egsgiven: 0,
  egsreceived: 0,
  shungite: 0,
  chicken: 0,
  bajcoin: 0,
  copium: 0,
  trivia: 0,
  duels: 0,
  roulettes: 0,
  rouletteswon: 0,
  allSeasons: 0,

  egsArray: [],
  egusesArray: [],
  egseatenArray: [],
  usesArray: [],
  lotteryjoinsArray: [],
  lotterywinsArray: [],
  coinflipwinsArray: [],
  shungiteArray: [],
  chickenArray: [],
  bajcoinArray: [],
  copiumArray: [],
  triviaArray: [],
  duelswonArray: [],
  biggestduelwinArray: [],
  biggestduellossArray: [],
  rouletteswonArray: [],
};

for (let index = 0; index < users.length; index++) {
  global.users++;
  global.egs += users[index].egs;
  global.eguses += users[index].eguses;
  global.egseaten += users[index].egseaten;
  global.uses += users[index].uses;
  global.coinflips += users[index].coinflips;
  global.coinflipwins += users[index].coinflipwins;
  global.plus += users[index].plus;
  global.zero += users[index].zero;
  global.negative += users[index].negative;
  global.lotteryjoins += users[index].lotteryjoins;
  global.egsgiven += users[index].egsgiven;
  global.egsreceived += users[index].egsreceived;
  global.shungite += users[index].shungite;
  global.chicken += users[index].chicken;
  global.bajcoin += users[index].bajcoin;
  global.copium += users[index].copium;
  global.trivia += users[index].trivia;
  global.duels += users[index].duels;
  global.roulettes += users[index].roulettes;
  global.rouletteswon += users[index].rouletteswon;

  global.egsArray.push(users[index].egs);
  global.egusesArray.push(users[index].eguses);
  global.egseatenArray.push(users[index].egseaten);
  global.usesArray.push(users[index].uses);
  global.lotteryjoinsArray.push(users[index].lotteryjoins);
  global.lotterywinsArray.push(users[index].lotterywins);
  global.coinflipwinsArray.push(users[index].coinflipwins);
  global.shungiteArray.push(users[index].shungite);
  global.chickenArray.push(users[index].chicken);
  global.bajcoinArray.push(users[index].bajcoin);
  global.copiumArray.push(users[index].copium);
  global.triviaArray.push(users[index].trivia);
  global.duelswonArray.push(users[index].duelswon);
  global.biggestduelwinArray.push(users[index].biggestduelwin);
  global.biggestduellossArray.push(users[index].biggestduelloss);
  global.rouletteswonArray.push(users[index].rouletteswon);

  sortAndClean(global.egsArray);
  sortAndClean(global.egusesArray);
  sortAndClean(global.egseatenArray);
  sortAndClean(global.usesArray);
  sortAndClean(global.lotteryjoinsArray);
  sortAndClean(global.lotterywinsArray);
  sortAndClean(global.coinflipwinsArray);
  sortAndClean(global.shungiteArray);
  sortAndClean(global.chickenArray);
  sortAndClean(global.bajcoinArray);
  sortAndClean(global.copiumArray);
  sortAndClean(global.triviaArray);
  sortAndClean(global.duelswonArray);
  sortAndClean(global.biggestduelwinArray);
  sortAndClean(global.biggestduellossArray);
  sortAndClean(global.rouletteswonArray);

  if (users[index].seasons.length == 12) {
    global.allSeasons++;
  }
}

fs.writeFileSync("usersrecap.json", JSON.stringify(users));
fs.writeFileSync("globalrecap.json", JSON.stringify(global));

function sortAndClean(array) {
  for (let index = 0; index < array.length; index++) {
    if (array[index] <= 0) {
      array.splice(index, 1);
    }
  }

  array.sort(function (a, b) {
    return b - a;
  });
} //sortAndClean
