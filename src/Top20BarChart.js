import React, { useEffect } from 'react';
import * as d3 from 'd3';

function Top20BarChart({ top20Currencies }) {
  useEffect(() => {
    if (Object.keys(top20Currencies).length > 0) createD3Chart();
  }, [top20Currencies]);

  const createD3Chart = () => {
    const width = 928;
    const height = 500;
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };

    const color = d3.scaleOrdinal(d3.schemeCategory10).domain(Object.keys(top20Currencies));

    const x = d3.scaleBand()
      .domain(Object.keys(top20Currencies))
      .rangeRound([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(Object.values(top20Currencies), (d) => d)]).nice()
      .range([height - margin.bottom, margin.top]);

    const svg = d3.select("#d3-chart-container").html("")
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", width)
      .attr("height", height);

    svg.append("g")
      .selectAll("rect")
      .data(Object.entries(top20Currencies))
      .join("rect")
      .attr("fill", ([name]) => color(name))
      .attr("x", ([name]) => x(name))
      .attr("y", ([, value]) => y(value))
      .attr("width", x.bandwidth())
      .attr("height", ([, value]) => y(0) - y(value));

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0));

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  };

  return <div id="d3-chart-container" style={{ marginTop: '50px' }}></div>;
}

export default Top20BarChart;