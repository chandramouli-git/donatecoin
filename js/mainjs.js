var urlParams = new URLSearchParams(window.location.search);
window.onload=function(){
       document.getElementById("user").innerHTML="WELCOME  "+urlParams.get("uname");
};

console.log(urlParams.get("uname"));
$(document).ready(function(){
    $("#bbb1").click(function(){
        if(urlParams.get('x')==1)
               location.replace("http://localhost:3000/donate.html?x="+urlParams.get('x'));
        if(urlParams.get('x')==2)
               location.replace("http://localhost:3000/donate.html?x="+urlParams.get('x'));
    });
    $("#bbb2").click(function(){
       if(urlParams.get('x')==1)
       location.replace("http://localhost:3000/check/:"+urlParams.get('x'));
if(urlParams.get('x')==2)
       location.replace("http://localhost:3000/check/:"+urlParams.get('x'));
    })
  });


