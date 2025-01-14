/***************** MAP ********************/

// *CONSTANTS + GLOBALS

 const width = window.innerWidth * 0.45,
 height = window.innerHeight * 0.7,
 margin = { top: 20, bottom: 30, left: 0, right: 0 };

 let svg;

// *STATE (technically this is part of constants and globals)

let state = {
 geojson: null,
 statebreaches: null,
 hover: {
  //  state: null,
  //  breachtot: null,
  //  severe: null,
  //  moderate: null,
  //  basic: null
 },
};


// *LOAD DATA
// ***need to load in another dataset, name it, and pull it into state

Promise.all([
 d3.json("../data/usState.json"),
 d3.csv("../data/dataPrivacy_state.csv")
]).then(([geojson, statebreaches]) => {
 state.geojson = geojson;
 state.statebreaches = statebreaches;
//  console.log("state: ", state);
 init();
});
// console.log(state)
// console.log(state)

// *INIT
// *** need to add color scale

function init() {

    colorScale = d3.scaleSequential()
    .interpolator(d3.interpolateReds)
    .domain(d3.extent(state.statebreaches, d => d['pct_total']))

    const populationLookup = new Map(state.statebreaches.map(d => [
      d['state'], d['pct_total'], d['avgbreachtot']
    ]))

    const avgBreachLookup = new Map(state.statebreaches.map(d => [
      d['state'], d['avgbreachtot']
    ]))

    // const breachtotLookup = new Map(state.statebreaches.map())
    // console.log('populationLookup :>>', populationLookup.get("California"));
    console.log(populationLookup)

    svg = d3
    .select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

    hoverBox = d3.select("#hover-content")
    
    const projection = d3.geoAlbersUsa().fitSize([width, height], state.geojson);
    const pathGen = d3.geoPath().projection(projection);

    const usState = svg
    .selectAll("path.state")
   // all of the features of the geojson, meaning all the states as individuals
   .data(state.geojson.features)
   .join("path")
  //  .attr("d", path)
   .attr("class", "state")
   .attr("d", d => pathGen(d))
   .style("stroke", "white")
   .attr("fill", (d) => {
     return colorScale(+populationLookup.get(d.properties.NAME)) //**** */
   })

   .on("mouseover", (mouseEvent, d) => {
     // when the mouse rolls over this feature, do this
     state.hover["State"] = d.properties.NAME;
     console.log(populationLookup.get(d.properties.NAME))
     state.hover["% of Total Breaches"] = populationLookup.get(d.properties.NAME).substring(0,4);
     state.hover["Avg # of Breaches/Individual"] = avgBreachLookup.get(d.properties.NAME).substring(0,4);
     console.log(state)
     draw(); // re-call the draw function when we set a new hoveredState
   });

//   //  console.log(projection)
// const stateBreaches = svg
// .selectAll("")
// .data(state.statebreaches)
// join("text")
// .attr("class", "state")
  //  svg.on("mousemove", (e) => {

  //  // we can d3.pointer to tell us the exact x and y positions of our cursor
  //  const [mx, my] = d3.pointer(e);
  //  // projection can be inverted to return [lat, long] from [x, y] in pixels
  //  state.x = e.clientX;
  //  state.y = e.clientY;
  // //  const proj = projection.invert([mx, my]);
  //   // console.log(proj)
  // // const proj = state.statebreaches.breachtot;
  // // const proj = state.statebreaches.invert([breachtot, avgbreachtot]);
  //  state.hover["Total breaches"] = populationLookup.value;
  // //  state.hover["state"] = d.properties.NAME;
  //  draw();

// const stateBreaches = svg
// .selectAll("#container")
// .data(state.statebreaches)
// join("text")
// .attr("class", "test")
// .on("mousemove", (e) => {

//    // we can d3.pointer to tell us the exact x and y positions of our cursor
//    const [mx, my] = d3.pointer(e);
//    // projection can be inverted to return [lat, long] from [x, y] in pixels
//    state.x = e.clientX;
//    state.y = e.clientY;
//   //  const proj = projection.invert([mx, my]);
//     // console.log(proj)
//   // const proj = state.statebreaches.breachtot;
//   // const proj = state.statebreaches.invert([breachtot, avgbreachtot]);
//    state.hover["Total breaches"] = d.breachtot;
//    state.hover["state"] = d.state;
//    draw();
//  });
    draw(); 
}

