import {csvFormat, csvParse} from "d3-dsv";
import {readFile} from "node:fs/promises";
import {dirname, join} from "node:path";
import {fileURLToPath} from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const raw = await readFile(join(__dirname, "population.csv"), "utf8");
const rows = csvParse(raw, (d) => ({
  Entity: d.Entity,
  Code: d.Code,
  Year: +d.Year,
  "Population (historical estimates)": +d["Population (historical estimates)"]
}));

const y2010 = rows.filter((d) => d.Year === 2010 && d.Code);

process.stdout.write(csvFormat(y2010));
