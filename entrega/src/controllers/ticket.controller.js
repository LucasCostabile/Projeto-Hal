const createTicket = async (req,res) => {
    console.log("entrei no ticketControler")
    const {id_user,products,valorTotal} = req.body;

    console.log(id_user,products,valorTotal);
    
    const newTicket = {id_user,products,valorTotal, qtdProducts: products.length}
    
    return res.status(201).json(newTicket);


}

export {createTicket}