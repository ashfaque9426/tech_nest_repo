import mongoose from "mongoose";

const configOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const connectToDB = async () => {
    const connectionUrl = process.env.MONGODB_URI;

    // connecting to mongodb
    mongoose.connect(connectionUrl, configOptions)
        .then(()=> console.log("MongoDB Database has been successfully connected."))
        .catch((err)=> console.log(`Getting trouble with database connection: ${err.message}`));
}

export default connectToDB;