jQuery(document).ready(function($) {
$(function() {

	var wow = new WOW(
	  {
		boxClass:     'wow',      // 要套用WOW.js縮需要的動畫class(預設是wow)
		animateClass: 'animated', // 要"動起來"的動畫(預設是animated, 因此如果你有其他動畫library要使用也可以在這裡調整)
		offset:       0,          // 距離顯示多遠開始顯示動畫 (預設是0, 因此捲動到顯示時才出現動畫)
		mobile:       true,       // 手機上是否要套用動畫 (預設是true)
		live:         true,       // 非同步產生的內容是否也要套用 (預設是true, 非常適合搭配SPA)
		callback:     function(box) {
		  // 當每個要開始時, 呼叫這裡面的內容, 參數是要開始進行動畫特效的element DOM
		},
		scrollContainer: null // 可以設定成只套用在某個container中捲動才呈現, 不設定就是整個視窗
	  }
	);
	wow.init();
  
  });
});

 // go to top
 jQuery(document).ready(function($) {
	
	$('.top').click(function(event) {
		event.preventDefault();

		$('html, body').animate({
			scrollTop: 0
		},
			1000);
	});

});





//contact us
function captchaCode() {
	var Numb1, Numb2, Numb3, Numb4, Code;     
	Numb1 = (Math.ceil(Math.random() * 10)-1).toString();
	Numb2 = (Math.ceil(Math.random() * 10)-1).toString();
	Numb3 = (Math.ceil(Math.random() * 10)-1).toString();
	Numb4 = (Math.ceil(Math.random() * 10)-1).toString();
	
	Code = Numb1 + Numb2 + Numb3 + Numb4;
	$("#captcha span").remove();
	$("#captcha input").remove();
	$("#captcha").append("<span id='code'>" + Code + "</span><input type='button' onclick='captchaCode();'>");
  }
  
  $(function() {
	captchaCode();
	
	$('#contactForm').submit(function(){
	  var captchaVal = $("#code").text();
	  var captchaCode = $(".captcha").val();
	  if (captchaVal == captchaCode) {
		$(".captcha").css({
		  "color" : "#609D29"
		});
	  }
	  else {
		$(".captcha").css({
		  "color" : "#CE3B46"
		});
	  }
	  
	  var emailFilter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,10})+$/;   
	  var emailText = $(".email").val();
	  if (emailFilter.test(emailText)) {
		$(".email").css({
		  "color" : "#609D29"
		});
	  }
	  else {
		$(".email").css({
		  "color" : "#CE3B46"
		});
	  }
	  
	  var nameFilter = /^([a-zA-Z \t]{3,15})+$/;
	  var nameText = $(".name").val();
	  if (nameFilter.test(nameText)) {
		$(".name").css({
		  "color" : "#609D29"
		});
	  }
	  else {
		$(".name").css({
		  "color" : "#CE3B46"
		});
	  }
	  
	  var messageText = $(".message").val().length;
	  if (messageText > 50) {
		$(".message").css({
		  "color" : "#609D29"
		});
	  }
	  else {
		$(".message").css({
		  "color" : "#CE3B46"
		});
	  }
	  
	  if ((captchaVal !== captchaCode) || (!emailFilter.test(emailText)) || (!nameFilter.test(nameText)) || (messageText < 50)) {
		return false;
	  }
	  if ((captchaVal == captchaCode) && (emailFilter.test(emailText)) && (nameFilter.test(nameText)) && (messageText > 50)) {
		$("#contactForm").css("display", "none");
		$("#form").append("<h2>Message sent!</h2>");
		return false;
	  }
	});       
  });