<svelte:head>
  <title>Gemini command reply | OkayegBOT</title>
  <meta name="description" content="Gemini command replies for prompts that can't fit in Twitch chat" />
  <meta property="og:title" content="Gemini command reply | OkayegBOT" />
  <meta property="og:url" content="https://okayeg.com/gemini" />
  <meta property="og:description" content="Gemini command replies for prompts that can't fit in Twitch chat" />
</svelte:head>

<div class="flex justify-center mt-5">
  <div class="flex flex-col w-300 p-5">
    <div class="chat chat-start">
      <div class="chat-image avatar">
        <div class="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src="/donk.png" />
        </div>
      </div>
      <div class="chat-header">You</div>
      <div class="chat-bubble">What is this?</div>
    </div>
    <div class="chat chat-end">
      <div class="chat-image avatar">
        <div class="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src="/okayeg.png" />
        </div>
      </div>
      <div class="chat-header">OkayegBOT</div>
      <div class="chat-bubble">
        This page shows the replies from the <kbd class="kbd">=geminiLong</kbd>/<kbd class="kbd">=GL</kbd> command. The command gives a detailed reply instead of a short one that gets posted
        in chat when using the <kbd class="kbd">=gemini</kbd> command.
      </div>
    </div>
  </div>
</div>
