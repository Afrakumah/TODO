import { Schema,model } from "mongoose";

const TodoSchema = new Schema({
    chore: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }

})


const todo = model('todo', TodoSchema);

export default todo;