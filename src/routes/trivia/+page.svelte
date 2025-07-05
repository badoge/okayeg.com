<script>
  let categories = [
    "1930s",
    "1940s",
    "1950s",
    "1960s",
    "1970s",
    "1980s",
    "1990s",
    "2000s",
    "acronyms",
    "actors",
    "animals",
    "artist",
    "astronomy",
    "astrology",
    "author",
    "band",
    "biology",
    "births",
    "classical",
    "comics",
    "fashion",
    "film",
    "football",
    "food",
    "games",
    "geography",
    "history",
    "jeopardy",
    "literature",
    "meaning",
    "music",
    "names",
    "olympics",
    "on this day",
    "phobias",
    "quotes",
    "religion",
    "science",
    "scramble",
    "song",
    "sports",
    "terms",
    "tv",
    "unscramble",
    "words",
    "years",
  ];
</script>

<svelte:head>
  <title>Trivia categories | OkayegBOT</title>
  <meta name="description" content="OkayegBOT trivia categories" />
  <meta property="og:title" content="OkayegBOT" />
  <meta property="og:url" content="https://okayeg.com/trivia" />
  <meta property="og:description" content="OkayegBOT trivia categories" />
</svelte:head>

<div class="flex justify-center">
  <div class="prose lg:prose-xl m-10">
    <h2>Trivia categories</h2>
    <div class="m-1">
      {#each categories as category}
        <div class="badge badge-neutral badge-xl m-1">{category}</div>
      {/each}
    </div>
    <h3>How to use</h3>
    <p>Pick only 1 of the categories above to get a question from that category</p>
    <p>Example: <kbd class="kbd">=trivia music</kbd></p>
    <p>If you don't provide a category a random one will be picked</p>
    <aside class="text-sm">Some questions don't have a set category, so the only way to get them is to not provide a category when using the command</aside>

    <img src="/nerd.png" class="w-30 m-auto" alt="okayeg nerd" />
  </div>
</div>
