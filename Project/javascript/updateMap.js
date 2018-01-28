function updateMap(year) {

    // reset data of map
    map.updateChoropleth(null, {
        reset: true
    })
    // set variables
    count = 0
    maxValue = 0
    bestCountry = {}
    topBestCountry = {}
    str = "Data/" + year + ".csv"

    // get data
    d3.csv(str, function(error, data) {
        if (error) alert("no data");

        // set variables
        var updateCountry = {}
        var Country = null

        // data pre-processing
        data.forEach(function(d) {


            // get best n country's
            if (count < bars) {
                bestCountry = {
                    Country: d.Country,
                    Gold: d.Gold,
                    Silver: d.Silver,
                    Bronze: d.Bronze
                }

                // put in array
                topBestCountry[count] = bestCountry
                count += 1
            }

            // transform data
            d.Gold = +d["Gold"];
            d.Silver = +d["Silver"];
            d.Bronze = +d["Bronze"];
            d.Total = +d["Total"];

            // get the max value based on 3gold 2silver 1bronze score
            if (maxValue < d.Total) {
                maxValue = 3 * d.Gold + 2 * d.Silver + 1 * d.Bronze
            }
        });

        // transform array to json
        var arr = Object.keys(topBestCountry).map(function(key) {
            return topBestCountry[key];
        });

        // set color scale with log10
        color = d3.scale.linear().domain([0, Math.log10(maxValue)])
            .range([d3.rgb('#fff7bc'), d3.rgb("#d95f0e")]);

        // make json of country with information
        data.forEach(function(d) {
            // calculate score
            score = 3 * d.Gold + 2 * d.Silver + 1 * d.Bronze

            // make json
            infoCountry = {
                fillColor: color(Math.log10(score)),
                total: d.Total,
                gold: d.Gold,
                silver: d.Silver,
                bronze: d.Bronze
            }

            // put in array
            updateCountry[d.Country] = infoCountry;
        })

        // remover old barchart
        d3.select("#topCountryBarChart").remove()

        // draw new barchart
        barChart(arr)

        // update with information
        map.updateChoropleth(
            updateCountry
        );
    });
};
