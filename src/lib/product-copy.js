export function productCopy(product) {
  const name = product.name;
  return {
    details: `${product.story} Her parça aynı dikiş diliyle, az sayıda üretilir. Zamanla koyulaşması derinin işi; cila değil.`,
    care: "Kuru, yumuşak bir bezle silin. Islanırsa oda sıcaklığında kurutun; radyatöre ve güneşe bırakmayın. Yılda bir kez nötr deri kremi yeter.",
    specs: [
      { label: "Tür", value: name },
      { label: "Malzeme", value: "Bitkisel tabaklanmış dana derisi" },
      { label: "Dikiş", value: "Eyer dikişi" },
      { label: "Üretim", value: "Atölye" },
    ],
    faqs: [
      {
        q: `${name} hangi deriden üretiliyor?`,
        a: "Bitkisel tabaklanmış dana derisi. Krom tabaklama yok; parça zamanla koyulaşır.",
      },
      {
        q: "Nasıl bakılır?",
        a: "Kuru bez, oda sıcaklığında kurutma, ara sıra nötr krem. Yağmurda ıslanması normaldir; ısıtmaktan kaçının.",
      },
      {
        q: "Kargo ve iade nasıl işliyor?",
        a: "Kargo 3–5 iş günü. Teslimden sonra 14 gün içinde, kullanılmamış parça iade edilebilir.",
      },
    ],
    reviews: reviewsBySlug[product.slug] ?? [],
  };
}

const reviewsBySlug = {
  kartlik: [
    { name: "E. Y.", date: "12 Ağustos 2026", rating: 5, text: "Cebi şişirmiyor, dört kart rahat duruyor. Mürekkep rengi günlük kullanımda çizilmedi." },
    { name: "M. K.", date: "3 Haziran 2026", rating: 5, text: "Dikişler düzgün, kenar boyası temiz. İki ayda hafif koyulaştı, hoş duruyor." },
    { name: "S. A.", date: "18 Mart 2026", rating: 4, text: "İnce ve sağlam. Kart çıkarmak ilk gün biraz sıkıydı, sonra oturdu." },
    { name: "D. B.", date: "9 Ocak 2026", rating: 5, text: "Hediye aldım, kutusu da sade. Kartlık tam ceket iç cebine göre." },
    { name: "H. Ç.", date: "21 Kasım 2025", rating: 5, text: "Kenar boyası iki ay sonra hâlâ düzgün. Günlük taşıyorum." },
  ],
  cuzdan: [
    { name: "N. D.", date: "29 Temmuz 2026", rating: 5, text: "İnce bifold, pantolon cebinde şişirmez. Nakit gözü tam olması gereken kadar." },
    { name: "A. T.", date: "11 Mayıs 2026", rating: 5, text: "Toprak tonu fotoğraftakinden biraz daha sıcak çıktı, memnunum. Dikiş kalitesi belli." },
    { name: "B. S.", date: "2 Şubat 2026", rating: 4, text: "Gizli göz işe yarıyor. Kapak ilk hafta biraz sertti, kullanınca yumuşadı." },
    { name: "K. L.", date: "14 Aralık 2025", rating: 5, text: "Mürekkep rengi resmi kıyafetle uyumlu. Kartlar düşmüyor." },
    { name: "R. P.", date: "3 Ekim 2025", rating: 5, text: "Eyer dikişi düzgün, kenarı elle boyanmış hissi veriyor." },
    { name: "T. G.", date: "18 Ağustos 2025", rating: 4, text: "İnce olması iyi. Nakit gözü iki banknot için yeterli, daha fazlası sıkışıyor." },
  ],
  kemer: [
    { name: "C. R.", date: "20 Haziran 2026", rating: 5, text: "Tek parça deri, toka kaliteli. 90 beden tam oturdu." },
    { name: "Y. M.", date: "8 Nisan 2026", rating: 4, text: "Günlük ve gece aynı kemer işimi gördü. İlk günlerde biraz sert, sonra alışıyor." },
    { name: "F. N.", date: "27 Ocak 2026", rating: 5, text: "Pirinç toka ağır değil, orantılı. Delikler düzgün." },
    { name: "İ. U.", date: "2 Kasım 2025", rating: 4, text: "85 beden beklediğimden biraz uzun geldi, yine de kullanıyorum." },
  ],
  "deri-tepsi": [
    { name: "L. H.", date: "14 Temmuz 2026", rating: 5, text: "Giriş holünde anahtar ve saat için birebir. Kalın deri, kenarı düzgün." },
    { name: "P. Ö.", date: "9 Mayıs 2026", rating: 4, text: "Göründüğünden daha ağır, bu iyi. Toz tutuyor, ara sıra silmek lazım." },
    { name: "Z. V.", date: "22 Şubat 2026", rating: 5, text: "Ofis masasında kalem ve bozuk para duruyor. Formunu koruyor." },
    { name: "G. Ş.", date: "11 Aralık 2025", rating: 4, text: "Kenar dikişi kaliteli. Biraz büyük kaçtı, hol için yine uygun." },
  ],
};
