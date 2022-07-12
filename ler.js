const fs = require('fs')

fs.appendFile('perfis.txt', '\nperfil4 senha4', function(err){
    
    if(err){
        console.log(err)
    }

    console.log('Atualizado!')
})