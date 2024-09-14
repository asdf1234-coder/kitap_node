const yayinevi = document.getElementById("yayinevi")
const tur = document.getElementById("tur")
const yazar = document.getElementById("yazar")
const min = document.getElementById("min")
const max = document.getElementById("max")
const ana = document.querySelectorAll(".ana")
function filtre(){
    let yay = yayinevi.value
    let tu = tur.value
    let yaz = yazar.value
    let mi = parseInt(min.value)
    let ma = parseInt(max.value)
    if(ma === ""){
        ma = 9999999;
        console.log("girdi")
    }
    if(mi === ""){
        mi = 0;
    }
    ana.forEach(card => {
        if(parseInt(card.querySelector(".card-tutar").textContent) > parseInt(ma) || parseInt(card.querySelector(".card-tutar").textContent) < mi){
            card.style.display = 'none';
            /*console.log(typeof ma)
            console.log(typeof mi)*/
            console.log(ma)
            // console.log(`cart tutar (${parseInt(card.querySelector(".card-tutar").textContent)}) max değerden büyük (${ma})`)
        }else{
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