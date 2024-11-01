
import alterarUnidadeService from "../service/unidade/alterarUnidadeService.js";
import consultarUnidadeService from "../service/unidade/consultaUnidadeService.js";
import deletarUnidadeService from "../service/unidade/deletarUnidadeService.js";
import inseriUnidadeService from "../service/unidade/inserirUnidadeService.js";
import { autenticar } from "../utils/jwts.js";

import { Router } from "express"
const endpoints = Router();




import multer from 'multer';

const upload = multer({ dest: 'uploads/' }); 
endpoints.post('/unidade', autenticar, upload.single('foto'), async (req, resp) => {
    try {
        let unidade = req.body;
        unidade.foto = req.file.path; 
        let id = await db.inserirUnidade(unidade);
        resp.send({ novoId: id });
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});








endpoints.get('/unidade', async (req, resp) =>{
    try{
        let unidade = await consultarUnidadeService();
        resp.send(unidade);
    }
    catch(err){
        resp.status(400).send({
            erro : err.message
        })
    }
})








endpoints.put('/unidade/:id', async (req, resp)=> {
    try{
        let idUnidade = req.params.id;
        let unidade = req.body;

        await alterarUnidadeService(idUnidade, unidade);
        
        resp.send()
    }
    catch(err){
        resp.status(400).send ({
            erro : err.message
        })
    }
})







endpoints.delete('/unidade/:id', async (req, resp) => {
    try{
        let id = req.params.id;
        await deletarUnidadeService(id);
        
        resp.send()
    }
    catch (err){
        resp.status(400).send({
            erro : err.message
        })
    }
})


export default endpoints;