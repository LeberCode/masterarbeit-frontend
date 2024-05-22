export var isConnectionAllowed = function (source, target) {
  var wholeSourceClass = source.getAttribute("class");
  var wholeTargetClass = target.getAttribute("class");

  var splittedSourceClass = wholeSourceClass.split(" ");
  var source = splittedSourceClass[0];
  var splittedTargetClass = wholeTargetClass.split(" ");
  var target = splittedTargetClass[0];

  if (source && target && source === target) return false;
  return true;
};
