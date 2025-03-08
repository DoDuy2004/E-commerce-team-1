import React from 'react'
import { ProductDetailInfo } from '../components/ProductDetail/ProductDetailInfo'
import { ProductDetailImage } from '../components/ProductDetail/ProductDetailImage'

export const ProductDetail = () => {
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        <ProductDetailImage/>
        <ProductDetailInfo/>
      </div>
    </>
  )
}
