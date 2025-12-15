let currentLang = "ar";

function setLanguage(lang) {
  currentLang = lang;

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  const texts = {
    ar: {
      subtitle: "املأ البيانات وسيتم التواصل معك فورًا",
      clientTitle: "بيانات العميل",
      furnitureTitle: "الأثاث المطلوب تنظيفه",
      notesTitle: "ملاحظات إضافية",
      submit: "إرسال الطلب"
    },
    en: {
      subtitle: "Fill the form and we will contact you shortly",
      clientTitle: "Customer Information",
      furnitureTitle: "Furniture to Clean",
      notesTitle: "Additional Notes",
      submit: "Submit Order"
    }
  };

  document.getElementById("subtitle").innerText = texts[lang].subtitle;
  document.getElementById("clientTitle").innerText = texts[lang].clientTitle;
  document.getElementById("furnitureTitle").innerText = texts[lang].furnitureTitle;
  document.getElementById("notesTitle").innerText = texts[lang].notesTitle;
  document.getElementById("submitBtn").innerText = texts[lang].submit;

  document.querySelectorAll("[data-ar]").forEach(el => {
    el.innerText = el.dataset[lang];
  });
}

const API_URL = "https://script.google.com/macros/s/AKfycbzEH506usLFTP_Mm4L7T00esFHbIvClz67EtEm49fXDjG_EJINSTfz4jbRIjZlZjhBNDQ/exec";

function submitOrder() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const location = document.getElementById("location").value.trim();
  const notes = document.getElementById("notes").value.trim();

  const furniture = [...document.querySelectorAll("input[type=checkbox]:checked")]
    .map(el => el.value);

  if (!name || !phone || !address || !location || furniture.length === 0) {
    alert(currentLang === "ar"
      ? "من فضلك أكمل جميع البيانات المطلوبة"
      : "Please fill all required fields");
    return;
  }

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      name,
      phone,
      address,
      location,
      furniture,
      notes,
      lang: currentLang
    })
  })
  .then(res => res.json())
  .then(() => {
    alert(currentLang === "ar"
      ? "تم إرسال الطلب بنجاح ✅"
      : "Order submitted successfully ✅");
    window.location.reload();
  })
  .catch(() => alert("Error sending order"));
}