// *DRAW
// *** fix tooltip
function draw() {
//  return an array of [key, value] pairs
//  console.log('state :>> ', state);
//   hoverData = Object.entries(state.hover);
// // console.log(hoverData)
//  hoverBox
//   .data(hoverData)
//   .style("padding", "10px")
//   .style("background-color", "white")
//   .style("top",state.y + "px")
//   .style("left", state.x + "px")
//   .html(
//     console.log(d)
    
//     d =>
//       // each d is [key, value] pair
//       d[1] // check if value exist
//         ? `${d[0]}: ${d[1]}` // if they do, fill them in
//         : null, // otherwise, show nothing
//   );
//   }
 hoverData = Object.entries(state.hover);
console.log(hoverData)
  d3.select("#hover-content")
    .selectAll("div")
    .data(hoverData)
    .join("div")
    // .attr("x", clientX)
    // .attr("y",clientY)
    // .style("width", "auto")
    // .style("height", "auto")
    .style("background-color", "fafafa")
    .attr("class", "div")
    .html(
      d =>
        // each d is [key, value] pair
        d[1] // check if value exist
          ? `${d[0]}: ${d[1]}` // if they do, fill them in
          : null // otherwise, show nothing
    );

}

/***************** BAR CHART: Education ********************/



/* CONSTANTS AND GLOBALS */
const width2 = window.innerWidth *.4 ;
const height2 = 500;
const margin2 = 65;

/* LOAD DATA */
d3.csv('../data/dataPrivacy_inc.csv', d3.autoType),
d3.csv('../data/dataPrivacy_educ.csv', d3.autoType)
.then(data => {
  // console.log("data", data)

 /* SCALES */
// xscale - linear, count
const xScale = d3.scaleLinear()
              .domain([0, d3.max(data, d => d.avgbreachtot)])
              .range([margin2+10,width2-margin2])
  

// yscale - categorical, activity
const yScale = d3.scaleBand()
              .domain(data.map(d => d.educ))
              .range([height2-margin2,margin2])
              .paddingInner(.2)

//color scale
const colorScale = d3.scaleOrdinal(d3.schemeAccent)
              .domain(data.map(d => d.activity))
              .range(d3.schemeReds[9])

  /* HTML ELEMENTS */
 // svg
svg = d3.select("#container2")
            .append("svg")
            .attr("width",width2)
            .attr("height",height2)

 // bars
        svg.selectAll("rect")
          .data(data)
          .join("rect")
          .attr("width", d=> xScale(d.avgbreachtot)-margin2)
          .attr("height", yScale.bandwidth())
          .attr("x", margin2+10)
          .attr("y", d=> yScale(d.educ))
          .attr("fill", d=> colorScale(d.educ)) //adding color using 'color scale'

        svg.append("g")
          .attr("class","x-axis")
          .style("transform", `translate(0px,${height2-margin2}px)`)
          .call(d3.axisBottom(xScale))
          .style("color", "#676767")

          
        svg.append("g")
          .attr("class","y-axis")
          .style("transform", `translate(${margin2+10}px,0px)`)
          .call(d3.axisLeft(yScale))
          .style("color", "#676767")

 })


 // ***************** BAR CHART: Income ********************/



/* CONSTANTS AND GLOBALS */
const width4 = window.innerWidth *.4 ;
const height4 = 500;
const margin4 = 65;

