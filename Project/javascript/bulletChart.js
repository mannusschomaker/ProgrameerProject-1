function barChart(data) {

    // set dimentions
    var margin = {
        top: 20,
        right: 160,
        bottom: 35,
        left: 30
    };

    var width = 600 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;
    // select div and add svg
    var svg = d3.select("#barChart2")
        .append("svg")
        .attr("id", "topCountryBarChart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // transpose the data into layers
    var dataset = d3.layout.stack()(["Gold", "Silver", "Bronze"].map(function(medal) {
        return data.map(function(d) {
            return {
                x: d.Country,
                y: +d[medal]
            };
        });
    }));

    // set x and y
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

    // set colors
    var colors = ["#ffd700", "#c0c0c0", "#cd7f32"];

    // draw axes
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

    // create groups for each series, rects for each segment
    var groups = svg.selectAll("g.cost")
        .data(dataset)
        .enter().append("g")
        .attr("class", "cost")
        .style("fill", function(d, i) {
            return colors[i];
        });

    // make bar's
    var rect = groups.selectAll("rect")
        .data(function(d) {
            return d;
        })
        .enter()
        .append("rect")
        .attr("id", function(d) {
            return d.x
        })
        .attr("x", function(d) {
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

            // select id of bar
            mapId = d3.select(this)[0][0].id

            // select country in the map and change color
            d3.select("." + mapId).style("fill", "blue").attr("id", "highLight")
            tooltip.style("display", null);

            // make selectedCountry based on summer/winter
            if (summer == true) {
                var selectedCountry = "s" + mapId
            }
            if (summer == false) {
                var selectedCountry = "w" + mapId
            }

            // add dodded line to line graph
            updateLine(selectedCountry)
        })
        .on("mouseout", function() {

            // hide tooltip
            tooltip.style("display", "none");

            // remove dodded line
            d3.selectAll("#tempLine").remove()

            // select old color of country
            var mapFill = JSON.parse(d3.select("." + mapId).attr("data-info")).fillColor

            // set back the old c0llor
            d3.select("#highLight").style("fill", mapFill).attr("id", null)
        })
        .on("mousemove", function(d) {
            // show tooltip next to mouse
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

    // prep the tooltip bits, initial display is hidden
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
