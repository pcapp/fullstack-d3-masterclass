import * as d3 from "d3";

async function drawLineChart() {
  // write your code here
  const data = await d3.json("data/my_weather_data.json");

  const getMaxTemp = (d) => d["temperatureHigh"];
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

  const wrapper = d3
    .select("#wrapper")
    .append("svg")
    .attr("width", dims.width)
    .attr("height", dims.height);

  const bounds = wrapper.append("g").style(
    "transform",
    `translate(
      ${dims.margins.left}px, 
      ${dims.margins.top}px)`
  );

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, getMaxTemp))
    .range([dims.boundedHeight, 0]);

  const freezingTempPlacement = yScale(32);

  const freezingTemp = bounds
    .append("rect")
    .attr("x", 0)
    .attr("width", dims.boundedWidth)
    .attr("y", freezingTempPlacement)
    .attr("height", dims.boundedHeight - freezingTempPlacement)
    .attr("fill", "#e0f3f3");

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, getDate))
    .range([0, dims.boundedWidth]);

  const lineGen = d3
    .line()
    .x((d) => xScale(getDate(d)))
    .y((d) => yScale(getMaxTemp(d)));

  const line = bounds
    .append("path")
    .attr("d", (d) => lineGen(data))
    .attr("fill", "none")
    .attr("stroke", "cornflowerblue")
    .attr("stroke-width", 2);

  const yAxisGenerator = d3.axisLeft().scale(yScale);
  const yAxis = bounds.append("g").call(yAxisGenerator);

  const xAxisGenerator = d3.axisBottom().scale(xScale);
  const xAxis = bounds
    .append("g")
    .call(xAxisGenerator)
    .style("transform", `translateY(${dims.boundedHeight}px)`);
}

drawLineChart();
