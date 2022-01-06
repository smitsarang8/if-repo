import React from 'react'
import Link from 'next/link'
import ProductItem from './ProductItem'
const ShopInArcade = ({ products }) => {

    return (

        <div className="row">

            <div class="max-w-2xl mx-auto py-12 sm:py-12 lg:py-12 lg:max-w-none">
                <div class="lg:w-1/2 w-full py-6 lg:mb-0">
                    <h1 class="px-4 sm:text-3xl text-2xl sm-title text-gray-900">
                        Shop in arcade
                    </h1>
                </div>
                <div class="mt-1 my-1 lg:space-y-0 lg:grid lg:grid-cols-3">

                    {products.map((product) => (<div key={product.id}>

                        <ProductItem product={product} />
                    </div>))}

                </div>
            </div>

        </div>
    )
}

export default ShopInArcade