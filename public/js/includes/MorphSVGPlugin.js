/*!
		 * VERSION: 0.9.1
		 * DATE: 2019-02-21
		 * UPDATES AND DOCS AT: http://greensock.com
		 *
		 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
		 * MorphSVGPlugin is a Club GreenSock membership benefit; You must have a valid membership to use
		 * this code without violating the terms of use. Visit http://greensock.com/club/ to sign up or get more details.
		 * This work is subject to the software agreement that was issued with your membership.
		 *
		 * @author: Jack Doyle, jack@greensock.com
*/ var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";var e,t=Math.PI,n=t/180,r=/[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,o=/(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,i=/(^[#\.][a-z]|[a-y][a-z])/gi,s=/[achlmqstvz]/gi,$=/[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi,_=Math.atan2,a=Math.cos,h=Math.sin,l=Math.sqrt,p=2*t,c=.3*t,g=.7*t,f=_gsScope._gsDefine.globals.TweenLite,u=(String.fromCharCode(103,114,101,101,110,115,111,99,107,46,99,111,109),String.fromCharCode(47,114,101,113,117,105,114,101,115,45,109,101,109,98,101,114,115,104,105,112,47),function(e){_gsScope.console&&console.log(e)}),d=function(e,t,r,o,i,s,$,_,c){if(e!==_||t!==c){r=Math.abs(r),o=Math.abs(o);var g=i%360*n,f=a(g),u=h(g),d=(e-_)/2,y=(t-c)/2,v=f*d+u*y,x=-u*d+f*y,m=v*v,b=x*x,w=m/(r*r)+b/(o*o);1<w&&(r=l(w)*r,o=l(w)*o);var T=r*r,S=o*o,P=(T*S-T*b-S*m)/(T*b+S*m);P<0&&(P=0);var z=(s===$?-1:1)*l(P),A=z*(r*x/o),N=z*(-o*v/r),R=(e+_)/2+(f*A-u*N),C=(t+c)/2+(u*A+f*N),L=(v-A)/r,O=(x-N)/o,G=(-v-A)/r,M=(-x-N)/o,Y=L*L+O*O,I=(O<0?-1:1)*Math.acos(L/l(Y)),j=(L*M-O*G<0?-1:1)*Math.acos((L*G+O*M)/l(Y*(G*G+M*M)));!$&&0<j?j-=p:$&&j<0&&(j+=p),I%=p;var B,X=Math.ceil(Math.abs(j%=p)/(p/4)),D=[],V=j/X,H=4/3*h(V/2)/(1+a(V/2)),U=f*r,Q=u*r,q=-(u*o),F=f*o;for(B=0;B<X;B++)v=a(i=I+B*V),x=h(i),L=a(i+=V),O=h(i),D.push(v-H*x,x+H*v,L+H*O,O-H*L,L,O);for(B=0;B<D.length;B+=2)v=D[B],x=D[B+1],D[B]=v*U+x*q+R,D[B+1]=v*Q+x*F+C;return D[B-2]=_,D[B-1]=c,D}},y=function(e){var t,n,o,i,s,_,a,h,l,p,c,g,f,y=(e+"").replace($,function(e){var t=+e;return t<1e-4&&-.0001<t?0:t}).match(r)||[],v=[],x=0,m=0,b=y.length,w=0,T="ERROR: malformed path: "+e,S=function(e,t,n,r){p=(n-e)/3,c=(r-t)/3,a.push(e+p,t+c,n-p,r-c,n,r)};if(!e||!isNaN(y[0])||isNaN(y[1]))return u(T),v;for(t=0;t<b;t++)if(f=s,isNaN(y[t])?_=(s=y[t].toUpperCase())!==y[t]:t--,o=+y[t+1],i=+y[t+2],_&&(o+=x,i+=m),t||(h=o,l=i),"M"===s)a&&(a.length<8?v.length-=1:w+=a.length),x=h=o,m=l=i,a=[o,i],v.push(a),t+=2,s="L";else if("C"===s)a||(a=[0,0]),_||(x=m=0),a.push(o,i,x+1*y[t+3],m+1*y[t+4],x+=1*y[t+5],m+=1*y[t+6]),t+=6;else if("S"===s)p=x,c=m,"C"!==f&&"S"!==f||(p+=x-a[a.length-4],c+=m-a[a.length-3]),_||(x=m=0),a.push(p,c,o,i,x+=1*y[t+3],m+=1*y[t+4]),t+=4;else if("Q"===s)p=x+2/3*(o-x),c=m+2/3*(i-m),_||(x=m=0),x+=1*y[t+3],m+=1*y[t+4],a.push(p,c,x+2/3*(o-x),m+2/3*(i-m),x,m),t+=4;else if("T"===s)p=x-a[a.length-4],c=m-a[a.length-3],a.push(x+p,m+c,o+2/3*(x+1.5*p-o),i+2/3*(m+1.5*c-i),x=o,m=i),t+=2;else if("H"===s)S(x,m,x=o,m),t+=1;else if("V"===s)S(x,m,x,m=o+(_?m-x:0)),t+=1;else if("L"===s||"Z"===s)"Z"===s&&(o=h,i=l,a.closed=!0),("L"===s||.5<Math.abs(x-o)||.5<Math.abs(m-i))&&(S(x,m,o,i),"L"===s&&(t+=2)),x=o,m=i;else if("A"===s){if(g=d(x,m,+y[t+1],+y[t+2],+y[t+3],+y[t+4],+y[t+5],(_?x:0)+1*y[t+6],(_?m:0)+1*y[t+7]))for(n=0;n<g.length;n++)a.push(g[n]);x=a[a.length-2],m=a[a.length-1],t+=7}else u(T);return t=a.length,a[0]===a[t-2]&&a[1]===a[t-1]&&(a.closed=!0),v.totalPoints=w+t,v},v=function(e,t){var n,r,o,i,s,$,_,a,h,l,p,c,g,f,u=0,d=e.length,y=t/((d-2)/6);for(g=2;g<d;g+=6)for(u+=y;.999999<u;)n=e[g-2],r=e[g-1],o=e[g],i=e[g+1],s=e[g+2],$=e[g+3],_=e[g+4],a=e[g+5],h=n+(o-n)*(f=1/((Math.floor(u)||1)+1)),h+=((p=o+(s-o)*f)-h)*f,p+=(s+(_-s)*f-p)*f,l=r+(i-r)*f,l+=((c=i+($-i)*f)-l)*f,c+=($+(a-$)*f-c)*f,e.splice(g,4,n+(o-n)*f,r+(i-r)*f,h,l,h+(p-h)*f,l+(c-l)*f,p,c,s+(_-s)*f,$+(a-$)*f),g+=6,d+=6,u--;return e},x=function(e,t){var n,r,o,i="",s=e.length,$=Math.pow(10,t||2);for(r=0;r<e.length;r++){for(s=(o=e[r]).length,i+="M"+(o[0]*$|0)/$+" "+(o[1]*$|0)/$+" C",n=2;n<s;n++)i+=(o[n]*$|0)/$+" ";o.closed&&(i+="z")}return i},m=function(e){for(var t=[],n=e.length-1,r=0;-1<--n;)t[r++]=e[n],t[r++]=e[n+1],n--;for(n=0;n<r;n++)e[n]=t[n];e.reversed=!e.reversed},b=function(e){var t,n=e.length,r=0,o=0;for(t=0;t<n;t++)r+=e[t++],o+=e[t];return[r/(n/2),o/(n/2)]},w=function(e){var t,n,r,o=e.length,i=e[0],s=i,$=e[1],_=$;for(r=6;r<o;r+=6)i<(t=e[r])?i=t:t<s&&(s=t),$<(n=e[r+1])?$=n:n<_&&(_=n);return e.centerX=(i+s)/2,e.centerY=($+_)/2,e.size=(i-s)*($-_)},T=function(e,t){t=t||3;for(var n,r,o,i,s,$,_,a,h,l,p,c,g,f,u,d,y=e.length,v=e[0][0],x=v,m=e[0][1],b=m,w=1/t;-1<--y;)for(n=(s=e[y]).length,i=6;i<n;i+=6)for(h=s[i],l=s[i+1],p=s[i+2]-h,f=s[i+3]-l,c=s[i+4]-h,u=s[i+5]-l,g=s[i+6]-h,d=s[i+7]-l,$=t;-1<--$;)v<(r=((_=w*$)*_*g+3*(a=1-_)*(_*c+a*p))*_+h)?v=r:r<x&&(x=r),m<(o=(_*_*d+3*a*(_*u+a*f))*_+l)?m=o:o<b&&(b=o);return e.centerX=(v+x)/2,e.centerY=(m+b)/2,e.left=x,e.width=v-x,e.top=b,e.height=m-b,e.size=(v-x)*(m-b)},S=function(e,t){return t.length-e.length},P=function(e,t){var n=e.size||w(e),r=t.size||w(t);return Math.abs(r-n)<(n+r)/20?t.centerX-e.centerX||t.centerY-e.centerY:r-n},z=function(e,t){var n,r,o=e.slice(0),i=e.length,s=i-2;for(t|=0,n=0;n<i;n++)r=(n+t)%s,e[n++]=o[r],e[n]=o[r+1]},A=function(e,t,n,r,o){var i,s,$,_,a=e.length,h=0,p=a-2;for(n*=6,s=0;s<a;s+=6)_=e[i=(s+n)%p]-(t[s]-r),h+=l(($=e[i+1]-(t[s+1]-o))*$+_*_);return h},N=function(e,t,n){var r,o,i,s=e.length,$=b(e),_=b(t),a=_[0]-$[0],h=_[1]-$[1],l=A(e,t,0,a,h),p=0;for(i=6;i<s;i+=6)(o=A(e,t,i/6,a,h))<l&&(l=o,p=i);if(n)for(m(r=e.slice(0)),i=6;i<s;i+=6)(o=A(r,t,i/6,a,h))<l&&(l=o,p=-i);return p/6},R=function(e,t,n){for(var r,o,i,s,$,_,a=e.length,h=99999999999,p=0,c=0;-1<--a;)for(_=(r=e[a]).length,$=0;$<_;$+=6)(s=l((o=r[$]-t)*o+(i=r[$+1]-n)*i))<h&&(h=s,p=r[$],c=r[$+1]);return[p,c]},C=function(e,t,n,r,o,i){var s,$,_,a,h=t.length,p=0,c=Math.min(e.size||w(e),t[n].size||w(t[n]))*r,g=999999999999,f=e.centerX+o,u=e.centerY+i;for(s=n;s<h&&!((t[s].size||w(t[s]))<c);s++)(a=l(($=t[s].centerX-f)*$+(_=t[s].centerY-u)*_))<g&&(p=s,g=a);return a=t[p],t.splice(p,1),a},L=function(e,t,n,r,o){var i,s,$,_,a,h,l,p=t.length-e.length,c=0<p?t:e,g=0<p?e:t,f=0,d="complexity"===r?S:P,y="position"===r?0:"number"==typeof r?r:.8,x=g.length,b="object"==typeof n&&n.push?n.slice(0):[n],A="reverse"===b[0]||b[0]<0,L="log"===n;if(g[0]){if(1<c.length&&(e.sort(d),t.sort(d),c.size||T(c),g.size||T(g),h=c.centerX-g.centerX,l=c.centerY-g.centerY,d===P))for(x=0;x<g.length;x++)c.splice(x,0,C(g[x],c,x,y,h,l));if(p)for(p<0&&(p=-p),c[0].length>g[0].length&&v(g[0],(c[0].length-g[0].length)/6|0),x=g.length;f<p;)c[x].size||w(c[x]),_=($=R(g,c[x].centerX,c[x].centerY))[0],a=$[1],g[x++]=[_,a,_,a,_,a,_,a],g.totalPoints+=8,f++;for(x=0;x<e.length;x++)i=t[x],s=e[x],(p=i.length-s.length)<0?v(i,-p/6|0):0<p&&v(s,p/6|0),A&&!1!==o&&!s.reversed&&m(s),(n=b[x]||0===b[x]?b[x]:"auto")&&(s.closed||.5>Math.abs(s[0]-s[s.length-2])&&.5>Math.abs(s[1]-s[s.length-1])?"auto"===n||"log"===n?(b[x]=n=N(s,i,!x||!1===o),n<0&&(A=!0,m(s),n=-n),z(s,6*n)):"reverse"!==n&&(x&&n<0&&m(s),z(s,6*(n<0?-n:n))):!A&&("auto"===n&&Math.abs(i[0]-s[0])+Math.abs(i[1]-s[1])+Math.abs(i[i.length-2]-s[s.length-2])+Math.abs(i[i.length-1]-s[s.length-1])>Math.abs(i[0]-s[s.length-2])+Math.abs(i[1]-s[s.length-1])+Math.abs(i[i.length-2]-s[0])+Math.abs(i[i.length-1]-s[1])||n%2)?(m(s),b[x]=-1,A=!0):"auto"===n?b[x]=0:"reverse"===n&&(b[x]=-1),s.closed!==i.closed&&(s.closed=i.closed=!1));return L&&u("shapeIndex:["+b.join(",")+"]"),e.shapeIndex=b}},O=function(e,t){var n,r,o,i,s,$,_,a=0,h=parseFloat(e[0]),l=parseFloat(e[1]),p=h+","+l+" ";for(n=.5*t/(.5*(o=e.length)-1),r=0;r<o-2;r+=2){if(a+=n,$=parseFloat(e[r+2]),_=parseFloat(e[r+3]),.999999<a)for(s=1/(Math.floor(a)+1),i=1;.999999<a;)p+=(h+($-h)*s*i).toFixed(2)+","+(l+(_-l)*s*i).toFixed(2)+" ",a--,i++;p+=$+","+_+" ",h=$,l=_}return p},G=function(e){var t=e[0].match(o)||[],n=e[1].match(o)||[],r=n.length-t.length;0<r?e[0]=O(t,r):e[1]=O(n,-r)},M={rect:"rx,ry,x,y,width,height",circle:"r,cx,cy",ellipse:"rx,ry,cx,cy",line:"x1,x2,y1,y2"},Y=function(e,t){var n,r,i,s,$,_,a,h,l,p,c,g,f,u,d,v,m,b,w,T,S,P,z=e.tagName.toLowerCase();return"path"!==z&&e.getBBox?(_=function(e,t){var n,r=_gsScope.document.createElementNS("http://www.w3.org/2000/svg","path"),o=Array.prototype.slice.call(e.attributes),i=o.length;for(t=","+t+",";-1<--i;)n=o[i].nodeName.toLowerCase(),-1===t.indexOf(","+n+",")&&r.setAttributeNS(null,n,o[i].nodeValue);return r}(e,"x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points"),P=function(e,t){for(var n=t?t.split(","):[],r={},o=n.length;-1<--o;)r[n[o]]=+e.getAttribute(n[o])||0;return r}(e,M[z]),"rect"===z?(s=P.rx,$=P.ry,r=P.x,i=P.y,p=P.width-2*s,c=P.height-2*$,n=s||$?"M"+(v=(u=(f=r+s)+p)+s)+","+(b=i+$)+" V"+(w=b+c)+" C"+[v,T=w+.552284749831*$,d=u+.552284749831*s,S=w+$,u,S,u-(u-f)/3,S,f+(u-f)/3,S,f,S,g=r+.44771525016900005*s,S,r,T,r,w,r,w-(w-b)/3,r,b+(w-b)/3,r,b,r,m=i+.44771525016900005*$,g,i,f,i,f+(u-f)/3,i,u-(u-f)/3,i,u,i,d,i,v,m,v,b].join(",")+"z":"M"+(r+p)+","+i+" v"+c+" h"+-p+" v"+-c+" h"+p+"z"):"circle"===z||"ellipse"===z?(h="circle"===z?.552284749831*(s=$=P.r):(s=P.rx,.552284749831*($=P.ry)),n="M"+((r=P.cx)+s)+","+(i=P.cy)+" C"+[r+s,i+h,r+(a=.552284749831*s),i+$,r,i+$,r-a,i+$,r-s,i+h,r-s,i,r-s,i-h,r-a,i-$,r,i-$,r+a,i-$,r+s,i-h,r+s,i].join(",")+"z"):"line"===z?n="M"+P.x1+","+P.y1+" L"+P.x2+","+P.y2:"polyline"!==z&&"polygon"!==z||(n="M"+(r=(l=(e.getAttribute("points")+"").match(o)||[]).shift())+","+(i=l.shift())+" L"+l.join(","),"polygon"===z&&(n+=","+r+","+i+"z")),_.setAttribute("d",x(_._gsRawPath=y(n))),t&&e.parentNode&&(e.parentNode.insertBefore(_,e),e.parentNode.removeChild(e)),_):e},I=function(e,t,n){var r,s,$="string"==typeof e;return(!$||i.test(e)||(e.match(o)||[]).length<3)&&((r=$?f.selector(e):e&&e[0]?e:[e])&&r[0]?(s=((r=r[0]).nodeName+"").toUpperCase(),t&&"PATH"!==s&&(r=Y(r,!1),s="PATH"),e=r.getAttribute("PATH"===s?"d":"points")||"",r===n&&(e=r.getAttributeNS(null,"data-original")||e)):(u("WARNING: invalid morph to: "+e),e=!1)),e},j=function(e,t){for(var n,r,o,i,s,$,a,h,p,c,g,f,u=e.length,d=.2*(t||1);-1<--u;){for(g=(r=e[u]).isSmooth=r.isSmooth||[0,0,0,0],f=r.smoothData=r.smoothData||[0,0,0,0],g.length=4,h=r.length-2,a=6;a<h;a+=6)o=r[a]-r[a-2],i=r[a+1]-r[a-1],s=r[a+2]-r[a],$=r[a+3]-r[a+1],p=_(i,o),c=_($,s),(n=Math.abs(p-c)<d)&&(f[a-2]=p,f[a+2]=c,f[a-1]=l(o*o+i*i),f[a+3]=l(s*s+$*$)),g.push(n,n,0,0,n,n);r[h]===r[0]&&r[h+1]===r[1]&&(o=r[0]-r[h-2],i=r[1]-r[h-1],s=r[2]-r[0],$=r[3]-r[1],p=_(i,o),c=_($,s),Math.abs(p-c)<d&&(f[h-2]=p,f[2]=c,f[h-1]=l(o*o+i*i),f[3]=l(s*s+$*$),g[h-2]=g[h-1]=!0))}return e},B=function(e){var t=e.trim().split(" ");return{x:(0<=e.indexOf("left")?0:0<=e.indexOf("right")?100:isNaN(parseFloat(t[0]))?50:parseFloat(t[0]))/100,y:(0<=e.indexOf("top")?0:0<=e.indexOf("bottom")?100:isNaN(parseFloat(t[1]))?50:parseFloat(t[1]))/100}},X="Use MorphSVGPlugin.convertToPath(elementOrSelectorText) to convert to a path before morphing.",D=_gsScope._gsDefine.plugin({propName:"morphSVG",API:2,global:!0,version:"0.9.1",overwriteProps:["morphSVG"],init:function(t,n,r,i){var $,_,a,h,l,p,c,g,f,d,v,m,b,w,S,P,z,A,N,R,C,O,M,Y=t.nodeType?window.getComputedStyle(t):{},V=Y.fill+"",H=!("none"===V||"0"===(V.match(o)||[])[3]||"evenodd"===Y.fillRule),U=(n.origin||"50 50").split(",");if(p="POLYLINE"===(_=(t.nodeName+"").toUpperCase())||"POLYGON"===_,"PATH"!==_&&!p&&!n.prop)return u("WARNING: cannot morph a <"+_+"> element. "+X),!1;if(a="PATH"===_?"d":"points",("string"==typeof n||n.getBBox||n[0])&&(n={shape:n}),!n.prop&&"function"!=typeof t.setAttribute)return!1;if(l=I(n.shape||n.d||n.points||"","d"===a,t),p&&s.test(l))return u("WARNING: a <"+_+"> cannot accept path data. "+X),!1;if(c=n.shapeIndex||0===n.shapeIndex?n.shapeIndex:"auto",g=n.map||D.defaultMap,this._prop=n.prop,this._render=n.render||D.defaultRender,this._apply="updateTarget"in n?n.updateTarget:D.defaultUpdateTarget,this._rnd=Math.pow(10,isNaN(n.precision)?2:+n.precision),this._tween=r,l){if(this._target=t,A="object"==typeof n.precompile,v=this._prop?t[this._prop]:t.getAttribute(a),this._prop||t.getAttributeNS(null,"data-original")||t.setAttributeNS(null,"data-original",v),"d"===a||this._prop){if(v=y(A?n.precompile[0]:v),m=y(A?n.precompile[1]:l),!A&&!L(v,m,c,g,H))return!1;for("log"!==n.precompile&&!0!==n.precompile||u('precompile:["'+x(v)+'","'+x(m)+'"]'),(O="linear"!==(n.type||D.defaultType))&&(v=j(v,n.smoothTolerance),m=j(m,n.smoothTolerance),v.size||T(v),m.size||T(m),C=B(U[0]),this._origin=v.origin={x:v.left+C.x*v.width,y:v.top+C.y*v.height},U[1]&&(C=B(U[1])),this._eOrigin={x:m.left+C.x*m.width,y:m.top+C.y*m.height}),this._rawPath=t._gsRawPath=v,w=v.length;-1<--w;)for(P=v[w],z=m[w],f=P.isSmooth||[],d=z.isSmooth||[],S=P.length,b=e=0;b<S;b+=2)z[b]===P[b]&&z[b+1]===P[b+1]||(O?f[b]&&d[b]?(N=P.smoothData,R=z.smoothData,M=b+(b===S-4?7-S:5),this._controlPT={_next:this._controlPT,i:b,j:w,l1s:N[b+1],l1c:R[b+1]-N[b+1],l2s:N[M],l2c:R[M]-N[M]},h=this._tweenRotation(P,z,b+2),this._tweenRotation(P,z,b,h),this._tweenRotation(P,z,M-1,h),b+=4):this._tweenRotation(P,z,b):(this._addTween(P,b,P[b],z[b]),h=this._addTween(P,b+1,P[b+1],z[b+1])))}else h=this._addTween(t,"setAttribute",t.getAttribute(a)+"",l+"","morphSVG",!1,a,isNaN($=c)?G:function(e){G(e),e[1]=function(e,t){if(!t)return e;var n,r,i,s=e.match(o)||[],$=s.length,_="";for(n="reverse"===t?(r=$-1,-2):(r=(2*(parseInt(t,10)||0)+1+100*$)%$,2),i=0;i<$;i+=2)_+=s[r-1]+","+s[r]+" ",r=(r+n)%$;return _}(e[1],parseInt($,10))});O&&(this._addTween(this._origin,"x",this._origin.x,this._eOrigin.x),h=this._addTween(this._origin,"y",this._origin.y,this._eOrigin.y)),h&&(this._overwriteProps.push("morphSVG"),h.end=l,h.endProp=a)}return!0},set:function(e){var t,n,r,o,i,s,$,l,p,c,g,f,u,d=this._rawPath,y=this._controlPT,v=this._anchorPT,x=this._rnd,m=this._target;if(this._super.setRatio.call(this,e),1===e&&this._apply)for(r=this._firstPT;r;)r.end&&(this._prop?m[this._prop]=r.end:m.setAttribute(r.endProp,r.end)),r=r._next;else if(d){for(;v;)s=v.sa+e*v.ca,i=v.sl+e*v.cl,v.t[v.i]=this._origin.x+a(s)*i,v.t[v.i+1]=this._origin.y+h(s)*i,v=v._next;for(n=e<.5?2*e*e:(4-2*e)*e-1;y;)s=_(o[u=($=y.i)+($===(o=d[y.j]).length-4?7-o.length:5)]-o[$+1],o[u-1]-o[$]),g=h(s),f=a(s),p=o[$+2],c=o[$+3],i=y.l1s+n*y.l1c,o[$]=p-f*i,o[$+1]=c-g*i,i=y.l2s+n*y.l2c,o[u-1]=p+f*i,o[u]=c+g*i,y=y._next;if(m._gsRawPath=d,this._apply){for(t="",l=0;l<d.length;l++)for(i=(o=d[l]).length,t+="M"+(o[0]*x|0)/x+" "+(o[1]*x|0)/x+" C",$=2;$<i;$++)t+=(o[$]*x|0)/x+" ";this._prop?m[this._prop]=t:m.setAttribute("d",t)}}this._render&&d&&this._render.call(this._tween,d,m)}});D.prototype._tweenRotation=function(n,r,o,i){var s,$,a,h=this._origin,f=this._eOrigin,u=n[o]-h.x,d=n[o+1]-h.y,y=l(u*u+d*d),v=_(d,u);return u=r[o]-f.x,$=(a=s=_(d=r[o+1]-f.y,u)-v)!=a%t?a+(a<0?p:-p):a,!i&&e&&Math.abs($+e.ca)<c&&(i=e),this._anchorPT=e={_next:this._anchorPT,t:n,sa:v,ca:i&&$*i.ca<0&&Math.abs($)>g?s:$,sl:y,cl:l(u*u+d*d)-y,i:o}},D.pathFilter=function(e,t,n,r,o){var i=y(e[0]),s=y(e[1]);L(i,s,t||0===t?t:"auto",n,o)&&(e[0]=x(i),e[1]=x(s),"log"!==r&&!0!==r||u('precompile:["'+e[0]+'","'+e[1]+'"]'))},D.pointsFilter=G,D.getTotalSize=T,D.subdivideRawBezier=D.subdivideSegment=v,D.rawPathToString=x,D.defaultType="linear",D.defaultUpdateTarget=!0,D.defaultMap="size",D.stringToRawPath=D.pathDataToRawBezier=function(e){return y(I(e,!0))},D.equalizeSegmentQuantity=L,D.convertToPath=function(e,t){"string"==typeof e&&(e=f.selector(e));for(var n=e&&0!==e.length?e.length&&e[0]&&e[0].nodeType?Array.prototype.slice.call(e,0):[e]:[],r=n.length;-1<--r;)n[r]=Y(n[r],!1!==t);return n},D.pathDataToBezier=function(e,t){var n,r,o,i,s,$,_,a,h=y(I(e,!0))[0]||[],l=0;if(a=(t=t||{}).align||t.relative,i=t.matrix||[1,0,0,1,0,0],s=t.offsetX||0,$=t.offsetY||0,"relative"===a||!0===a?(s-=h[0]*i[0]+h[1]*i[2],$-=h[0]*i[1]+h[1]*i[3],l="+="):(s+=i[4],$+=i[5],a&&(a="string"==typeof a?f.selector(a):a&&a[0]?a:[a])&&a[0]&&(s-=(_=a[0].getBBox()||{x:0,y:0}).x,$-=_.y)),n=[],o=h.length,i&&"1,0,0,1,0,0"!==i.join(","))for(r=0;r<o;r+=2)n.push({x:l+(h[r]*i[0]+h[r+1]*i[2]+s),y:l+(h[r]*i[1]+h[r+1]*i[3]+$)});else for(r=0;r<o;r+=2)n.push({x:l+(h[r]+s),y:l+(h[r+1]+$)});return n}}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()(),function(){"use strict";var e=function(){return(_gsScope.GreenSockGlobals||_gsScope).MorphSVGPlugin};"undefined"!=typeof module&&module.exports?(require("../TweenLite.js"),module.exports=e()):"function"==typeof define&&define.amd&&define(["TweenLite"],e)}();