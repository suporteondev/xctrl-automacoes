export async function iniciar(Mensagem, setMensagem, setExecutando, setMeusLogs, setAtivos, setNovamentes, setInativos, setAverificar, setDisplayVoltar){

    const navegador = document.querySelector('[name="navegador"]').value
    const verAcontecendo = document.querySelector('[name="verAcontecendo"]').value
    const modoAnonimo = document.querySelector('[name="modoAnonimo"]').value
    const usuariosSeguidores = document.querySelector('[name="usuariosSeguidores"]').value
    const usuarios = document.querySelector('[name="usuarios"]').value
    const esperarEntre = document.querySelector('[name="esperarEntre"]').value
    const logs = document.querySelector('#logs')

    if(usuariosSeguidores === ''){
        setMensagem(<Mensagem>Preencha ao menos um usuário seguidor antes de iniciar</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }else if(usuarios === ''){
        setMensagem(<Mensagem>Preencha ao menos um usuário a ser seguido antes de iniciar</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }else{

        const arrayUsuarios = []
        const arrayUsuariosSeguidores = []
            
        usuarios.split('\n').forEach((usuario)=>{
            const arrayDados = usuario.split(' ')
            arrayUsuarios.push(arrayDados[0])
        })

        usuariosSeguidores.split('\n').forEach((usuario)=>{
            const arrayDados = usuario.split(' ')
            arrayUsuariosSeguidores.push(arrayDados[0])
        })

        setExecutando(true)
        window.api.ipcRenderer.sendSync('tamanho-pequeno-2x')

        var intervalo = setInterval(()=>{

            var perfisAtivos = 0 
            var perfisInativos = 0

            window.api.ipcRenderer.sendSync('logSeguidores').forEach((mensagem)=>{
                if(mensagem.includes('Seguido com sucesso!') == true){
                    perfisAtivos += 1
                }

                if(mensagem.includes('Não conseguimos') == true){
                    perfisInativos += 1
                }
            })

            setAtivos(perfisAtivos)
            setInativos(perfisInativos)

            setMeusLogs(window.api.ipcRenderer.sendSync('logSeguidores'))
            logs.scrollTop = logs.scrollHeight
            if(window.api.ipcRenderer.sendSync('logSeguidores')[window.api.ipcRenderer.sendSync('logSeguidores').length - 1] == 'O robô terminou, pode voltar!'){
                setTimeout(clearInterval(intervalo), 3000)
                logs.scrollTop = logs.scrollHeight
                setDisplayVoltar('/engajamentos')
            }
        }, 1000)

        const configs = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                navegador,
                verAcontecendo, 
                modoAnonimo,
                usuarios: arrayUsuarios,
                usuariosSeguidores: arrayUsuariosSeguidores,
                esperarEntre: Number(esperarEntre) * 1000,
                perfisEngajamentos: window.api.ipcRenderer.sendSync('perfisEngajamentos')
            })
        }
    
        const api = await fetch(`http://localhost:${window.api.ipcRenderer.sendSync('porta')}/api/seguidores`, configs)
        const resultado = await api.json()

        setMensagem(<Mensagem cor='sucesso'>Verificador iniciado com sucesso!</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }

}