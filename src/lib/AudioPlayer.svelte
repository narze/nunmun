<script lang="ts">

  export let src: string

  let player: HTMLAudioElement
</script>

{#if src}
  <div class="relative">
    <audio bind:this={player} {src} autoplay></audio>
  </div>
{/if}
