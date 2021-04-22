var url = 
`http://robdunnlab.com/projects/belly-button-biodiversity/`;


function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  }
  
  function buildPlot() {
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