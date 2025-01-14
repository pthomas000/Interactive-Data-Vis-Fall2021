/* CONSTANTS AND GLOBALS */
const width = window.innerWidth *.8 ;
const height = 500;
const margin = 65;

/* LOAD DATA */
d3.csv('../data/squirrelActivities.csv', d3.autoType)
.then(data => {
  console.log("data", data)

 /* SCALES */
// xscale - linear, count
const xScale = d3.scaleLinear()
              .domain([0, d3.max(data, d => d.count)])
              .range([margin,width-margin])
  

// yscale - categorical, activity
const yScale = d3.scaleBand()
              .domain(data.map(d => d.activity))
              .range([height-margin,margin])
              .paddingInner(.2)

//color scale
const colorScale = d3.scaleOrdinal(d3.schemeAccent)
              .domain(data.map(d => d.activity))
              .range(d3.schemeBlues[9])

  /* HTML ELEMENTS */
 // svg
 const svg = d3.select("#container")
            .append("svg")
            .attr("width",width)
            .attr("height",height)

 // bars
        svg.selectAll("rect")
          .data(data)
          .join("rect")
          .attr("width", d=> xScale(d.count))
          .attr("height", yScale.bandwidth())
          .attr("x", margin)
          .attr("y", d=> yScale(d.activity))
          .attr("fill", d=> colorScale(d.activity)) //adding color using 'color scale'

        svg.append("g")
          .attr("class","x-axis")
          .style("transform", `translate(0px,${height-margin}px)`)
          .call(d3.axisBottom(xScale))
          
        svg.append("g")
          .attr("class","y-axis")
          .style("transform", `translate(${margin}px,0px)`)
          .call(d3.axisLeft(yScale))
 })





