import mongoose, { Schema } from 'mongoose'

const auctionItemSchema = new Schema({
  url: {
    type: String
  },
  owner: {
    type: String
  },
  basePrice: {
    type: String
  },
  status: {
    type: String
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
