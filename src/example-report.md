---
title: Example report
---

<style>
h2 { color: crimson; text-transform: uppercase; }
h3 { color: teal; font-style: italic; }
.essential { text-decoration: underline; }
</style>

# A brief history of space exploration

Lorem ipsum <span style="background: linear-gradient(transparent, cyan)">dolor sit amet</span>, consectetur <span class="essential">adipiscing</span> elit.

## Background

The history of rocket launches dates back to ancient China, where gunpowder-filled tubes were used as primitive forms of propulsion.

## The Space Shuttle era

```js
import {timeline} from "./components/timeline.js";
const events = FileAttachment("./data/events.json").json();
```

```js
timeline(events, {height: 300})
```

### Sputnik 1 (1957)

The first artificial satellite, launched by the Soviet Union.

### Apollo 11 (1969)

The first crewed Moon landing.
