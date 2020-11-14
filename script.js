clear_data();
update_value();

// Update output value.
function update_value(x) {

    if(x != undefined){
        document.getElementById("info").innerHTML = x;
    }

    if(localStorage.getItem("number") != null){

    document.getElementById("output").innerHTML = localStorage.getItem("number"); 
    }else{
        document.getElementById("output").innerHTML = '';
    }
}

// Save web storage.
var number;

function saveWebStorage() {

    if (document.getElementById("number").value == '') {
        alert("Value Empty");
    } else {

        number = document.getElementById("number").value;

        number = parseInt(number);

        if (number >= 1 && number < 101) {

            if (typeof(Storage) !== "undefined") {

                var num = document.getElementById("number").value;

                localStorage.setItem("number", num);

               update_value();

            } else {
                alert("Web Storage  is not supported.")
            }

        } else {
            alert("Number must be between 1 to 100");
           }
    }
} 


// Start web worker process
var x;

function start() {

    if (typeof(Worker) !== "undefined") {
        if (typeof(x) == "undefined") {
           
            if (localStorage.getItem("number") != undefined) {

                x = new Worker("web_worker.js");
                x.postMessage(parseInt(localStorage.getItem("number")));
             
                x.addEventListener('message', function(e) {
                    localStorage.setItem("number",  e.data);

                    if(isPrime(e.data) && e.data != number){
                        update_value('Next Prime  Found! Web Worker Stopped.');
                        stop();
                    }else{
                        update_value('Web Worker Running');
                    }
                                    
                }, false);


            } else {
                alert("Please Enter The Number");
            }

        }

    } else {
        document.getElementById("output").innerHTML = "Web Worker is not supported.";
    }
}

// Stops web worker process
function stop() {
    if (typeof(x) == "undefined") {
    }else{
    x.terminate();
    x = undefined;
    }
}

// Clears input number
function clear_data(params) {
    if (typeof(x) == "undefined") {
    }else{
    x.terminate();
    x = undefined;
    }
    localStorage.removeItem("number");
    document.getElementById("number").value = '';
    update_value();
}
 
// Logic to check prime number 
function isPrime(num) {
  if (num <= 1) 
	  return false;
  if (num % 2 == 0 && num > 2) 
	  return false;
  let s = Math.sqrt(num); 
  for(let i = 3; i <= s; i++) {
      if(num % i === 0) 
		  return false; 
  }
  return true;
}