queue()
    .defer(d3.json, "data/annual.json")
    .await(makeGraphs);

function makeGraphs(error, annualData) {
    var ndx = crossfilter(annualData);
    // console.log(annualData);

    var date_dim = ndx.dimension(dc.pluck("Year"));
    var temperature_monthly = date_dim.group().reduceSum(dc.pluck("Mean"));




    dc.lineChart("#monthly_chart")
        .height(400)
        .margins({ top: 25, right: 50, bottom: 30, left: 50 })
        .ordinalColors(["black"])
        .dimension(date_dim)
        .group(temperature_monthly)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Time")
        .yAxisLabel("Temperature")
        .elasticY(true)
        .elasticX(true)
        .label(function(d) {
            return d.value
        })
        .xAxis().tickValues(annualData.map(set => set.Year - (set.Year % 5)))

    dc.renderAll();


};