import { browser } from "$app/env";
import { today } from "#lib/game/consts.js";
import { showAdviceFriend } from "#lib/utils/adviceFriend.js";
import { sample } from "#lib/utils/common.js";

/**
 * @type {string[]}
 */
const facts = [];

/**
 * @param {Date} lastVisitDate
 */
export function dailyEggFactRequired(lastVisitDate) {
  if (!browser) return false;

  // egg facts are daily
  const params = ["getFullYear", "getMonth", "getDate"];
  // @ts-ignore
  return params.some((method) => lastVisitDate[method]() !== today[method]());
}

async function asyncLoadEggFacts() {
  if (facts.length > 0) return;

  const data = await fetch("data/egg-facts.json");

  const list = await data.json();
  if (!list.length) throw new Error("List of facts is empty!");

  facts.push(...list);
}

export function tryShowDailyEggFact() {
  asyncLoadEggFacts()
    .then(() => {
      const fact = sample(facts);
      showAdviceFriend(fact, "Daily egg fact");
    })
    .catch((e) => console.error("Failed to get egg facts", e));
}
