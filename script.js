// =========================
// LOJA ÓPERA — CONFIGURAÇÃO
// Edite principalmente esta parte.
// =========================
const STORE = {
  name: "Loja Ópera",
  phone: "(35) 3714-3833",
  whatsapp: "553537143833",
  email: "lojaopera@hotmail.com",
  address: "Rua Espírito Santo, 91 — Centro",
  city: "Poços de Caldas — MG",
  cep: "37701-037"
};

const categories = [
  {
    id: "roupas",
    name: "Roupas",
    tag: "SEU ESTILO, SUA ESSÊNCIA",
    description: "Leveza e personalidade para vestir seus dias.",
    image: "./img/roupas.webp",
    alt: "Inspiração de moda com alfaiataria em tons naturais."
  },
  {
    id: "bolsas",
    name: "Bolsas",
    tag: "COMPANHEIRAS DO DIA A DIA",
    description: "O toque que acompanha cada momento.",
    image: "./img/bolsas.webp",
    alt: "Bolsa em tom caramelo."
  },
  {
    id: "acessorios",
    name: "Acessórios",
    tag: "BELEZA NOS DETALHES",
    description: "Pequenos detalhes. Novas possibilidades.",
    image: "./img/acessorios.webp",
    alt: "Acessórios dourados."
  },
  {
    id: "moda-feminina",
    name: "Moda feminina",
    tag: "PARA CADA VERSÃO DE VOCÊ",
    description: "Inspire-se e encontre sua forma de se expressar.",
    image: "./img/moda-feminina.webp",
    alt: "Inspiração de moda feminina."
  }
];

const mapsAddress = `${STORE.name}, ${STORE.address}, ${STORE.city}, ${STORE.cep}`;
const mapsSearch = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsAddress)}`;
const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapsAddress)}`;

function whatsapp(message = "Olá, Loja Ópera! Gostaria de saber mais sobre a loja e a coleção.") {
  return `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(message)}`;
}

document.querySelectorAll("[data-whatsapp]").forEach(el => {
  el.href = whatsapp();
});
document.querySelectorAll("[data-maps]").forEach(el => el.href = mapsSearch);
document.querySelectorAll("[data-directions]").forEach(el => el.href = directions);
document.querySelector("[data-hours]").href = whatsapp("Olá, Loja Ópera! Quais são os horários de atendimento da loja?");

// Coleção
const collection = document.querySelector("#collection");
const count = document.querySelector("#count");

function renderCollection(filter = "todas") {
  const items = filter === "todas" ? categories : categories.filter(item => item.id === filter);
  count.textContent = `${String(items.length).padStart(2, "0")} ${items.length === 1 ? "categoria" : "categorias"}`;

  collection.innerHTML = items.map(item => `
    <article class="card">
      <a class="card-image" target="_blank" rel="noopener"
         href="${whatsapp(`Olá, Loja Ópera! Tenho interesse em ${item.name.toLowerCase()}. Quais opções estão disponíveis?`)}">
        <img src="${item.image}" alt="${item.alt}">
        <span>↗</span>
      </a>
      <div class="card-copy">
        <small>${item.tag}</small>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <a class="text-link" target="_blank" rel="noopener"
           href="${whatsapp(`Olá, Loja Ópera! Tenho interesse em ${item.name.toLowerCase()}. Quais opções estão disponíveis?`)}">
          Tenho interesse →
        </a>
      </div>
    </article>
  `).join("");
}

renderCollection();

document.querySelectorAll("[data-filter]").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    renderCollection(button.dataset.filter);
  });
});

// Menu mobile
const menuButton = document.querySelector(".menu-button");
const mobileNav = document.querySelector(".mobile-nav");
menuButton.addEventListener("click", () => {
  mobileNav.classList.toggle("open");
  menuButton.textContent = mobileNav.classList.contains("open") ? "×" : "☰";
});
mobileNav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  mobileNav.classList.remove("open");
  menuButton.textContent = "☰";
}));

document.querySelector("#year").textContent = new Date().getFullYear();
