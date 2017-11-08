const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const ProductSchame = Schema({
    name: 'String',
    picture: 'String',
    price: {
        type: 'Number',
        default: 0
    },
    category: {
        type: 'String',
        enum: ['computers', 'phone', 'accesories']
    },
    description: 'String'
});

module.exports = mongoose.model('Product', ProductSchame);