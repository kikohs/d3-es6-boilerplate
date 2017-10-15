
import * as d3 from 'd3';

// Local imports
import { createCircleChart } from './circle';  // named import
import makeBarChart from './bar';  // name is irrelevant since it is a default export

require('./main.scss');  // will build CSS from SASS 3 file

// eslint-disable-next-line no-unused-vars
function buildCircleChart(chartWidth, chartHeight) {
  // Dataset
  const dataset = d3.range(20);

  const svg = d3.select('#viz')
                .append('svg')
                .attr('preserveAspectRatio', 'xMinYMin meet')
                .attr('viewBox', `0 0 ${chartWidth} ${chartHeight}`)
                .classed('svg-content-responsive', true);

  // Test module, string interpolation
  return createCircleChart(svg, dataset);
}

// Main
const vizDiv = document.getElementById("viz");

const chartWidth = vizDiv.clientWidth;
const chartHeight = vizDiv.clientHeight;
// d3.select('#viz').remove();
window.addEventListener('resize', makeBarChart('viz', d3.range(10), chartWidth, chartHeight));
// buildCircleChart(chartWidth, chartHeight);
