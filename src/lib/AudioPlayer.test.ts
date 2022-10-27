import "@testing-library/jest-dom"

import { render } from "@testing-library/svelte"

import AudioPlayer from "./AudioPlayer.svelte"

it("works", () => {
  const { component } = render(AudioPlayer, {
    src: "https://tts-api.vercel.app/api/tts?text=%E0%B8%97%E0%B8%94%E0%B8%AA%E0%B8%AD%E0%B8%9A&lang=th-TH"
  })

  expect(component).toBeDefined()
})
