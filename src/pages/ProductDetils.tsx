import { useEffect, useState } from "react";
import { client, urlFor } from "../../lib/client";
import type { Product } from "../types/sanity";
import { useParams } from "react-router-dom";
import type { Image } from "sanity";
import { AiFillStar, AiOutlineMinus, AiOutlinePlus, AiOutlineStar } from "react-icons/ai";
import { Product as ProductPage } from "../../components";
import { useStateContext } from "../../context/StateContext";

function ProductDeatils() {
  const { slug } = useParams<{slug: string}>()
  const [product, setProduct] = useState<Product | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [index, setIndex] = useState<number>(0)
  const { decQty, incQty, qty, onAdd } = useStateContext()

  console.log({ slug })

  useEffect(() => {
    console.log("😇ueEffect in Effect")
    if(!slug) return

    const fetchData = async () => {
      const productQuery = `*[_type == "product" && slug.current == $slug][0]`
      const productsQuery = '*[_type == "product"]'
      const checkSlugQuery = `*[_type == "product"]{ name, "slug-current": slug.current, "slug": slug}`


      let productData
      let productsData
      let checkSlug
      
      try{
        productData = await client.fetch(productQuery, { slug })
        console.log("💅ProductData Locked in ", {slug}, slug, productData)
        productsData = await client.fetch(productsQuery)
        console.log("✨Products Data", productsData)
        checkSlug = await client.fetch(checkSlugQuery)
        console.log("🤓☝️Here check the slugs!: ", checkSlug)
      } catch {
        console.log("🐣Fetching Data Failed🐣")
      }
      
      setProduct(productData)
      setProducts(productsData)
    }

    fetchData()
  }, [slug])

  console.log("💓ProductDetails rendered")

  if(!product) return null
  
  const {
    name,
    image = [],
    detail,
    price
  } = product ?? {}

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image?.[index]).url()} alt="" className="product-detail-image" />
          </div>
          <div className="small-images-container">
            {image?.map((item: Image, i) => (
              <img
                key={i}
                src={urlFor(item).url()}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>
              (20)
            </p>
          </div>
          <h4>Details:</h4>
          <p>{detail}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity: </h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(product, qty)}
            >Add To Cart</button>
            <button
              type="button"
              className="buy-now"
              onClick={() => {}}
            >Buy Now</button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products?.map((item) => (
              <ProductPage key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDeatils