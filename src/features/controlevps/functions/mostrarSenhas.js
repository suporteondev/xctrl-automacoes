export function mostrarSenhas(senhaVisivel, setSenhaVisivel){
    setSenhaVisivel(senhaVisivel === 'password' ? 'text' : 'password')
}