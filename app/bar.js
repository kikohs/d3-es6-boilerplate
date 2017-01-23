import * as d3 from 'd3';

const MARGIN = { top: 20, right: 30, bottom: 20, left: 30 };
const PADDING = { top: 60, right: 60, bottom: 60, left: 60 };
const OUTER_WIDTH = 960;
const OUTER_HEIGHT = 500;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// ES6 class
class BarChart {
  constructor(id, data, outerWidth, outerHeight) {
    this.id = id;
    this.data = data;

    this.baseWidth = outerWidth;
    this.baseHeight = outerHeight;
    this.svg = d3.select(`#${this.id} svg`);

    // If empty create element
    if (this.svg.empty()) {
      this.svg = d3.select('body')
               .insert('div')
                 .attr('id', this.id)
               .append('svg')
                 .attr('width', this.baseWidth)
                 .attr('height', this.baseHeight);
    }

    const inner = this.svg.append('g')
                          .attr('transform', `translate(${MARGIN.left}, ${MARGIN.top})`)
                          .attr('class', 'inner');
    // Make bars
    inner.append('g')
       .attr('class', 'bars');

    // Make axis
    inner.append('g')
        .attr('class', 'labels');

    // Make axis
    const axes = inner.append('g')
                      .attr('class', 'axes');
    axes.append('g') // x axis
        .attr('class', 'axis')
        .attr('class', 'xaxis');
    axes.append('g')  // y axis
        .attr('class', 'axis')
        .attr('class', 'yaxis');

    this.bindEvents();
    this.render();
    this.generateData();
  }

  getWidth() {
    const outerWidth = parseInt(this.svg.style('width'), 10);
    const innerWidth = outerWidth - MARGIN.left - MARGIN.right;
    const width = innerWidth - PADDING.left - PADDING.right;

    return width;
  }

  getHeight() {
    const outerHeight = parseInt(this.svg.style('height'), 10);
    const innerHeight = outerHeight - MARGIN.top - MARGIN.bottom;
    const height = innerHeight - PADDING.top - PADDING.bottom;

    return height;
  }

  bindEvents() {
    d3.select(window).on('resize', () => {
      this.resized();
      this.render(false);
    });
  }

  resized() {
    const width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

    const outerWidth = Math.min(this.baseWidth, width);
    this.svg.attr('width', outerWidth);

    const height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

    const outerHeight = Math.min(this.baseHeight, height);
    this.svg.attr('height', outerHeight);
  }

  render(doTransition = true) {
    const yScale = this.getYScale();
    const xScale = this.getXScale();
    // Set bars
    const bars = this.svg.select('g.inner g.bars')
                          .selectAll('rect')
                          .data(this.data);
    this.setBars(bars.enter().append('rect'), xScale, yScale);

    // Set labels
    const labels = this.svg.select('g.inner g.labels')
                         .selectAll('text')
                         .data(this.data);
    BarChart.setLabels(labels.enter().append('text'), xScale, yScale);

    if (doTransition) {
      this.setBars(bars.transition(), xScale, yScale);
      BarChart.setLabels(labels.transition(), xScale, yScale);
    } else {
      this.setBars(bars, xScale, yScale);
      BarChart.setLabels(labels, xScale, yScale);
    }

    bars.exit().remove();
    labels.exit().remove();

    this.setAxes(xScale, yScale);
  }

  setBars(sel, xScale, yScale) {
    sel.attr('x', (d, i) => xScale(i))
       .attr('y', d => yScale(d))
       .attr('width', xScale.bandwidth())
       .attr('height', d => Math.abs(this.getHeight() - yScale(d)))
       .attr('fill', d => `rgb(0, ${Math.min(d * 10, 240)}, 0)`);
  }

  static setLabels(sel, xScale, yScale) {
    sel.text(d => ((d >= 2) ? `${d}` : '')) // eslint-disable-line no-use-before-define
       .attr('x', (d, i) => xScale(i) + (xScale.bandwidth() / 2))
       .attr('y', d => yScale(d) + 20)
       .attr('text-anchor', 'middle')
       .attr('font-family', 'sans-serif')
       .attr('font-size', '13px')
       .attr('fill', 'white');
  }

  setAxes(xScale, yScale) {
    const yAxis = d3.axisLeft(yScale);
    const xAxis = d3.axisBottom(xScale);

    this.svg.select('g.inner g.axes g.xaxis')
            .attr('transform', `translate(0, ${this.getHeight()})`)
            .call(xAxis);
    this.svg.select('g.inner g.axes g.yaxis')
            .call(yAxis);
  }

  getYScale() {
    return d3.scaleLinear()
             .domain([0, d3.max(this.data)])
             .range([this.getHeight(), 0]);
  }

  getXScale() {
    return d3.scaleBand()
            .domain(d3.range(this.data.length))
            .rangeRound([0, this.getWidth()])
            .paddingInner(0.05);
  }

  generateData() {
    d3.range(10).forEach(i => (
      setTimeout(() => {
        this.data.push(getRandomInt(0, 30));
        this.data.shift();
        this.render();
      }, 1000 * i)
    ));
  }
}

// Make bar chart factory function
// defaut export, defaut params
export default function(id = 'viz', data = d3.range(10),
                        width = OUTER_WIDTH, height = OUTER_HEIGHT) {
  return new BarChart(id, data, width, height);
}
