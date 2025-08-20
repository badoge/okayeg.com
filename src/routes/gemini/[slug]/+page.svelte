<script>
  import { onMount } from "svelte";
  import { relativeTime } from "$lib/functions.js";
  import { Marked } from "marked";
  import { markedHighlight } from "marked-highlight";
  import hljs from "highlight.js";
  import DOMPurify from "dompurify";

  const marked = new Marked(
    markedHighlight({
      emptyLangClass: "hljs",
      langPrefix: "hljs language-",
      highlight(code, lang, info) {
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        return hljs.highlight(code, { language }).value;
      },
    }),
  );

  let { data } = $props();
  let id = $state(parseInt(data.slug.toLowerCase().replace(/\s/g, ""), 10));
  let replyDate = $derived(new Date(id));
  let reply = $derived("loading");
  let UserAvatar = $state("/okayeg.png");

  onMount(() => {
    if (id) {
      getReply();
    }
  });

  async function getReply() {
    try {
      let response = await fetch(`https://api.okayeg.com/geminilong/${id}`);
      if (response.status !== 200) {
        reply = "error";
        return;
      }
      reply = await response.json();
      getUserAvatar();
      console.log(reply);
    } catch (error) {
      reply = "error";
      console.log(error);
    }
  }

  async function getUserAvatar() {
    try {
      let response = await fetch(`https://helper.donk.workers.dev/twitch/users?id=${reply.userid}`);
      if (response.status !== 200) {
        UserAvatar = "/okayeg.png";
        return;
      }
      let result = await response.json();
      UserAvatar = result?.data[0]?.profile_image_url || "/okayeg.png";
    } catch (error) {
      console.log(error);
      UserAvatar = "/okayeg.png";
    }
  }
</script>

<svelte:head>
  <title>Gemini command reply | OkayegBOT</title>
  <meta name="description" content="Gemini command replies for prompts that can't fit in Twitch chat" />
  <meta property="og:title" content="Gemini command reply | OkayegBOT" />
  <meta property="og:url" content="https://okayeg.com/gemini" />
  <meta property="og:description" content="Gemini command replies for prompts that can't fit in Twitch chat" />
</svelte:head>

<div class="flex justify-center mt-5">
  {#if reply?.response}
    <div class="flex flex-col w-300 p-3">
      <div class="chat chat-start">
        <div class="chat-image avatar">
          <div class="w-10 rounded-full">
            <img alt="Tailwind CSS chat bubble component" src={UserAvatar} />
          </div>
        </div>
        <div class="chat-header">
          <a class="link" href="https://twitch.tv/{reply.username}" target="_blank" rel="noopener noreferrer"> {reply.username}</a>
          <time class="text-xs opacity-50">{replyDate.toLocaleString()} ({relativeTime(Date.now() - replyDate.getTime())} ago)</time>
        </div>
        <div class="chat-bubble">{reply.prompt}</div>
      </div>
      <div class="chat chat-end">
        <div class="chat-image avatar">
          <div class="w-10 rounded-full">
            <img alt="Tailwind CSS chat bubble component" src="/okayeg.png" />
          </div>
        </div>
        <div class="chat-header">
          OkayegBOT
          <time class="text-xs opacity-50">{replyDate.toLocaleString()} ({relativeTime(Date.now() - replyDate.getTime())} ago)</time>
          <button class="btn btn-ghost btn-xs h-5" onclick={rawReply.showModal()} title="Shows the plain reply without any styling">raw reply</button>
        </div>
        <div class="chat-bubble">
          <div>{@html DOMPurify.sanitize(marked.parse(reply.response))}</div>
        </div>

        {#if reply?.images}
          <div class="chat-bubble">
            <div>{reply.images}</div>
          </div>
        {/if}
      </div>
    </div>
  {:else if reply == "loading"}
    <span class="loading loading-spinner loading-xl"></span>
  {:else if reply == "error"}
    <p>Something went wrong :(</p>
  {/if}
</div>

<dialog id="rawReply" class="modal">
  <div class="modal-box w-11/12 max-w-5xl">
    <h3 class="text-lg font-bold">Raw reply</h3>
    <p class="py-4">{reply.response}</p>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
