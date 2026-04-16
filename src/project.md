---
title: Project Sketches
toc: false
---

# Project Sketches

A small tour of the [Observable Framework](https://observablehq.com/framework/) features in the workshop handout: layout, file attachments, a zip archive, two data loaders, and an interactive scatter plot.

## A sample image, hidden in a `<details>` block

<details>
<summary>Show the Observable logo</summary>

![Observable logo](/observable.png)

</details>

## A 3 × 3 grid where the middle row spans all three columns

<div class="grid grid-cols-3">
  <div class="card red">A</div>
  <div class="card green">B</div>
  <div class="card blue">C</div>
  <div class="card yellow" style="grid-column: 1 / -1; text-align: center">D</div>
  <div class="card red">E</div>
  <div class="card green">F</div>
  <div class="card blue">G</div>
</div>

## A range slider drives how many words appear

```js
const words = (await FileAttachment("data/long-text.txt").text()).split(/\s+/);
const n = view(Inputs.range([0, words.length], {label: "Words to show", step: 1, value: 30}));
```

> ${words.slice(0, n).join(" ")}

## A `.zip` archive read straight from `FileAttachment`

```js
const zip = await FileAttachment("data/gapminder.zip").zip();
const continents = await zip.file("gapminder/continents.csv").csv({typed: true});
```

The archive contains: ${zip.filenames.map((f) => html`<code>${f}</code>`)}.

```js
Plot.plot({
  marginLeft: 110,
  x: {label: "Countries", grid: true},
  y: {label: null},
  color: {legend: true},
  marks: [
    Plot.barX(
      continents,
      Plot.groupY({x: "count"}, {y: "Continent", fill: "Continent", sort: {y: "-x"}})
    ),
    Plot.ruleX([0])
  ]
})
```

<details>
<summary>All ${continents.length} country rows from <code>continents.csv</code></summary>

```js
Inputs.table(continents)
```

</details>

## Two data loaders that emit just the 2010 slice

`src/data/life-2010.csv.js` and `src/data/gdp-2010.csv.js` read the matching CSVs from the zip extract and write only the 2010 rows. They run at build time and are cached.

```js
const life = await FileAttachment("data/life-2010.csv").csv({typed: true});
const gdp = await FileAttachment("data/gdp-2010.csv").csv({typed: true});
const data = gdp.flatMap((g) => {
  const l = life.find((d) => d.Code === g.Code);
  return l ? [{country: g.Entity, gdp: g["GDP per capita"], life: l["Life expectancy"]}] : [];
});
```

## Scatter: GDP per capita vs. life expectancy (2010)

```js
const color = view(Inputs.radio(["steelblue", "crimson", "seagreen"], {label: "Dot color", value: "steelblue"}));
```

```js
Plot.plot({
  width,
  height: 480,
  marginLeft: 50,
  x: {type: "log", label: "GDP per capita (US$, log)", grid: true},
  y: {label: "Life expectancy (years)", grid: true},
  marks: [
    Plot.dot(data, {x: "gdp", y: "life", fill: color, r: 4, stroke: "white", strokeWidth: 0.5,
      channels: {country: "country"},
      tip: {format: {country: true, gdp: ".0f", life: ".1f", x: false, y: false}}})
  ]
})
```
