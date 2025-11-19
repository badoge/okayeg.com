<script>
  import IcBaselineChatBubbleOutline from "~icons/ic/baseline-chat-bubble-outline";
  import IcBaselinePowerSettingsNew from "~icons/ic/baseline-power-settings-new";

  /**
   * @typedef {Object} props - dank
   * @prop {any} commands - commands
   */

  /**
   * @type {props}
   */
  let { commands } = $props();
</script>

<table class="table">
  <thead>
    <tr>
      <th>Command</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    {#each commands as command}
      <tr>
        <td>
          <div class="flex justify-between">
            <div>
              <div class="text-lg font-bold">={command._id}</div>
              {#if command.aliases.length}
                <span class="text-xs">
                  Alias: {command.aliases
                    .map((el) => "=" + el)
                    .join(", ")
                    .replaceAll("=+", "+")}
                </span>
              {/if}
            </div>
            <div class="flex flex-col justify-evenly m-1">
              {#if command.whisperable == 1}
                <div class="tooltip" data-tip="Whisperable">
                  <IcBaselineChatBubbleOutline />
                </div>
              {/if}
              {#if command.toggleable == 1}
                <div class="tooltip" data-tip="Toggleable">
                  <IcBaselinePowerSettingsNew />
                </div>
              {/if}
            </div>
          </div>
        </td>
        <td class="text-lg">
          <p>{@html command.desc}</p>
          {#if command.enabled == 0}
            <p><span class="text-xs text-error">Command temporarily disabled</span></p>
          {/if}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
