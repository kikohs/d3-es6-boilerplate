
import * as d3 from 'd3';

// Local imports
import { createCircleChart } from './circle';  // named import
import makeBarChart from './bar';  // name is irrelevant since it is a default export

require('./main.scss');  // will build CSS from SASS 3 file

// eslint-disable-next-line no-unused-vars
function buildCircleChart() {
  // Dataset
  const dataset = d3.range(20);
  const chartWidth = 600;
  const chartHeight = 400;

  const svg = d3.select('#viz')
                .append('svg')
                .attr('preserveAspectRatio', 'xMinYMin meet')
                .attr('viewBox', `0 0 ${chartWidth} ${chartHeight}`)
                .classed('svg-content-responsive', true);

  // Test module, string interpolation
  return createCircleChart(svg, dataset);
}

// Main
d3.select('#viz').remove();
makeBarChart('viz', d3.range(10));
// buildCircleChart();
