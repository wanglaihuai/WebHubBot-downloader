import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let pornSchema = new Schema({
    _id: Schema.Types.ObjectId,
    video_title: String,
    link_url: String,
    image_url: String,
    video_duration: Number,
    quality_480p: String

}, {
    collection: 'PhRes'
});

let PornModel = mongoose.model('Porn', pornSchema);

export default PornModel;