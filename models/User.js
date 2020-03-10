const mongoose  = require('mongoose');
const { Schema } = mongoose; // const Schema = mongoose.Schema;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


const userSchema = new Schema ({
    googleId : String,
    facebookId : String,
    name: String,
    credits: {type : Number , default : 0 }
});

mongoose.model('users',userSchema);