//NAME
let $nameCard = document.querySelector('.info-card-name');
let $nameForm = document.getElementById("cardholder");
let $nameErrorDiv = document.querySelector('.form-input-cardholder--error');
//NUMBER
let $numberForm = document.getElementById('cardNumber');
let $cardNumber = document.querySelector('.card-front-num');
let $numberErrorDiv = document.querySelector('.form-input-cardnumber--error')
//DATE
let $cardMonth = document.querySelector('.info-card-month');
let $cardYear = document.querySelector('.info-card-year');
let $monthForm = document.getElementById('month');
let $yearForm = document.getElementById('year');
let monthError = document.querySelector('.form-input-mm--error');
let yearError = document.querySelector('.form-input-yy--error');
//CVC
let $cardCvc = document.querySelector('.card-back-num');
let $cvcForm = document.querySelector('#cvc');
let $cvcErorDiv = document.querySelector('.form-input-cvc--error');

//BUTTON
let $btnSubmit = document.querySelector('.form-btn');
//Validations variables
let nameCheck = true;
let numberCheck = true;
let monthCheck = true;
let yearCheck = true;
let cvcCheck = true;

//Sections
let formSection = document.querySelector('.form');
let thanksSection = document.querySelector('.thanks-section');

//btn confirm validations
$btnSubmit.addEventListener('click', event=>{
    event.preventDefault();
    //validar campos vacios
    // if ( validaVacio($nameForm.value) || validaVacio($numberForm.value) || validaVacio($monthForm.value) || validaVacio($yearForm.value) ){  //  CAMPOS VACIOS
    //     alert("Los campos no pueden quedar vacios");
    // }
    
    //NAME
    if (validation($nameForm,$nameErrorDiv)){
        nameCheck = true
    }else{
        nameCheck = false;
    }
    //NUM
    if(validation($numberForm,$numberErrorDiv) === true &&validateLetters($numberForm,$numberErrorDiv)){
        if ($numberForm.value.length === 19) {
            ocultarError($numberForm,$numberErrorDiv)
            numberCheck = true;
        }else{
            mostrarEror($numberForm,$numberErrorDiv, 'Number incorrect')
            numberCheck = false;
        }
    } 
    //MONTH
    if(validation($monthForm,monthError)&& validateLetters($monthForm,monthError)){
        if (parseInt($monthForm.value) > 0 && parseInt($monthForm.value) <= 12) {
            ocultarError($monthForm,monthError )
            monthCheck = true;
            
        }else{
            mostrarEror($monthForm,monthError,'Month incorrect')
            monthCheck = false;
        }
    }
    //YEAR
    if (validation($yearForm,yearError) && validateLetters($yearForm,yearError)){
        if (parseInt($yearForm.value) >= 22 && parseInt($yearForm.value) <= 50) {
            ocultarError($yearForm,yearError )
            yearCheck = true;
            
        }else{
            mostrarEror($yearForm,yearError,'Year incorrect')
            yearCheck = false;
        }
    }
    //CVC
    if (validation($cvcForm,$cvcErorDiv) && validateLetters($cvcForm,$cvcErorDiv)){
        if ($cvcForm.value.length === 3) {
            ocultarError($cvcForm,$cvcErorDiv)
            cvcCheck = true;
            
        }else{
            mostrarEror($cvcForm,$cvcErorDiv,'Cvc incorrect')
            cvcCheck = false;
        }
    }
    //MOSTRAR GRACIAS 

    if (nameCheck == true && numberCheck == true && monthCheck ==true && yearCheck == true && cvcCheck == true) {
        console.log('Datos corecctos');
        formSection.style.display = 'none';
        thanksSection.style.display = 'block';
    }


})

//ingreso dinamico del nombre
$nameForm.addEventListener('input', ()=>{
    if ($nameForm.value == '') {
        $nameCard.innerText = 'jane apleeseed'
    }else{

        $nameCard.innerText = $nameForm.value;
    }
})

