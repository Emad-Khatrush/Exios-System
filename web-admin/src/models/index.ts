export type Invoice = {
  user: User,
  _id: string,
  orderId: string,
  activity: ActivityType[],
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
    method: string,
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
  paymentList: [{
    deliveredPackages: {
      arrivedAt: Date
      exiosPrice: number
      originPrice: number
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
      paid: boolean
    }
  }],
  createdAt: Date,
  updatedAt: Date
}

export type User = {
  createdAt: Date
  firstName: string
  lastName: string
  imgUrl: string
  customerId: string
  orders: any[]
  roles: {
    isAdmin: boolean
    isEmployee: boolean
    isClient: boolean
  }
  updatedAt: Date
  username: string
  __v: number
  _id: string
}

export type ActivityType = {
  createdAt: Date
  details: {
    path: string
    status: string
    type: string 
    actionId: string
  },
  changedFields: {
    label: String,
    value: String,
    changedFrom: String,
    changedTo: String
  }[]
  updatedAt: Date
  user: User
  __v: number
  _id: string
}

export type Office = {
  office: string
  libyanDinar: {
    value: number,
    currency: 'LYD'
  },
  usaDollar: {
    value: number,
    currency: 'USD'
  },
  turkishLira: {
    value: number,
    currency: 'TRY'
  }
}

export type Income = {
  cost: {
    currency: string, 
    total: number
  },
  createdAt: Date,
  description: string,
  images: any[],
  office: string,
  updatedAt: Date,
  user: User,
  __v: number,
  _id: string
}

export type HomeData = {
  activeOrdersCount: number
  betterThenPreviousMonth: boolean
  monthlyEarning: {
    total: number
    type: string
  }[]
  percentage: number
  totalInvoices: number
  totalMonthlyEarning: number
  offices: Office[],
  totalDebts: {
    totalDebts: number, 
    office: string, 
    currency: string
  }[]
}

export type Expense = {
  cost: {
    currency: string, 
    total: number
  },
  createdAt: Date,
  description: string,
  images: any[],
  placedAt: string,
  updatedAt: Date,
  user: User,
  __v: number,
  _id: string
}

export type LocalTabs = {
  label: string,
  value: string,
  icon: React.ReactElement
}[]

export type OrderActivity = {
  createdAt?: Date,
  country?: string,
  description?: string
}

export type ApiErrorMessages = 'user-not-found' | 'invalid-credentials' | 'authorize-invalid'
  | 'token-not-found' | 'invalid-token' | 'order-id-taken' | 'order-not-found' | 'expense-id-taken'
  | 'expense-not-found' | 'image-not-found' | 'fields-empty' | 'server-error';

export type Session = {
  account: Account
  isError: boolean
  isLoading: boolean
  isLoggedIn: boolean
  token: string
}

export type Account = {
  username: string,
  firstName: string,
  lastName: string,
  imgUrl: string,
  orders: any[],
  roles: {
    isAdmin: boolean,
    isEmployee: boolean,
    isClient: boolean,
  }
}