(function(){function a(){document.getElementById("contact-form-input").reset()}$("#contact-btn").on("click",function(c){c.preventDefault();let d,e=document.getElementById("name").value,f=document.getElementById("phone-number").value,g=document.getElementById("email").value,h=document.getElementById("message-input").value,i=document.getElementById("error-message");if(5>e.length)return d="Please enter your full name",i.style.padding="10px",i.innerHTML=d,!1;if(isNaN(f)||10!=f.length)return d="Please enter a valid phone number",i.style.padding="10px",i.innerHTML=d,!1;if(-1==g.indexOf("@")||6>g.length)return d="Please enter a valid email address",i.style.padding="10px",i.innerHTML=d,!1;if(50>=h.length)return d="Please enter more than 50 characters in the 'Message' body",i.style.padding="10px",i.innerHTML=d,!1;(i.style.padding="10px")&&(i.style.display="none");let j={email:g,fullName:e,message:h,phoneNumber:f};console.log(j),$.ajax("/api/contactUs",{type:"POST",data:j}).then(()=>{console.log("created new contact guest")}),a(),b.style.display="block"});const b=document.querySelector("#contact-modal"),c=document.querySelector(".contact-close");c.addEventListener("click",function(){b.style.display="none"}),window.addEventListener("click",function(a){a.target==b&&(b.style.display="none")})})();