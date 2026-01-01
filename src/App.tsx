import { Product, FooterBanner, HeroBanner } from '../components'
import { client } from '../lib/client'

const Home = () => {
  return (
    <>
      <HeroBanner />

      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many kinds</p>
      </div>

      <div className="products-container">
        {['Product1  ', 'Product2'].map((product: string) => product)}
      </div>

      <FooterBanner />
    </>
  )
}

export default Home
