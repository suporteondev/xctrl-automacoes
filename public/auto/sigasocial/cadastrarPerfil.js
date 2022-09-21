const axios = require('axios')
const qs = require('qs')

async function cadastrarPerfilSigaSocial(
    pagina,
    logs,
    usuario,
    user_token,
    acoes,
    metodo,
    tempo
){

    logs.push('Cadastrando no siga social')
    logs.push(usuario + ' - Acessando o perfil')
    
    try{
        await pagina.goto('https://www.instagram.com/accounts/edit/')
        await pagina.waitForSelector('[id="pepBio"]')
        logs.push(usuario + ' - Capturando informações')
        const { fotoPerfil, nome, email, genero } = await pagina.evaluate(()=>{
            return {
                fotoPerfil: document.querySelector('img._aadp').src,
                nome: document.querySelector('[id="pepName"]').value,
                email: document.querySelector('[id="pepEmail"]').value,
                genero: document.querySelector('[id="pepGender"]').value
            }
        })
        logs.push(usuario + ' - Cadastrando o perfil')
        const cookie = await pagina.cookies()
        await axios.post('https://siga.social/', qs.stringify({
            c: "api",
            m: "addNewProfile",
            api_key: 'f06dcea2defb2f9b8aa948a3cbac0d17',
            user_token,
            profile_pic: fotoPerfil,
            profile_username: usuario,
            profile_name: nome,
            profile_mail: email,
            profile_gender: genero,
            profile_cookie: JSON.stringify(cookie),
            profile_actions: acoes,
            profile_method: metodo,
            profile_tempo_acoes: tempo
        })).then(resp => {
            logs.push(usuario + ' - Perfil cadastrado com sucesso!')
        }).catch(err => {
            logs.push(usuario + ' - Não conseguimos cadastrar o perfil!')
        })
    }catch(erro){
        logs.push(usuario + ' - Não conseguimos cadastrar o perfil!')
    }
}

module.exports = cadastrarPerfilSigaSocial