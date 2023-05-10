import type {NextApiRequest, NextApiResponse} from 'next';
import type {RespostaPadraoMsg} from '../../types/RespostaPadraoMsg';
import {validarTokenJWT} from '../../middlewares/validarTokenJWT';
import {conectarMongoDB} from '../../middlewares/conectarMongoDB'
import { UsuarioModel } from '@/models/UsuarioModel';


const usuarioEndPoint = async(req : NextApiRequest, res : NextApiResponse<RespostaPadraoMsg | any>) => {
    // como eu pego os dados do usuario logado?
    // id do usuario
    try{
        
        const {userId} = req?.query;
        //como eu busco todos os dados do meu usuario?
        const usuario = await UsuarioModel.findById(userId);
        return res.status(200).json(usuario);
    }catch(e){
        console.log(e);
        return res.status(400).json({erro : 'Nao foi possivel obter dados do usuario'})
    }

    
}

export default validarTokenJWT(conectarMongoDB(usuarioEndPoint));