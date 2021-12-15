/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 50, bottom: 60, left: 60, right: 40 },
  radius = 4;

/* LOAD DATA */
d3.csv("../data/EPI.csv", d3.autoType).then(data => {
  console.log(data)

  /* SCALES */
  // xscale  - linear,count
  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data.map(d => d.eco))])
    .range([margin.left, width - margin.right])

    // yscale - linear,count
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.hlt)])
    .range([height - margin.bottom, margin.top])

    //radiusscale - proportionate to EPI (Environmental Performance Index) ranking 
    const radiusScale = d3.scaleSqrt()
    .domain([0, d3.max(data, d => d.epi)])
    .range([8,2])

    //colorscale
  const colorScale = d3.scaleLinear()
    .domain([0, d3.max(data.map(d => d.eco))])
    .range(["green", "red"])
    d3.interpolateRgb("red", "green")(0.5)

  /* HTML ELEMENTS */
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
    .style("font-family", "Inter")
    .style("text-align", "center")
    .style("transform", `translate(${35}%,0px)`)
    .text("Ecosystem Vitality Ranking");

  // Y-Axis
  svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("x", -250)
    .attr("dy", ".75em")
    .attr("fill", "darkgrey")
    .attr("transform", "rotate(-90)")
    .style("font-family", "Inter")
    // .style("transform", `translate(100px,0px)`)
    .text("Environmental Health Ranking");
    

  // circles and country labels

  const gdots = svg.selectAll("g.dot")
    .data(data)
    .enter().append('g');

  gdots.append("circle")
    .attr("cx", d => xScale(d.eco))
    .attr("cy", d => yScale(d.hlt))
    .attr("r", "5")
    // .attr("r", d => radiusScale(d.epi))
    .attr("opacity", "0.8")
    .attr("fill", d => colorScale(d.hlt))
    .append('title')
    .text((d) => `In ${d.country}, the Eco Score is ${d.eco} and the Health Ranking is ${d.hlt}`)
    // .on("mouseover", function(d){tooltip.text(d); return tooltip.style("visibility", "visible");})
    // .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
    // .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

    // .append('title')
    // .text((d) => `Sales were ${d.country} in ${d.epi}`);

    
    gdots.append("text")
    // .text(d => d.country)
    .attr("x", d => xScale(d.eco))
    .attr("y", d => yScale(d.hlt))
    // .attr("dy", 10)
    .attr("dx", 10)
    .style("z-index", "10")
    .attr("font-size", 10)
    .attr("fill", "white")
    
    // .on("mouseover", (mouseEvent, d) => {
    //   // when the mouse rolls over this feature, do this
    //   state.hover["State"] = d.properties.NAME;
    //   state.hover["% of Total Breaches"] = populationLookup.get(d.properties.NAME).substring(0,4);
    //   state.hover["Avg # of Breaches/Individual"] = avgBreachLookup.get(d.properties.NAME).substring(0,4);
    //   console.log(state)
    //   draw(); // re-call the draw function when we set a new hoveredState
    // });
    

gdots.enter().append("div")
  .style("width", function(d) { return x(d) + "px"; })
  .text(d =>  d.country)
  .style("color", "white")
  
})

// /* CONSTANTS AND GLOBALS */

// const width = window.innerWidth * 0.7,
//   height = window.innerHeight * 0.7,
//   margin = { top: 50, bottom: 60, left: 60, right: 40 },
//   radius = 4;


// /* STATE */

// Promise.all([
//   d3.csv("../data/EPI.csv")
//  ]).then(([rankings]) => {
//   state.rankings = rankings;
//   console.log("data: ", rankings);
//   init();
//  });

// /* INIT */
// function init() {

//   // yscale - linear,count
//   const yScale = d3.scaleLinear()
//     .domain([0, d3.max(data, d => d.hlt)])
//     .range([height - margin.bottom, margin.top])

//     //radiusscale - proportionate to EPI (Environmental Performance Index) ranking 
//     const radiusScale = d3.scaleSqrt()
//     .domain([0, d3.max(data, d => d.epi)])
//     .range([8,2])

//     //colorscale
//   const colorScale = d3.scaleLinear()
//     .domain([0, d3.max(data.map(d => d.eco))])
//     .range(["green", "red"])
//     d3.interpolateRgb("red", "green")(0.5)

//      /* HTML ELEMENTS */
//   // svg
//   const svg = d3.select("#container")
//   .append("svg")
//   .attr("width", width)
//   .attr("height", height)

// // Axes
// const xAxis = d3.axisBottom(xScale)
// svg.append("g")
//   .attr("transform", `translate(0,${height - margin.bottom})`)
//   .attr("color", "darkgrey")
//   .call(xAxis);

// const yAxis = d3.axisLeft(yScale)
// svg.append("g")
//   .attr("transform", `translate(${margin.left},0)`)
//   .attr("color", "darkgrey")
//   .call(yAxis);

// // Axes Labels
 
// // X-Axis
// svg.append("text")
//   .attr("class", "x label")
//   .attr("text-anchor", "end")
//   .attr("x", margin.right*6)
//   .attr("y", height - 6)
//   .attr("fill", "darkgrey")
//   .text("Ecosystem Vitality Ranking");

// // Y-Axis
// svg.append("text")
//   .attr("class", "y label")
//   .attr("text-anchor", "end")
//   .attr("x", -250)
//   .attr("dy", ".75em")
//   .attr("fill", "darkgrey")
//   .attr("transform", "rotate(-90)")
//   .text("Environmental Health Ranking");
  

// // circles and country labels

// const gdots = svg.selectAll("g.dot")
//   .data(data)
//   .enter().append('g');

// gdots.append("circle")
//   .attr("cx", d => xScale(d.eco))
//   .attr("cy", d => yScale(d.hlt))
//   .attr("r", d => radiusScale(d.epi))
//   .attr("opacity", "0.8")
//   .attr("fill", d => colorScale(d.hlt))
//   // .append('title')
//   // .text((d) => `Sales were ${d.country} in ${d.epi}`);



//   gdots.append("text")
//   .text(d => d.country)
//   .attr("x", d => xScale(d.eco))
//   .attr("y", d => yScale(d.hlt))
//   // .attr("dy", 10)
//   .attr("dx", 10)
//   .style("z-index", "10")
//   .attr("font-size", 10)
//   .attr("fill", "white")
//   .on("mouseover", (mouseEvent, d) => {
//     // when the mouse rolls over this feature, do this
//     state.hover["State"] = d.properties.NAME;
//     state.hover["% of Total Breaches"] = populationLookup.get(d.properties.NAME).substring(0,4);
//     state.hover["Avg # of Breaches/Individual"] = avgBreachLookup.get(d.properties.NAME).substring(0,4);
//     console.log(state)
//     draw(); // re-call the draw function when we set a new hoveredState
//   });

// }

// /* DRAW */
// function draw() {
//   hoverData = Objects.entries(state.hover);
//   console.log(hoverData)
//   d3.select("#hover-content")
//     .selectAll("div")
//     .data(hoverData)
//     .join("div")
//     // .attr("x", clientX)
//     // .attr("y",clientY)
//     // .style("width", "auto")
//     // .style("height", "auto")
//     .style("background-color", "fafafa")
//     .attr("class", "div")
//     .html(
//       d =>
//         // each d is [key, value] pair
//         d[1] // check if value exist
//           ? `${d[0]}: ${d[1]}` // if they do, fill them in
//           : null // otherwise, show nothing
//     );
// }