var $ = function(id){return document.getElementById(id)}
window.onload = function(){
  var a = document.getElementsByClassName('speed');
  var h = document.getElementsByClassName('site');
  for(var i=0;i<a.length;i++){
  if(h[i].childNodes[0].href.match(/^https/)){h[i].childNodes[0].innerHTML=h[i].childNodes[0].innerHTML+' <img src="assets/img/secure.gif" width="16" height="16">'}
  var speed=parseFloat(a[i].innerHTML);
  if(speed<=1.500){a[i].innerHTML='<span title="Loaded in '+a[i].innerHTML+' seconds">Very Fast</span>';}
  else if(speed>1.500 && speed<=2.500){a[i].innerHTML='<span title="Loaded in '+a[i].innerHTML+' seconds">Fast</span>';}
  else if(speed>2.500 && speed<=5.000){a[i].innerHTML='<span title="Loaded in '+a[i].innerHTML+' seconds">Average</span>';}
  else if(speed>5.000){a[i].innerHTML='<span title="Loaded in '+a[i].innerHTML+' seconds">Slow</span>';}}
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == XMLHttpRequest.DONE) {
         if (!xmlhttp.responseText.match(/good/i)) {
           var statusobj = document.getElementsByClassName("status");
           $('dateText').innerHTML = xmlhttp.responseText;
           for(var i=0;i<statusobj.length;i++){statusobj[i].innerHTML = '<img alt="down" src="assets/img/down.png">';}
         }
      }
  };
  xmlhttp.open("GET", "status.txt", true);
  xmlhttp.send();
}

function reportLink(url){
  $('reportedSite').value=url;
  $('reportTitle').innerHTML='Report '+url;
  report_form_show();
}
function report_form_show() {
  $('reportResponse').innerHTML ='';
  $('siteBlocked').checked = true;
  $('reportContainer').style.display = "block";
}
function report_form_hide() {
  $('reportContainer').style.display = "none";
  $('reportResponse').innerHTML ='';
  $('siteBlocked').checked = true;
}

function feedback_form_show() {
  $('feedbackContainer').style.display = "block";
  $('feedbackBtn').style.display = "none";
}
function feedback_form_hide() {
  $('feedbackContainer').style.display = "none";
  $('feedbackBtn').style.display = "block";
  $('feedbackResponse').innerHTML = '';
  $('feedback_message').value = '';
  $('feedback_email').value = '';
}

function submit_feedback(){
  $('feedbackResponse').innerHTML = '<img src="assets/img/load.gif">';
  if($('feedback_email')){var email=encodeURIComponent($('feedback_email').value);}
  if($('feedback_message').value.length < 4){$('feedbackResponse').innerHTML = "Error: Message too short"}
  else{
    var message = encodeURIComponent($('feedback_message').value);
    var captchaResponse = encodeURIComponent($('g-recaptcha-response').value);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status==200) {
          $('feedbackResponse').innerHTML = xmlhttp.responseText;
          grecaptcha.reset();
        }
      }
    }
  };
  xmlhttp.open("POST", "https://s.proxybay.buzz/pb_feedback_mail.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
  xmlhttp.send('email='+email+'&message='+message+'&captcharesponse='+captchaResponse);
}

function submit_report(){
  $('reportResponse').innerHTML = '<img src="assets/img/load.gif">';
  var radios = document.getElementsByName('reportSite');
  for (var i = 0, length = radios.length; i < length; i++){
    if (radios[i].checked){var feedbackVal = radios[i].value;break;}
  }
  var reportedUrl = $('reportedSite').value;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4) {
      if (xmlhttp.status==200) {
        $('reportResponse').innerHTML = xmlhttp.responseText;
      }
    }
  };
  xmlhttp.open("GET", "https://s.proxybay.buzz/pb_report.php?reportedUrl="+reportedUrl+'&feedbackVal='+feedbackVal, true);
  xmlhttp.send();
}

