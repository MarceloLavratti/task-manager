import mongoose from "mongoose";

// Subschema para cada tarefa
const TaskSchema = new mongoose.Schema({
    description: {
      type: String,
      required: false,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  });
  

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    tasks: [TaskSchema],
})

// Cria e exporta o modelo 'User' baseado no esquema definido
export default mongoose.model('User', UserSchema)