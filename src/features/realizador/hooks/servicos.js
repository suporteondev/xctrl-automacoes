import React, { useState } from "react"

export const ServicosContext = React.createContext({})

export const ServicosProvider = ({ children }) => {

    const [ servicos, setServicos ] = useState([
        {
            titulo: 'Verificar perfis',
            descricao: 'Acessamos um de seus perfis para verificar se todos eles estão ativos ou não. Também capturamos a quantidade de seguidores, publicações e seguindo de cada perfil. A cada perfil verificado ele é adicionado direto no controlador de perfis.',
            status: false,
            data: 'Sem acesso',
            url: '/verificar'
        },
        {
            titulo: 'Gerenciar perfis',
            descricao: 'Seus perfis ficam listados um abaixo do outro em uma tabela que contém o nome de usuário, senha, quantidade de: seguidores, seguindo, publicações. Você também pode filtrar, copiar, transferir, apagar e pesquisar os seus perfis.',
            status: false,
            data: 'Sem acesso',
            url: '/gerenciar'
        },
        {
            titulo: 'Remover perfis GNI',
            descricao: 'Seus perfis ficam listados um abaixo do outro em uma tabela que contém o nome de usuário, senha, quantidade de: seguidores, seguindo, publicações. Você também pode filtrar, copiar, transferir, apagar e pesquisar os seus perfis.',
            status: false,
            data: 'Sem acesso',
            url: '/gerenciar'
        },
        {
            titulo: 'Remover perfis DIZU',
            descricao: 'Seus perfis ficam listados um abaixo do outro em uma tabela que contém o nome de usuário, senha, quantidade de: seguidores, seguindo, publicações. Você também pode filtrar, copiar, transferir, apagar e pesquisar os seus perfis.',
            status: false,
            data: 'Sem acesso',
            url: '/gerenciar'
        }
    ])

    return <ServicosContext.Provider value={{ servicos, setServicos }}>{children}</ServicosContext.Provider>
}

export const useServicos = ()=> React.useContext(ServicosContext)