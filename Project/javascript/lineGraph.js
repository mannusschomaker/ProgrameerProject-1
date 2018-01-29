// set the dimensions
var margin = {
        top: 30,
        right: 20,
        bottom: 30,
        left: 50
    },
    width = 550 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;
    
function lineGraph(selectedCountry) {

    // set the ranges
    var x = d3.time.scale().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    // define the axes
    var xAxis = d3.svg.axis().scale(x).ticks(10).tickFormat(d3.format("4."))
        .orient("bottom");

    var yAxis = d3.svg.axis().scale(y)
        .orient("left").ticks(5);

    // define the line
    var amountline = d3.svg.line()
        .x(function(d) {
            return x(d.year);
        })
        .y(function(d) {
            return y(d.amount);
        });

    // adds the svg canvas
    var svg = d3.select(".lineGraph")
        .append("svg")
        .attr("id", "currentGraph")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // get the data
    str = "DataLineGraph/" + selectedCountry + ".csv"
    d3.csv(str, function(error, rawData) {
        if (error) alert("no data")

        var data = [];

        // remover empty lines of data
        rawData.forEach(function(d) {
            if (d.year != undefined) {
                data.push(d)
            }
        })

        // transform data
        data.forEach(function(d) {
            d.amount = +d.amount;
        });

        // scale the range of the data
        x.domain([d3.min(data, function(d) {
            return d.year;
        }), d3.max(data, function(d) {
            return d.year;
        })]);
        y.domain([0, d3.max(data, function(d) {
            return d.amount;
        })]);

        // nest the entries by medal
        var dataNest = d3.nest()
            .key(function(d) {
                return d.medal;
            })
            .entries(data);

        function color(medal) {
            if (medal == "Gold") {
                return "#ffd700"
            }
            if (medal == "Silver") {
                return "#c0c0c0"
            }
            if (medal == "Bronze") {
                return "#cd7f32"
            }
        }

        // nest all data
        dataNest.forEach(function(d) {

            svg.append("path")
                .attr("class", "line")
                .style("stroke-width", 5)
                .style("stroke", function() {
                    return color(d.key);
                })
                .attr("d", amountline(d.values));
        });

        // add the X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        // add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);
    });
}

function updateLine(selectedCountry) {

    // set the ranges
    var x = d3.time.scale().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    // define the axes
    var xAxis = d3.svg.axis().scale(x).tickFormat(d3.format("4."))
        .orient("bottom");

    var yAxis = d3.svg.axis().scale(y)
        .orient("left").ticks(5);

    // define the line
    var amountline = d3.svg.line()
        .x(function(d) {
            return x(d.year);
        })
        .y(function(d) {
            return y(d.amount);
        });

    // adds the svg canvas
    var svg = d3.select("#currentGraph")
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Get the data
    str = "DataLineGraph/" + selectedCountry + ".csv"
    d3.csv(str, function(error, rawData) {
        if (error) alert("no data")

        var data = [];
        // remove empty lines in data
        rawData.forEach(function(d) {
            if (d.year != undefined) {
                data.push(d)
            }
        })

        // transform data
        data.forEach(function(d) {
            d.amount = +d.amount;
        });

        // scale the range of the data
        x.domain([d3.min(data, function(d) {
            return d.year;
        }), d3.max(data, function(d) {
            return d.year;
        })]);
        y.domain([0, d3.max(data, function(d) {
            return d.amount;
        })]);

        // nest the entries by medal
        var dataNest = d3.nest()
            .key(function(d) {
                return d.medal;
            })
            .entries(data);

        function color(medal) {
            if (medal == "Gold") {
                return "#ffd700"
            }
            if (medal == "Silver") {
                return "#c0c0c0"
            }
            if (medal == "Bronze") {
                return "#cd7f32"
            }
        } // set the colour scale

        // loop through each medal / key
        dataNest.forEach(function(d) {

            svg.append("path")
                .attr("id", "tempLine")
                .attr("class", "line")
                .style("opacity", 0.9)
                .style("stroke-dasharray", ("2, 2"))
                .style("stroke", function() { // Add dynamically
                    return color(d.key);
                })
                .attr("d", amountline(d.values));
        });
    });
}
