import mongoose, { Schema } from 'mongoose'

const transactionSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  auctionItem: {
    type: Schema.ObjectId,
    ref: 'auction-item',
    required: true,
    index: true
  },
  bid: {
    type: Number,
    required: true,
  },
  status: {
    type: String
  }
}, {
  timestamps: true
})

transactionSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      auctionItem: this.auctionItem,
      bid: this.bid,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Transaction', transactionSchema)

export const schema = model.schema
export default model
