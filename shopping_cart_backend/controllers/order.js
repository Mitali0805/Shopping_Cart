const {Order, CartItem} = require('../models/order')

exports.create = (req,res) =>{
   // console.log('CREATE ORDER:',req.body);
   req.body.order.user = req.profile;
   const order = new Order(req.body.order);
   order.save((error,data) =>{
       if(error) {
           return res.status(400).json({
               error:error
           })
       }
       res.json(data);
   })
};

// list of orders
exports.listOrders = (req, res) => {
    Order.find()
        .populate('user', '_id name address')
        .sort('-createdAt')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(error)
                });
            }
            res.json(orders);
        });
};