import { browser } from "$app/environment"; // sveltekit environment
import { nullFunction } from "$lib/game/consts";
import AdviceFriend from "$lib/elements/AdviceFriend.svelte";
import { mount } from "svelte";

/**
 * @param {string} content
 */
export function showAdviceFriend(content, title = "") {
  if (!browser) return;

  if (title) {
    content = `<span class="text-lg font-bold">${title}</span><br>${content}`;
  }

  const adviceFriend = mount(AdviceFriend, {
    props: {
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

  content = `
  <span class="text-lg font-bold">
    ${content}
  <span>
  <br>
  <button class="btn btn-warning">${buttonText}</button>`;

  const adviceFriend = mount(AdviceFriend, {
    props: {
      interactive: true,
      content: content,
    },
    target: document.body,
  });
}
