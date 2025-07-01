<script>
  let header = $state("");
  let headerspan = $state(2);
  let { children } = $props();
</script>

<table class="table table-striped">
  {#if header}
    <thead>
      <tr>
        <td colspan={headerspan} class="fs-5 fw-semibold">
          {header}
        </td>
      </tr>
    </thead>
  {/if}
  <tbody>
    {@render children()}
  </tbody>
</table>

<style>
  tbody :global(tr:first-child) {
    border-top-width: var(--bs-border-width);
  }
</style>
