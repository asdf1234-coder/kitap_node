const yayinevi = document.getElementById("yayinevi")
const tur = document.getElementById("tur")
const yazar = document.getElementById("yazar")
const min = document.getElementById("min")
const max = document.getElementById("max")
const ana = document.querySelectorAll(".ana")

/*function filtre(){
    const tucontrol = ""
    const yazcontrol = ""
    const yaycontrol = ""
    let yay = yayinevi.value
    let tu = tur.value
    let yaz = yazar.value
    let mi = min.value
    let ma = max.value
    if(ma === ""){
        ma = 9999999;
        console.log("girdi")
    }
    if(mi === ""){
        mi = 0;
    }
    if(yay === ""){
        const yaycontrol = "bos"
    }
    if(tu === ""){
        const tucontrol = "bos"
    }
    if(yaz === ""){
        const yazcontrol = "bos"
    }
    ana.forEach(card => {
        if(yay === ""){
            yay = card.querySelector(".card-yayin").textContent
        }
        if(tu === ""){
            tu = card.querySelector(".card-tur").textContent
        }
        if(yaz === ""){
            yaz = card.querySelector(".card-yazar").textContent
        }
        if((parseInt(card.querySelector(".card-tutar").textContent) > parseInt(ma)) || (parseInt(card.querySelector(".card-tutar").textContent) < parseInt(mi))){

            card.style.display = 'none';
            /*console.log(typeof ma)
            console.log(typeof mi)
            console.log(`ma: ${ma}`)
            console.log(`mi: ${mi}`)
            // console.log(`cart tutar (${parseInt(card.querySelector(".card-tutar").textContent)}) max değerden büyük (${ma})`)
        }else{
            card.style.display = '';
        }
        if(yay !== card.querySelector(".card-yayin").textContent){
            card.style.display = 'none';
        }
        if(tu !== card.querySelector(".card-tur").textContent){
            card.style.display = 'none'
        }
        if(yaz !== card.querySelector(".card-yazar").textContent){
            card.style.display = 'none'
        }
        if(yaycontrol === "bos"){
            yay = ""
        }
        if(yazcontrol === "bos"){
            yaz = ""
        }
        if(tucontrol === "bos"){
            tu = ""
        }
    });
}*/
function filtre() {
    let yay = yayinevi.value || "";
    let tu = tur.value || "";
    let yaz = yazar.value || "";
    let mi = parseInt(min.value) || 0;
    let ma = parseInt(max.value) || 9999999;

    ana.forEach(card => {
        let cardYay = card.querySelector(".card-yayin").textContent;
        let cardTu = card.querySelector(".card-tur").textContent;
        let cardYaz = card.querySelector(".card-yazar").textContent;
        let cardTutar = parseInt(card.querySelector(".card-tutar").textContent);

        if ((cardTutar > ma) || (cardTutar < mi) ||
            (yay && yay !== cardYay) ||
            (tu && tu !== cardTu) ||
            (yaz && yaz !== cardYaz)) {
            card.style.display = 'none';
        } else {
            card.style.display = '';
        }
    });
}

function addEvent(){
    yayinevi.addEventListener('keyup', filtre);
    tur.addEventListener('keyup', filtre);
    yazar.addEventListener('keyup', filtre);
    min.addEventListener('keyup', filtre);
    max.addEventListener('keyup', filtre);
}
addEvent()