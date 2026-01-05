import type { Banner } from "../src/types/sanity"
import { Link } from "react-router-dom"

import { urlFor } from "../lib/client"

type FooterBannerProps = {
  footerBanner? : Banner
}

const FooterBanner = ({ footerBanner }: FooterBannerProps) => {
  if(!footerBanner) return null;

  const {
    discount,
    largeText1,
    largeText2,
    saleTime,
    smallText,
    midText,
    desc,
    product,
    buttonText,
    image
  } = footerBanner
  
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link to={`/product/${product}`}>
            <button type='button'>{buttonText}</button>
          </Link>
        </div>
        <img
          src={urlFor(image).url()}
          // src={image?.[0] ? urlFor(image[0]).url() : ''}
          className="footer-banner-image"
          width='500'
          alt=""
        />
      </div>
    </div>
  )
}

export default FooterBanner