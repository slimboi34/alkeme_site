import React, { useEffect, useRef, useState, useCallback } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

function ChangePercent24Hr({ animationDuration = 1200, animationEase = d3.easeElasticOut }) {
  const [data, setData] = useState([]);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: 850 });
  const chartRef = useRef(null);

  const renderChart = useCallback((chartData) => {
    const { width, height } = dimensions;
    const margin = 60;
    const format = d3.format('.2f');

    d3.select(chartRef.current).selectAll('*').remove();

    const svg = d3
      .select(chartRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('font', '14px sans-serif');

    const color = d3.scaleSequential().domain([-10, 10]).interpolator(d3.interpolateRdYlGn);
    const pack = d3.pack().size([width - margin * 2, height - margin * 2]).padding(10);

    const root = d3
      .hierarchy({ children: chartData.map((item) => ({ id: item.id, value: item.changePercent24Hr })) })
      .sum((d) => Math.abs(d.value));

    pack(root);

    const nodes = svg
      .append('g')
      .attr('transform', `translate(${margin},${margin})`)
      .selectAll('g')
      .data(root.leaves())
      .join('g')
      .attr('transform', (d) => `translate(${d.x},${d.y})`);

    nodes
      .append('circle')
      .attr('fill', (d) => color(d.data.value))
      .attr('r', 0)
      .style('opacity', 0)
      .transition()
      .duration(animationDuration)
      .ease(animationEase)
      .attr('r', (d) => d.r)
      .style('opacity', 1);

    const getTextColor = (backgroundColor) => {
      const rgb = d3.color(backgroundColor).rgb();
      const brightness = (rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114) / 255;
      return brightness > 0.5 ? '#000' : '#fff';
    };

    nodes
      .append('text')
      .attr('dy', '0.3em')
      .style('text-anchor', 'middle')
      .style('pointer-events', 'none')
      .style('opacity', 0)
      .transition()
      .duration(animationDuration)
      .ease(animationEase)
      .style('opacity', 1)
      .text((d) => {
        const text = d.data.id;
        const maxTextLength = Math.floor(d.r / 4);
        return text.length > maxTextLength ? `${text.substring(0, maxTextLength)}...` : text;
      })
      .style('fill', (d) => getTextColor(color(d.data.value)))
      .style('font-size', (d) => `${Math.min(16, d.r / 3)}px`);

    nodes.on('mouseover', (event, d) => {
      svg
        .append('foreignObject')
        .attr('x', d.x - 80)
        .attr('y', d.y - d.r - 70)
        .attr('width', 200)
        .attr('height', 100)
        .attr('class', 'tooltip')
        .html(`
          <div style="
            background: rgba(0, 0, 0, 0.85);
            padding: 12px;
            border-radius: 10px;
            color: #fff;
            font-size: 13px;
            text-align: center;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
          ">
            <strong>${d.data.id}</strong>
            <div>24-Hr Change: ${format(d.data.value)}%</div>
          </div>
        `);
    }).on('mouseout', () => {
      svg.select('.tooltip').remove();
    });
  }, [dimensions, animationDuration, animationEase]);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight * 0.8 });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    axios
      .get('https://api.coincap.io/v2/assets/')
      .then((response) => {
        if (response.data && response.data.data) {
          const formattedData = response.data.data
            .map((asset) => ({
              id: asset.id,
              changePercent24Hr: parseFloat(asset.changePercent24Hr),
            }))
            .filter((asset) => !isNaN(asset.changePercent24Hr));
          setData(formattedData);
        } else {
          console.error('Unexpected data format:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      renderChart(data);
    }
  }, [data, dimensions, renderChart]);

  return (
    <div style={{ textAlign: 'center', padding: '10px' }}>
      <h2 style={{ color: '#333', fontSize: '1.5rem', paddingBottom: '10px' }}>
        24-Hour Price Change Visualization
      </h2>
      <svg ref={chartRef}></svg>
    </div>
  );
}

export default ChangePercent24Hr;