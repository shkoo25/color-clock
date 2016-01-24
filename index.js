
/*
  This function takes in two parameters: a number, and a string.
  The number represents the amount of hours/minutes/seconds.
  The string represents the unit, and is one of
    * "hour"
    * "minute"
    * "second"

  It returns a whole number value from 0-255 representing the
  relative CSS RGB value of that time period.

  It's pre-written for you. Best to not muck around with it.
*/



var convertTimeframe = function(amount, unit) {

  switch (unit) {
    case "hour": //red
    case "hours":
      return Math.round((amount / 23) * 255)
    case "minute"://green
    case "minutes":
    case "second"://blue
    case "seconds":
      return Math.round((amount / 59) * 255)
    default:
      return 0;
  }
}


var RGBToHex = function(r,g,b){
   var bin = r << 16 | g << 8 | b;
   return (function(h){
       return new Array(7-h.length).join("0")+h
   })(bin.toString(16).toUpperCase())

 }

$(document).on("ready", function(){

  
  var updated = function(){


    var currentTime = moment()
    $(".clock").text(currentTime.format("HH:mm:ss"))

    var seconds = currentTime.seconds()
    var blueColor = convertTimeframe(seconds, "seconds")
    console.log(blueColor)

    var minutes = currentTime.minutes()
    var greenColor = convertTimeframe(minutes, "minutes")
    console.log(greenColor)

    var hours = currentTime.hours()
    var redColor = convertTimeframe(hours, "hours")
    console.log(redColor)

//*This will add a colon in between the hex codes
    var background= RGBToHex(redColor, greenColor, blueColor);
    $(".color").text(RGBToHex(redColor).substring(0, 2) + ":" + RGBToHex(greenColor).substring(0, 2) + ":" + blueColor)

//*This will not have colons within the hex codes written out.
    $(".container").css("background-color", "rgb(" + redColor + "," + greenColor + "," + blueColor + ")")

    $(".underline").css("width", seconds + "%")

  }
    setInterval(updated, 1000);

    $(".container").on("click", function() {
      $(".clock").toggleClass("hidden");
      $(".color").toggleClass("hidden");
    })
    
})

