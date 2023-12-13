<script lang="ts">
  import "twind/shim"
  import Head from "./lib/Head.svelte"
  import Kofi from "./lib/Kofi.svelte"
  import Menu from "./lib/Menu.svelte"
  import Social from "./lib/Social.svelte"
  import AudioPlayer from "./lib/AudioPlayer.svelte"

  let nowPos = Number(location.hash.slice(1, location.hash.length))
  let listLength = Infinity;

  const url = `https://nunmun.vercel.app/#${nowPos}`
  const title = "นั่นมัน....!"

  const menuItems = [{ name: "Github", url: "https://github.com/narze/nunmun" }]

  const description = "Build a single page app with Svelte, quickly."
  const imageUrl = "https://raw.githubusercontent.com/narze/timelapse/main/projects/nunmun_home.png"
  const gtagId = null

  if (!location.hash || location.hash === "#") {
    location.href = "#1"
  }

  async function main() {
    const data = await fetch("https://raw.githubusercontent.com/narze/nunmun/main/README.md")
    const text = await data.text()
    const list: string[] = []

    for (const line of text.split("\n")) {
      if (line.includes("# Contribution")) {
        break
      }
  
      if (/(- .*)/.test(line)) {
        list.push(line)
      }
    }

    let position = 2
    const nunmunConfig = [
      {
        title: "นั่นมัน....!",
        question: "ที่เป็นปลากรายน่ะเหรอ?",
        pos: 1,
      },
    ]

    list.forEach((line) => {
      let nunmun = line.match(/(?:- (.*!) (.*(?:\?|.*)))/)
      position += 1
      if (nunmun) {
        nunmunConfig.push({ title: nunmun[1], question: nunmun[2], pos: position })
      }
    })
    listLength = nunmunConfig.length;
    return nunmunConfig
  }

  let list = main()

  function prev() {
    location.href = nowPos === 1 || !nowPos ? "#1" : `#${nowPos - 1}`
  }
  async function next() {
    location.href =
      nowPos + 1 > (await list).length ? `#${nowPos}` : !nowPos ? "#1" : `#${nowPos + 1}`
  }

  window.addEventListener("hashchange", async () => {
    if (location.hash === "#") {
      location.href = "#1"
    }
    nowPos = parseInt(location.hash.slice(1, location.hash.length))
    list = main()
  })
</script>

<link href="https://fonts.googleapis.com/css2?family=Sarabun&display=swap" rel="stylesheet" />

<Kofi name="narze" label="Support Me" />
<Menu items={menuItems} />
<Social {url} {title} />
<Head {title} {description} {url} {imageUrl} {gtagId} />

<main class="h-screen grid place-items-center">
  <div class="max-w-lg w-full">
    {#await list}
      <h1 class="title m-4 text-5xl md:text-7xl text-black font-bold text-center">...</h1>
      <p class="description m-4 text-xl md:text-3xl text-black text-center">...</p>
      <div class="relative max-w-lg">
        <button
          on:click={() => prev()}
          class="absolute shadow-lg left-0 px-4 py-2 border border-black bg-blue-600 rounded-lg hover:bg-blue-700 text-white transition duration-200 ease-in-out"
          >ก่อนหน้า</button
        >
        <button
          on:click={() => next()}
          class="absolute shadow-lg right-0 px-4 py-2 border border-black bg-blue-600 rounded-lg hover:bg-blue-700 text-white transition duration-200 ease-in-out"
          >ถัดไป</button
        >
      </div>
    {:then value}
      {#if value[nowPos - 1]}
        <h1 class="title m-4 text-5xl md:text-7xl text-black font-bold text-center">
          <a href="#{value[nowPos - 1].pos}">{value[nowPos - 1].title}</a>
        </h1>
        <p class="description m-4 text-xl md:text-3xl text-black text-center">
          {value[nowPos - 1].question}
        </p>
        <AudioPlayer
          src="https://tts-api.vercel.app/api/tts?lang=th-TH&text={value[nowPos - 1].title} {value[nowPos - 1].question}"
        />
      {:else}
        <h1 class="title m-4 text-5xl md:text-7xl text-black font-bold text-center">...</h1>
        <p class="description m-4 text-xl md:text-3xl text-black text-center">...</p>
      {/if}
      <div class="relative max-w-lg">
        <button
          disabled={nowPos === 1}
          on:click={() => prev()}
          class="absolute shadow-lg left-0 px-4 py-2 border border-black bg-blue-600 rounded-lg hover:bg-blue-700 text-white transition duration-200 ease-in-out disabled:opacity-50"
          >ก่อนหน้า</button
        >
        <button
          disabled={nowPos === listLength}
          on:click={() => next()}
          class="absolute shadow-lg right-0 px-4 py-2 border border-black bg-blue-600 rounded-lg hover:bg-blue-700 text-white transition duration-200 ease-in-out disabled:opacity-50"
          >ถัดไป</button
        >
      </div>
    {/await}
  </div>
</main>

<style>
  :root {
    font-family: "Sarabun", sans-serif;
  }
  button:focus {
    outline: none;
  }
  .title,
  .description {
    animation: popIn 0.4s cubic-bezier(0.68, -0.6, 0.32, 1.6) forwards;
  }

  @keyframes popIn {
    0% {
      transform: scale(0.6);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
