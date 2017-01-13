// Starting point
'use strict';

require("./main.scss");  // will build CSS from SASS 3 file

// import _ from 'lodash';
import * as d3 from 'd3';

// Test ES6 and d3
const data = [1, 2, 3];
const [x, y] = [70, 10];

console.log(data);
let helpers = {
  translate: function(x, y) {
    this.attr("transform", `translate(${x}, ${y})`);
    return this;
  }
}

let svg = d3.select("#viz")
            .append("svg")
            .attr("width", 500)
            .attr("height", 500);

let rec = svg.append("rect")
  .attr("id", "myrect")
  .attr("width", 200)
  .attr("height", 150)

// let's create a transform method that can be chained
rec = Object.assign(rec, helpers);
rec.translate(x, y);
