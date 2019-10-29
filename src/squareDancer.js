var makeSquareDancer = function (top, left, timeBetweenSteps) {
  this.$node = $('<span class="squareDancer"></span>');
  this.oldStep = makeDancer.prototype.step;
  makeDancer.call(this, top, left, timeBetweenSteps);
};

makeSquareDancer.prototype = Object.create(makeDancer.prototype);
makeSquareDancer.prototype.constructor = makeSquareDancer;

makeSquareDancer.prototype.step = function () {
  this.oldStep();

  this.$node.toggleClass("squareDancer");
};