import db from '../db.json' assert { type: "json" };

async function listaVideos() {
    try {
        const conexao = await fetch("http://localhost:3000/videos");
        const conexaoConvertida = await conexao.json();
        return conexaoConvertida
    } catch {
        return db.videos;
    }
}

async function criaVideo(titulo, descricao, url, imagem) {
    const conexao = await fetch("http://localhost:3000/videos", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            titulo: titulo,
            descricao: `${descricao} mil visualizações`,
            url: url,
            imagem: imagem
        })
    });
    if (!conexao.ok) {
        throw new Error("Não foi possível enviar o vídeo")
    }
    const conexaoConvertida = conexao.json();

    return conexaoConvertida;
}

async function buscaVideo(termoDeBusca) {
    try {
        const conexao = await fetch(`http://localhost:3000/videos?q=${termoDeBusca}`);
        const conexaoConvertida = await conexao.json();
        return conexaoConvertida;
    } catch {
        return db.videos.filter(v => v.titulo.includes(termoDeBusca))
    }
}

export const conectaApi = {
    listaVideos,
    criaVideo,
    buscaVideo
}