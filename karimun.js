// Hamburger memakai Bootstrap (data-bs-toggle="collapse"), jadi tidak ditulis di sini.

// ===== Ambil elemen =====
const header = document.getElementById("header");
const menu = document.getElementById("menu");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");
const toTop = document.getElementById("to-top");

// ===== 1. Tutup menu mobile setelah link diklik =====
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (menu.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});

// ===== 2. Scroll: navbar berubah, menu aktif, tombol ke atas =====
function saatScroll() {
  const y = window.scrollY;

  header.classList.toggle("scrolled", y > 60);
  toTop.classList.toggle("show", y > 400);

  let aktif = sections[0].id;
  sections.forEach((sec) => {
    if (y >= sec.offsetTop - 120) aktif = sec.id;
  });
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + aktif);
  });
}
window.addEventListener("scroll", saatScroll);
saatScroll();

toTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== 3. Kalkulator harga paket =====
const calcPaket = document.getElementById("calc-paket");
const calcJumlah = document.getElementById("calc-jumlah");
const calcHasil = document.getElementById("calc-hasil");

function hitung() {
  const jumlah = Math.max(1, parseInt(calcJumlah.value) || 1);
  const total = Number(calcPaket.value) * jumlah;
  calcHasil.textContent = "Rp " + total.toLocaleString("id-ID");
}
calcPaket.addEventListener("change", hitung);
calcJumlah.addEventListener("input", hitung);
hitung();

// ===== 4. Validasi form =====
const form = document.getElementById("form");
const info = document.getElementById("form-info");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nama = document.getElementById("nama");
  const email = document.getElementById("email");
  const paket = document.getElementById("pilih-paket");
  const tanggal = document.getElementById("tanggal");
  const jumlah = document.getElementById("jumlah");
  const pesan = document.getElementById("pesan");
  const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let galat = [];

  // "is-invalid" = kelas Bootstrap untuk bingkai merah
  [nama, email, paket, tanggal, jumlah, pesan].forEach((el) =>
    el.classList.remove("is-invalid"),
  );

  if (nama.value.trim() === "") {
    galat.push("nama");
    nama.classList.add("is-invalid");
  }
  if (!polaEmail.test(email.value.trim())) {
    galat.push("email");
    email.classList.add("is-invalid");
  }
  if (paket.value === "") {
    galat.push("paket");
    paket.classList.add("is-invalid");
  }
  if (tanggal.value === "") {
    galat.push("tanggal");
    tanggal.classList.add("is-invalid");
  }
  if (Number(jumlah.value) < 1) {
    galat.push("jumlah orang");
    jumlah.classList.add("is-invalid");
  }
  if (pesan.value.trim().length < 10) {
    galat.push("pesan");
    pesan.classList.add("is-invalid");
  }

  info.classList.remove("text-success", "text-danger");
  if (galat.length > 0) {
    info.classList.add("text-danger");
    info.textContent =
      "Periksa lagi: " +
      galat.join(", ") +
      " belum benar (pesan minimal 10 karakter).";
  } else {
    info.classList.add("text-success");
    info.textContent =
      "Terima kasih, " + nama.value.trim() + ". Pesanmu sudah terkirim.";
    form.reset();
  }
});
