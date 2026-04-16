---
title: Project Sketches
---

# Project Sketches

## Image in a details block

<details>
<summary>Show the Observable logo</summary>

![Observable logo](/observable.png)

</details>

## 3×3 grid (middle row spans all 3 columns)

<div class="grid grid-cols-3">
  <div class="card red">A</div>
  <div class="card green">B</div>
  <div class="card blue">C</div>
  <div class="card yellow" style="grid-column: 1 / -1">D</div>
  <div class="card red">E</div>
  <div class="card green">F</div>
  <div class="card blue">G</div>
</div>

## Word slider

```js
const words = (await FileAttachment("data/long-text.txt").text()).split(/\s+/);
```

```js
const n = view(Inputs.range([0, words.length], {label: "Words", step: 1, value: 20}));
```

${words.slice(0, n).join(" ")}

## Gapminder zip

```js
const zip = await FileAttachment("data/gapminder.zip").zip();
```

Files: ${zip.filenames.join(", ")}

```js
const continents = await zip.file("gapminder/continents.csv").csv({typed: true});
```

```js
Inputs.table(continents)
```

Countries: ${continents.map((d) => d.Entity).join(", ")}

## 2010 data via loaders

```js
const life = FileAttachment("data/life-2010.csv").csv({typed: true});
const gdp = FileAttachment("data/gdp-2010.csv").csv({typed: true});
```

```js
Inputs.table(life)
```

```js
Inputs.table(gdp)
```

## Scatter: GDP vs life expectancy

```js
const lifeByCode = new Map(life.map((d) => [d.Code, d["Life expectancy"]]));
const data = gdp
  .map((d) => ({country: d.Entity, gdp: d["GDP per capita"], life: lifeByCode.get(d.Code)}))
  .filter((d) => d.life != null);
```

```js
const color = view(Inputs.radio(["steelblue", "crimson", "seagreen"], {label: "Dot color", value: "steelblue"}));
```

```js
Plot.plot({
  x: {type: "log", label: "GDP per capita", grid: true},
  y: {label: "Life expectancy", grid: true},
  marks: [Plot.dot(data, {x: "gdp", y: "life", fill: color, tip: true})]
})
```
