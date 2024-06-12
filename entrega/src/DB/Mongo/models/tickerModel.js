import {model,Schema} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const ticketColetions = "Ticket"


const ticketSchema = new Schema({
    id_user: String,
    products: [],
    total: Number,
    
})
ticketSchema.plugin(mongoosePaginate);

export const ticketModel = model(ticketColetions,ticketSchema);