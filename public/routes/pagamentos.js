const router = require('express').Router()
const mercadopago = require('mercadopago')
const Store = require('electron-store')
const store = new Store();

router.post('/pagamentos', async(req, res)=>{

    const email = store.get('logado')
    const { servico } = req.body

    // Configurando as credenciais
    mercadopago.configure({
        access_token: `APP_USR-4591069825838427-051712-0039142d82388dfd52e49595cf43d2a5-1124156714`
    })
    
    var payment_data = {
        transaction_amount: 0.10,
        description: servico + ' - ' + '30 dias',
        payment_method_id: 'pix',
        notification_url: 'https://www.xctrl.com.br/api/pagamentos',
        payer: {
            email: email
        }
    };
    
    const resultado = await mercadopago.payment.create(payment_data)
    
    return res.json({
        ok: true,
        qrCode: resultado.body.point_of_interaction.transaction_data.qr_code_base64,
        pixCopiaCola: resultado.body.point_of_interaction.transaction_data.qr_code,
        mensagem: 'Pagamento gerado com sucesso!'
    })
})

module.exports = router