export type User = {
  username: string
  customerId: string
  firstName: string
  lastName: string
  password: string
  imgUrl: string
  isCanceled: string
  isAgreeToTermsOfCompany: boolean
  roles: {
    isAdmin: boolean
    isEmployee: boolean
    isClient: boolean
  }
}