/* LOAD DATA */
d3.csv('../data/dataPrivacy_inc.csv', d3.autoType)
.then(data => {
  // console.log("data", data)

 /* SCALES */
// xscale - linear, count
const xScale4 = d3.scaleLinear()
              .domain([0, d3.max(data, d => d.avgbreachtot)])
              .range([margin4+10,width4-margin4])
  

// yscale - categorical, activity
const yScale4 = d3.scaleBand()
              .domain(data.map(d => d.inc))
              .range([height4-margin4,margin4])
              .paddingInner(.2)

//color scale
const colorScale4 = d3.scaleOrdinal(d3.schemeAccent)
              .domain(data.map(d => d.inc))
              .range(d3.schemeReds[3])

  /* HTML ELEMENTS */
 // svg
svg4 = d3.select("#container4")
            .append("svg")
            .attr("width",width4)
            .attr("height",height4)

 // bars
        svg4.selectAll("rect")
          .data(data)
          .join("rect")
          .attr("width", d=> xScale4(d.avgbreachtot)-margin2)
          .attr("height", yScale4.bandwidth())
          .attr("x", margin4+10)
          .attr("y", d=> yScale4(d.inc))
          .attr("fill", d=> colorScale4(d.inc)) //adding color using 'color scale'

        svg4.append("g")
          .attr("class","x-axis")
          .style("transform", `translate(0px,${height4-margin4}px)`)
          .call(d3.axisBottom(xScale4))
          .style("color", "#676767")
          
        svg4.append("g")
          .attr("class","y-axis")
          .style("transform", `translate(${margin4+10}px,0px)`)
          .call(d3.axisLeft(yScale4))
          .style("color", "#676767")

 })

 /********** SCATTERPLOT **************/

 /* CONSTANTS AND GLOBALS */
 const width3 = window.innerWidth * 0.35,
   height3 = window.innerHeight * 0.7,
   margin3 = { top: 50, bottom: 60, left: 60, right: 40 },
   radius3 = 4;
 
 /* LOAD DATA */
 d3.csv('../data/age_groups.csv', d3.autoType)
.then(data => {
   console.log(data)
 
   /* SCALES */
   // xscale  - linear,count
   const xScale = d3.scaleLinear()
     .domain([0, d3.max(data.map(d => d.age))])
     .range([margin3.left, width3 - margin3.right])
 
     // yscale - linear,count
   const yScale = d3.scaleLinear()
     .domain([0, d3.max(data, d => d.breachtot)])
     .range([height3 - margin3.bottom, margin.top])
 
     //radiusscale - proportionate to EPI (Environmental Performance Index) ranking 
     const radiusScale = d3.scaleSqrt()
     .domain([0, d3.max(data, d => d.freq*10)])
     .range([0,50])
 
     //colorscale
   const colorScale = d3.scaleLinear()
     .domain([0, d3.max(data.map(d => d.breachtot))])
     .range(["red", "red"])
 
   /* HTML ELEMENTS */
   // svg
   const svg = d3.select("#container3")
     .append("svg")
     .attr("width", width3)
     .attr("height", height3)
     .style("float", "right")
 
   // Axes
   const xAxis = d3.axisBottom(xScale)
   svg.append("g")
     .attr("transform", `translate(0,${height3 - margin3.bottom})`)
     .style("color", "#676767")
     .call(xAxis);
 
   const yAxis = d3.axisLeft(yScale)
   svg.append("g")
     .attr("transform", `translate(${margin3.left},0)`)
     .style("color", "#676767")
     .call(yAxis);
 
 // Axes Labels
    
   // X-Axis
   svg.append("text")
     .attr("class", "x label")
     .attr("text-anchor", "end")
     .attr("x", margin3.right*6)
     .attr("y", height3 - 6)
     .attr("fill", "darkgrey")
     .text("Age");
 
   // Y-Axis
   svg.append("text")
     .attr("class", "y label")
     .attr("text-anchor", "end")
     .attr("x", -75)
     .attr("dy", ".75em")
     .attr("fill", "darkgrey")
     .attr("transform", "rotate(-90)")
     .text("Number of Breaches");
     
 
   // circles and country labels
 
   const gdots = svg.selectAll("g.dot")
     .data(data)
     .enter().append('g');
 
   gdots.append("circle")
     .attr("cx", d => xScale(d.age))
     .attr("cy", d => yScale(d.breachtot))
     .attr("r", d => radiusScale(d.freq))
     .attr("stroke-width", "1.5")
     .attr("stroke", d => colorScale(d.breachtot))
     .attr("fill","none")
     .attr("opacity", "1")


     // .append('title')
     // .text((d) => `Sales were ${d.country} in ${d.epi}`);
 
    //  gdots.append("text")
    //  .text(d => d.country)
    //  .attr("x", d => xScale(d.eco))
    //  .attr("y", d => yScale(d.hlt))
    //  // .attr("dy", 10)
    //  .attr("dx", 10)
    //  .style("z-index", "10")
    //  .attr("font-size", 10)
    //  .attr("fill", "white");
     
 
 // gdots.enter().append("div")
 //   .style("width", function(d) { return x(d) + "px"; })
 //   .text(d =>  d.country)
 //   .on("mouseover", function(d){tooltip.text(d); return tooltip.style("visibility", "visible");})
 //     .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
 //     .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
 
 })



