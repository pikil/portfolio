<div
  use:observe
  class="max-w-120 w-full text-on-surface"
>
  <!-- Title -->
  <h3 class="mb-5 text-[0.85rem] font-medium uppercase tracking-wider text-slate-400">
    {title}
  </h3>

  <!-- Badge -->
  <div
    class="mb-7 flex flex-col items-baseline gap-1.5 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] delay-300
    {visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2.5'}"
  >
    <span
      class="bg-linear-to-r from-green-400 to-emerald-300 bg-clip-text text-4xl font-extrabold leading-none tracking-tight text-transparent"
    >
      {faster}×
    </span>
    <span class="text-xs font-medium text-slate-500">faster</span>
  </div>

  <!-- Bars -->
  <div class="mb-6 flex flex-col gap-4">
    <!-- Before -->
    <div>
      <div class="mb-1.5 flex items-center justify-between">
        <span class="text-[0.8rem] font-semibold uppercase tracking-wide text-slate-400">Before</span>
        <span class="font-mono text-[0.95rem] font-bold text-red-500">
          {animatedBefore.toLocaleString()}<span class="ml-0.5 text-xs font-normal opacity-70">{unit}</span>
        </span>
      </div>
      <div class="h-2.5 w-full overflow-hidden rounded-full bg-[#1a1d2e]">
        <div
          class="h-full rounded-full bg-linear-to-r from-red-500 to-red-400 transition-[width] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style="width: {visible ? '100%' : '0%'}; transition-duration: {animationDuration}ms;"
        ></div>
      </div>
    </div>

    <!-- After -->
    <div>
      <div class="mb-1.5 flex items-center justify-between">
        <span class="text-[0.8rem] font-semibold uppercase tracking-wide text-slate-400">After</span>
        <span class="font-mono text-[0.95rem] font-bold text-green-500">
          {animatedAfter.toLocaleString()}<span class="ml-0.5 text-xs font-normal opacity-70">{unit}</span>
        </span>
      </div>
      <div class="h-2.5 w-full overflow-hidden rounded-full bg-[#1a1d2e]">
        <div
          class="h-full rounded-full bg-linear-to-r from-green-500 to-green-400 transition-[width] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style="width: {visible ? `${(after / before) * 100}%` : '0%'}; transition-duration: {animationDuration}ms;"
        ></div>
      </div>
    </div>
  </div>
</div>
<script lang="ts">
  interface Props {
    title?: string;
    before?: number;
    after?: number;
    unit?: string;
    animationDuration?: number;
  }

  let {
    title = 'Performance Improvement',
    before = 1200,
    after = 150,
    unit = 'ms',
    animationDuration = 1500
  }: Props = $props()

  let visible = $state<boolean>(false)
  let animatedBefore = $state<number>(0)
  let animatedAfter = $state<number>(0)

  const animateValue = (start: number, end: number, duration: number, callback: (_: number) => void) => {
    const startTime = performance.now()

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      callback(Math.round(start + (end - start) * eased))

      if (progress < 1)
        requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  $effect(() => {
    if (visible) {
      animateValue(0, before, animationDuration, v => (animatedBefore = v))
      animateValue(0, after, animationDuration, v => (animatedAfter = v))
    }
  })

  const faster = $derived((before / after).toFixed(1))

  const observe = (node: HTMLElement) => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visible = true
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(node)

    return {
      destroy: () => observer.disconnect()
    }
  }
</script>
