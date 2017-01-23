import * as d3 from 'd3';

// Should prefer a default export, it is here as a test

// eslint-disable-next-line import/prefer-default-export
export function createCircleChart(anchor, data) {
  const cX = Math.floor((400) / data.length);
  const circleGroup = anchor.append('g')
                            .classed('circles', true);

  circleGroup.selectAll('circle')
             .data(data)
             .enter()
             .append('circle')
             .attr('cx', (d, i) => i * cX)
             .attr('cy', 100)
             .attr('r', d => Math.sqrt(d) * 5)
             .attr('fill', () => {
               const [h, s, l] = d3.range(3).map(d3.randomUniform(50, 200));
               return d3.hsl(h, s, l);
             });

  return circleGroup;
}
