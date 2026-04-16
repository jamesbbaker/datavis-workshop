---
title: Project Sketches
toc: true
---

# Project Sketches

Tutorial exercises: layout, file attachments, gapminder zip, loaders, and a joined scatter plot.

## Image in a `<details>` block

<details>
<summary>Show the sample image (from the project root)</summary>

![Observable](/observable.png)

</details>

## Nine-cell grid

<div class="grid grid-cols-3">
  <div class="card big red">A</div>
  <div class="card big green">B</div>
  <div class="card big blue">C</div>
  <div class="card big yellow" style="grid-column: 1 / -1">D</div>
  <div class="card big green">E</div>
  <div class="card big blue">F</div>
  <div class="card big muted">G</div>
</div>

## Word slider

```js
const longText = FileAttachment("data/long-text.txt").text();
```

```js
const words = longText.trim().split(/\s+/);
```

```js
const wordCount = Inputs.range([0, words.length], {
  label: "Words to show",
  step: 1,
  value: 24
});
```

```js
const snippet = words.slice(0, wordCount).join(" ");
display(html`<p style="font-size: 1.05rem; line-height: 1.6;">${snippet}</p>`);
```

## Gapminder zip: continents table and country list

```js
const gapZip = await FileAttachment("data/gapminder.zip").zip();
```

```js
display(html`<pre style="font-size: 12px;">${gapZip.filenames.join("\n")}</pre>`);
```

```js
const continentRows = await gapZip.file("gapminder/continents.csv").csv({typed: true});
```

```js
display(Inputs.table(continentRows));
```

```js
const countryNames = Array.from(
  new Set(continentRows.map((d) => d.Entity).filter(Boolean))
).sort((a, b) => a.localeCompare(b));
```

```js
display(
  html`<ul style="columns: 2; gap: 2rem;">${countryNames.map(
    (name) => html`<li>${name}</li>`
  )}</ul>`
);
```

## 2010 tables from data loaders

```js
const life2010 = FileAttachment("data/life-2010.csv").csv({typed: true});
const gdp2010 = FileAttachment("data/gdp-2010.csv").csv({typed: true});
const pop2010 = FileAttachment("data/population-2010.csv").csv({typed: true});
```

```js
display(html`<h2>Life expectancy (loader → CSV)</h2>`);
display(Inputs.table(life2010));
```

```js
display(html`<h2>GDP per capita (loader → CSV)</h2>`);
display(Inputs.table(gdp2010));
```

## Scatter: GDP vs life expectancy (log × linear)

```js
import {interpolateTurbo} from "d3-scale-chromatic";

const lifeByEntity = new Map(life2010.map((d) => [d.Entity, d]));
const popByEntity = new Map(pop2010.map((d) => [d.Entity, d]));

const merged = gdp2010
  .map((g) => {
    const l = lifeByEntity.get(g.Entity);
    const p = popByEntity.get(g.Entity);
    if (!l || !p) return null;
    return {
      Entity: g.Entity,
      gdp: g["GDP per capita"],
      life: l["Life expectancy"],
      pop: p["Population (historical estimates)"]
    };
  })
  .filter(Boolean);
```

```js
const dotStroke = Inputs.radio(
  new Map([
    ["#b42318", "Brick"],
    ["#1754d8", "Cobalt"],
    ["#047857", "Pine"]
  ]),
  {label: "Dot outline color", value: "#1754d8"}
);
```

```js
const metricChoice = Inputs.radio(
  new Map([
    ["gdp", "GDP per capita"],
    ["life", "Life expectancy"],
    ["pop", "Population"]
  ]),
  {label: "Fill by metric", value: "gdp"}
);
```

```js
const metricAccessor = (d) =>
  metricChoice === "gdp" ? d.gdp : metricChoice === "life" ? d.life : d.pop;

const labeled = merged.map((d) => ({...d, metric: metricAccessor(d)}));
```

```js
function scatter(data, {width} = {}) {
  const [minM, maxM] = d3.extent(data, (d) => d.metric);
  return Plot.plot({
    width,
    height: 520,
    marginRight: 20,
    x: {type: "log", label: "GDP per capita (international $)", grid: true},
    y: {label: "Life expectancy (years)", grid: true},
    color: {
      type: "sequential",
      domain: [minM, maxM],
      range: interpolateTurbo,
      label:
        metricChoice === "gdp"
          ? "GDP per capita"
          : metricChoice === "life"
            ? "Life expectancy"
            : "Population",
      legend: true
    },
    r: {range: [2, 14]},
    marks: [
      Plot.dot(data, {
        x: "gdp",
        y: "life",
        fill: "metric",
        r: (d) => Math.sqrt(d.pop),
        stroke: dotStroke,
        strokeWidth: 0.85,
        tip: true
      })
    ]
  });
}
```

<div class="grid grid-cols-1">
  <div class="card">${resize((width) => scatter(labeled, {width}))}</div>
</div>

Point area scales with $\sqrt{\text{population}}$ so larger countries read as larger dots. Color tracks the radio choice using a sequential turbo ramp.
