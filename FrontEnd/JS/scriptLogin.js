//logica Tela Cadastro 
const cadastro = document.getElementById('paginaCadastro');
const botaoCadastroOpen = document.getElementById('activeCadastro')
const botaoCadastroClose = document.getElementById('closeCadastro')
const token = null
botaoCadastroOpen.addEventListener('click',()=>{
    cadastro.style.display = 'flex';
    document.body.style.overflow = 'hidden'
});
botaoCadastroClose.addEventListener('click',()=>{
    cadastro.style.display = 'none';
    document.body.style.overflow = 'initial'
});

// requisiçao cadastro
const formCadastro = document.getElementById("formCadastro")
const enviarDados = async (e) => {
    e.preventDefault();
    var formJson =  convertFDtoJSON(new FormData(formCadastro))
    var header = new Headers({'Content-Type': 'application/json'})
    var myInit = {method: 'POST',
    headers: header,
    body: formJson}

    fetch('/entrar/cadastro',myInit).then((response) =>{
        if(!response.ok){
            alert("Erro ao realizar cadastro")
        }
        else
        response.text().then(response => redirectHome(response))
    })
}
formCadastro.addEventListener('submit',enviarDados)

//requisicao login
const formLogin = document.getElementById("formLogin")
const verificarDados = async (e) => {
    e.preventDefault();
    var formJson =  convertFDtoJSON(new FormData(formLogin))
    var header = new Headers({'Content-Type': 'application/json'})
    var myInit = {method: 'POST',
    headers: header,
    body: formJson}

    fetch('/entrar/login',myInit).then((response) =>{
        if(!response.ok){
            alert('Erro ao fazer login')
        }
        else
        response.text().then(response =>{
            console.log(response)
            redirectHome(response)
        } )
    })
}
formLogin.addEventListener('submit',verificarDados)

//funcao para converter FormData to json
function convertFDtoJSON(formData){
    var obj = {}
    for(let key of formData.keys()){
        obj[key] = formData.get(key)
    }
    return JSON.stringify(obj)
}
//funcao para redirecionarHome

function redirectHome(response){
    var header = new Headers({'Content-Type': 'application/json','x-access-token': response})
    var myInit = {method: 'GET',
    headers: header}
    console.log(response)
    fetch('/home',myInit).then((response) =>{    if(!response.ok){
            alert('Erro ao Entrar na home')
        }
    })
}