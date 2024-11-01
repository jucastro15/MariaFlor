import con from './connection.js';

export async function inserirUnidade(unidade) {
    const comando = `
        INSERT INTO tb_unidade (foto, endereco, abre, fecha, url_maps)
        VALUES (?, ?, ?, ?, ?);
    `;
    let info = await con.query(comando, [unidade.foto, unidade.endereco, unidade.abre, unidade.fecha, unidade.url_maps]);
    
    let respostas = info[0];
    return respostas.insertId;
}

export async function consultarUnidade() {
    const comando = `
        SELECT * FROM tb_unidade;
    `;
    let info = await con.query(comando);
    let resposta = info[0];

    return resposta;
}

export async function alterarUnidade(idunidade, unidade) {
    const comando = `
        UPDATE tb_unidade
        SET foto = ?, 
            endereco = ?,
            abre = ?, 
            fecha = ?, 
            url_maps = ?
        WHERE id_unidade = ?;
    `;
    let resposta = await con.query(comando, [unidade.foto, unidade.endereco, unidade.abre, unidade.fecha, unidade.url_maps, idunidade]);
    let info = resposta[0];

    return info.affectedRows;
}

export async function deletarUnidade(id) {
    const comando = `
        DELETE FROM tb_unidade
        WHERE id_unidade = ?;
    `;
    let resposta = await con.query(comando, [id]);
    let info = resposta[0];

    return info.affectedRows;
}
