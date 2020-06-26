new Chart(document.getElementById("line-chart"), {
  type: 'line',
  data: {
    labels: chart_date,
    datasets: [{ 
        data: chart_cases,
        label: "Total Confirmed",
        borderColor: "#3e95cd",
        fill: false
      },
      { 
        data: chart_death,
        label: "Total Death",
        borderColor: "red",
        fill: false
      },
      { 
        data: chart_recoved,
        label: "Total Recovered",
        borderColor: "Green",
        fill: false
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Graphical view of Corona Exponential Growth in India'
    }
  }
});