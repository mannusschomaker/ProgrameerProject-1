function lineGraph(selectedCountry){
// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

// Parse the year / time
// var parseyear = d3.time.format("%b %Y").parse;

// Set the ranges
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x).ticks(4).tickFormat(d3.format("4."))
    .orient("bottom");

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

// Define the line
var amountline = d3.svg.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.amount); });

// Adds the svg canvas
var svg = d3.select(".lineGraph")
    .append("svg")
        .attr("id", "currentGraph")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");


// selectedCountry
// Get the data
str = "DataLineGraph/" + selectedCountry + ".csv"
d3.csv(str, function(error, data) {
    if (data == null){
      console.log("hoi");
      // var test = document.getElementsByClassName("graph");
      // test[0].innerHTML = "<h1>" + "Never participated" + "</h1>";
      return
    }
    data.forEach(function(d) {
		// d.year = parseyear(d.year);
		d.amount = +d.amount;
    });

    // Scale the range of the data
    // console.log(d3.extent(data, function(d) { return +d.year; }));
    x.domain([d3.min(data, function(d) { return d.year; }), d3.max(data, function(d) { return d.year; })]);
    y.domain([0, d3.max(data, function(d) { return d.amount; })]);

    // Nest the entries by medal
    var dataNest = d3.nest()
        .key(function(d) {return d.medal;})
        .entries(data);

    function color(medal){
      if (medal == "Gold"){
        return "#ffd700"
      }
      if (medal == "Silver"){
        return "#c0c0c0"
      }
      if (medal == "Bronze"){
        return "#cd7f32"
      }
    }  // set the colour scale

    // Loop through each medal / key
    dataNest.forEach(function(d) {

        svg.append("path")
            .attr("class", "line")
            .style("stroke", function() {console.log(d.key); // Add dynamically
                return color(d.key); })
            .attr("d", amountline(d.values));

    });

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

});
}
