import type { Product as ProductType } from "../src/types/sanity"
import { Link } from "react-router-dom"

import { urlFor } from "../lib/client"

type ProductProps = {
  product: ProductType
}
const Product = ({ product: {image, name, slug, price} }: ProductProps) => {
  return (
    <div>
      <Link to={`/product/${slug.current}`}>
        <div className="product-card">
          <img
            src={urlFor(image?.[0]).url()}
            width='250'
            height='250'
            className="product-image"
            alt=""
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product