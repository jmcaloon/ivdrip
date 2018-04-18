/*
nextShow.js
Uses current date to find when the next show will be.
Then, it counts down to that date with a jQuery countdown plugin
authored by Keith Wood under the MIT license http://keith-wood.name/countdown.html
*/

function getNextThurs(){
  let today = new Date();
  let nextThurs = new Date();

  //if its thursday and the show has already aired
  if (today.getDay() === 4 && today.getHours() >= 12){
    nextThurs.setDate(today.getDate() + (4 + 7 - today.getDay() % 7));

  }
  else{
    nextThurs.setDate(today.getDate() + (4 - today.getDay() % 7));
  }

  nextThurs.setHours(12);
  nextThurs.setMinutes(0);

  return nextThurs

}

function getTwoHours(){
  let today = new Date();
  let twoHours = new Date();
  twoHours.setHours(today.getHours()+2);
  return twoHours
}

function getOneMinute(){
  let today = new Date();
  return new Date(today.getTime() + 30000)

}

function test(){
  let today = new Date();
  return new Date(today.getTime() + 15000)

}


 $(document).ready(function(){

   nextThurs = getNextThurs()

   $("#next-show").html(" " +nextThurs.toDateString() + " at 12 PM");


   $("#countdown").countdown({until: getNextThurs(), timezone: -4, format: 'yowdHMS',
    onExpiry: function(){
      $(this).countdown('option', {until:getNextThurs(), timezone: -4});
    }
  });
 });
