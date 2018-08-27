/* global */
var api = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&generator=random&exchars=600&explaintext=1&grnnamespace=0&callback=?";
$.getJSON(api, function(data){
  var keys = [];
  for (var l in data.query.pages) {
    if (data.query.pages.hasOwnProperty(l)){
      keys.push(l);
    }
  }
});

// Searching for input when enter is hit
$("input").keypress(function (e) {
  if (e.which == 13) {
    $("form").submit();
    searchResults($("input").val());
    return false;
  }
});


// Displaying Search Results 
function searchResults(searchValue){
  var api = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=" + searchValue + "&callback=?";
  var htmlCode = "";
  $.getJSON(api, function(data){
    for(var i in data.query.search) {
      htmlCode += "<div class='row item'><div class='col-1 item-head'></div><div class='col-11 item-body'><a target='_blank' href='https://en.wikipedia.org/wiki/" + data.query.search[i].title.replace(" ","%20") + "'><h2>" + data.query.search[i].title + "</h2></a><h6>" + data.query.search[i].timestamp + "</h6><p>" + data.query.search[i].snippet + "...</p></div></div>";
    }
    $("#searchResults").html(htmlCode);
  });
}

