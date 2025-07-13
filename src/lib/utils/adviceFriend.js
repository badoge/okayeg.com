import { browser } from "$app/environment"; // sveltekit environment
import { nullFunction } from "$lib/game/consts";
import { mount } from "svelte";
import AdviceFriend from "$lib/elements/AdviceFriend.svelte";

function mountAdviceFriend(content, title, buttonText, actionCallback = nullFunction) {
  if (!browser) return;

  const adviceFriend = mount(AdviceFriend, {
    props: {
      title,
      content,
      buttonText,
      interactive: actionCallback && actionCallback !== nullFunction,
      actionCallback,
    },
    target: document.body,
  });

  return adviceFriend;
}

/**
 * @param {string} content
 * @param {string} title
 * @returns {AdviceFriend}
 */
export function showAdviceFriend(content, title = "") {
  return mountAdviceFriend(content, title, null, null);
}

/**
 * @param {string} content
 * @param {string} buttonText
 * @param {Function} actionCallback
 * @returns {AdviceFriend}
 */
export function showConfirmAdviceFriend(content, buttonText = "OK", actionCallback = nullFunction) {
  return mountAdviceFriend(content, null, buttonText, actionCallback);
}
