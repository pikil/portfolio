<nav id="nav" class={navCss}>
  <div class="font-display text-xl">{lcName}</div>
  <div class="hidden md:flex gap-4">
    {#each links as { label, href } (href)}
      <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
      <a {href} class="btn btn-flat">{label}</a>
    {/each}
  </div>
</nav>
<script>
  import { name } from "$lib/data/const"

  const navCss = 'fixed top-0 left-0 right-0 z-100 flex justify-between items-center px-8 py-6'
    + ' border-b border-transparent backdrop-blur-2xl transition-[border-color,background,backdrop-filter]'
  const links = [
    {
      label: 'About',
      href: '#about'
    },
    {
      label: 'Projects',
      href: '#projects'
    },
    {
      label: 'Contact',
      href: '#contact'
    }
  ]
  const lcName = name.toLowerCase().replace(' ', '.')
</script>
