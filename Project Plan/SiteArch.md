// Site Architecture

/* HTML

<!DOCTYPE html>
  <head>
    <meta charset="utf-8">
    <title>Interactive Data Visualization Tutorial</title>
    <link rel="stylesheet" href="./style.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro">
  </head>
  <body>
    <h3>Section 2 | Geographic— <br>Mapping Changes in Temperature</h3>
    <div id="container"> </div>
    <script src="../lib/d3.js"></script>
    <script src="main.js"></script>
  </body>
</html>

*/

/* JS

* Constants and globals



* Load Data
Promise.all([
  d3.json("../data/usState.json"),
  d3.csv("../data/dataPrivacy_state"),
  d3.csv("../data/dataPrivacy_educ"),
  d3.csv("../data/dataPrivacy_age"),
  d3.csv("../data/dataPrivacy_inc"),
]).then(([geojson, state, educ, age, inc]) => {
  console.log(geojson, state, educ, age, inc)

* Map 
// Specify Projection
  const projection = d3.geoAlbersUsa()
    .fitSize([
      width - margin.left - margin.right,
      height - margin.top - margin.bottom
    ], geojson)

//Define Path Function
  const pathGen = d3.geoPath(projection)

//Append Geojson path
    const svg = d3.select("#container").append("svg") // append svg to draw on top of
        .attr("width", width)
        .attr("height", height);

    const states = svg.selectAll("path.states") // draw states
        .data(geojson.features, d => d.properties.STUSPS)
        .join("path")
        .attr("class", "states")
        .attr("d", d => pathGen(d))
        .attr("fill", d => []
        .includes(d.properties.STUSPS) 
            ? "pink" 
            : "grey")
        .attr("stroke", "white")
    
    // Scale
    const colorScale = d3.scaleLinear()
        .domain([d3.min(state.map(d => d.breach)), d3.max(state.map(d => d.breach))])
        .range(["white", "red"])
        d3.interpolateRgb("white", "red")

    // Tooltip

    // Legend

    //Select Options 


    // State Management
        

* Scatterplot

    // SCALES
      // xscale  - linear,count
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(age.map(d => d.breach))])
            .range([margin.left, width - margin.right])

    // yscale - linear,count
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(age, d => d.breach)])
            .range([height - margin.bottom, margin.top])

    //colorscale
        const colorScale = d3.scaleLinear()
            .domain([0, d3.max(age.map(d => d.age))])
            .range(["green", "red"])
            d3.interpolateRgb("red", "green")(0.5)

  // HTML ELEMENTS 
  // svg
  const svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

  // Axes
  const xAxis = d3.axisBottom(xScale)
  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .attr("color", "darkgrey")
    .call(xAxis);

  const yAxis = d3.axisLeft(yScale)
  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .attr("color", "darkgrey")
    .call(yAxis);

// Axes Labels
   
  // X-Axis
  svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", margin.right*6)
    .attr("y", height - 6)
    .attr("fill", "darkgrey")
    .text("Age");

  // Y-Axis
  svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("x", -250)
    .attr("dy", ".75em")
    .attr("fill", "darkgrey")
    .attr("transform", "rotate(-90)")
    .text("Number of Breaches");
    

  // circles 
  const gdots = svg.selectAll("g.dot")
    .data(data)
    .enter().append('g');

  gdots.append("circle")
    .attr("cx", d => xScale(d.age))
    .attr("cy", d => yScale(d.breach))
    .attr("opacity", "0.8")
    .attr("fill", d => colorScale(d.age))

* Bar Chart 1

/* SCALES */
// xscale - linear, count
// const xScale = d3.scaleLinear()
//               .domain([0, d3.max(data, d => d.count)])
//               .range([margin,width-margin])
  

// // yscale - categorical, activity
// const yScale = d3.scaleBand()
//               .domain(data.map(d => d.activity))
//               .range([height-margin,margin])
//               .paddingInner(.2)

// //color scale
// const colorScale = d3.scaleOrdinal(d3.schemeAccent)
//               .domain(data.map(d => d.activity))
//               .range(d3.schemeBlues[9])

//   /* HTML ELEMENTS */
//  // svg
//  const svg = d3.select("#container")
//             .append("svg")
//             .attr("width",width)
//             .attr("height",height)

//  // bars
//         svg.selectAll("rect")
//           .data(data)
//           .join("rect")
//           .attr("width", d=> xScale(d.count))
//           .attr("height", yScale.bandwidth())
//           .attr("x", margin)
//           .attr("y", d=> yScale(d.activity))
//           .attr("fill", d=> colorScale(d.activity)) //adding color using 'color scale'

//         svg.append("g")
//           .attr("class","x-axis")
//           .style("transform", `translate(0px,${height-margin}px)`)
//           .call(d3.axisBottom(xScale))
          
//         svg.append("g")
//           .attr("class","y-axis")
//           .style("transform", `translate(${margin}px,0px)`)
//           .call(d3.axisLeft(yScale))
//  })


// * Bar Chart 2



// */

// Overall: Need to add state management***



// /* CONSTANTS and GLOBALS */
// const width = window.innerWidth * 0.07,
//     height = window.innerHeight * 0.07;
// let svg;

// /* STATE */
// let state = {
//     data: []
//     // ... and other uploading functions
// }

// /* DATA */
// d3.json(YOUR_DATA_PATH, d3.autoType).then(raw_data => {
//     state.data = raw_data;
//     init()
// });

// /* INITIALIZE */ 
// function init() {
//     //thing that only runs once

//     draw();
// }

// /* DRAW */ 
// function draw() {
//     // things that run every time we update the data

// }






 // *************

// console.log("> First")
// console.log("> Second")
// console.log("> Second")
// const first = () => console.log("> First")
// const second = () => console.log("> Second")
// const third = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log("> Third")
//         resolve()
//     }, 0)
// })
// const fourth = () => console.log("> Fourth")

// first()
// second()
// third.then(fourth)

// /*Constant and Globals*/
// const width = 500,
// height = 500;
// radius = 5;

// // these variables allow us to acces anything we manipulate in init() ut need access to in draw() as well.
// //All these variables are empty before we assign something to them
// let svg; 
// let xScale;
// let yScale;
// let colorscale;

// /* Application State */
// let state = {
//     data: [],
//     selectedParty: "All" // + your initial filter
//     // selection
// }

// /* Load data */
// d3.json("..data/environmentRatings.json", d3. autoType).then(raw_data => {
//     console.log("data, raw_data");
//     state.data = raw_data;
//     init();
// })



