import { useEffect, useState } from 'react'
import { Product as ProductContainer, FooterBanner, HeroBanner } from '../components'
import { client } from '../lib/client'
import type { Product, Banner } from './types/sanity'

const Home = () => {
  const [product, setProduct] = useState<Product[]>()
  const [banner, setBanner] = useState<Banner[]>()

  useEffect(() => {
    const fetchData = async () => {
      const productsQuery = '*[_type == "product"]'
      const bannerQuery = '*[_type == "banner"]'

      const productsData: Product[] = await client.fetch(productsQuery)
      const bannerData: Banner[] = await client.fetch(bannerQuery)

      setProduct(productsData)
      setBanner(bannerData)
    }

    fetchData()
  }, [])
  return (
    <>
      <HeroBanner />
      <h1>{product?.map((product) => product.name)}</h1>
      {console.log("hello, world")}

      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many kinds</p>
      </div>

      <div className="products-container">
        {['Product1  ', 'Product2'].map((product: string) => product)}
      </div>
      {console.log(banner)}

      <FooterBanner />
    </>
  )
}

export default Home