//  /********** SCATTERPLOT **************/

//  /* CONSTANTS AND GLOBALS */
//  const width3 = window.innerWidth * 0.7,
//    height3 = window.innerHeight * 0.7,
//    margin3 = { top: 50, bottom: 60, left: 60, right: 40 },
//    radius3 = 4;
 
//  /* LOAD DATA */
//  Promise.all([
//  d3.csv('../data/age_groups.csv', d3.autoType)
// ]).then(([agebreaches]) => {
//   state.agebreaches = agebreaches;
//    console.log(agebreaches);
//    init4();
// });
 
//    /* SCALES */
//    // xscale  - linear,count
//    function init4() {
//    const xScale = d3.scaleLinear()
//      .domain([0, d3.max(state.agebreaches.map(d => d.age))])
//      .range([margin3.left, width3 - margin3.right])
 
//      // yscale - linear,count
//    const yScale = d3.scaleLinear()
//      .domain([0, d3.max(state.agebreaches, d => d.breachtot)])
//      .range([height3 - margin3.bottom, margin.top])
 
//      //radiusscale - proportionate to EPI (Environmental Performance Index) ranking 
//      const radiusScale = d3.scaleSqrt()
//      .domain([0, d3.max(state.agebreaches, d => d.freq*10)])
//      .range([0,50])
 
//      //colorscale
//    const colorScale = d3.scaleLinear()
//      .domain([0, d3.max(state.agebreaches.map(d => d.breachtot))])
//      .range(["red", "red"])
 
//      const breachLookup = new Map(state.agebreaches.map(d => [
//       d['age'], d['breachtot'], d['freq']
//     ]))
//     const avgBreachLookup2 = new Map(state.agebreaches.map(d => [
//       d['age'], d['breachtot']
//     ]))
//     console.log(avgBreachLookup2)


//    /* HTML ELEMENTS */
//    // svg
//    const svg = d3.select("#container3")
//      .append("svg")
//      .attr("width", width3)
//      .attr("height", height3)
 
//    // Axes
//    const xAxis = d3.axisBottom(xScale)
//    svg.append("g")
//      .attr("transform", `translate(0,${height3 - margin3.bottom})`)
//      .style("color", "#676767")
//      .call(xAxis);
 
//    const yAxis = d3.axisLeft(yScale)
//    svg.append("g")
//      .attr("transform", `translate(${margin3.left},0)`)
//      .style("color", "#676767")
//      .call(yAxis);
 
//  // Axes Labels
    
//    // X-Axis
//    svg.append("text")
//      .attr("class", "x label")
//      .attr("text-anchor", "end")
//      .attr("x", margin3.right*6)
//      .attr("y", height3 - 6)
//      .attr("fill", "darkgrey")
//      .text("Age");
 
//    // Y-Axis
//    svg.append("text")
//      .attr("class", "y label")
//      .attr("text-anchor", "end")
//      .attr("x", -75)
//      .attr("dy", ".75em")
//      .attr("fill", "darkgrey")
//      .attr("transform", "rotate(-90)")
//      .text("Number of Breaches");
     
 
//    // circles and country labels
 
//    const gdots = svg.selectAll("g.dot")
//      .data(state.agebreaches)
//      .enter().append('g');
 
//    gdots.append("circle")
//      .attr("cx", d => xScale(d.age))
//      .attr("cy", d => yScale(d.breachtot))
//      .attr("r", d => radiusScale(d.freq))
//      .attr("stroke-width", "1.5")
//      .attr("stroke", d => colorScale(d.breachtot))
//      .attr("fill","none")
//      .attr("opacity", "1")

