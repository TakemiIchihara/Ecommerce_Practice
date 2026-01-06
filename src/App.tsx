import { useEffect, useState } from 'react'
import { Product as ProductContainer, FooterBanner, HeroBanner } from '../components'
import { client } from '../lib/client'
import type { Product, Banner } from './types/sanity'

const Home = () => {
  const [products, setProduct] = useState<Product[]>([])
  const [banner, setBanner] = useState<Banner[]>([])

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
      <HeroBanner heroBanner={banner?.[0]} />

      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many kinds</p>
      </div>

      <div className="products-container">
        {products?.map((item) => <ProductContainer key={item._id} product={item} />)}
      </div>

      <FooterBanner footerBanner={banner?.[0]} />
    </>
  )
}

export default Home
