
// Get the user input number incremented.
var i = 0
self.addEventListener('message', function(e) {
    i = e.data;
    postMessage(i);
},false);

timedCount();

function timedCount() {
    i = i + 1;
    postMessage(i);
    setTimeout("timedCount()",500);
}