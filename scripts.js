carregarPagina()
function carregarPagina () {
    let promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    promise.then(colocarMensagens)
    promise.catch(deuErro)
}
function deuErro (response) {
    console.log(response)
    
}
let corpo

function colocarMensagens (response) {
    let mensagens = response.data
    console.log(mensagens)
    corpo = document.querySelector(".corpo")
    for (let i = 0; i < mensagens.length; i++) {
        corpo.innerHTML += `
            <div class="${mensagens[i].type}">
                <div class="horario">(${mensagens[i].time})</div> 
                <b>${mensagens[i].from}</b> para <b>${mensagens[i].to}:</b> ${mensagens[i].text}</div>`

    }
}