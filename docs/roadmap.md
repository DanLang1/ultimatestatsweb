# Roadmap

This is the roadmap section that was previously on the landing page. Can be re-added later.

## Phase 1 (Done-ish)

- Core Stats that work
- Not crashing every 5 minutes
- Dark mode (priorities)

## Phase 2 (Soon™)

- Save your rosters so you don't type names twice
- Advanced player graphs for your ego

## Phase 3 (Wild Ideas)

- Tournament Mode
- Live sharing for your parents
- Season-long global domination

---

## Original Astro Component Code

```astro
<!-- Roadmap -->
<section class="py-20 max-w-3xl mx-auto">
  <h2 class="text-3xl font-bold mb-12 text-center">Roadmap</h2>
  <div class="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[var(--border-color)] before:to-transparent">
    {[
      { phase: "Phase 1 (Done-ish)", items: ["Core Stats that work", "Not crashing every 5 minutes", "Dark mode (priorities)"] },
      { phase: "Phase 2 (Soon™)", items: ["Save your rosters so you don't type names twice", "Advanced player graphs for your ego"] },
      { phase: "Phase 3 (Wild Ideas)", items: ["Tournament Mode", "Live sharing for your parents", "Season-long global domination"] },
    ].map((phase, i) => (
      <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
        <!-- Icon -->
        <div class="flex items-center justify-center w-10 h-10 rounded-full border border-[var(--border-color)] bg-[var(--bg-app)] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-[var(--accent-color)]">
          <div class="w-3 h-3 bg-current rounded-full"></div>
        </div>
        <!-- Card -->
        <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-color)] shadow-sm hover:translate-y-[-2px] transition-transform">
          <h3 class="font-bold mb-2">{phase.phase}</h3>
          <ul class="list-disc list-inside opacity-70 text-sm space-y-1">
            {phase.items.map((item) => <li>{item}</li>)}
          </ul>
        </div>
      </div>
    ))}
  </div>
</section>
```
