import { Schema, model } from 'mongoose';
import { IInventoryTransaction } from './inventoryTransaction.interface';

const inventoryTransactionSchema = new Schema<IInventoryTransaction>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    product: { type: Schema.Types.ObjectId, required: true, ref: 'product' },
    productName: { type: String, required: true },
    transactionType: { 
      type: String, 
      enum: ['SALE', 'PURCHASE', 'ADJUSTMENT'], 
      required: true 
    },
    quantity: { type: Number, required: true },
    previousStock: { type: Number, required: true },
    newStock: { type: Number, required: true },
    referenceId: { type: Schema.Types.ObjectId },
    referenceType: { type: String, enum: ['SALE', 'PURCHASE'] },
    note: { type: String },
    date: { type: Date, required: true }
  },
  { timestamps: true }
);

const InventoryTransaction = model<IInventoryTransaction>('inventoryTransaction', inventoryTransactionSchema);
export default InventoryTransaction;
