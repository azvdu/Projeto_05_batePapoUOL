let nome
function perguntarNome () {
    nome = prompt("Qual o nome da vossa senhoria? ;)")
    entrarNaSala ()
}
perguntarNome()


function entrarNaSala () {
    let usuario = {
        name: nome
      }
    let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants",usuario)
    promise.then(intervalos)
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
    alert("Nickname já existente!!")
    perguntarNome()
}
let corpo
let mensagens

function colocarMensagens (response) {
    mensagens = response.data
    corpo = document.querySelector(".corpo")
    corpo.innerHTML = ""
    for (let i = 0; i < mensagens.length; i++) {
        if (mensagens[i].to === "Todos" || mensagens[i].to === nome) {
            corpo.innerHTML += `
            <div class="${mensagens[i].type}">
            <div class="horario">(${mensagens[i].time})</div> 
            <b>${mensagens[i].from}</b> para <b>${mensagens[i].to}:</b> ${mensagens[i].text}
            </div>`
            
        }
        else {
            corpo.innerHTML += `
            <div class="${mensagens[i].type} escondido">
            <div class="horario">(${mensagens[i].time})</div> 
            <b>${mensagens[i].from}</b> para <b>${mensagens[i].to}:</b> ${mensagens[i].text}
            </div>`
        } 
    }
    scrollAutomatico()
}
let ultimaMensagem

function scrollAutomatico () {
    let ultimoFilho = corpo.lastChild.innerHTML
    let ultimo = corpo.lastChild
    if (ultimoFilho != ultimaMensagem){
        console.log("entrei")
        ultimo.scrollIntoView()
    }
    ultimaMensagem = ultimoFilho
}

function enviarMensagem () {
    let input = document.querySelector("input")
    let texto = input.value
    console.log(texto)
    
    let mensagem = {
        from: nome,
        to: "Todos",
        text: texto,
        type: "message"
    }
    let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", mensagem)
    promise.then(limparMensagem)
    promise.catch(reload)
    
}
function reload () {
    window.location.reload()
}