const display_password = document.querySelector("[display-pass]");
const length_dispaly= document.querySelector("[pass-length]");
const slider = document.querySelector("[slider]");
const uppercase= document.querySelector("[up]");
const lowercase= document.querySelector("[low]");
const numbercheck= document.querySelector("[numcheck]");
const symbolcheck= document.querySelector("[symcheck]");
const strength = document.querySelector("[strength]");
const check = document.querySelectorAll("input[type=checkbox]");
const genbutton = document.querySelector("[generate-button]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
const copy_button = document.querySelector("[copy]");
const copy_message = document.querySelector("[copy-message]");
let password = "";
let password_length =10;
let checkcount =0;

handleslider();
setIndicator("#ccc");

function handleslider(){
    slider.value = password_length;
    length_dispaly.innerText = password_length;
    const min = slider.min;
    const max = slider.max;
    slider.style.backgroundSize = ( (password_length - min)*100/(max - min)) + "% 100%"
}
function setIndicator(color){
    strength.style.backgroundColor = color;
    strength.style.boxShadow = `0px 0px 12px 1px ${color}`;

}

async function copycontent(){
    try{
        navigator.clipboard.writeText(display_password.value);
        
        copy_message.innerText ="Copied !!"
    }
    catch(e)
    {
        copy_message.innerText ="Failed"
    }
    copy_message.classList.add("active");
    setTimeout(()=>{copy_message.classList.remove("active");

    },3000);
}

copy_button.addEventListener('click',()=>{
    if(display_password.value){
        copycontent();
    }
})
function Rndinteger(min,max){
    return Math.floor(Math.random() * (max-min)) + min;
}

function RndUpper(){
     return String.fromCharCode(Rndinteger(65,90));
}

function Rndlower(){
    return String.fromCharCode(Rndinteger(65,90));
}

function Rndnumber(){
    return Rndinteger(0,9);
}
function Rndsymbol(){
    let a= Rndinteger(0,symbols.length);
    return symbols.charAt(a);
}
function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercase.checked) hasUpper = true;
    if (lowercase.checked) hasLower = true;
    if (numbercheck.checked) hasNum = true;
    if (symbolcheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && password_length >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      password_length >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}

function shufflepass(array){
for(let i= array.length -1 ;i>0 ;i--)
    {
        const rnd = Math.floor(Math.random()* (i+1));
        const temp =array[i];
        array[i]=array[rnd];
        array[rnd]=temp;
    }
    let str="";
    array.forEach((element)=>{
        str+=element;
    });
    return str;

}

function handleboxchange(){
    checkcount=0;
    check.forEach((checkbox)=>{  
   if(checkbox.checked)
   checkcount++; 
   });

   if(password_length < checkcount)
   {
     password_length = checkcount;
     handleslider();
   }

}

check.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleboxchange);
})

slider.addEventListener('input',(e)=>{
    password_length = e.target.value;
    handleslider();
    
})

genbutton.addEventListener('click',()=>{

    if(checkcount == 0)
    {
        return;
    }

    if(password_length < checkcount)
   {
     password_length = checkcount;
     handleslider();
   }
    password = "";

    let passarray =[];
if(uppercase.checked)
{
    passarray.push(RndUpper);
}
if(lowercase.checked)
passarray.push(Rndlower);

if(numbercheck.checked)
passarray.push(Rndnumber);

if(symbolcheck.checked)
passarray.push(Rndsymbol);



for(let i=0 ;i<passarray.length;i++){
    password =password+passarray[i]();
    
}
console.log(password + 1);

for(let i=0 ;i<password_length - passarray.length;i++){
    let rndnum = Rndinteger(0,passarray.length);
    password = password+passarray[rndnum]();
}
password = shufflepass(Array.from(password))
display_password.value=password;
calcStrength();
})



