function CalculGain(){

    CheckInput()
        
    let myForm = document.getElementById("formCalculGain");
    let formObj = new FormData(myForm);


    let tauxHoraire = formObj.get("TH");
    let tauxJournalier = formObj.get("TJM");
    let tauxExtras = formObj.get("extras");

    let QtytauxHoraire = formObj.get("QtyTH");
    let QtytauxJournalier = formObj.get("QtyTJM");
    let QtytauxExtras = formObj.get("Qtyextras");

    let charges = formObj.get("Fees");

    let gainHeure = tauxHoraire*QtytauxHoraire;
    let gainJour = tauxJournalier*QtytauxJournalier;
    let gainExtras = tauxExtras*QtytauxExtras;

    let totalBrut = gainHeure+gainJour+gainExtras;

    let ChargeADeduire = (totalBrut * (charges/100));
    let totalNet = totalBrut - ChargeADeduire;

    document.getElementById("ResultBrut").innerText = totalBrut.toFixed(2)+" €";
    document.getElementById("ResultCharges").innerText = ChargeADeduire.toFixed(2)+" €";
    document.getElementById("ResultNet").innerText = totalNet.toFixed(2)+" €";

}

function CheckInput(){
    let mesInputsWithEvents = document.querySelectorAll("#formCalculGain input.form-control");
    mesInputsWithEvents.forEach(monInput => {
        if (monInput.value < 0){
            monInput.value = 0
        }
        saveElementsInCookies(monInput);

    });
}

function saveElementsInCookies(input){
    document.cookie = input.name+'='+input.value;
}

function getCookie (input){
    let mesCookies = document.cookie;
    const name = input.name + '=';
    const tableauCookies = mesCookies.split('; ');

    let valeurCookie = null;

    tableauCookies.forEach (cookie =>{
        if (cookie.indexOf(name) === 0){
            valeurCookie = cookie.substring(name.length);          
        }
    
    });
    return valeurCookie;
}


let btn = document.getElementById("buttonValidation");
btn.addEventListener('click', CalculGain);

let mesInputsWithEvents = document.querySelectorAll("#formCalculGain input.form-control");

mesInputsWithEvents.forEach(monInput => {
    let cookie = getCookie(monInput);

    if (cookie != undefined && cookie != null){
        monInput.value = cookie;

    }

    monInput.addEventListener('keyup', CalculGain);
    monInput.addEventListener('change', CalculGain);
    
});

CalculGain();