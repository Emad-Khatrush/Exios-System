const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  customerInfo: {
    fullName: {
      type: String,
      required: true,
    },
    phone: String,
    email: String
  },
  receivedUSD: {
    type: Number,
    default: 0
  },
  receivedLYD: {
    type: Number,
    default: 0
  },
  receivedShipmentLYD: {
    type: Number,
    default: 0
  },
  receivedShipmentUSD: {
    type: Number,
    default: 0
  },
  placedAt: {
    type: String,
    required: true,
  },
  totalInvoice: {
    type: Number,
    default: 0
  },
  shipment: {
    fromWhere: {
      type: String,
      required: true,
    },
    toWhere: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    estimatedDelivery: Date,
    exiosShipmentPrice: Number,
    originShipmentPrice: Number,
    weight: Number,
    packageCount: Number,
    note: String,
  },
  productName: {
    type: String,
    default: '',
  },
  quantity: {
    type: String,
    default: 0,
  },
  isShipment: {
    type: Boolean,
    default: false
  },
  isPayment: {
    type: Boolean,
    default: false
  },
  unsureOrder: {
    type: Boolean,
    default: false
  },
  orderStatus: {
    type: Number,
    default: 0
  },
  isFinished: {
    type: Boolean,
    default: false
  },
  activity: [{
    country: String,
    description: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  netIncome: [{
    nameOfIncome: {
      enum: ['shipment', 'payment'],
      type: String
    },
    total: {
      type: Number,
      default: 0
    },
  }],
  orderNote: String,
  isCanceled: {
    type: Boolean,
    default: false,
  },
  images: [{
    filename: String,
    path: String,
    category: {
      type: String,
      enum: ['invoice', 'receipts']
    }
  }],
  debt: {
    currency: String,
    total: Number,
    default: 0
  },
  paymentList: [{
    link: {
      type: String,
      default: ''
    },
    status: {
      arrived: {
        type: Boolean,
        default: false
      },
      paid: {
        type: Boolean,
        default: false
      },
    },
    note: {
      type: String,
      default: ''
    },
    deliveredPackages: {
      arrivedAt: {
        type: Date,
        default: Date.now
      },
      trackingNumber: {
        type: String,
        default: ''
      },
      weight: {
        total: {
          type: Number,
          default: 0
        },
        measureUnit: {
          type: String,
          default: ''
        }
      },
      originPrice: {
        type: Number,
        default: 0
      },
      exiosPrice: {
        type: Number,
        default: 0
      },
    }
  }]
}, { timestamps: true })

module.exports = mongoose.model("Order", orderSchema);
