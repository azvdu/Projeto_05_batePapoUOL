let nome = prompt("Qual o nome da vossa senhoria? ;)")
entrarNaSala ()

function entrarNaSala () {
    let usuario = {
        name: nome
      }
    let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants",usuario)
    promise.then(confirmarAtividade)
    promise.catch(deuErro)
}
function intervalos () {
    setInterval(intervaloConfirmacao, 5000)
    carregarPagina()
    setInterval (carregarPagina, 3000)
}
function intervaloConfirmacao () {
    let usuario = {
        name: nome
      }
    let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", usuario)
    promise.then()
    promise.catch(deuErro)
}
function carregarPagina () {
    let promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    promise.then(colocarMensagens)
    promise.catch(deuErro)

}
function deuErro (response) {
    console.log(response)
}
let corpo
let contador = 0

function colocarMensagens (response) {
    let mensagens = response.data
    console.log(mensagens)
    corpo = document.querySelector(".corpo")
    corpo.innerHTML = ""
    for (let i = 0; i < mensagens.length; i++) {
        corpo.innerHTML += `
            <div class="${mensagens[i].type}">
                <div class="horario">(${mensagens[i].time})</div> 
                <b>${mensagens[i].from}</b> para <b>${mensagens[i].to}:</b> ${mensagens[i].text}</div>`
    }
}
