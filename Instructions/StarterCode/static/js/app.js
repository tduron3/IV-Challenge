
function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  }
  function handleSubmit() {
    d3.event.preventDefault();

    var stock = d3.select("#mircrobeinput").node().value;
    console.log(stock);

    d3.select("#microbeinput").node().value = "";
    buildPlot(stock);
}

  function buildPlot(belly){

    var url = `http://robdunnlab.com/projects/belly-button-biodiversity/`;
  
  
    d3.json(url).then(function(data) {
        var name = data.dataset.name;
        var stock = data.dataset.dataset_code;
        var startDate = data.dataset.start_date;
        var endDate = data.dataset.end_date;
        var dates = unpack(data.dataset.data, 0);
        var closingPrices = unpack(data.dataset.data, 4);
    
        var trace1 = {
          type: "scatter",
          mode: "lines",
          name: name,
          x: dates,
          y: closingPrices,
          line: {
            color: "#17BECF"
          }
        };

        var data = [trace1];

    var layout = {
      title: `${stock} closing prices`,
      xaxis: {
        range: [startDate, endDate],
        type: "date"
      },
      yaxis: {
        autorange: true,
        type: "linear"
      }
    };

    Plotly.newPlot("plot", data, layout);

  });
}

buildPlot();