Plan Map

JS
*CONSTANTS + GLOBALS

 const width = window.innerWidth * 0.9,
 height = window.innerHeight * 0.7,
 margin = { top: 20, bottom: 50, left: 60, right: 40 };

 let svg;

*STATE (technically this is part of constants and globals)

let state = {
 geojson: null,
 extremes: null,
 hover: {
   latitude: null,
   longitude: null,
   state: null,
 },
};


*LOAD DATA
***need to load in another dataset, name it, and pull it into state

Promise.all([
 d3.json("../data/usState.json")
]).then(([geojson]) => {
 state.geojson = geojson;
 // console.log("state: ", state);
 init();
});

*INIT
*** need to add color scale

function init() {
    const projection = d3.geoAlbersUsa().fitSize([width, height], state.geojson);
    const path = d3.geoPath().projection(projection);

    svg = d3
        .select("#container")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
    svg
    .selectAll(".state")
   // all of the features of the geojson, meaning all the states as individuals
   .data(state.geojson.features)
   .join("path")
   .attr("d", path)
   .attr("class", "state")
   .attr("fill", "transparent")
   .on("mouseover", (mouseEvent, d) => {
     // when the mouse rolls over this feature, do this
     state.hover["state"] = d.properties.NAME;
     draw(); // re-call the draw function when we set a new hoveredState
   });

   svg.on("mousemove", (e) => {
   // we can d3.pointer to tell us the exact x and y positions of our cursor
   const [mx, my] = d3.pointer(e);
   // projection can be inverted to return [lat, long] from [x, y] in pixels
   const proj = projection.invert([mx, my]);
   state.hover["longitude"] = proj[0];
   state.hover["latitude"] = proj[1];
   draw();
 });
    draw(); 
}

*DRAW
function draw() {
 // return an array of [key, value] pairs
 hoverData = Object.entries(state.hover);

  d3.select("#hover-content")
    .selectAll("div.row")
    .data(hoverData)
    .join("div")
    .attr("class", "row")
    .html(
      d =>
        // each d is [key, value] pair
        d[1] // check if value exist
          ? `${d[0]}: ${d[1]}` // if they do, fill them in
          : null // otherwise, show nothing
    );
}

—————————————————————————————————  



Plan Bar Chart

*CONSTANTS + GLOBALS


*STATE (technically this is part of constants and globals)


*LOAD DATA


*INIT


*DRAW

————————————————————————————————— 




Plan Scatterplot

*CONSTANTS + GLOBALS


*STATE (technically this is part of constants and globals)


*LOAD DATA


*INIT


*DRAW