//ingreso dinamico del numero
$numberForm.addEventListener('input', event=>{
    let inputValue = event.target.value;
    //validacion letras
    let regExp = /[A-z]/g;

    if(regExp.test($numberForm.value)){
        mostrarEror($numberForm,$numberErrorDiv,'Wrong format, numbers only')
        //$numberErrorDiv.innerText = 'Wrong format, numbers only'
    }else{
        $numberForm.value = inputValue.replace(/\s/g, '').replace(/([0-9]{4})/g, '$1 ').trim();
        ocultarError($numberForm,$numberErrorDiv )
        //$numberErrorDiv.innerText = ''
    }
    // else{

    //     $numberErrorDiv.innerText = ''
    // }

    //pintar numero
    if ($numberForm.value == '') {
        $cardNumber.innerText = ' 0000 0000 0000 0000'
    }else{

        $cardNumber.innerText = $numberForm.value;
    }
});

//ingreso dinamico del date
$monthForm.addEventListener('input', event=>{
    let inputValue = event.target.value;
    //validacion letras
    let regExp = /[A-z]/g;

    if(regExp.test($monthForm.value)|| ($monthForm.value <= 0 ||$monthForm.value > 12) ){
        mostrarEror($monthForm,monthError,'Month incorrect')
        
    }else{
        $monthForm.value = inputValue.replace(/\s/g, '');
        ocultarError($monthForm,monthError )
        
    }
    if ($monthForm.value == '') {
        $cardMonth.innerText = '00'
    }else{

        $cardMonth.innerText = $monthForm.value;
    }
})
//ingreso dinamico del date
$yearForm.addEventListener('input', event=>{
    let inputValue = event.target.value;
    //validacion letras
    let regExp = /[A-z]/g;

    if(regExp.test($yearForm.value) ){
        mostrarEror($yearForm,yearError,'Year incorrect')
        
    }else{
        $yearForm.value = inputValue.replace(/\s/g, '');
        ocultarError($yearForm,yearError )
        
    }
    if ($yearForm.value == '') {
        $cardYear.innerText = '00'
    }else{

        $cardYear.innerText = $yearForm.value;
    }
})
//ingreso dinamico del cvc
$cvcForm .addEventListener('input', event=>{
    let inputValue = event.target.value;
    //validacion letras
    let regExp = /[A-z]/g;

    if(regExp.test($cvcForm .value)){
        mostrarEror($cvcForm ,$cvcErorDiv,'Cvc incorrect')
        
    }else{
        $cvcForm .value = inputValue.replace(/\s/g, '');
        ocultarError($cvcForm ,$cvcErorDiv )
        
    }
    if ($cvcForm .value == '') {
        $cardCvc.innerText = '000'
    }else{

        $cardCvc.innerText = $cvcForm .value;
    }
})



//funtions

const mostrarEror = (divInput, divError, msgError)=>{
    divError.innerText = msgError;
    divInput.style.borderColor = '#FF0000';
};
const ocultarError =  (divInput, divError)=>{
    divError.innerText = '';
    divInput.style.borderColor = 'hsl(270, 3%, 87%)';
};
const validation = (divInput,divError)=>{
    if (divInput.value.length > 0) {
        ocultarError(divInput,divError)
        return true;
    }else{
        mostrarEror(divInput,divError, "Can´t be blank")
        return false;
    }

};
const validateLetters = (input, divError)=>{
    let regExp = /[A-z]/g;
    if (regExp.test(input.value)) {
        mostrarEror(input,divError, 'Wrong format, numbers only')
    }else{
        ocultarError(input,divError)

    }
};
// function validaVacio(valor) {
//     valor = valor.replace("&nbsp;", "");
//     valor = valor == undefined ? "" : valor;
//     if (!valor || 0 === valor.trim().length) {
//         return true;
//         }
//     else {
//         return false;
//         }
//     }