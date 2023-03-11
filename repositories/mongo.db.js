import mongoose from "mongoose"

async function connect() {
    const url = "mongodb+srv://root:igti@cluster0.dcrogxh.mongodb.net/?retryWrites=true&w=majority"
    return await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
}

export { connect }