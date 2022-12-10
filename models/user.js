const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    batch: {
        type: Number,
        enum: [1, 2, 3, 4],
        required: true,
    },
    nextMonthBatch: {
        type: Number,
        enum: [1, 2, 3, 4],
        required: true,
    },
    mail: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})


// const User = mongoose.model('User', userSchema);
// module.exports = User;

module.exports = mongoose.models.User || mongoose.model('User', userSchema);

