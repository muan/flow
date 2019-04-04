/* @flow */
function foo(x:string) { }

var a = [0];
var b = a.map(function (x) { foo(x); return "" + x; });

var c: number = a[0];
var d: number = b[0];

var e:Array<string> = a.reverse();

var f = [""];
var g:number = f.map(function () { return 0; })[0];

var h: Array<number> = [1,2,3];
var i: Array<string> = ['a', 'b', 'c'];
var j: Array<number | string> = h.concat(i);
var k: Array<number> = h.concat(h);
var l: Array<number> = h.concat(1,2,3);
var m: Array<number | string> = h.concat('a', 'b', 'c');
var n: Array<number> = h.concat('a', 'b', 'c'); // Error

function reduce_test() {
  /* Adapted from the following source:
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
   */
  [0, 1, 2, 3, 4].reduce(function(previousValue, currentValue, index, array) {
    return previousValue + currentValue + array[index];
  });

  [0, 1, 2, 3, 4].reduce(function(previousValue, currentValue, index, array) {
    return previousValue + currentValue + array[index];
  }, 10);

  var total = [0, 1, 2, 3].reduce(function(a, b) {
    return a + b;
  });

  var flattened = [[0, 1], [2, 3], [4, 5]].reduce(function(a, b) {
    return a.concat(b);
  });

  /* Added later, because the above is insufficient */

  // acc is element type of array when no init is provided
  [""].reduce((acc, str) => acc * str.length); // error, string ~> number
  [""].reduceRight((acc, str) => acc * str.length); // error, string ~> number
}

function from_test() {
  var a: Array<string> = Array.from([1, 2, 3], function(val, index) {
    return index % 2 ? "foo" : String(val);
  });
  var b: Array<string> = Array.from([1, 2, 3], function(val) {
    return String(val);
  });
}

function of_test() {
  var emptyArrayOkay: Array<empty> = Array.of();
  var exactMatchOkay: Array<string> = Array.of("hello", "world");
  var upcastOkay: Array<string | number> = Array.of("hello", "world");
  var incompatibleTypeNotOkay: Array<string> = Array.of(1, 2);
}

function undefined_test() {
  var emptyArray: Array<number> = []

  var pop: number = emptyArray.pop() // error, undefined ~> number
  if (pop) pop.toFixed() // ok

  var shift: number = emptyArray.shift() // error, undefined ~> number
  if (shift) shift.toFixed() // ok
}
