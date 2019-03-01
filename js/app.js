
// LEVEL 1 : D3 Dabbler - Create a scatter plot between two data variables
// Setting the dimensions for the SVG container
var svgHeight = window.innerHeight;
var svgWidth = window.innerWidth;

// Define the chart's margins as an object
var chartMargin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
  };

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth)
  .append("g")

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
// svgGroup now refers to the `g` (group) element appended.
// The SVG group would normally be aligned to the top left edge of the chart.
// Now it is offset to the right and down using the transform attribute
   var chartGroup = svg.append("g")
   .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

d3.select("body")
  .append("div")
  .attr("class", "toolTip")
  .style("opacity", .5)

// Load data from data.csv
d3.csv("data.csv", function(error, myData) {

    // Log an error if one exists
    if (error) return console.warn(error);
  
    // Print myData
    console.log(myData);
  
    // Parse Data/Cast as numbers
    myData.forEach(function(data) {
      data.poverty = +data.poverty;
      data.noHealthInsurance = + data.noHealthInsurance;
    });
  
    // Create scale functions
    var xScale = d3.scaleLinear()
    .domain([20, d3.max(myData, d => d.poverty)])
    .range([0, width]);

    var yScale = d3.scaleLinear()
    .domain([0, d3.max(myData, d => d.noHealthInsurance)])
    .range([height, 0]);

    // Create axis functions
    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);

    // Append Axes to the chart
    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Create Circles
    var circlesGroup = chartGroup.selectAll("circle")
    .data(myData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.noHealthInsurance))
    .attr("r", "15")
    .attr("fill", "earth")
    .attr("opacity", ".5");

    // Initialize tool tip    
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.abbr}<br>In Poverty (%): ${d.poverty}<br>Lacks Healthcare (%): ${d.noHealthInsurance}`);
      });

    // Create tooltip in the chart    
    chartGroup.call(toolTip);

    // Create event listeners to display and hide the tooltip    
    circlesGroup.on("click", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lacks Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("In Poverty (%)");
  });
 

    
    
    
    
    
  









