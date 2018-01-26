// set globals
var map;
var summer = true
var bars = 10
var currentYear = "s2012"
var selectedCountry = "sUSA"
var clickCountry = "USA"

// set constants
const summerYear = [1896, 1900, 1904, 1908, 1912, 1920, 1924, 1928, 1932, 1936, 1948, 1952, 1956, 1960, 1964,
    1968, 1972, 1976, 1980, 1984, 1988, 1992, 1996, 2000, 2004, 2008, 2012, 2016
]
const winterYear = [1924, 1928, 1932, 1936, 1948, 1952, 1956, 1960, 1964, 1968, 1972, 1976, 1980, 1984, 1988,
    1992, 1994, 1998, 2002, 2006, 2010, 2014, 2018
]

// function for when the toggle is clicked
function boxUpdate() {
    // select the elements
    var checkBox = document.getElementById("togBtnWS");
    var text = document.getElementById("checker");

    // check if toggle is checked
    if (checkBox.checked == true) {
        text.style.display = "block";
        // set summer as false
        summer = false

        // show the correct slider
        document.getElementById("winterSlider").style.display = "block"
        document.getElementById("summerSlider").style.display = "none"

        // update everything
        makeMap(currentWinterYear)
        d3.select("#currentGraph").remove()
        lineGraph("w" + clickCountry)

        // set the right year
        var output = document.getElementById("demo");
        output.innerHTML = winterToggle;


    } else {
        text.style.display = "none";
        summer = true

        // show the correct slider
        document.getElementById("summerSlider").style.display = "block"
        document.getElementById("winterSlider").style.display = "none"
        var output = document.getElementById("demo");
        output.innerHTML = summerToggle;
        makeMap(currentSummerYear)
        d3.select("#currentGraph").remove()

        lineGraph("s" + clickCountry)
    }
}

window.onload = function() {

    // update barchart when dropdown is clicked
    d3.selectAll(".m")
        .on("click", function() {
            var bars = this.getAttribute("value");

            // update the bars (don't know why it won't work without this, neither did tim)
            updatebars(bars)

            // update
            makeMap(currentYear)

        })

    // update the bars
    function updatebars(bars1) {
        bars = bars1
    }

    // initiate the map
    map = new Datamap({
        element: document.getElementById('container'),
        done: function(datamap) {

            // isolate data
            var test = datamap.options.data;

            datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
                var x = document.getElementsByClassName("text");
                x[0].innerHTML = "<h1>" + "Olympic history of " + geography.properties.name + "</h1>";
                clickCountry = geography.id
                d3.select("#currentGraph").remove()
                if (summer == true) {
                    var selectedCountry = "s" + clickCountry
                    console.log(selectedCountry);
                }
                if (summer == false) {
                    var selectedCountry = "w" + clickCountry
                    console.log(selectedCountry);
                }

                lineGraph(selectedCountry)
                // console.log(geography.properties.name, test[clickCountry].total, test[clickCountry].gold, test[clickCountry].silver, test[clickCountry].bronze);
            });
        },
        geographyConfig: {
            popupTemplate: function(geo, data) {
                if (data.total == null) {
                    return ['<div class="hoverinfo"><strong>',
                        geo.properties.name,
                        '</strong><br></br><strong>', 'No medals won',
                        '</strong></div>'
                    ].join('');
                } else {
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
    lineGraph(selectedCountry)

    if (summer = true) {
        // make a slider
        var slider = document.getElementById("summerSlider");
        var output = document.getElementById("demo");
        output.innerHTML = summerYear[slider.value];
        summerToggle = summerYear[slider.value];
        currentSummerYear = "s" + summerYear[slider.value]


        // update values of slider
        slider.oninput = function() {
            output.innerHTML = summerYear[this.value];
            currentYear = "s" + summerYear[this.value]
            currentSummerYear = "s" + summerYear[slider.value]
            summerToggle = summerYear[slider.value];
            makeMap(currentYear)
        }
    }
    if (summer != false) {
        var slider = document.getElementById("winterSlider");
        var output = document.getElementById("demo");
        output.innerHTML = winterYear[slider.value];
        currentWinterYear = "w" + winterYear[slider.value]

        winterToggle = winterYear[slider.value];

        // update values of slider
        slider.oninput = function() {
            output.innerHTML = winterYear[this.value];

            currentYear = "w" + winterYear[this.value]
            currentWinterYear = "s" + winterYear[slider.value]
            winterToggle = winterYear[slider.value];

            makeMap(currentYear)
        }
    }
}
