/*
nextShow.js
Uses current date to find when the next show will be.
Then, it counts down to that date with a jQuery countdown plugin
authored by Keith Wood under the MIT license http://keith-wood.name/countdown.html
*/

 $(document).ready(function(){
   let today = new Date();
   let nextThurs = new Date();
   nextThurs.setDate(today.getDate() + (4+ 7 - today.getDay() % 7));
   nextThurs.setHours(14);
   nextThurs.setMinutes(0);
   $("#next-show").html(nextThurs.toDateString() + " at 2 PM");

   $("#countdown").countdown({until: nextThurs, timezone: -4})
 });
