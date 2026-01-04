import { Link } from "react-router-dom"
import type { Banner } from '../src/types/sanity'
import { urlFor } from '../lib/client'

type HeroBannerProps = {
  heroBanner? : Banner
}

const HeroBanner = ({ heroBanner }:HeroBannerProps) => {
  if(!heroBanner) return null
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <img src={urlFor(heroBanner.image).url()} alt="headphones" className="hero-banner-image" />

        <div>
          <Link to={`/product/${heroBanner.product}`}>
            <button type='button'>{heroBanner.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner