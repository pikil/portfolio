<div class="hidden md:block opacity-0 animate-fu-3">
  <div class="bg-surface border border-gray-500/50 rounded-lg overflow-hidden">
    <div class="flex items-center gap-2 px-4 py-3 bg-gray-900/80 border-b border-gray-500/50">
      <span class="w-2.5 h-2.5 rounded-full bg-red-400/70"></span>
      <span class="w-2.5 h-2.5 rounded-full bg-yellow-400/70"></span>
      <span class="w-2.5 h-2.5 rounded-full bg-green-400/70"></span>
    </div>
    <div class="p-6 font-mono text-[0.8rem] leading-loose text-faded">
      <span class="text-slate-600 italic">// Info about the developer</span><br>
      <span class="text-indigo-400/90">const</span> developer = &#123;<br>
      &nbsp;&nbsp;name: <span class="text-yellow-600">"{name}"</span>,<br>
      &nbsp;&nbsp;focus: [
        {#each focus as f, i (f)}
          {i ? ',' : ''}
          <br>
          &nbsp;&nbsp;&nbsp;
          <span class="text-yellow-600">"{f}"</span>
        {/each}
      <br>&nbsp;&nbsp;],<br>
      &nbsp;&nbsp;location: [
        {#each locations as loc, i (loc)}
          {i ? ',' : ''}
          <span class="text-yellow-600">"{loc}"</span>
        {/each}
      ],<br>
      &nbsp;&nbsp;dev_years: <span class="text-yellow-600">"{years}+"</span>,<br>
      &nbsp;&nbsp;coffee: <span class="text-indigo-400/90">[{coffee}]</span><br>
      &#125;;<br><br>
      <span class="text-indigo-400/90">export default</span> developer;
    </div>
  </div>
</div>
<script lang="ts">
  import { name } from '$lib/data/const'

  const focus = [
    'scale',
    'platform-architecture',
    'api-design',
    'integrations',
    'fullstack'
  ]

  const locations = [
    'new_zealand',
    'remote'
  ]

  const years = 10

  const coffee = Infinity
</script>
