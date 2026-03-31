<script>
  import { onMount } from "svelte";
  import { page } from "$app/state";
  import { fade } from "svelte/transition";

  import HugeiconsUserIdVerification from "~icons/hugeicons/user-id-verification";
  import FontistoAsterisk from "~icons/fontisto/asterisk";
  import IcBaselineCameraAlt from "~icons/ic/baseline-camera-alt";
  import IcBaselineContentCopy from "~icons/ic/baseline-content-copy";
  import IcBaselineVerified from "~icons/ic/baseline-verified";

  let pfp = $state("/pics/okayeg.png");

  onMount(async () => {
    if (page.params.username) {
      try {
        let response = await fetch(`https://helper.donk.workers.dev/twitch/users?login=${page.params.username}`);
        let user = await response.json();
        pfp = user?.data?.[0]?.profile_image_url;
      } catch (error) {
        console.log(error);
      }
    }
  });

  function enableCamera() {
    document.getElementById("enable_cam_div").style.display = "none";
    document.getElementById("loading_div").style.display = "";

    setTimeout(() => {
      document.getElementById("loading_div").style.display = "none";
      document.getElementById("cam_div").style.display = "";
    }, 1500);

    setInterval(() => {
      if (Math.random() > 0.6) {
        document.getElementById("defaultpic").src = "/verifypics/default_blink.png";
        document.getElementById("leftpic").src = "/verifypics/left_blink.png";
        document.getElementById("frontpic").src = "/verifypics/front_blink.png";
        document.getElementById("rightpic").src = "/verifypics/right_blink.png";

        setTimeout(() => {
          document.getElementById("defaultpic").src = "/verifypics/default.png";
          document.getElementById("leftpic").src = "/verifypics/left.png";
          document.getElementById("frontpic").src = "/verifypics/front.png";
          document.getElementById("rightpic").src = "/verifypics/right.png";
        }, 100);
      }
    }, 2000);
  }

  let rightProgress = $state(0);
  let leftProgress = $state(0);
  let frontProgress = $state(0);

  let check1 = $state();
  let check2 = $state();
  let check3 = $state();

  function countUp(pic) {
    switch (pic) {
      case "right":
        if (rightProgress >= 100) {
          break;
        }
        rightProgress++;
        break;
      case "left":
        if (leftProgress >= 100) {
          break;
        }
        leftProgress++;
        break;
      case "front":
        if (frontProgress >= 100) {
          break;
        }
        frontProgress++;
        break;
      default:
        break;
    }
  }

  function copy() {
    let input = document.getElementById("code");

    input.select();
    input.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(input.value);
  }
</script>

<svelte:head>
  <title>Age verification - {page.params.username} | OkayegBOT</title>
  <meta name="description" content="Verify your age to keep using the bot" />
  <meta property="og:title" content="Twitch user info | OkayegBOT" />
  <meta property="og:url" content="https://okayeg.com/verify" />
  <meta property="og:description" content="Verify your age to keep using the bot" />
</svelte:head>

<dialog id="code_modal" class="modal">
  <div class="modal-box">
    <h3 class="text-lg font-bold">Verification code</h3>

    <div class="text-xl">Use the verification command with your verification code in chat to get verified</div>
    <br />
    <div class="flex flex-col gap-1 mb-3">
      <label class="label">
        <input type="checkbox" class="checkbox" bind:checked={check1} />
        Allow my face to be used for AI training
      </label>
      <label class="label">
        <input type="checkbox" class="checkbox" bind:checked={check2} />
        Allow my data to be leaked in the August 2026 data breach
      </label>
      <label class="label">
        <input type="checkbox" class="checkbox" bind:checked={check3} />
        I have read and agree to the <a class="link" href="/privacy" target="_blank">Privacy Policy</a>
      </label>
    </div>

    <div class="flex flex-col">
      <div class="join">
        <input
          id="code"
          type="text"
          class="input input-accent join-item"
          value="=verify {!check1 || !check2 || !check3 ? '???' : crypto.randomUUID()}"
          disabled={!check1 || !check2 || !check3}
          readonly
        />
        <button onclick={copy} class="btn btn-accent join-item" disabled={!check1 || !check2 || !check3}><IcBaselineContentCopy /></button>
      </div>
      <div class="opacity-80">Accept the terms of service to get your verification code</div>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>

