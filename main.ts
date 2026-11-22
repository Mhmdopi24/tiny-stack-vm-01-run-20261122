import {readFileSync,mkdirSync,writeFileSync} from "node:fs";
const I=(process.env.MAKEFUN_INPUT_DIR||"/input")+"/",O=(process.env.MAKEFUN_OUTPUT_DIR||"/output")+"/";
for(let n=1;n<=40;n++){
 const id="i"+String(n).padStart(3,"0");
 let p,b;
 try{p=readFileSync(I+id+"/program.bin")}catch{p=Buffer.alloc(0)}
 try{b=readFileSync(I+id+"/input.bin")}catch{b=Buffer.alloc(0)}
 const S=new Int32Array(256),M=new Int32Array(256),C=new Int32Array(64);
 let sp=0,cp=0,pc=0,ip=0,steps=0,exit=0;
 const U=[];
 let done=false;
 while(!done){
  if(steps>=1000000){exit=10;break}
  if(pc<0||pc>=p.length){exit=9;break}
  const o=p[pc];
  let L=0;
  if(o===1)L=1;
  else if(o===2)L=4;
  else if(o>=48&&o<=51)L=2;
  else if(!((o<=7)||(o>=16&&o<=34)||(o>=48&&o<=52)||o===64||o===65||(o>=80&&o<=83))){exit=5;break}
  if(pc+1+L>p.length){exit=9;break}
  steps++;
  const nx=pc+1+L;
  switch(o){
   case 0:exit=0;done=true;break;
   case 1:if(sp>255){exit=3;done=true;break}S[sp++]=(p[pc+1]<<24)>>24;pc=nx;break;
   case 2:if(sp>255){exit=3;done=true;break}S[sp++]=p.readInt32LE(pc+1);pc=nx;break;
   case 3:if(sp<1){exit=2;done=true;break}sp--;pc=nx;break;
   case 4:if(sp<1){exit=2;done=true;break}if(sp>255){exit=3;done=true;break}S[sp]=S[sp-1];sp++;pc=nx;break;
   case 5:if(sp<2){exit=2;done=true;break}{const t=S[sp-1];S[sp-1]=S[sp-2];S[sp-2]=t}pc=nx;break;
   case 6:if(sp<2){exit=2;done=true;break}if(sp>255){exit=3;done=true;break}S[sp]=S[sp-2];sp++;pc=nx;break;
   case 7:if(sp<3){exit=2;done=true;break}{const t=S[sp-3];S[sp-3]=S[sp-2];S[sp-2]=S[sp-1];S[sp-1]=t}pc=nx;break;
   case 0x10:if(sp<2){exit=2;done=true;break}{const a=S[sp-2],c=S[sp-1];S[sp-2]=(a+c)|0;sp--}pc=nx;break;
   case 0x11:if(sp<2){exit=2;done=true;break}{const a=S[sp-2],c=S[sp-1];S[sp-2]=(a-c)|0;sp--}pc=nx;break;
   case 0x12:if(sp<2){exit=2;done=true;break}{const a=S[sp-2],c=S[sp-1];S[sp-2]=Math.imul(a,c);sp--}pc=nx;break;
   case 0x13:if(sp<2){exit=2;done=true;break}{const a=S[sp-2],c=S[sp-1];if(c===0){exit=4;done=true;break}S[sp-2]=(a/c)|0;sp--}pc=nx;break;
   case 0x14:if(sp<2){exit=2;done=true;break}{const a=S[sp-2],c=S[sp-1];if(c===0){exit=4;done=true;break}S[sp-2]=a%c;sp--}pc=nx;break;
   case 0x15:if(sp<2){exit=2;done=true;break}{const a=S[sp-2],c=S[sp-1];if(c===0){exit=4;done=true;break}S[sp-2]=Math.trunc((a>>>0)/(c>>>0))|0;sp--}pc=nx;break;
   case 0x16:if(sp<2){exit=2;done=true;break}{const a=S[sp-2],c=S[sp-1];if(c===0){exit=4;done=true;break}S[sp-2]=((a>>>0)%(c>>>0))|0;sp--}pc=nx;break;
   case 0x17:if(sp<1){exit=2;done=true;break}S[sp-1]=(-S[sp-1])|0;pc=nx;break;
   case 0x18:if(sp<2){exit=2;done=true;break}{const a=S[sp-2],c=S[sp-1];S[sp-2]=a&c;sp--}pc=nx;break;
   case 0x19:if(sp<2){exit=2;done=true;break}{const a=S[sp-2],c=S[sp-1];S[sp-2]=a|c;sp--}pc=nx;break;
   case 0x1a:if(sp<2){exit=2;done=true;break}{const a=S[sp-2],c=S[sp-1];S[sp-2]=a^c;sp--}pc=nx;break;
   case 0x1b:if(sp<1){exit=2;done=true;break}S[sp-1]=~S[sp-1];pc=nx;break;
   case 0x1c:if(sp<2){exit=2;done=true;break}{const a=S[sp-2],c=S[sp-1];S[sp-2]=a<<c;sp--}pc=nx;break;
   case 0x1d:if(sp<2){exit=2;done=true;break}{const a=S[sp-2],c=S[sp-1];S[sp-2]=a>>c;sp--}pc=nx;break;
   case 0x1e:if(sp<2){exit=2;done=true;break}{const a=S[sp-2],c=S[sp-1];S[sp-2]=(a>>>c)|0;sp--}pc=nx;break;
   case 0x20:if(sp<2){exit=2;done=true;break}{const a=S[sp-2],c=S[sp-1];S[sp-2]=a===c?1:0;sp--}pc=nx;break;
   case 0x21:if(sp<2){exit=2;done=true;break}{const a=S[sp-2],c=S[sp-1];S[sp-2]=a<c?1:0;sp--}pc=nx;break;
   case 0x22:if(sp<2){exit=2;done=true;break}{const a=S[sp-2],c=S[sp-1];S[sp-2]=(a>>>0)<(c>>>0)?1:0;sp--}pc=nx;break;
   case 0x30:pc=nx+p.readInt16LE(pc+1);break;
   case 0x31:if(sp<1){exit=2;done=true;break}{const v=S[--sp];pc=v===0?nx+p.readInt16LE(pc+1):nx}break;
   case 0x32:if(sp<1){exit=2;done=true;break}{const v=S[--sp];pc=v!==0?nx+p.readInt16LE(pc+1):nx}break;
   case 0x33:if(cp>63){exit=7;done=true;break}C[cp++]=nx;pc=p.readUInt16LE(pc+1);break;
   case 0x34:if(cp===0){exit=8;done=true;break}pc=C[--cp];break;
   case 0x40:if(sp<1){exit=2;done=true;break}{const a=S[sp-1];if(a<0||a>255){exit=6;done=true;break}S[sp-1]=M[a]}pc=nx;break;
   case 0x41:if(sp<2){exit=2;done=true;break}{const a=S[sp-1],v=S[sp-2];if(a<0||a>255){exit=6;done=true;break}M[a]=v;sp-=2}pc=nx;break;
   case 0x50:if(sp<1){exit=2;done=true;break}{const v=S[--sp],s=String(v);if(U.length+s.length>65536){exit=11;done=true;break}for(const ch of s)U.push(ch.charCodeAt(0))}pc=nx;break;
   case 0x51:if(sp<1){exit=2;done=true;break}if(U.length>=65536){exit=11;done=true;break}U.push(S[--sp]&255);pc=nx;break;
   case 0x52:if(sp>255){exit=3;done=true;break}S[sp++]=ip<b.length?b[ip++]:-1;pc=nx;break;
   case 0x53:if(sp<1){exit=2;done=true;break}exit=S[--sp]&255;done=true;break;
  }
 }
 mkdirSync(O+id,{recursive:true});
 writeFileSync(O+id+"/stdout.bin",Buffer.from(U));
 writeFileSync(O+id+"/exit.txt",String(exit));
}
