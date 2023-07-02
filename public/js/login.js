var caretPos,curEmailIndex,screenCenter,svgCoords,dFromC,eyeDistH,eyeLDistV,eyeRDistV,eyeDistR,email=document.querySelector("#username"),password=document.querySelector("#password"),mySVG=document.querySelector(".svgContainer"),armL=document.querySelector(".armL"),armR=document.querySelector(".armR"),eyeL=document.querySelector(".eyeL"),eyeR=document.querySelector(".eyeR"),nose=document.querySelector(".nose"),mouth=document.querySelector(".mouth"),mouthBG=document.querySelector(".mouthBG"),mouthSmallBG=document.querySelector(".mouthSmallBG"),mouthMediumBG=document.querySelector(".mouthMediumBG"),mouthLargeBG=document.querySelector(".mouthLargeBG"),mouthMaskPath=document.querySelector("#mouthMaskPath"),mouthOutline=document.querySelector(".mouthOutline"),tooth=document.querySelector(".tooth"),tongue=document.querySelector(".tongue"),chin=document.querySelector(".chin"),face=document.querySelector(".face"),eyebrow=document.querySelector(".eyebrow"),outerEarL=document.querySelector(".earL .outerEar"),outerEarR=document.querySelector(".earR .outerEar"),earHairL=document.querySelector(".earL .earHair"),earHairR=document.querySelector(".earR .earHair"),hair=document.querySelector(".hair"),eyeMaxHorizD=20,eyeMaxVertD=10,noseMaxHorizD=23,noseMaxVertD=10,mouthStatus="small";function getCoord(e){var t=email.selectionEnd,o=document.createElement("div"),a=document.createElement("span"),r=getComputedStyle(email),s={},u={},n={};[].forEach.call(r,function(e){o.style[e]=r[e]}),o.style.position="absolute",document.body.appendChild(o),o.textContent=email.value.substr(0,t),a.textContent=email.value.substr(t)||".",o.appendChild(a),s=getPosition(email),u=getPosition(a),n=getPosition(mySVG),svgCoords=getPosition(mySVG),dFromC=(screenCenter=n.x+mySVG.offsetWidth/2)-(caretPos=u.x+s.x);var i=Math.round(caretPos/screenCenter*100)/100;i<1||i>1&&(i-=2,i=Math.abs(i)),(eyeDistH=-(.05*dFromC))>eyeMaxHorizD?eyeDistH=eyeMaxHorizD:eyeDistH<-eyeMaxHorizD&&(eyeDistH=-eyeMaxHorizD);var l={x:svgCoords.x+84,y:svgCoords.y+76},y={x:svgCoords.x+113,y:svgCoords.y+76},c={x:svgCoords.x+97,y:svgCoords.y+81},m={x:svgCoords.x+100,y:svgCoords.y+100},x=getAngle(l.x,l.y,s.x+u.x,s.y+25),h=getAngle(y.x,y.y,s.x+u.x,s.y+25),_=getAngle(c.x,c.y,s.x+u.x,s.y+25),d=getAngle(m.x,m.y,s.x+u.x,s.y+25),O=Math.cos(d)*noseMaxHorizD,g=Math.sin(d)*noseMaxVertD,f=6*Math.cos(d),$=1-.15*dFromC/100;$>1&&($=1-($-1));var S=.3*O,L=.4*g,v=4*Math.cos(d),E=5*Math.cos(d);TweenMax.to(eyeL,1,{x:-(Math.cos(x)*eyeMaxHorizD),y:-(Math.sin(x)*eyeMaxVertD),ease:Expo.easeOut}),TweenMax.to(eyeR,1,{x:-(Math.cos(h)*eyeMaxHorizD),y:-(Math.sin(h)*eyeMaxVertD),ease:Expo.easeOut}),TweenMax.to(nose,1,{x:-(Math.cos(_)*noseMaxHorizD),y:-(Math.sin(_)*noseMaxVertD),rotation:f,transformOrigin:"center center",ease:Expo.easeOut}),TweenMax.to(mouth,1,{x:-O,y:-g,rotation:f,transformOrigin:"center center",ease:Expo.easeOut}),TweenMax.to(chin,1,{x:-(.8*O),y:-(.5*g),scaleY:$,ease:Expo.easeOut}),TweenMax.to(face,1,{x:-S,y:-L,skewX:-(5*Math.cos(d)),transformOrigin:"center top",ease:Expo.easeOut}),TweenMax.to(eyebrow,1,{x:-S,y:-L,skewX:-(25*Math.cos(d)),transformOrigin:"center top",ease:Expo.easeOut}),TweenMax.to(outerEarL,1,{x:v,y:-E,ease:Expo.easeOut}),TweenMax.to(outerEarR,1,{x:v,y:E,ease:Expo.easeOut}),TweenMax.to(earHairL,1,{x:-v,y:-E,ease:Expo.easeOut}),TweenMax.to(earHairR,1,{x:-v,y:E,ease:Expo.easeOut}),TweenMax.to(hair,1,{x:6*Math.cos(d),scaleY:1.2,transformOrigin:"center bottom",ease:Expo.easeOut}),document.body.removeChild(o)}function onEmailInput(e){getCoord(e);var t=e.target.value;(curEmailIndex=t.length)>0?("small"==mouthStatus&&(mouthStatus="medium",TweenMax.to([mouthBG,mouthOutline,mouthMaskPath],1,{morphSVG:mouthMediumBG,shapeIndex:8,ease:Expo.easeOut}),TweenMax.to(tooth,1,{x:0,y:0,ease:Expo.easeOut}),TweenMax.to(tongue,1,{x:0,y:1,ease:Expo.easeOut}),TweenMax.to([eyeL,eyeR],1,{scaleX:.85,scaleY:.85,ease:Expo.easeOut})),t.includes("@")?(mouthStatus="large",TweenMax.to([mouthBG,mouthOutline,mouthMaskPath],1,{morphSVG:mouthLargeBG,ease:Expo.easeOut}),TweenMax.to(tooth,1,{x:3,y:-2,ease:Expo.easeOut}),TweenMax.to(tongue,1,{y:2,ease:Expo.easeOut}),TweenMax.to([eyeL,eyeR],1,{scaleX:.65,scaleY:.65,ease:Expo.easeOut,transformOrigin:"center center"})):(mouthStatus="medium",TweenMax.to([mouthBG,mouthOutline,mouthMaskPath],1,{morphSVG:mouthMediumBG,ease:Expo.easeOut}),TweenMax.to(tooth,1,{x:0,y:0,ease:Expo.easeOut}),TweenMax.to(tongue,1,{x:0,y:1,ease:Expo.easeOut}),TweenMax.to([eyeL,eyeR],1,{scaleX:.85,scaleY:.85,ease:Expo.easeOut}))):(mouthStatus="small",TweenMax.to([mouthBG,mouthOutline,mouthMaskPath],1,{morphSVG:mouthSmallBG,shapeIndex:9,ease:Expo.easeOut}),TweenMax.to(tooth,1,{x:0,y:0,ease:Expo.easeOut}),TweenMax.to(tongue,1,{y:0,ease:Expo.easeOut}),TweenMax.to([eyeL,eyeR],1,{scaleX:1,scaleY:1,ease:Expo.easeOut}))}function onEmailFocus(e){e.target.parentElement.classList.add("focusWithText"),getCoord()}function onEmailBlur(e){""==e.target.value&&e.target.parentElement.classList.remove("focusWithText"),resetFace()}function onPasswordFocus(e){coverEyes()}function onPasswordBlur(e){uncoverEyes()}function coverEyes(){TweenMax.to(armL,.45,{x:-93,y:2,rotation:0,ease:Quad.easeOut}),TweenMax.to(armR,.45,{x:-93,y:2,rotation:0,ease:Quad.easeOut,delay:.1})}function uncoverEyes(){TweenMax.to(armL,1.35,{y:220,ease:Quad.easeOut}),TweenMax.to(armL,1.35,{rotation:105,ease:Quad.easeOut,delay:.1}),TweenMax.to(armR,1.35,{y:220,ease:Quad.easeOut}),TweenMax.to(armR,1.35,{rotation:-105,ease:Quad.easeOut,delay:.1})}function resetFace(){TweenMax.to([eyeL,eyeR],1,{x:0,y:0,ease:Expo.easeOut}),TweenMax.to(nose,1,{x:0,y:0,scaleX:1,scaleY:1,ease:Expo.easeOut}),TweenMax.to(mouth,1,{x:0,y:0,rotation:0,ease:Expo.easeOut}),TweenMax.to(chin,1,{x:0,y:0,scaleY:1,ease:Expo.easeOut}),TweenMax.to([face,eyebrow],1,{x:0,y:0,skewX:0,ease:Expo.easeOut}),TweenMax.to([outerEarL,outerEarR,earHairL,earHairR,hair],1,{x:0,y:0,scaleY:1,ease:Expo.easeOut})}function getAngle(e,t,o,a){return Math.atan2(t-a,e-o)}function getPosition(e){for(var t=0,o=0;e;){if("BODY"==e.tagName){var a=e.scrollLeft||document.documentElement.scrollLeft,r=e.scrollTop||document.documentElement.scrollTop;t+=e.offsetLeft-a+e.clientLeft,o+=e.offsetTop-r+e.clientTop}else t+=e.offsetLeft-e.scrollLeft+e.clientLeft,o+=e.offsetTop-e.scrollTop+e.clientTop;e=e.offsetParent}return{x:t,y:o}}email.addEventListener("focus",onEmailFocus),email.addEventListener("blur",onEmailBlur),email.addEventListener("input",onEmailInput),password.addEventListener("focus",onPasswordFocus),password.addEventListener("blur",onPasswordBlur),TweenMax.set(armL,{x:-93,y:220,rotation:105,transformOrigin:"top left"}),TweenMax.set(armR,{x:-93,y:220,rotation:-105,transformOrigin:"top right"});