<div class="flex justify-center mt-5">
  <div class="card card-border bg-base-300 mb-50">
    <div class="card-body">
      <h2 class="card-title font-bold"><HugeiconsUserIdVerification />OkayegBOT age verification</h2>

      <div class="card card-side bg-base-200 h-30 mx-10 shadow-sm">
        <figure>
          <div class="avatar">
            <div class="rounded-full">
              <img src={pfp} alt="pfp" />
            </div>
          </div>
        </figure>
        <div class="card-body">
          <h2 class="card-title">Welcome {page.params.username}!</h2>
          <p>Due to the new laws and regulations, you will need to verify your age to keep using the bot.</p>
          <p>Please complete the verification process below.</p>
        </div>
      </div>

      <div class="card card-border bg-base-100 min-h-100 shadow-sm">
        <div class="card-body">
          <div id="enable_cam_div" class="self-center my-auto">
            <button class="btn btn-xl btn-success" onclick={enableCamera}><IcBaselineCameraAlt />Enable Camera</button>
          </div>

          <div style="display: none;" id="loading_div" class="self-center my-auto">
            <span class="loading loading-xl loading-spinner text-secondary"></span>
          </div>

          <div transition:fade id="cam_div" style="display: none;" class="self-center my-auto flex flex-col gap-3">
            <figure class="hover-gallery max-w-100">
              <img id="defaultpic" src="/verifypics/default.png" alt="default" onmousemove={() => countUp("default")} />
              <img id="leftpic" src="/verifypics/left.png" alt="left" onmousemove={() => countUp("left")} />
              <img id="frontpic" src="/verifypics/front.png" alt="front" onmousemove={() => countUp("front")} />
              <img id="rightpic" src="/verifypics/right.png" alt="right" onmousemove={() => countUp("right")} />
            </figure>

            <div class="flex flex-inline gap-3 justify-between place-items-center">
              <div class="text-2xl">Look to the right</div>
              <div class="radial-progress bg-primary text-primary-content border-primary border-2" style="--value:{rightProgress};" aria-valuenow={rightProgress} role="progressbar">
                {rightProgress == 100 ? "☑" : rightProgress + "%"}
              </div>
            </div>
            <div class="flex flex-inline gap-3 justify-between place-items-center">
              <div class="text-2xl">Look to the left</div>
              <div class="radial-progress bg-primary text-primary-content border-primary border-2" style="--value:{leftProgress};" aria-valuenow={leftProgress} role="progressbar">
                {leftProgress == 100 ? "☑" : leftProgress + "%"}
              </div>
            </div>
            <div class="flex flex-inline gap-3 justify-between place-items-center">
              <div class="text-2xl">Look at the camera</div>
              <div class="radial-progress bg-primary text-primary-content border-primary border-2" style="--value:{frontProgress};" aria-valuenow={frontProgress} role="progressbar">
                {frontProgress == 100 ? "☑" : frontProgress + "%"}
              </div>
            </div>

            {#if rightProgress >= 100 && leftProgress >= 100 && frontProgress >= 100}
              <div transition:fade class="text-center bg-base-300 border border-success rounded-xl p-3">
                <div class="text-2xl">Verification complete!</div>
                <br />
                <div class="text-lg">Estimated age: {Math.ceil(Math.random() * 20) + 50}</div>
                <br />
                <button class="btn btn-accent" onclick={code_modal.showModal()}><IcBaselineVerified />Get verification code</button>
              </div>
            {/if}
          </div>
        </div>
      </div>

      <br />
      <p class="text-end">Age verification powered by <FontistoAsterisk class="inline text-lg " />Egsona</p>
    </div>
  </div>
</div>
