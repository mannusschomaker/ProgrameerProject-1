summer = true
bars = 10
currentYear = "s2012"
summerYear = [1896, 1900, 1904, 1908, 1912, 1920, 1924, 1928, 1932, 1936, 1948, 1952, 1956, 1960, 1964,
              1968, 1972, 1976, 1980, 1984, 1988, 1992, 1996, 2000, 2004, 2008, 2012, 2016]
winterYear = [1924, 1928, 1932, 1936, 1948, 1952, 1956, 1960, 1964, 1968, 1972, 1976, 1980, 1984, 1988,
              1992, 1994, 1998, 2002, 2006, 2010, 2014, 2018]
console.log(winterYear.length);
// function dropdownFunction() {
//     document.getElementById("myDropdown1").classList.toggle("show");
// }
//
// // close the dropdown menu if the user clicks outside of it
// window.onclick = function(event) {
//   if (!event.target.matches('.dropbtn1')) {
//
//     var dropdowns = document.getElementsByClassName("dropdown-content1");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains('show')) {
//         openDropdown.classList.remove('show');
//       }
//     }
//   }
// };



function boxUpdate() {
    var checkBox = document.getElementById("togBtnWS");
    var text = document.getElementById("checker");
    console.log(checkBox.checked)
    if (checkBox.checked == true) {
        text.style.display = "block";
        summer = false
        // show the correct slider
        document.getElementById("winterSlider").style.display = "block"
        document.getElementById("summerSlider").style.display = "none"
        console.log("winter");
        // makeMap(currentWinterYear)
        // """makemap(current)"""

    } else {
        text.style.display = "none";
        summer = true
        // show the correct slider
        document.getElementById("summerSlider").style.display = "block"
        document.getElementById("winterSlider").style.display = "none"
    }
}

window.onload = function() {

  d3.selectAll(".m")
  .on("click", function() {
    var bars1 = this.getAttribute("value");
    
    updatebars(bars1)
    makeMap(currentYear)

  })

  function updatebars(bars1){
    bars = bars1
  }

    // document.getElementById("winterSlider").setAttribute("step", 2)
    // console.log(document.getElementById("winterSlider").getAttribute("step"))

    var map = new Datamap({
        element: document.getElementById('container'),
        done: function(datamap) {

            // isolate data
            var test = datamap.options.data;

            datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {

                var x = document.getElementsByClassName("text");
                x[0].innerHTML = "<h1>" + "Olympic history of " + geography.properties.name + "</h1>"

                var clickCountry = geography.id
                d3.select("#currentGraph").remove()
                lineGraph(clickCountry)

                console.log(geography.properties.name, test[clickCountry].total, test[clickCountry].gold, test[clickCountry].silver, test[clickCountry].bronze);
            });
        },
        geographyConfig: {
            popupTemplate: function(geo, data) {
              if (data.total == null){
                return ['<div class="hoverinfo"><strong>',
                    geo.properties.name,
                    '</strong><br></br><strong>', 'No medals won',
                    '</strong></div>'].join('');
              }
              else{
                return ['<div class="hoverinfo"><strong>',
                    geo.properties.name,
                    '</strong><br></br><strong>', 'Total: ', data.total,
                    '</strong><br></br><strong>', 'Gold: ', data.gold,
                    '</strong><br></br><strong>', 'Silver: ', data.silver,
                    '</strong><br></br><strong>', 'Bronze: ', data.bronze, '</strong></div>'
                ].join('');
              }
            }
        }
    });

    makeMap(currentYear)

    if (summer = true) {
        // make a slider
        var slider = document.getElementById("summerSlider");
        var output = document.getElementById("demo");
        output.innerHTML = summerYear[slider.value];
        currentSummerYear = "s" + summerYear[slider.value]

        // update values of slider
        slider.oninput = function() {
            output.innerHTML = summerYear[this.value];
            currentYear = "s" + summerYear[this.value]
            currentSummerYear = "s" + summerYear[slider.value]
            makeMap(currentYear)
        }
    }
    if (summer != false) {
        var slider = document.getElementById("winterSlider");
        var output = document.getElementById("demo");
        output.innerHTML = winterYear[slider.value];
        currentWinterYear = "s" + winterYear[slider.value]

        // document.getElementById("winterSlider").setAttribute("step", 2)

        // update values of slider
        slider.oninput = function() {
            output.innerHTML = winterYear[this.value];

            currentYear = "w" + winterYear[this.value]
            currentWinterYear = "s" + winterYear[slider.value]

            makeMap(currentYear)
        }
    }
    // d3.select(".conatainter").style("fill", blue)

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
                    maxValue = d.Total
                }


            });
            var arr = Object.keys(topBestCountry).map(function (key) { return topBestCountry[key]; });

            color = d3.scale.linear().domain([0, maxValue])
                .range([d3.rgb('#551111'), d3.rgb("#ff0000")]);

            // make json of country with information
            data.forEach(function(d) {
                infoCountry = {
                    fillColor: color(d.Total),
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
}
