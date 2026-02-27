<span class={className}>{word}</span>
<script lang="ts">
  import { onMount } from 'svelte'

  const TYPE_SPEED   = 110
  const DELETE_SPEED = 70
  const PAUSE_AFTER  = 1800
  const PAUSE_BEFORE = 350

  interface Props {
    words: string[],
    class: string
  }

  /** @type {Props} */
  let {
    words,
    class: klass
  }: Props = $props()

  let word: string = $state('')

  let wordIndex: number = 0

  let charIndex: number = 0

  let deleting: boolean = false

  let className = $derived('typed-word' + (klass ? ' ' + klass : ''))

  const tick = () => {
    const currentWord = words[wordIndex]
    word = currentWord.slice(0, charIndex)

    if (deleting) {
      if (charIndex > 0) {
        charIndex--
        setTimeout(tick, DELETE_SPEED + Math.random() * 20 - 10)
      } else {
        deleting = false
        wordIndex = (wordIndex + 1) % words.length
        setTimeout(tick, PAUSE_BEFORE)
      }
    } else {
      if (charIndex < currentWord.length) {
        charIndex++
        setTimeout(tick, TYPE_SPEED + Math.random() * 40 - 20)
      } else {
        setTimeout(
          () => {
            deleting = true
            tick()
          },
          PAUSE_AFTER
        )
      }
    }
  }

  onMount(() => {
    word = words[wordIndex]
    charIndex = word.length - 1
    tick()
  })
</script>
