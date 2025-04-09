const mongoose=require('mongoose')

const connectdatabase=()=>{
    mongoose.connect('mongodb://localhost/ecomerceProject', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
}

module.exports=connectdatabase