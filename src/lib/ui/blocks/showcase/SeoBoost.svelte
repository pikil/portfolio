<div
  use:observe
  class="w-full max-w-145 overflow-hidden rounded-2xl text-on-surface"
>
  <!-- Header -->
  <div class="flex items-start justify-between pt-7 pb-2">
    <div>
      <h3 class="text-lg font-semibold text-slate-100">{title}</h3>
      <p class="mt-0.5 text-sm text-slate-500">{subtitle}</p>
    </div>

    <div
      class="flex flex-col items-end transition-all duration-700 delay-500
      {visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}"
    >
      <span
        class="bg-linear-to-r from-green-400 to-emerald-300 bg-clip-text text-4xl font-extrabold leading-none tracking-tight text-transparent"
      >
        {metric}
      </span>
      <span class="mt-1 text-xs font-medium text-slate-500">growth</span>
    </div>
  </div>

  <div class="relative pt-2 pb-0">
    <svg
      viewBox="0 0 {W} {H + 30}"
      class="w-full"
      preserveAspectRatio="none"
    >
      <defs>
        <!-- Area gradient -->
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#22c55e" stop-opacity="0.3" />
          <stop offset="100%" stop-color="#22c55e" stop-opacity="0" />
        </linearGradient>

        <!-- Before area gradient (muted) -->
        <linearGradient id="areaGradBefore" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#94a3b8" stop-opacity="0.1" />
          <stop offset="100%" stop-color="#94a3b8" stop-opacity="0" />
        </linearGradient>

        <!-- Clip for animation reveal -->
        <clipPath id="revealClip">
          <rect x="0" y="0" width={W * chartProgress} height={H + 30} />
        </clipPath>

        <!-- Split clips -->
        <clipPath id="beforeClip">
          <rect x="0" y="0" width={splitX} height={H + 30} />
        </clipPath>

        <clipPath id="afterClip">
          <rect x={splitX} y="0" width={W - splitX} height={H + 30} />
        </clipPath>

        <!-- Glow filter -->
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <!-- Grid lines -->
      {#each [0.25, 0.5, 0.75] as tick, i (i)}
        <line
          x1={padX}
          y1={getY(tick)}
          x2={W}
          y2={getY(tick)}
          stroke="white"
          stroke-opacity="0.04"
          stroke-dasharray="4 4"
        />
      {/each}

      <g clip-path="url(#revealClip)">
        <!-- Before area -->
        <path
          d={areaPath}
          fill="url(#areaGradBefore)"
          clip-path="url(#beforeClip)"
        />

        <!-- After area -->
        <path
          d={areaPath}
          fill="url(#areaGrad)"
          clip-path="url(#afterClip)"
        />

        <!-- Before line -->
        <path
          d={linePath}
          fill="none"
          stroke="#64748b"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          clip-path="url(#beforeClip)"
        />

        <!-- After line (green, glowing) -->
        <path
          d={linePath}
          fill="none"
          stroke="#22c55e"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
          clip-path="url(#afterClip)"
          filter="url(#glow)"
        />

        <!-- Inflection point dot -->
        <circle
          cx={getX(splitIndex)}
          cy={getY(points[splitIndex])}
          r="5"
          fill="#0f111a"
          stroke="#22c55e"
          stroke-width="2.5"
        />

        <!-- End point dot -->
        <circle
          cx={getX(points.length - 1)}
          cy={getY(points[points.length - 1])}
          r="4"
          fill="#22c55e"
        />
      </g>

      <!-- Split line (dashed) -->
      <line
        x1={splitX}
        y1={padY}
        x2={splitX}
        y2={H}
        stroke="white"
        stroke-opacity="0.1"
        stroke-dasharray="4 4"
        class="transition-opacity duration-500 delay-700"
        opacity={visible ? 1 : 0}
      />

      <!-- Before / After labels -->
      <text
        x={splitX - 12}
        y={H + 24}
        text-anchor="end"
        class="text-[11px] font-medium"
        fill="#64748b"
        opacity={visible ? 1 : 0}
      >
        {beforeLabel}
      </text>
      <text
        x={splitX + 12}
        y={H + 24}
        text-anchor="start"
        class="text-[11px] font-semibold"
        fill="#4ade80"
        opacity={visible ? 1 : 0}
      >
        {afterLabel}
      </text>

      <!-- Month labels -->
      {#each months as month, i (i)}
        {#if i % 2 === 0}
          <text
            x={getX(i)}
            y={H + 24}
            text-anchor="middle"
            class="text-[9px]"
            fill="#475569"
          >
            {month}
          </text>
        {/if}
      {/each}
    </svg>

    <!-- "Optimized" annotation -->
    <div
      class="absolute top-4 transition-all duration-700 delay-1000
      {visible ? 'opacity-100' : 'opacity-0'}"
      style="left: {((splitIndex / (points.length - 1)) * 100) + 2}%;"
    >
      <!-- eslint-disable-next-line max-len -->
      <div class="flex items-center gap-1 rounded-full bg-green-500/10 px-2.5 py-1 text-[0.65rem] font-semibold text-green-400 backdrop-blur-sm border border-green-500/20">
        <svg width="10" height="10" viewBox="0 0 20 20" fill="currentColor">
        <!-- eslint-disable-next-line max-len -->
          <path fill-rule="evenodd" d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.06l5.25-5.25a.75.75 0 011.06 0l3.046 3.046a20.902 20.902 0 015.441-5.185l-2.562-.687a.75.75 0 01-.53-.919z" clip-rule="evenodd" />
        </svg>
        SEO Optimized
      </div>
    </div>
  </div>

  <div
    class="mx-8 mb-7 mt-2 flex items-center justify-between rounded-xl bg-[#1a1d2e]/60 px-5 py-3.5 transition-all duration-600 delay-1000
    {visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}"
  >
    <div class="flex items-center gap-3">
      <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10">
        <svg class="text-green-400" width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
        <!-- eslint-disable-next-line max-len -->
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
        </svg>
      </div>
      <div>
        <p class="text-sm font-semibold text-slate-200">All Core Web Vitals passed</p>
        <p class="text-xs text-slate-500">Performance · Accessibility · SEO</p>
      </div>
    </div>
    <div class="rounded-full bg-green-500/10 px-3 py-1 text-xs font-bold text-green-400">
      100
    </div>
  </div>
</div>
<script lang="ts">
  // Chart dimensions
  const W = 480
  const H = 200
  const padX = 0
  const padY = 10
  const splitIndex = 5 // where the "boost" starts
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  // Generate data points — flat/declining then strong growth
  const points = [
    0.18, 0.22, 0.2, 0.17, 0.19, 0.21,
    0.32, 0.45, 0.58, 0.7, 0.82, 0.95
  ]

  interface Props {
    title?: string;
    subtitle?: string;
    beforeLabel?: string;
    afterLabel?: string;
    metric?: string;
    animationDuration?: number;
  }

  let {
    title = 'Organic Traffic',
    subtitle = 'Monthly sessions after SEO optimization',
    beforeLabel = 'Before',
    afterLabel = 'After',
    metric = '4.2×',
    animationDuration = 2000
  }: Props = $props()

  let visible = $state<boolean>(false)
  let chartProgress = $state<number>(0)

  function getX(i: number): number {
    return padX + (i / (points.length - 1)) * (W - padX * 2)
  }

  function getY(val: number): number {
    return H - padY - val * (H - padY * 2)
  }

  function buildPath(pts: number[]): string {
    const coords = pts.map((p, i) => {
      return { x: getX(i), y: getY(p) }
    })
    let d = `M ${coords[0].x} ${coords[0].y}`

    for (let i = 1; i < coords.length; i++) {
      const prev = coords[i - 1]
      const curr = coords[i]
      const cpx1 = prev.x + (curr.x - prev.x) * 0.4
      const cpx2 = prev.x + (curr.x - prev.x) * 0.6
      d += ` C ${cpx1} ${prev.y}, ${cpx2} ${curr.y}, ${curr.x} ${curr.y}`
    }

    return d
  }

  const buildAreaPath = (pts: number[]): string => {
    const line = buildPath(pts)
    const lastX = getX(pts.length - 1)
    const firstX = getX(0)
    return `${line} L ${lastX} ${H} L ${firstX} ${H} Z`
  }

  const linePath = buildPath(points)
  const areaPath = buildAreaPath(points)
  const splitX = getX(splitIndex)

  const animateProgress = (duration: number) => {
    const startTime = performance.now()
    function step(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      chartProgress = 1 - Math.pow(1 - progress, 3)

      if (progress < 1)
        requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  $effect(() => {
    if (visible)
      animateProgress(animationDuration)
  })

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
