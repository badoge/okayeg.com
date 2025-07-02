<script>
  import { dev as devMode, version } from "$app/environment";
  import game, { forceUpdateDOM } from "$lib/utils/state";
  import { settingsLibrary, cellColors } from "$lib/game/consts";
  import DevModeButtons from "$lib/elements/DevModeButtons.svelte";

  /**
   * @param {{ currentTarget: { dataset: { optionkey: any; }; checked: any; }; }} event
   */
  function updateExternalOption(event) {
    const key = event.currentTarget.dataset.optionkey;
    const value = Boolean(event.currentTarget.checked);
    $game.setOption(key, value);
    forceUpdateDOM();
  }

  /**
   * @param {{ currentTarget: { dataset: { optionkey: any; }; value: string; }; }} event
   */
  function updateExternalOptionSelector(event) {
    const key = event.currentTarget.dataset.optionkey;
    const value = parseInt(event.currentTarget.value, 10); // record the index
    $game.setOption(key, value);
    forceUpdateDOM();
  }

  /**
   * @param {EventTarget & HTMLSelectElement} eventTarget
   * @param {number} callerIndex
   */
  function doSetCellColor(eventTarget, callerIndex) {
    // useful for binary game mode, where there are two dropdowns with colors
    const anotherIndex = Math.abs(callerIndex - 1);
    if ($game.settings.colors[anotherIndex] === eventTarget.value) {
      // swap colors, disallow picking same color
      $game.settings.colors[anotherIndex] = $game.settings.colors[callerIndex];
    }
    $game.settings.colors[callerIndex] = eventTarget.value;
    $game.setOption("colors", $game.settings.colors);
  }
</script>

<div class="option-block">
  {#if $game}
    {#each Object.keys($game.settings) as key}
      {@const lib = settingsLibrary[$game.id][key]}
      {@const disabled = $game.disabledSettings.has(key)}

      {#if lib.type === "color_multiselect"}
        <hr />
        <div class="flex my-2">
          <div class="flex-grow-1">
            <p class="text-lg font-bold">{lib.title}</p>
            <p class="text-xs" class:disabled>
              {disabled ? lib.error : lib.desc}
            </p>
          </div>
          <div class="flex gap-1">
            {#each $game.settings[key] as color, colorIndex}
              <select class="select" style:border-color={color} style:color value={color} onchange={(event) => doSetCellColor(event.currentTarget, colorIndex)}>
                {#each Object.keys(cellColors) as colorOption}
                  <option value={colorOption} style:background-color={cellColors[colorOption]}>
                    {colorOption}
                  </option>
                {/each}
              </select>
            {/each}
          </div>
        </div>
      {:else if lib.type === "dropdown"}
        <hr />
        <div class="mt-5">
          <div class="flex flex-row align-items-center">
            <label class="text-lg flex-grow-1" for={"opt_" + key}>{lib.title}</label>
            <select class="select w-auto flex-grow-1" id={"opt_" + key} value={$game.settings[key]} {disabled} data-optionkey={key} onchange={updateExternalOptionSelector}>
              {#each $game.options[key] as optionText, optionIndex}
                <option value={optionIndex}>{optionText}</option>
              {/each}
            </select>
          </div>
          <div>
            <p class="text-xs" class:disabled>
              {disabled ? lib.error : lib.desc}
            </p>
          </div>
        </div>
      {:else}
        <label class="label text-base-content mt-3">
          <input id={"opt_" + key} type="checkbox" class="checkbox" checked={$game.settings[key]} {disabled} data-optionkey={key} onchange={updateExternalOption} />
          {lib.title}
        </label>
        <p class="text-xs mb-3">{disabled ? lib.error : lib.desc}</p>
      {/if}
    {/each}
  {:else}
    <div class="mt-2 italic text-center text-primary">Options will be available after you choose a game</div>
    <div class="opacity-50 text-xs mt-20 text-center">
      <hr />
      Build version:<strong>{version}</strong>
    </div>
  {/if}

  {#if devMode}
    <div class="divider text-xl">Developer mode options</div>
    <DevModeButtons />
  {/if}
</div>
