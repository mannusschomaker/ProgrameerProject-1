//
// var nodata = [
//   { Country: "2006", Gold: "10", Silver: "15", Bronze: "9"},
//   { Country: "2007", Gold: "12", Silver: "18", Bronze: "9"},
//   { Country: "2008", Gold: "05", Silver: "20", Bronze: "8"},
//   { Country: "2009", Gold: "01", Silver: "15", Bronze: "5"},
//   { Country: "2010", Gold: "02", Silver: "10", Bronze: "4"},
//   { Country: "2011", Gold: "03", Silver: "12", Bronze: "6"},
//   { Country: "2012", Gold: "04", Silver: "15", Bronze: "8"},
//   { Country: "2013", Gold: "06", Silver: "11", Bronze: "9"},
//   { Country: "2014", Gold: "10", Silver: "13", Bronze: "9"},
//   { Country: "2015", Gold: "16", Silver: "19", Bronze: "6"},
//   { Country: "2016", Gold: "19", Silver: "17", Bronze: "5"},
// ];
// window.onload = function(){
// barChart(nodata)
// }
function barChart(data) {
    // Setup svg using Bostock's margin convention

    var margin = {
        top: 20,
        right: 160,
        bottom: 35,
        left: 30
    };

    var width = 600 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    var svg = d3.select("#barChart2")
        .append("svg")
        .attr("id", "topCountryBarChart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    /* Data in strings like it would be if imported from a csv */




    // Transpose the data into layers
    var dataset = d3.layout.stack()(["Gold", "Silver", "Bronze"].map(function(medal) {
        return data.map(function(d) {
            // console.log({x: parse(d.Country), y: +d[fruit]});
            return {
                x: d.Country,
                y: +d[medal]
            };
        });
    }));


    // Set x, y and colors
    var x = d3.scale.ordinal()
        .domain(dataset[0].map(function(d) {
            return d.x;
        }))
        .rangeRoundBands([10, width - 10], 0.02);

    var y = d3.scale.linear()
        .domain([0, d3.max(dataset, function(d) {
            return d3.max(d, function(d) {
                return d.y0 + d.y;
            });
        })])
        .range([height, 0]);

    var colors = ["#ffd700", "#c0c0c0", "#cd7f32"];


    // Define and draw axes
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(5)
        .tickSize(-width, 0, 0)
        .tickFormat(function(d) {
            return d
        });

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);


    // Create groups for each series, rects for each segment
    var groups = svg.selectAll("g.cost")
        .data(dataset)
        .enter().append("g")
        .attr("class", "cost")
        .style("fill", function(d, i) {
            return colors[i];
        });

    var rect = groups.selectAll("rect")
        .data(function(d) {
          // console.log("d", d);
            return d;
        })
        .enter()
        .append("rect")

        // .attr("id", function(d){
        //   return
        // })
        .attr("id",function(d){
          return d.x
        })
        .attr("x", function(d) {
          // console.log(d.x)
            return x(d.x);
        })
        .attr("y", function(d) {
            return y(d.y0 + d.y);
        })
        .attr("height", function(d) {
            return y(d.y0) - y(d.y0 + d.y);
        })
        .attr("width", x.rangeBand())
        .on("mouseover", function() {
          // select country id
          mapId = d3.select(this)[0][0].id

          d3.select("." + mapId).style("fill", "blue").attr("id", "highLight")
            tooltip.style("display", null);
          // d3.select(".map").style("opacity", 0.5)
          // d3.select("." + mapId).style("opacity", 2)
          // d3.select("")

        })
        .on("mouseout", function() {
            tooltip.style("display", "none");

            // select old color of country
            var mapFill = JSON.parse(d3.select("." + mapId).attr("data-info")).fillColor

            // remove highLight
            d3.select("#highLight").style("fill", mapFill).attr("id", null)
            // d3.select(".datamap").style("opacity",1)
        })
        .on("mousemove", function(d) {

            var xPosition = d3.mouse(this)[0] - 15;
            var yPosition = d3.mouse(this)[1] - 25;
            tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
            tooltip.select("text").text(d.y);
        });


    // Draw legend
    var legend = svg.selectAll(".legend")
        .data(colors)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) {
            return "translate(30," + i * 19 + ")";
        });

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function(d, i) {
            return colors.slice().reverse()[i];
        });

    legend.append("text")
        .attr("x", width + 5)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .text(function(d, i) {
            switch (i) {
                case 0:
                    return "Bronze";
                case 1:
                    return "Silver";
                case 2:
                    return "Gold";
            }
        });


    // Prep the tooltip bits, initial display is hidden
    var tooltip = svg.append("g")
        .attr("class", "tooltip")
        .style("display", "none");

    tooltip.append("rect")
        .attr("width", 30)
        .attr("height", 20)
        .attr("fill", "white")
        .style("opacity", 0.5);

    tooltip.append("text")
        .attr("x", 15)
        .attr("dy", "1.2em")
        .style("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("font-weight", "bold");
}
