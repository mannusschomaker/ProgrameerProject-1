function makeMap(year) {

    // reset data of map
    map.updateChoropleth(null, {
        reset: true
    })
    count = 0
    maxValue = 0
    bestCountry = {}
    topBestCountry = {}
    str = "Data/" + year + ".csv"

    d3.csv(str, function(error, data) {
        if (error) throw error;
        // console.log(data);

        var updateCountry = {}
        var updateCountry2 = {}
        var Country = null
        // console.log(bars);
        // data pre-processing
        data.forEach(function(d) {


          // get best n country's
          if (count < bars){
            bestCountry = {
              Country: d.Country,
              Gold: d.Gold,
              Silver: d.Silver,
              Bronze: d.Bronze
            }
            topBestCountry[count] = bestCountry
            count += 1
          }

            d.Gold = +d["Gold"];
            d.Silver = +d["Silver"];
            d.Bronze = +d["Bronze"];
            d.Total = +d["Total"];

            if (maxValue < d.Total) {
                maxValue = 3 * d.Gold + 2 * d.Silver + 1 * d.Bronze
                // maxValue = d.Total
            }


        });
        var arr = Object.keys(topBestCountry).map(function (key) { return topBestCountry[key]; });

        // console.log("topthree", arr);
        // console.log(arr[1]);
        // console.log("test", nodata[1]);


        // var x = document.getElementsByClassName("barChart");
        // x[0].innerHTML = "first: " + topThreeCountry[1][0] + " second: " + topThreeCountry[1][1] + " third: " + topThreeCountry[1][2]

        color = d3.scale.linear().domain([0, Math.log10(maxValue)])
            .range([d3.rgb('#551111'), d3.rgb("#ff0000")]);

        // make json of country with information
        data.forEach(function(d) {
          score = 3 * d.Gold + 2 * d.Silver + 1 * d.Bronze
            infoCountry = {
                fillColor: color(Math.log10(score)),
                total: d.Total,
                gold: d.Gold,
                silver: d.Silver,
                bronze: d.Bronze
            }


            updateCountry[d.Country] = infoCountry;
        })

        d3.select("#topCountryBarChart").remove()
        // barChart(nodata)
        barChart(arr)

        // update with information
        map.updateChoropleth(
            updateCountry
        );
    });
};
