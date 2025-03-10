import React from 'react'
import { ProductDetailInfo } from '../components/ProductDetail/ProductDetailInfo'
import { ProductDetailImage } from '../components/ProductDetail/ProductDetailImage'

export const ProductDetail = ({product}) => {
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 mt-15 md:mt-0'>
        <ProductDetailImage/>
        <ProductDetailInfo  />
      </div>
    </>
  )
}
