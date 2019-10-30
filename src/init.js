$(document).ready(function () {
  window.dancers = [];

  $('.addDancerButton').on('click', function (event) {
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data('dancer-maker-function-name');

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position

    var dancer = new dancerMakerFunction(
      $("body").height() * Math.random(),
      $("body").width() * Math.random(),
      Math.random() * 1000
    );
    $('body').append(dancer.$node);
  });

  $('.addLineupButton').on('click', function (event) {
    $(".dancer").each(function (idx, dancer) {
      dancer.style.top = "200px";
      var leftPx = 200;

      leftPx += idx * 80;
      dancer.style.left = `${leftPx}px`;
    });
  });

  $('.punch').on('click', function (event) {
    var $dancer = $(".dancer");
    var data = {};
    $(".dancer").each(function (idxOuter, dancer) {
      $dancer.splice(idxOuter, 1);
      $dancer.each(function (idxInner, otherDancer) {
        var top1 = parseFloat(dancer.style.top);
        var top2 = parseFloat(otherDancer.style.top);
        var left1 = parseFloat(dancer.style.left);
        var left2 = parseFloat(otherDancer.style.left);
        var a = Math.abs(top1 - top2);
        var b = Math.abs(left1 - left2);
        var distance = Math.sqrt((a * a) + (b * b));
        data[`${idxOuter}_${idxInner}`] = distance;
      });

    });
    var arr = Object.values(data);
    arr.sort();
    arr.splice(0, 2);
    var middle = Math.floor(arr.length / 2);
    var midpoint1 = arr[middle - 1];
    var midpoint2 = arr[middle];
    var node1 = null;
    var node2 = null;

    for (var key in data) {
      if (data[key] === midpoint1) {
        node1 = $dancer[parseInt(key[0])];

      }
      if (data[key] === midpoint2) {
        node2 = $dancer[parseInt(key[key.length - 1])];
      }
    }

    node1.setAttribute("style", "background-image: url(daftpunch.png)");
    node2.setAttribute("style", "background-image: url(daftpunch.png)");
 });
});