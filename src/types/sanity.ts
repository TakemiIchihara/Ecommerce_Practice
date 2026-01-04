export interface Slug {
  _type: string,
  current: string,
}
export interface Product {
  _id: string,
  name: string,
  image: any,
  slug: Slug,
  price: number,
}

export interface Banner {
  _id: string,
  name: string,
  smallText: string,
  midText: string,
  largeText1: string,
  image: any,
  product: string,
  buttonText: string,
  desc: string,
  discount: string,
  largeText2: string,
  saleTime: string,
}