//      .on("mouseover", (mouseEvent, d) => {
//       // when the mouse rolls over this feature, do this
//       state.hover2["Age"] = d.properties.NAME;
//       console.log(breachLookup.get(d.properties.NAME))
//       state.hover2["% of Total Breaches"] = breachLookup.get(d.properties.NAME);
//       state.hover2["Avg # of Breaches/Individual"] = avgBreachLookup2.get(d.properties.NAME);
//       console.log(state)
//       draw(); // re-call the draw function when we set a new hoveredState
//     });
    
//      // .append('title')
//      // .text((d) => `Sales were ${d.country} in ${d.epi}`);
 
//     //  gdots.append("text")
//     //  .text(d => d.country)
//     //  .attr("x", d => xScale(d.eco))
//     //  .attr("y", d => yScale(d.hlt))
//     //  // .attr("dy", 10)
//     //  .attr("dx", 10)
//     //  .style("z-index", "10")
//     //  .attr("font-size", 10)
//     //  .attr("fill", "white");
     
 
//  // gdots.enter().append("div")
//  //   .style("width", function(d) { return x(d) + "px"; })
//  //   .text(d =>  d.country)
//  //   .on("mouseover", function(d){tooltip.text(d); return tooltip.style("visibility", "visible");})
//  //     .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
//  //     .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
//  draw4();
//  };

// function draw4() {
//   hoverData2 = Object.entries(state.hover2);
// console.log(hoverData2)
//   d3.select("#hover-content2")
//     .selectAll("div")
//     .data(hoverData2)
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





//  /***************** SCATTERPLOT ********************/

//  /* CONSTANTS AND GLOBALS */
// const width3 = window.innerWidth * 0.7,
// height3 = window.innerHeight * 0.7,
// margin3 = { top: 20, bottom: 60, left: 60, right: 40 },
// radius3 = 5;

// // these variables allow us to access anything we manipulate in init() but need access to in draw().
// // All these variables are empty before we assign something to them.
// let xScale3;
// let yScale3;
// let colorScale3;

// /* APPLICATION STATE */
// let state3 = {
// data: [],
// selectedParty: "All" // + YOUR INITIAL FILTER SELECTION
// };

// /* LOAD DATA */
// d3.csv("../data/dataPrivacy_age.csv", d3.autoType).then(raw_data => {
// // + SET YOUR DATA PATH
// console.log("data", raw_data);
// // save our data to application state
// state3.data = raw_data;
// init2();
// });

// /* INITIALIZING FUNCTION */
// // this will be run *one time* when the data finishes loading in
// function init2() {
// // + SCALES
// xScale3 = d3.scaleLinear()
//   .domain(d3.extent(state3.data, d => d.age))
//   .range([margin3.left, width3 - margin3.right])

// yScale3 = d3.scaleLinear()
//   .domain(d3.extent(state3.data, d => d.breachtot))
//   .range([height3 - margin3.bottom, margin3.bottom])

// colorScale3 = d3.scaleOrdinal()
//   .domain(["R", "D"])
//   .range(["red", "blue", "purple"])

// // + AXES
// const xAxis3 = d3.axisBottom(xScale3)
// const yAxis3 = d3.axisLeft(yScale3)

// // + UI ELEMENT SETUP
// const selectElement = d3.select("#dropdown") // select dropdown element from HTML
// // add in dropdown options
// selectElement
//   .selectAll("option")
//   .data([ // can do this programmatically also if we want
//     { key: "All", label: "All" }, // doesn't exist in data, we're adding this as an extra option
//     { key: "R", label: "Republican" },
//     { key: "D", label: "Democrat" }])
//   .join("option")
//   .attr("value", d => d.key) // set the key to the 'value' -- what we will use to FILTER our data later
//   .text(d => d.label); // set the label to text -- easier for the user to read than the key

// // set up our event listener
// selectElement.on("change", event => {
//   // 'event' holds all the event information that triggered this callback
//   console.log("DROPDOWN CALLBACK: new value is", event.target.value);
//   // save this new selection to application state
//   state3.selectedParty = event.target.value
//   console.log("NEW STATE:", state3);
//   draw2(); // re-draw the graph based on this new selection
// });

