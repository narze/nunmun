<script lang="ts">
  import { Facebook, Twitter, Reddit, LinkedIn } from "svelte-share-buttons-component"

  export let url: string
  export let title: string
</script>

{#if url}
  <div
    class="flex gap-2 pr-4 sm:pr-0 justify-end sm:justify-center w-full fixed top-4 sm:top-auto sm:bottom-4 center"
  >
    <Facebook class="h-10 w-10 rounded-lg" {url} />
    <Twitter class="h-10 w-10 rounded-lg" text={title} {url} />
    <Reddit class="h-10 w-10 rounded-lg" {title} {url} />
    <LinkedIn class="h-10 w-10 rounded-lg" {url} />
  </div>
{/if}
