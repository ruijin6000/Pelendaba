const mongoose  = require('mongoose');
const { Schema } = mongoose; // const Schema = mongoose.Schema;
const RecipientSchema = require ('./Recipient');

const surveySchema = new Schema( {
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema],
    yes:{type : Number , default : 0 },
    no:{type : Number , default : 0 },
    _user: {  type: Schema.Types.ObjectId, ref: 'User'},
    dateSent: Date,
    lastResponded: Date
});

mongoose.model('surveys',surveySchema);

/**
 *  Query for update survey data for specific email && surveyId *
 choice = 'yes' || 'no';
 Survey.updateOne({
    id: surveyId,
    recipients: {
        $elemMatch:{ email: email, responded: false }
        }
    }, {
    $inc: {[choice]:1},
    $set: {'recipients.$.responded': true}
});

 **/