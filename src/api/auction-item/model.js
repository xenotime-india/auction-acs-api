import mongoose, { Schema } from 'mongoose'

const auctionItemSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  basePrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

auctionItemSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      url: this.url,
      owner: this.owner,
      basePrice: this.basePrice,
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

const model = mongoose.model('AuctionItem', auctionItemSchema)

export const schema = model.schema
export default model
