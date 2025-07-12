import { browser } from "$app/environment"; // sveltekit environment
import { nullFunction } from "$lib/game/consts";
import AdviceFriend from "$lib/elements/AdviceFriend.svelte";
import { mount } from "svelte";

/**
 * @param {string} content
 */
export function showAdviceFriend(content, title = "") {
  if (!browser) return;

  const adviceFriend = mount(AdviceFriend, {
    props: {
      title: title,
      content: content,
    },
    target: document.body,
  });
}

/**
 * @param {string} content
 */
export function showConfirmAdviceFriend(content, buttonText = "OK", actionCallback = nullFunction) {
  if (!browser) return;

  const adviceFriend = mount(AdviceFriend, {
    props: {
      interactive: true,
      content: content,
      buttonText: buttonText,
      actionCallback: actionCallback,
    },
    target: document.body,
  });
}
