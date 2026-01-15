<script>
  import { onMount } from "svelte";
</script>

<svelte:head>
  <title>OkayegBOT Yearly Recaps</title>
  <meta name="description" content="OkayegBOT Yearly Recaps" />
  <meta property="og:title" content="OkayegBOT Yearly Recaps" />
  <meta property="og:url" content="https://okayeg.com/recap" />
  <meta property="og:description" content="OkayegBOT Yearly Recaps" />
</svelte:head>

<div class="flex text-center justify-center m-3">
  <div class=" w-200 flex-col shrink">
    <h1 class="text-6xl my-6">OkayegBOT Yearly Recaps - not ready yet :)</h1>
    <p>
      Bot stats from each year. Each recap has general global stats for all players and an individual recap for each player. Recaps started in 2024 for the previous year's stats and stopped
      for a while because I was lazy :) But in 2026 I went back and made recaps for all previous years
    </p>
    <small class="opacity-60">2024 had 11 seasons only because I was busy and had to combine April and March into one season :)</small>
    <ul class="timeline timeline-vertical xl:timeline-horizontal justify-center">
      <li>
        <div class="timeline-start text-xl font-bold">2020</div>
        <div class="timeline-middle">
          <img alt="okayeg" src="/okayeg.png" class="h-8" />
        </div>
        <div class="timeline-end timeline-box bg-base-200 text-lg">
          Season 0
          <br />
          <div class="badge badge-secondary">NEW</div>
          <a class="link" href="/recap/2020">View</a>
        </div>
        <hr class="bg-primary" />
      </li>
      <li>
        <hr class="bg-primary" />
        <div class="timeline-start text-xl font-bold">2021</div>
        <div class="timeline-middle">
          <img alt="okayeg" src="/okayeg.png" class="h-8" />
        </div>
        <div class="timeline-end timeline-box bg-base-200 text-lg">
          Season 1 → 12 <br />
          <div class="badge badge-secondary">NEW</div>
          <a class="link" href="/recap/2021">View</a>
        </div>
        <hr class="bg-primary" />
      </li>
      <li>
        <hr class="bg-primary" />
        <div class="timeline-start text-xl font-bold">2022</div>
        <div class="timeline-middle">
          <img alt="okayeg" src="/okayeg.png" class="h-8" />
        </div>
        <div class="timeline-end timeline-box bg-base-200 text-lg">
          Season 13 → 24 <br />
          <div class="badge badge-secondary">NEW</div>
          <a class="link" href="/recap/2022">View</a>
        </div>
        <hr class="bg-primary" />
      </li>
      <li>
        <hr class="bg-primary" />
        <div class="timeline-start text-xl font-bold">2023</div>
        <div class="timeline-middle">
          <img alt="okayeg" src="/okayeg.png" class="h-8" />
        </div>
        <div class="timeline-end timeline-box bg-base-200 text-lg">
          Season 25 → 36
          <br />
          <a class="link" href="/recap/2023">View</a>
        </div>

        <hr class="bg-primary" />
      </li>
      <li>
        <hr class="bg-primary" />
        <div class="timeline-start text-xl font-bold">2024</div>
        <div class="timeline-middle">
          <img alt="okayeg" src="/okayeg.png" class="h-8" />
        </div>
        <div class="timeline-end timeline-box bg-base-200 text-lg">
          Season 37 → 47 <br />
          <div class="badge badge-secondary">NEW</div>
          <a class="link" href="/recap/2024">View</a>
        </div>
        <hr class="bg-primary" />
      </li>
      <li>
        <hr class="bg-primary" />
        <div class="timeline-start text-xl font-bold">2025</div>
        <div class="timeline-middle">
          <img alt="okayeg" src="/okayeg.png" class="h-8" />
        </div>
        <div class="timeline-end timeline-box bg-base-200 text-lg">
          Season 48 → 59 <br />
          <div class="badge badge-secondary">NEW</div>
          <a class="link" href="/recap/2025">View</a>
        </div>
        <hr class="bg-primary" />
      </li>
      <li>
        <hr class="bg-primary" />
        <div class="timeline-start text-xl font-bold">2026</div>
        <div class="timeline-middle">
          <img alt="loading" src="/loading.gif" class="h-8 border border-accent rounded-full" />
        </div>
        <div class="timeline-end timeline-box bg-base-200 text-lg">
          Season 60 → 71
          <br />
          <span class="opacity-60">Coming 2027</span>
        </div>
        <hr class="bg-primary" />
      </li>
      <li>
        <hr class="bg-primary" />
        <div class="timeline-start"></div>
        <div class="timeline-middle"></div>
        <div class="timeline-end"></div>
      </li>
    </ul>
  </div>
</div>
