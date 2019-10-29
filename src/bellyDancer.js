var makeBellyDancer = function (top, left, timeBetweenSteps) {
  this.oldStep = makeDancer.prototype.step;
  makeDancer.call(this, top, left, timeBetweenSteps);
};

makeBellyDancer.prototype = Object.create(makeDancer.prototype);
makeBellyDancer.prototype.constructor = makeBellyDancer;

makeBellyDancer.prototype.step = function () {
  this.oldStep();

  this.$node.slideToggle();
};