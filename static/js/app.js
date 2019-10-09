// All variables
var button = d3.select("#filter-btn");
var date = d3.select("#datetime");
var city = d3.select("#city");
var state = d3.select("#state");
var country = d3.select("#country");
var shape = d3.select("#shape");
var tbody = d3.select("tbody");
var reset = d3.select("#reset-btn");
var columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]


// from data.js
var tableData = (data) => {

  data.forEach(ufo_sightings => {
    var row = tbody.append("tr");
    columns.forEach(column => row.append("td").text(ufo_sightings[column])
    )
  });
}

//Assemble table
tableData(data);


// Filter by input
button.on("click", () => {
  d3.event.preventDefault();
  var inputDate = date.property("value").trim();
  var inputCity = city.property("value").toLowerCase().trim();
  var inputState = state.property("value").toLowerCase().trim();
  var inputCountry = country.property("value").toLowerCase().trim();


  // Filter by field matching input value
  var filterDate = data.filter(data => data.datetime === inputDate);
  console.log(filterDate)
  var filterCity = data.filter(data => data.city === inputCity);
  console.log(filterCity)
  var filterState = data.filter(data => data.state === inputState);
  console.log(filterState)
  var filterCountry = data.filter(data => data.country === inputCountry);
  console.log(filterCountry)
  var filterData = data.filter(data => data.datetime === inputDate && data.city === inputCity && data.state === inputState && data.country === inputCountry);
  console.log(filterData)

  // Add filtered sighting to table
  tbody.html("");

  let filtered = {
    filterData, filterCity, filterDate, filterState, filterCountry
  }

  if (filtered.filterData.length !== 0) {
    tableData(filterData);
  }
    else if (filtered.filterData.length === 0 && ((filtered.filterCity.length !== 0 || filtered.filterDate.length !== 0 || filtered.filterState.length !== 0 || filtered.filterCountry.length !== 0))){
        tableData(filterCity) || tableData(filterDate) || tableData(filterState) || tableData(filterCountry);
  
    }
    else {
      tbody.append("tr").append("td").text("No results found Please Reset and Try again!"); 
    }
})


reset.on("click", () => {
  tbody.html("");
  tableData(data)
  console.log("Reset")
})