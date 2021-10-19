/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.9,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 };

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
  
  // APPEND DATA AS SHAPE

});