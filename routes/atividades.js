const atividades = require('../models/atividades')
const usuarios = require('../models/usuarios')

module.exports = (app)=>{
    app.get('/atividades',async(req,res)=>{
        //capturar o id da barra de endereço
        var id = req.query.id
        //buscar o nome na collection usuarios
        var user = await usuarios.findOne({_id:id})  
        //buscar todas as atividades desse usuário
        var abertas = await atividades.find({usuario:id,status:0}).sort({data:1})
        //buscar todas as atividades desse usuário
        var setedias = await atividades.find({usuario:id,status:1}).sort({data:1})

        var trintadias = await atividades.find({usuario:id,status:3}).sort({data:1})
        //buscar todas as atividades desse usuário
        var excluidas = await atividades.find({usuario:id,status:2}).sort({data:1})
        //console.log(buscar)
        res.render('atividades.ejs',{nome:user.nome,id:user._id,dados:abertas,dadosx:excluidas,dadose:setedias})
        //res.render('accordion.ejs',{nome:user.nome,id:user._id,dados:abertas,dadosx:excluidas,dadose:7dias})
        //res.render('atividades2.ejs',{nome:user.nome,id:user._id,dados:abertas,dadosx:excluidas,dadose:setedias,dadosh:trintadias})

    })
    app.post('/atividades',async(req,res)=>{
        //recuperando as informações digitadas
        var dados = req.body
        //console.log(dados)
        //conectar com o database
        const conexao = require('../config/database')()
        //model atividades
        const atividades = require('../models/atividades')
        //salvar as informações do formulário no database
        var salvar = await new atividades({
            data:dados.data,
            tipo:dados.tipo,
            entrega:dados.entrega,
            disciplina:dados.disciplina,
            instrucoes:dados.orientacao,
            usuario:dados.id
        }).save()
        res.redirect('/atividades?id='+dados.id)
    })

     app.get("/excluir",async(req,res)=>{
    //recuperar o parametro id da barra de endereço
        var id = req.query.id
        var excluir = await atividades.findOneAndUpdate(
            {_id:id},
            {status:2}
        )
        //redirecionar para a rota atividades
        res.redirect('/atividades?id='+excluir.usuario)
    })

app.get("/entregue",async(req,res)=>{
    //recuperar o parametro id da barra de endereço
        var id = req.query.id
        var setedias = await atividades.findOneAndUpdate(
            {_id:id},
            {status:1}
        )
        //redirecionar para a rota atividades
        res.redirect('/atividades?id='+entregue.usuario)
    })

    app.get("/desfazer",async(req,res)=>{
        //recuperar o parametro id da barra de endereço
            var id = req.query.id
            var desfazer = await atividades.findOneAndUpdate(
                {_id:id},
                {status:0}
            )
            //redirecionar para a rota atividades
            res.redirect('/atividades?id='+desfazer.usuario)
        })

        app.get('/alterar',async(req,res)=>{
            //capturar o id da barra de endereço
            var id = req.query.id
                //buscar a atividade que sera alterada
                var alterar= await atividades.findOne({_id:id})
            //buscar o nome na collection usuarios
            var user = await usuarios.findOne({_id:alterar.usuario})  
        
            //buscar todas as atividades desse usuário
            var setedias = await atividades.find({usuario:id,status:1}).sort({data:1})

            var trintadias = await atividades.find({usuario:id,status:3}).sort({data:1})
            //buscar todas as atividades desse usuário
            var excluidas = await atividades.find({usuario:id,status:2}).sort({data:1})
            //console.log(buscar)
            //res.render('atividades.ejs',{nome:user.nome,id:user._id,dados:abertas,dadosx:excluidas,dadose:setedias})
            //res.render('accordion.ejs',{nome:user.nome,id:user._id,dados:abertas,dadosx:excluidas,dadose:7setedias})
            res.render('alterar.ejs',{nome:user.nome,id:user._id,dados:alterar})
    
        })

        app.post('/alterar',async(req,res)=>{
         
            
            var infos = req.body
    
            var gravar = await atividades.findOneAndUpdate(
                {_id:infos.id_a},
                {datas:infos.data,
                 tipo:infos.tipo,
                 disciplina:infos.disciplina,
                 entrega:infos.entrega,
                 instrucoes:infos.orientacao
                }
               
            )
            res.redirect('/atividades?id='+infos.id)
            
        })
}



