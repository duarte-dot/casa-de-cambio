import Swal from 'sweetalert2';

const text = document.querySelector('.text');
const button = document.querySelector('.pesquisar');
const titulo = document.querySelector('.titulo');
const valores = document.querySelector('.rates');
// const moedas = document.querySelector('.moedas')

button.addEventListener('click', (event) => {
  event.preventDefault();
  if (valores.innerHTML === '' && titulo.innerHTML === '') {
    pegaMoeda();
} else {
  titulo.innerHTML = ''
  valores.innerHTML = ''
  pegaMoeda();
}

function pegaMoeda() {
  if (!text.value) {
    return Swal.fire({
      icon: "error",
      title: "Opssss",
      text: "Precisa ser uma moeda"
    })
  }
  
  let requestURL = `https://api.exchangerate.host/latest?base=${text.value}`;
  let request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  
  
  request.onload = function() {
    let response = request.response;
    if (text.value.toUpperCase() !== response.base) {
      return Swal.fire({
        icon: "error",
        title: "Opssss",
        text: "Precisa ser uma moeda válida"
      })
    }
    const h2 = document.createElement('h2');
    h2.innerHTML = `Valores referentes a 1 ${text.value.toUpperCase()}`;
    titulo.appendChild(h2);
    let rates = response.rates;
    const moedas1 = Object.keys(rates);
    const conversao = Object.values(rates);
    // console.log(conversao);
    // console.log(moedas1);
    for (let i = 0; i < moedas1.length; i += 1) {
      let divEl = document.createElement('div');
      divEl.innerHTML = `${moedas1[i]} - ${conversao[i]}`;
      valores.appendChild(divEl);
    }
  }
}
})