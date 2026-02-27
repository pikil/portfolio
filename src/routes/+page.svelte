<section id="home" class="relative z-2 min-h-screen flex items-center pt-24">
  <div class="max-w-275 mx-auto px-8 w-full pb-6">
    <div class="grid md:grid-cols-2 gap-16 items-center">
      <div>
        <p class="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-accent mb-6 opacity-0 animate-fu-1">
          // Open for work
        </p>
        <h1 class="font-display text-[clamp(3rem,6vw,5.5rem)] font-black leading-[1.05] tracking-tight opacity-0 animate-fu-2">
          Building systems<br>
          that <Typewriter words={systemWords} class="text-accent" />
        </h1>
        <p class="mt-7 text-[1.05rem] text-faded max-w-[38ch] opacity-0 animate-fu-4">
          <!-- eslint-disable-next-line max-len -->
          10+ years delivering high-impact solutions across enterprise and startup environments — from authentication systems to billing platforms to partner integrations.
        </p>
        <div class="mt-10 flex flex-wrap gap-4 opacity-0 animate-fu-5">
          <a href="#projects" class="btn btn-accent">
            View Projects
          </a>
          <a href="#contact" class="btn btn-faded">
            Get in touch &rarr;
          </a>
        </div>
      </div>
      <DeveloperInfo />
    </div>
  </div>
</section>

<hr class={separatorCss} />

<section id="about" class="py-28 relative z-2">
  <div class="max-w-275 mx-auto px-8">
    <div class="grid gap-20 items-start">
      <div class="reveal opacity-0 translate-y-8">
        <p class="font-mono text-[0.65rem] tracking-[0.25em] uppercase text-accent mb-4">// Who I am</p>
        <h2 class="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.15] mb-4">
          Solutions architect &amp; <span class="text-accent">Tech Lead</span>
        </h2>
        <p class="text-[#9e9b95] mb-5">
          <!-- eslint-disable-next-line max-len -->
          Auckland-based senior developer and software architect with 10+ years delivering high-impact solutions across enterprise and startup environments. Proven track record designing authentication systems, billing platforms, enterprise APIs, and partner integrations.
          <!-- eslint-disable-next-line max-len -->
          Deep focus on reliability, observability, and incident response — combined with strong technical foundations, practical judgment, and clear communication across product, design, and engineering teams.
        </p>
        <p class="text-[#9e9b95] mb-5">
          When I'm not writing code, you'll find me in NZ Ballroom dance community or tinkering with side projects that are inevitably too ambitious.
        </p>
        <div class="flex flex-wrap gap-2 mt-8">
          {#each skillTags as tag (tag)}
            <span
              class={tagCss}
            >{tag}</span>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>

<hr class={separatorCss} />

<section id="projects" class="py-28 relative z-2">
  <div class="max-w-275 mx-auto px-8">
    <div class="reveal opacity-0 translate-y-8" style="transition: opacity 0.7s ease, transform 0.7s ease">
      <p class="font-mono text-[0.65rem] tracking-[0.25em] uppercase text-accent mb-4">// Work &amp; Projects</p>
      <h2 class="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.15] mb-4">
        A chronology of<br>things I've been involved in
      </h2>
      <p class="text-[#9e9b95] text-[1.05rem] max-w-[55ch] mb-10">
        A selection of projects, side experiments, and work experiences — the things I am more than happy to showcase.
      </p>
    </div>
    <Timeline />
  </div>
</section>

<script lang="ts">
  import DeveloperInfo from '$ui/blocks/DeveloperInfo.svelte'
  import Timeline from '$ui/blocks/Timeline.svelte'
  import Typewriter from '$ui/components/Typewriter.svelte'
  import { onMount } from 'svelte'

  const separatorCss = 'border-faded/10 relative z-2'
  const tagCss = 'px-3 py-1 border border-edge rounded-sm font-mono text-[0.75rem]'
    + ' text-faded hover:border-accent/60 hover:text-accent transition-colors'

  const systemWords = [
    'scale',
    'matter',
    'last'
  ]

  const skillTags = [
    'JavaScript',
    'TypeScript',
    'Svelte / Vue / React',
    'PHP',
    'Node.js',
    'Python',
    'Rust',
    'CSS / Tailwind',
    'SQL / MongoDB',
    'Docker',
    'AWS',
    'CI/CD',
    'Firebase',
    'WebRTC',
    'Capacitor',
    'Electron'
  ]

  const setRevealObserver = () => {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) {
          target.classList.remove('opacity-0', 'translate-y-8')
          revealObserver.unobserve(target)
        }
      })
    }, { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el))
  }

  onMount(setRevealObserver)
</script>
