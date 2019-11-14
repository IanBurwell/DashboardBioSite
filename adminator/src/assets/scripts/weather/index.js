
export default (function () {
  
  var d = new Date();
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  
  function titleCase(string) {
	  if(string == null)
		return string;
      var sentence = string.toLowerCase().split(" ");
      for(var i = 0; i< sentence.length; i++){
         sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
      }
   return sentence.join(" ");
   }
  
  fetch('https://api.openweathermap.org/data/2.5/weather?lat=42.447347&lon=-71.227162&appid=a3b41a67b1bca0414aa1f34e058241c2')  
  .then(function(resp) {return resp.json()})
  .then(function(data) {
	  //console.log(JSON.stringify(data, null, 2));

	  //current conditions
	  document.getElementById("curTemp").innerHTML = "<h3>"+Math.round(10*(data["main"]["temp"]-273.15))/10+"<sup>°C</sup></h3>";
	  document.getElementById("curCondition").innerHTML = titleCase(data["weather"][0]["description"]);
		
	  //current picture
	  const ctx = document.getElementById("curWeatherPic").getContext("2d");
	  var img = new Image;
	  img.onload = function(){
		ctx.drawImage(img,0,0, 44, 44); 
	  };
	  img.src = "http://openweathermap.org/img/wn/"+data["weather"][0]["icon"]+"@2x.png";
	  
	  //current day and date
	  document.getElementById("curDate").innerHTML = months[d.getMonth()] + ", " + d.getDate() + " " + d.getFullYear();
	  document.getElementById("curDay").innerHTML = days[d.getDay()];
	  
	  
  });
  
  
  
}())
