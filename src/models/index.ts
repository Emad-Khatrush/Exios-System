export type User = {
  username: string
  customerId: string
  firstName: string
  lastName: string
  password: string
  imgUrl: string
  isCanceled: string
  city: string
  phone: number
  isAgreeToTermsOfCompany: boolean
  roles: {
    isAdmin: boolean
    isEmployee: boolean
    isClient: boolean
  }
}

export type OrderActivity = {
  createdAt?: Date,
  country?: string,
  description?: string
}

export type Package = {
  user: User,
  _id: string,
  madeBy: User,
  orderId: string,
  activity: OrderActivity[],
  customerInfo: {
    fullName: string,
    phone: String,
    email: String
  },
  placedAt: string,
  totalInvoice: number,
  receivedUSD: number,
  receivedLYD: number,
  receivedShipmentLYD: number,
  receivedShipmentUSD: number,
  shipment: {
    fromWhere: string,
    toWhere: string,
    method: 'air' | 'sea',
    estimatedDelivery: Date,
    exiosShipmentPrice: number,
    originShipmentPrice: number,
    weight: number,
    packageCount: number,
    note: string,
  },
  productName: string,
  quantity: string,
  isShipment: boolean,
  isPayment: boolean,
  unsureOrder: boolean,
  orderStatus: number,
  isFinished: boolean,
  netIncome: {
    nameOfIncome: string,
    total: number,
  }[],
  orderNote: string,
  isCanceled: boolean,
  images: {
    filename: string,
    path: string,
    category: 'invoice' | 'receipts'
  }[],
  debt: {
    currency: string,
    total: number,
  },
  paymentList: PackageDetails[],
  createdAt: Date,
  updatedAt: Date
}

export type PackageDetails = {
  deliveredPackages: {
    arrivedAt: Date
    exiosPrice: number
    originPrice: number
    receivedShipmentLYD: number
    receivedShipmentUSD: number
    trackingNumber: string
    weight: {
      total: number, 
      measureUnit: string
    }
  }
  link: string
  note: string
  status: {
    arrived: boolean
    arrivedLibya: boolean
    paid: boolean
    received: boolean
  }
}

export type OrderStatusType = 'all' |'active' | 'arrivedWarehouse' | 'readyForPickup' | 'shipment' | 'arriving' | 'unpaid' | 'unsure' | 'canceled'