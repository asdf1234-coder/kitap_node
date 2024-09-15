const yayinevi = document.getElementById("yayinevi")
const tur = document.getElementById("tur")
const yazar = document.getElementById("yazar")
const min = document.getElementById("min")
const max = document.getElementById("max")
const ana = document.querySelectorAll(".ana")
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
    min.addEventListener('input', filtre);
    max.addEventListener('input', filtre);
}
addEvent()