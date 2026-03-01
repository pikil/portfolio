<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div id="noise-div" class="fixed inset-0 z-1 pointer-events-none opacity-[0.03]"></div>

<div id="cursor" class="fixed top-0 left-0 z-9999 pointer-events-none" class:hidden={platform.is.webMobile}>
  <div
    id="cursor-ring"
    class="relative w-9 h-9 rounded-full border border-accent -translate-x-1/2 -translate-y-1/2 transition-transform duration-120"
  >
    <div class="absolute top-1/2 left-1/2 w-1.25 h-1.25 rounded-full bg-accent -translate-x-1/2 -translate-y-1/2"></div>
  </div>
</div>
<Nav />
{@render children()}

<script lang="ts">
  import './layout.css'
  import favicon from '$lib/assets/favicon.svg'
  import { onMount } from 'svelte'
  import Nav from '$ui/layout/Nav.svelte'
  import platform from '$utils/platform'

  let { children } = $props()

  const setCursor = () => {
    if (platform.is.webMobile)
      return

    const cursor = document.getElementById('cursor')
    const ring   = document.getElementById('cursor-ring')

    document.addEventListener('mousemove', ({ clientX, clientY }) => {
      if (!cursor)
        return

      cursor.style.left = clientX + 'px'
      cursor.style.top  = clientY + 'px'
    })
    document.addEventListener('mousedown', () => {
      if (ring)
        ring.style.transform = 'scale(0.75)'
    })
    document.addEventListener('mouseup',   () => {
      if (ring)
        ring.style.transform = 'scale(1)'
    })
  }

  const setOnScroll = () => {
    const nav = document.getElementById('nav')

    if (!nav)
      return

    window.addEventListener('scroll', () => {
      const { style } = nav

      if (window.scrollY > 50) {
        style.background = 'rgba(12,12,14,0.92)'
        style.backdropFilter = 'blur(12px)'
        style.borderBottomColor = '#252528'
      } else {
        style.background = ''
        style.backdropFilter = ''
        style.borderBottomColor = 'transparent'
      }
    })
  }

  const setRevealObserver = () => {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(( { isIntersecting, target } ) => {
        if (isIntersecting) {
          target.classList.remove('opacity-0', 'translate-y-8')
          revealObserver.unobserve(target)
        }
      })
    }, { threshold: 0.12 })

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el))
  }

  onMount(() => {
    setCursor()
    setOnScroll()
    setRevealObserver()
  })
</script>
