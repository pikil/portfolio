<div class="filter-bar reveal hidden md:flex z-50 sticky" bind:this={stickyBar}>
  <button
    class="filter-btn"
    class:active={activeFilter === 'all'}
    onclick={() => setFilter('all')}
  >
    All projects
</button>

  {#if showFilters}
    {#each [...catMap.entries()] as [slug, { label, color }] (slug)}
      <div transition:fade>
        <button
          class="filter-btn"
          class:active={activeFilter === slug}
          style="--cat-border: {color.border}; --cat-bg: {color.bg}; --cat-text: {color.text};"
          onclick={() => setFilter(slug)}
        >
          {label}
        </button>
      </div>
    {/each}
  {:else}
    <button
      class="filter-btn refine"
      onclick={() => showFilters = true}
    >
      <span class="pr-2">Refine</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
      >
        <line x1="4"  y1="6"  x2="20" y2="6"/>
        <line x1="7"  y1="12" x2="17" y2="12"/>
        <line x1="10" y1="18" x2="14" y2="18"/>
      </svg>
    </button>
  {/if}
</div>

<div class="timeline">
  {#each visibleProjects as project (project.id)}
    <article
      id={project.id}
      class="tl-item group"
      animate:flip={{ duration: 400 }}
      in:fly={{ y: 24, duration: 380 }}
      out:fly={{ y: -10, duration: 200 }}
    >
      <div class="tl-card relative rounded-xl overflow-hidden p-7 border border-faded/20 bg-gray-900/60">
        <div class="tl-card-bar absolute h-0.5"></div>
        {#if project.video}
          <video src={project.video} class="rounded-xl mb-5" muted autoplay playsinline onended={resetVideo}></video>
        {:else if project.image}
          <img src={project.image} alt={project.title} class="tl-thumb w-full rounded-xl object-cover mb-5" />
        {:else if project.component}
          {@const [label, arg1, arg2, arg3, arg4] = project.component}
          <div class="pb-4">
            {#if label === 'perf'}
              <PerformanceIncrease title={arg1} before={parseInt(arg2)} after={parseInt(arg3)} unit={arg4} />
            {:else if label === 'seo'}
              <SeoBoost />
            {/if}
          </div>
        {/if}
        <div class="tl-badges">
          {#each project.categories as slug (slug)}
            {@const cat = catMap.get(slug)}
            {#if cat}
              <span class="cat-badge" style="border-color: {cat.color.border}; background: {cat.color.bg}; color: {cat.color.text};">
                {cat.label}
              </span>
            {/if}
          {/each}
        </div>

        <div class="tl-tags">
          {#each project.tags as tag (tag)}
            <span class="tl-tag">{tag}</span>
          {/each}
        </div>

        <h3 class="tl-title">
          <a href={'#' + project.id}>{project.title}</a>
        </h3>
        <p class="tl-desc">{project.description}</p>

        <div class="tl-links">
          {#each project.links as { href, label } (href)}
            <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
            <a {href} target="_blank" rel="noopener noreferrer noindex" class="tl-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              {label}
            </a>
          {/each}
        </div>
      </div>

      <div class="tl-spine">
        <div class="tl-dot"></div>
        <span class="tl-year z-3 py-1">{project.year}</span>
      </div>

      <div class="tl-spacer"></div>
    </article>
  {/each}
</div>
<script lang="ts">
  import { fade, fly }  from 'svelte/transition'
  import { flip } from 'svelte/animate'
  import { projects } from '$lib/data/const'
  import { SvelteMap } from 'svelte/reactivity'
  import PerformanceIncrease from '$ui/blocks/showcase/PerformanceIncrease.svelte'
  import SeoBoost from '$ui/blocks/showcase/SeoBoost.svelte'

  interface CategoryMeta {
    label: string;
    color: typeof CAT_COLORS[number];
  }

  const CAT_COLORS = [
    { border: 'rgba(96,165,250,0.35)',  bg: 'rgba(96,165,250,0.08)',  text: '#93c5fd' },
    { border: 'rgba(167,139,250,0.35)', bg: 'rgba(167,139,250,0.08)', text: '#c4b5fd' },
    { border: 'rgba(52,211,153,0.35)',  bg: 'rgba(52,211,153,0.08)',  text: '#6ee7b7' },
    { border: 'rgba(251,146,60,0.35)',  bg: 'rgba(251,146,60,0.08)',  text: '#fdba74' },
    { border: 'rgba(244,114,182,0.35)', bg: 'rgba(244,114,182,0.08)', text: '#f9a8d4' }
  ]

  const catMap = $derived.by(() => {
    const map = new SvelteMap<string, CategoryMeta>()

    projects.forEach((p) => {
      p.categories.forEach((slug, i) => {
        if (!map.has(slug))
          map.set(slug, { label: p.catLabels[i], color: CAT_COLORS[map.size % CAT_COLORS.length] })
      })
    })

    return map
  })

  let activeFilter = $state<string>('all')

  let showFilters = $state<boolean>(false)

  let sectionEl = $state<HTMLElement | null>(null)

  let stickyBar = $state<HTMLElement | null>(null)

  const visibleProjects = $derived(
    activeFilter === 'all'
      ? projects
      : projects.filter(p => p.categories.includes(activeFilter))
  )

  const setFilter = (slug: string) => {
    activeFilter = slug

    if (!sectionEl || !stickyBar)
      return

    const offset = stickyBar.offsetHeight + 73 + 16 // nav + bar + gap
    const top = sectionEl?.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }

  const resetVideo = (e: Event) => {
    const video = e.currentTarget as HTMLVideoElement

    setTimeout(() => {
      video.currentTime = 0
      video.play()
    }, 1500)
  }
</script>
<style>
  .filter-bar {
    top: 93px;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-inline: -2rem;
    padding: 0.75rem 2rem;
    margin-bottom: 2.5rem;
    background: rgba(12, 12, 14, 0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid #252528;
  }

  .filter-btn {
    padding: 0.4rem 1.1rem;
    border-radius: 2px;
    font-family: 'DM Mono', monospace;
    font-size: 0.68rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: none;
    transition: border-color 0.2s, background 0.2s, color 0.2s;
    border: 1px solid #252528;
    background-color: transparent;
    color: #6b6967;
  }

  .filter-btn.refine {
    background-color: transparent;
  }

  .filter-btn.active {
    background: var(--color-accent, #e8c97a);
    border-color: var(--color-accent, #e8c97a);
    color: #0c0c0e;
  }

  .filter-btn[style].active {
    background:   var(--cat-bg);
    border-color: var(--cat-border);
    color:        var(--cat-text);
  }
  .filter-btn:not(.active):hover {
    border-color: var(--cat-border, #8a7345);
    color:        var(--cat-text, #e8c97a);
  }

  .timeline {
    position: relative;
  }
  .timeline::before {
    content: '';
    position: absolute;
    left: 50%;
    translate: -50% 0;
    top: 0; bottom: 0;
    width: 1px;
    background: linear-gradient(to bottom, transparent, #252528 8%, #252528 92%, transparent);
    pointer-events: none;
  }

  .tl-item {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 0 2.5rem;
    margin-bottom: 4rem;
  }

  .tl-item:nth-child(odd)  .tl-card   { grid-column: 1; grid-row: 1; }
  .tl-item:nth-child(odd)  .tl-spine  { grid-column: 2; grid-row: 1; }
  .tl-item:nth-child(odd)  .tl-spacer { grid-column: 3; grid-row: 1; }

  .tl-item:nth-child(even) .tl-spacer { grid-column: 1; grid-row: 1; }
  .tl-item:nth-child(even) .tl-spine  { grid-column: 2; grid-row: 1; }
  .tl-item:nth-child(even) .tl-card   { grid-column: 3; grid-row: 1; }

  .tl-card {
    transition: transform 0.3s, box-shadow 0.3s;
  }
  .tl-item:hover .tl-card {
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
  }

  .tl-card-bar {
    position: absolute;
    inset: 0 0 auto 0;
    background: linear-gradient(90deg, #e8c97a, transparent);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .tl-item:hover .tl-card-bar { opacity: 1; }

  .tl-thumb {
    width: 100%;
    aspect-ratio: 16 / 9;
  }
  .tl-badges, .tl-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
    margin-bottom: 0.75rem;
  }
  .cat-badge {
    padding: 0.2rem 0.65rem;
    border-radius: 999px;
    border: 1px solid;
    font-family: 'DM Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .tl-tag {
    padding: 0.2rem 0.5rem;
    background: rgba(232, 201, 122, 0.08);
    border: 1px solid rgba(232, 201, 122, 0.2);
    border-radius: 2px;
    font-family: 'DM Mono', monospace;
    font-size: 0.62rem;
    letter-spacing: 0.08em;
    color: #8a7345;
  }

  .tl-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem;
    font-weight: 700;
    line-height: 1.25;
    margin-bottom: 0.5rem;
  }
  .tl-desc {
    font-size: 0.9rem;
    color: #9e9b95;
    line-height: 1.65;
  }

  .tl-links {
    display: flex;
    gap: 1rem;
    margin-top: 1.25rem;
  }
  .tl-link {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    font-family: 'DM Mono', monospace;
    font-size: 0.68rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #8a7345;
    transition: color 0.2s;
    text-decoration: none;
  }
  .tl-link:hover { color: #e8c97a; }
  .tl-link svg { width: 12px; height: 12px; }

  .tl-spine {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 1.5rem;
  }
  .tl-dot {
    position: relative;
    width: 20px; height: 20px;
    border-radius: 50%;
    background: #0c0c0e;
    border: 2px solid #8a7345;
    z-index: 2;
    transition: border-color 0.3s, transform 0.3s;
  }
  .tl-dot::after {
    content: '';
    position: absolute;
    inset: 3px;
    border-radius: 50%;
    background: #8a7345;
    transition: background 0.3s;
  }
  .tl-item:hover .tl-dot {
    border-color: #e8c97a;
    transform: scale(1.25);
  }
  .tl-item:hover .tl-dot::after { background: #e8c97a; }

  .tl-year {
    margin-top: 0.5rem;
    font-family: 'DM Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.12em;
    color: #6b6967;
  }

  @media (max-width: 768px) {
    .timeline::before { left: 18px; translate: none; }

    .tl-item {
      grid-template-columns: 40px 1fr;
      gap: 0 1.25rem;
    }

    .tl-item:nth-child(odd)  .tl-card,
    .tl-item:nth-child(even) .tl-card   { grid-column: 2; grid-row: 1; }
    .tl-item:nth-child(odd)  .tl-spine,
    .tl-item:nth-child(even) .tl-spine  { grid-column: 1; grid-row: 1; }
    .tl-item:nth-child(odd)  .tl-spacer,
    .tl-item:nth-child(even) .tl-spacer { display: none; }
  }
</style>
