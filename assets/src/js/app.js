// Global Variables

var nameBtn = document.getElementById('name-btn');
var jsonData = document.getElementById('js-data');
var searchBar = document.getElementById('js-search-bar');

// JSON request

var xhttp = new XMLHttpRequest();
xhttp.onload = function() {
    if (this.status == 200) {

      var response = JSON.parse(xhttp.responseText);
      var data = response.data;

      var output = '';

      for (var i in data){
        output += '<ul>' +
          '<li>'+data[i].name+'</li>' +
          '<li>'+data[i].type+'</li>' +
          '<li>'+data[i].added+'</li>' +
          '</ul>'
        }

      document.getElementById('js-data').innerHTML = output;

    }
};

xhttp.open("GET", "files.json", true);
xhttp.send();

// ----------- ^ End of JSON GET request ^ ------------

// Alphabetical ordering of Files

nameBtn.addEventListener('click', function sortlist(){

  var list, i, switching, b, shouldSwitch, dir, switchcount = 0;
  list = jsonData;
  switching = true;

    //Set the sorting direction to ascending:
  dir = "asc";

    //Make a loop that will continue until no switching has been done:
  while (switching) {

      //start by saying: no switching is done:
    switching = false;
    b = list.getElementsByTagName("UL");

      //Loop through all list-items:
    for (i = 0; i < (b.length - 1); i++) {

        //start by saying there should be no switching:
      shouldSwitch = false;

        /*check if the next item should switch place with the current item,
        based on the sorting direction (asc or desc):*/

      if (dir == "asc") {
        if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {

          /*if next item is alphabetically lower than current item,
          mark as a switch and break the loop:*/

          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (b[i].innerHTML.toLowerCase() < b[i + 1].innerHTML.toLowerCase()) {

          /*if next item is alphabetically higher than current item,
          mark as a switch and break the loop:*/

          shouldSwitch= true;
          break;
        }
      }
    }

    if (shouldSwitch) {

      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/

      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;

      //Each time a switch is done, increase switchcount by 1:

      switchcount ++;
    } else {

      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/

      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
});



// Toggle btn symbol

nameBtn.addEventListener('click', function(){

    if (nameBtn.innerHTML = '&#8679;') {
        nameBtn.innerHTML = '&#8681';
    } else {
        nameBtn.innerHTML = '&#8681';
    }
});



// filter search function -- Not filtering specific ULs just all the data

searchBar.addEventListener("keyup", function(){

  var input, filter, ul, li, i;

  input = searchBar;
  filter = input.value.toUpperCase();
  ul = jsonData;
  li = ul.getElementsByTagName("LI");

  for (i = 0; i < li.length; i++) {
      if (ul.innerHTML.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
      } else {
          li[i].style.display = "none";
      }
  }
});
