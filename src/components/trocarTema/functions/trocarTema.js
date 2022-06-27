function trocarTema(tema, setTema, setAlinhamento){
    window.api.ipcRenderer.sendSync('setTema')
    tema == 'light' ? setTema('dark') : setTema('light')
    tema == 'light' ? setAlinhamento('flex-start') : setAlinhamento('flex-end')
}

export { trocarTema }