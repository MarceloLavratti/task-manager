import mongoose from 'mongoose'

async function connectDB() {
    try {
        await mongoose.connect('mongodb+srv://marcelol:titanquest87@users-tasks.oldcb.mongodb.net/?retryWrites=true&w=majority&appName=Users-tasks');
        console.log('MongoDB Connected...')
      } catch (err) {
        console.error('MongoDB Connection Error:', err)
        process.exit(1)
      }
}

export default connectDB