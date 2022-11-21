import db from "../../db.json";

let a = 0;
let b = 3;
const carregarMais = document.querySelector(".maisProdutos");
const inputCores = document.querySelectorAll('input[name="cores"]');
const inputTamanhos = document.querySelectorAll('input[name="tamanhos"]');
const inputPrecos = document.querySelectorAll('input[name="precos"]');

carregarMais.addEventListener("click", () => {
  a += 3;
  b += 3;
  renderProducts();
});

function filtros() {
  db.products.forEach(function (props) {
    const name = props.name;
    const img = props.image;
    const price = props.price;
    const parcelas = props.parcelamento;

    // logica filtro cor
    function filtroCores() {
      inputCores.forEach((element) => {
        element.addEventListener("click", () => {
          const value = element.value;
          if (value === props.color) {
            renderFiltrado();
          }
        });
      });
    }
    // Logica filtro tamanhos
    function filtroTamanhos() {
      inputTamanhos.forEach((element) => {
        element.addEventListener("click", () => {
          const value = element.value;
          const sizes = props.size;
          sizes.map((size) => {
            if (value == size) {
              renderFiltrado();
            }
          });
        });
      });
    }

    // Logica filtro preços
    function filtroPrecos() {
      inputPrecos.forEach((element) => {
        element.addEventListener("click", () => {
          const value = element.value;
          const prices = props.price;
          console.log(value);
          if (value == 50 && prices <= 50) {
            renderFiltrado();
          } else if (value == 150 && prices <= 150 && prices > 50) {
            renderFiltrado();
          } else if (value == 300 && prices <= 300 && prices > 150) {
            renderFiltrado();
          } else if (value == 500 && prices <= 500 && prices > 300) {
            renderFiltrado();
          } else if (value == 501 && prices > 500) {
            renderFiltrado();
          }
        });
      });
    }

    function renderFiltrado() {
      const section = document.querySelector("#renderProdutcs");
      return (section.innerHTML = ` <section class="produtos">
            <img src="${img}" alt="peça de roupa">
            <h2>${name}</h2>
            <span>R$ ${price}</span>
            <p>em até ${parcelas[0]} de R$ ${parcelas[1]}</p>
            <button>Comprar</button>
            </section>    
        `);
    }

    filtroCores();
    filtroPrecos();
    filtroTamanhos();
  });
}
filtros();

function renderProducts() {
  let dbSelecao = db.products.slice(a, b);

  dbSelecao.forEach(function (props) {
    const name = props.name;
    const img = props.image;
    const price = props.price;
    const parcelas = props.parcelamento;
    const section = document.querySelector("#renderProdutcs");

    let contador = 0;
    function contadorAcrecimo() {
      contador++;
      let contadorText = document.querySelector(".contador");
      contadorText.innerHTML = `${contador}`;
    }
    function addTextContador() {
      const comprar = document.querySelectorAll(".comprar");
      comprar.forEach((props) => {
        props.addEventListener("click", () => {
          contadorAcrecimo();
        });
      });
    }

    function produto() {
      return (section.innerHTML += ` <section class="produtos">
              <img src="${img}" alt="peça de roupa">
              <h2>${name}</h2>
              <span>R$ ${price}</span>
              <p>em até ${parcelas[0]} de R$ ${parcelas[1]}</p>
              <button class="comprar">Comprar</button>
              </section>    
          `);
    }
    produto();
    addTextContador();
  });
}

// Botão ver mais cores:
const btnMaisCores = document.querySelector(".maisCores");
btnMaisCores.addEventListener("click", () => {
  const divCores = document.querySelectorAll('div[class="off"]');
  divCores.forEach((props) => {
    props.classList.remove("off");
  });
});

// evento click filtrar responsivo
const botaoFiltrar = document.querySelector(".filtrarResponsive");
const divsFiltrar = document.querySelectorAll('div[class="hidden"]');

botaoFiltrar.addEventListener("click", () => {
  divsFiltrar.forEach((props) => {
    if (props.classList == "hidden") {
      props.classList.remove("hidden");
    } else {
      props.classList.add("hidden");
    }
  });
});

renderProducts();
