<script>
  import HugeiconsUserIdVerification from "~icons/hugeicons/user-id-verification";
  import FontistoAsterisk from "~icons/fontisto/asterisk";
</script>

<svelte:head>
  <title>Age verification | OkayegBOT</title>
  <meta name="description" content="Verify your age to keep using the bot" />
  <meta property="og:title" content="Twitch user info | OkayegBOT" />
  <meta property="og:url" content="https://okayeg.com/verify" />
  <meta property="og:description" content="Verify your age to keep using the bot" />
</svelte:head>

<div class="flex justify-center mt-5">
  <div class="card card-border bg-base-200 border-primary">
    <div class="card-body">
      <h2 class="card-title font-bold"><HugeiconsUserIdVerification />OkayegBOT age verification</h2>
      <p>Due to the new laws and regulations, some users might be asked to verify their age to keep using the bot.</p>
      <p>You will receive a verification link from the bot if your age needs to be verified.</p>
      <br />
      <p class="text-end">Age verification powered by <FontistoAsterisk class="inline text-lg " />Egsona</p>
    </div>
  </div>
</div>
