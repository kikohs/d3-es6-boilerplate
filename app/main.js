'use strict';

require("./main.scss");  // will build CSS from SASS 3 file

import _ from 'lodash';  // imports
import * as d3 from 'd3';

// Test ES6 and d3
const data = [1, 2, 3];
const [x, y] = [70, 100];  // Array destructuring

let svg = d3.select("#viz")
            .append("svg")
            .attr("width", 500)
            .attr("height", 500);

let rec = svg.append("rect")
  .attr("id", "myrect")  // Rect color is given by a compiled SCSS file that includes another SCSS file /style/colors.scss
  .attr("width", 200)
  .attr("height", 150)
  .attr("transform", `translate(${x}, ${y})`);  // string interpolation
