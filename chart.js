import * as d3 from "d3";

async function drawLineChart() {
  // write your code here
  const data = await d3.json("data/my_weather_data.json");

  //const getMaxTemp = (d) => d.temperatureHigh;
  const parseDate = d3.timeParse("%Y-%m-%d");
  const getDate = (d) => parseDate(d["date"]);

  let dims = {
    width: window.innerWidth * 0.9,
    height: 400,
    margins: {
      top: 15,
      right: 15,
      bottom: 40,
      left: 60
    }
  };

  dims.boundedWidth = dims.width - dims.margins.left - dims.margins.right;
  dims.boundedHeight = dims.height - dims.margins.top - dims.margins.bottom;

  const wrapper = d3.select("#wrapper");
  const svg = wrapper.append("svg");
  console.log(svg);
}

drawLineChart();
