// checkout 订单状态
export const ORDER_STATUS = {
  PENDING: 2,
  DETECTED: 10,
  WAIT_AUTH: 11,
  PAID: 3,
  FAILED: 8
}

export const FORM_FIELDS = 'first_name,last_name,card_number,expiry_month,expiry_year,cvv'.split(
  ','
)

export const PRODUCT_TYPE = {
  SUBSCRIPTION: 0,
  PRODUCT: 1
}
