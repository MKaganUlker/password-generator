const lengthSlider = document.querySelector(".v");
const options = document.querySelectorAll(".options input");
const generateBtn=document.querySelector(".generate-btn");
const passwordInput = document.querySelector(".input-box input");
const passIndicator = document.querySelector(".pass-indicator");
const copyIcon = document.querySelector(".input-box span");

const characters ={
    lowercase:"qwertyuioplkjhgfdsazxcvbnm",
    uppercase:"QWERTYUIOPLKJHGFDSAZXCVBNM",
    numbers:"0123456789",
    symbols:"!'^+%&/()=?_-*>£#$½{[]}|<>"
}
const generatePassword=()=>{
    let staticPassword="";
    let passLenght = lengthSlider.value;
    let randomPassword = "";
    let excludeDuplicate = false;

    options.forEach(option =>{
        if(option.checked){
            if(option.id !== "exc-duplicate" && option.id !== "spaces"){
                staticPassword+= characters[option.id];
            }else if(option.id==="spaces"){
                staticPassword+=" ";
                for(let j=0;j<passLenght/5;j++){
                    staticPassword+=" ";
                }
                
            }else{
                excludeDuplicate = true;
            }
            
        }
    });
        for(let i =0;i<passLenght;i++){
            let randomChar= staticPassword[Math.floor(Math.random() * staticPassword.length)]
            if(excludeDuplicate){
                !randomPassword.includes(randomChar)||randomChar==" " ? randomPassword+=randomChar:i--;
            }else{
                randomPassword+=randomChar;
            }
        }
    
    

    passwordInput.value=randomPassword;
}

const updatePassIndicator=()=>{
    passIndicator.id = lengthSlider.value<=8?"weak"
    :lengthSlider.value<=16?"medium":"strong";
}

const updateSlider = ()=> {
    //passing slider value as counter text
    document.querySelector(".pass-len-value").innerHTML=lengthSlider.value;
    generatePassword();
    updatePassIndicator();
}

updateSlider();

const copyPassword =()=>{
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerText = "check";
    setTimeout(()=>{
        copyIcon.innerText = "copy_all";
    },1500);
}

copyIcon.addEventListener("click",copyPassword);
lengthSlider.addEventListener("input",updateSlider);
generateBtn.addEventListener("click", generatePassword);