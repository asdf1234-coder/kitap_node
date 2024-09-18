const butonlar = document.querySelectorAll(".duzenle");
const cikis = document.querySelector(".cikis");
const dark2 = document.querySelector(".popup-dark");
const icerik = document.querySelector(".icerik_popup")
cikis.addEventListener("click", sil);
function sil(){
    dark2.style.display = "none";
}
function popup(kitap) {
    const dark = document.querySelector(".popup-dark");
    dark.style.display = "block";
    icerik.innerHTML = `
    <div class="container_detay p-2 m-1">
        <div class="img_container">
            <div class="resim"><img src="../img/${kitap.resim}" width="100%" alt="kitap"></div>
        </div>
        <div class="text_container">
            <div class="baslik">
                <input type="text" value="${kitap.isim}" class="form-control admin-isim" readonly/>
            </div>
            <div class="w-100" style="display: flex;">
                <div class="mr-1 bilgi">
                    <input type="text" value="${kitap.yazar}" class="form-control admin-yazar" />
                </div>
                <div class="cizgi bilgi"> | </div>
                <p class="par"></p>
                <div class="mr-1 bilgi">
                    <input type="text" value="${kitap.yayinevi}" class="form-control admin-yayin" />
                </div>
                <div class="cizgi bilgi"> | </div>
                <p class="par"></p>
                <div class="tur">
                    <input type="text" value="${kitap.tur}" class="form-control admin-tur" />
                </div>
            </div>
            <div class="aciklama">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut consequuntur dicta dignissimos quam a unde natus? Doloremque accusantium quae magni libero minus officiis corporis porro temporibus iusto culpa reprehenderit suscipit facilis sunt dolorem placeat quibusdam quasi nisi quis, est vel! Obcaecati, rerum voluptate amet hic odio repellat commodi excepturi consectetur corporis mollitia natus quam maxime eum eveniet sapiente fuga dicta animi autem. At quibusdam perferendis aliquid deleniti ut harum inventore similique</div>
        </div>
    </div>
    <a href="/duzenle/1/1/1" id="link">
        <button type="button" class="btn btn-outline-primary">Kaydet</button>
    </a>
    `
    const link = document.querySelector("#link")
    const mongoId = kitap._id
    const preId = kitap.id
    const tur = document.querySelector(".admin-tur");
    const yazar = document.querySelector(".admin-yazar");
    const yayin = document.querySelector(".admin-yayin");
    const isim = document.querySelector(".admin-isim");
    function linkfonk(){
        const turValue = tur.value;
        const yazarValue = yazar.value;
        const yayinValue = yayin.value;
        const isimValue = isim.value;
        link.href = `/admin/duzenle/${isimValue}/${yayinValue}/${yazarValue}/${turValue}`;
    }
    tur.addEventListener("keyup", linkfonk)
    yazar.addEventListener("keyup", linkfonk)
    yayin.addEventListener("keyup", linkfonk)
    isim.addEventListener("keyup", linkfonk)
}
function duzenleme(event, kitaplar) {
    const kitap_id = event.target.id;
    if (Array.isArray(kitaplar)) {
        kitaplar.forEach(element => {
            if (element.id == kitap_id) {
                popup(element);
            }
        });
    } else {
        console.error('kitaplar bir dizi değil:', kitaplar);
    }
}
