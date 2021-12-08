/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.9,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 };
  const legendWidth = width * 0.6,
	legendHeight = 10;
  // import {legend} from "@d3/color-legend";
/**
 * LOAD DATA
 * Using a Promise.all([]), we can load more than one dataset at a time
 * */
Promise.all([
  d3.json("../data/usState.json"),
  d3.csv("../data/usHeatExtremes.csv", d3.autoType),
]).then(([geojson, heat]) => {
  console.log(geojson, heat)
  

  // SPECIFY PROJECTION
  const projection = d3.geoAlbersUsa()
    .fitSize([
      width - margin.left - margin.right,
      height - margin.top - margin.bottom
    ], geojson)
  // console.log('projection :>> ', projection);

  // DEFINE PATH FUNCTION
  const pathGen = d3.geoPath(projection)

  // APPEND GEOJSON PATH 
  const svg = d3.select("#container").append("svg")
    .attr("width", width)
    .attr("height", height);
  // color = d3.scaleSequential(d3.extent(Array.from(data.values()).flat()), d3.interpolateReds).nice()
  // legend({color, title: "Adult obesity (self-reported)", tickFormat: "%"})
  svg.append("circle").attr("cx",40).attr("cy",300).attr("r", 6).style("fill", "gold")
  svg.append("circle").attr("cx",40).attr("cy",330).attr("r", 6).style("fill", "red")
  svg.append("text").attr("x", 60).attr("y", 300).text("Lesser temperature difference").style("font-size", "15px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 60).attr("y", 330).text("Greater temperature difference").style("font-size", "15px").attr("alignment-baseline","middle")

  const states = svg.selectAll("path.states")
    .data(geojson.features, d => d.properties.STUSPS)
    .join("path")
    .attr("class", "states")
    .attr("d", d => pathGen(d))
    .attr("fill", d => []
      .includes(d.properties.STUSPS) 
        ? "pink" 
        : "grey")
    .attr("stroke", "white")

    // Trying to add color scale to circles 
    //colorscale
    const colorScale = d3.scaleLinear()
    .domain([d3.min(heat.map(d => d.change)), d3.max(heat.map(d => d.change))])
    .range(["yellow", "red"])
    d3.interpolateRgb("yellow", "red")
    
  // draw point for CUNY graduate center
  // const gradCenterPoint =  { latitude: 40.7423, longitude: -73.9833 };
  svg.selectAll("circle.point")
    .data(heat)
    .join("circle")
    .attr("r", 2.5)
    .attr("fill", "gold")
    .attr("fill", d => colorScale(d.change)) //Trying to add color scale to circles
    .attr("transform", d=> {
      // use our projection to go from lat/long => x/y
      // ref: https://github.com/d3/d3-geo#_projection
      const [x, y] = projection([d.longitude, d.latitude])
      return `translate(${x}, ${y})`
    })

//Trying to add color scale legend instea of two color key legend

// const coloursYGB = ["#FFFFDD","#AAF191","#80D385","#61B385","#3E9583","#217681","#285285","#1F2D86","#000086"];
// const colourRangeYGB = d3.range(0, 1, 1.0 / (coloursYGB.length - 1));
// colourRangeYGB.push(1);
		   
// //Create color gradient
// const colorScaleYGB = d3.scale.linear()
// 	.domain(colourRangeYGB)
// 	.range(coloursYGB)
// 	.interpolate(d3.interpolateHcl);

// //Needed to map the values of the dataset to the color scale
// const colorInterpolateYGB = d3.scale.linear()
// 	.domain(d3.extent([d3.min(heat.map(d => d.change)), d3.max(heat.map(d => d.change))]))
// 	.range([0,1]);

// ///////////////////////////////////////////////////////////////////////////
// ///////////////////// Create the YGB color gradient ///////////////////////
// ///////////////////////////////////////////////////////////////////////////

// //Calculate the gradient	
// defs.append("linearGradient")
// 	.attr("id", "gradient-ygb-colors")
// 	.attr("x1", "0%").attr("y1", "0%")
// 	.attr("x2", "100%").attr("y2", "0%")
// 	.selectAll("stop") 
// 	.data(coloursYGB)                  
// 	.enter().append("stop") 
// 	.attr("offset", function(d,i) { return i/(coloursYGB.length-1); })   
// 	.attr("stop-color", function(d) { return d; });
//     //Color Legend container
// const legendsvg = svg.append("g")
// .attr("class", "legendWrapper")
// .attr("transform", "translate(" + (width/2 - 10) + "," + (height+50) + ")");

// //Draw the Rectangle
// legendsvg.append("rect")
// .attr("class", "legendRect")
// .attr("x", -legendWidth/2)
// .attr("y", 10)
// //.attr("rx", legendHeight/2)
// .attr("width", legendWidth)
// .attr("height", legendHeight)
// .style("fill", "url(#gradient-ygb-colors)");

// //Append title
// legendsvg.append("text")
// .attr("class", "legendTitle")
// .attr("x", 0)
// .attr("y", -2)
// .text("Store Competition Index");

// //Set scale for x-axis
// const xScale = d3.scale.linear()
//  .range([0, legendWidth])
//  .domain([d3.min(pt.legendSOM.colorData)/100, d3.max(pt.legendSOM.colorData)/100]);

// //Define x-axis
// var xAxis = d3.svg.axis()
// .orient("bottom")
// .ticks(5)  //Set rough # of ticks
// //.tickFormat(formatPercent)
// .scale(xScale);

// //Set up X axis
// legendsvg.append("g")
// .attr("class", "axis")  //Assign "axis" class
// .attr("transform", "translate(" + (-legendWidth/2) + "," + (10 + legendHeight) + ")")
// .call(xAxis);
// //end legend
  
  // APPEND DATA AS SHAPE

});