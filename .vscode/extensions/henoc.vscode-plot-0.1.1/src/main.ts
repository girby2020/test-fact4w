import * as Chart from "chart.js";
import {decimal, Input} from "yaparsec";
import * as tinycolor from "tinycolor2";

const sequence = decimal.rep();

let text = document.getElementById("text")!.textContent!;
let lines = text.split(/\r\n|\r|\n/);
let samples: number[][] = [];
let maxLen = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  let result = sequence.parse(new Input(line, 0, /^[^\-0-9\.]+/));
  let sample: number[];
  try {
    sample = result.getResult();
  } catch (err) {
    sample = [];
  }
  samples.push(sample);
  maxLen = Math.max(maxLen, sample.length);
}

let datasets: {
  label: string;
  data: number[];
  backgroundColor: string;
}[] = [];

for (let i = 0; i < samples.length; i++) {
  let h = i * 47 % 360;
  datasets.push({
    label: "Series " + i,
    data: samples[i],
    backgroundColor: tinycolor({h: h, s: .8, v: .8, a: .7}).toRgbString()
  });
}

let indices = Array.from({length: maxLen}, (v, k) => k);

let ctx = (<HTMLCanvasElement>document.getElementById("chart")).getContext("2d");

let myChart = new Chart(ctx, {
  type: "line",
  data: {
      labels: indices,
      datasets: datasets
  },
  options: {
    responsive: true,
    maintainAspectRatio: false
  }
});