// // + CREATE SVG ELEMENT
// svg = d3.select("#container3")
//   .append("svg")
//   .attr("width", width3)
//   .attr("height", height3)

// // + CALL AXES
// const xAxisGroup = svg.append("g")
//   .attr("class", 'xAxis3')
//   .attr("transform", `translate(${0}, ${height3 - margin3.bottom})`) // move to the bottom
//   .call(xAxis3)

// const yAxisGroup = svg.append("g")
//   .attr("class", 'yAxis3')
//   .attr("transform", `translate(${margin3.left}, ${0})`) // align with left margin
//   .call(yAxis3)

// // add labels - xAxis
// xAxisGroup.append("text")
//   .attr("class", 'axis-title2')
//   .attr("x", width3 / 2)
//   .attr("y", 40)
//   .attr("text-anchor", "middle")
//   .text("Ideology Score 2020")

// // add labels - yAxis
// yAxisGroup.append("text")
//   .attr("class", "axis-title2")
//   .attr("x", -40)
//   .attr("y", height3 / 2)
//   .attr("writing-mode", "vertical-lr")
//   .attr("text-anchor", "middle")
//   .text("Environmental Score 2020")

// draw2(); // calls the draw function
// }

// /* DRAW FUNCTION */
// // we call this every time there is an update to the data/state
// function draw2() {

// // + FILTER DATA BASED ON STATE
// // const filteredData = state3.data
// //   .filter(d => state3.selectedParty === "All" || state3.selectedParty === d.Party)

// // const dot = svg
// //   .selectAll("circle")
// //   .data(filteredData, d => d.BioID)
// //   .join(
// //     // + HANDLE ENTER SELECTION
// //     enter => enter.append("circle")
// //       .attr("r", radius3)
// //       .attr("fill", d => colorScale3(d.Party))
// //       .attr("cx", 0) // start dots on the left
// //       .attr("cy", d => yScale3(d.envScore2020))
// //       .call(sel => sel.transition()
// //         .duration(500)
// //         .attr("cx", d => xScale3(d.ideologyScore2020)) // transition to correct position
// //       ),

// //     // + HANDLE UPDATE SELECTION
// //     update => update
// //       .call(sel => sel
// //         .transition()
// //         .duration(250)
// //         .attr("r", radius3 * 1.5) // increase radius size
// //         .transition()
// //         .duration(250)
// //         .attr("r", radius3) // bring it back to original size
// //       ),

// //     // + HANDLE EXIT SELECTION
// //     exit => exit
// //       .call(sel => sel
// //         .attr("opacity", 1)
// //         .transition()
// //         .duration(500)
// //         .attr("opacity", 0)
// //         .remove()
// //       )
// //   );



//   const dot = svg
//   .selectAll("circle")
//   .data([ // can do this programmatically also if we want
//     { key: "All", label: "All" }, // doesn't exist in data, we're adding this as an extra option
//     { key: "R", label: "Republican" },
//     { key: "D", label: "Democrat" }])
//   .join(
//     // + HANDLE ENTER SELECTION
//     enter => enter.append("circle")
//       .attr("r", radius3)
//       .attr("fill", d => colorScale3(d.age))
//       .attr("cx", 0) // start dots on the left
//       .attr("cy", d => yScale3(d.breachtot))
//       .call(sel => sel.transition()
//         .duration(500)
//         .attr("cx", d => xScale3(d.age)) // transition to correct position
//       ),

//     // + HANDLE UPDATE SELECTION
//     update => update
//       .call(sel => sel
//         .transition()
//         .duration(250)
//         .attr("r", radius3 * 1.5) // increase radius size
//         .transition()
//         .duration(250)
//         .attr("r", radius3) // bring it back to original size
//       ),

//     // + HANDLE EXIT SELECTION
//     exit => exit
//       .call(sel => sel
//         .attr("opacity", 1)
//         .transition()
//         .duration(500)
//         .attr("opacity", 0)
//         .remove()
//       )
//   );
// }