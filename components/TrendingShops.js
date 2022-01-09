import React from 'react'
import Link from 'next/link'
import ProductItem from './UserCard'
const TrendingShops = ({ products }) => {

    return (
<span class="" >

			<div class="bg-black relative overflow-hidden">
				<div class="inset-0  absolute">
				</div>
				<div class="container mx-auto px-6 md:px-6 relative z-10 flex items-center py-6 xl:py-6">
						<div class="flex flex-col  w-full">
                        <div class="px-6 max-w-2xl mx-auto py-2 sm:py-2 lg:py2 lg:max-w-none">
                <div class=" mx-auto mt-1 my-1 lg:space-y-0 lg:grid lg:grid-cols-5">

                    {products.map((product) => (<div key={product.id}>

                         <ProductItem authors={product} />
                     </div>))}

                 </div>
             </div>


						</div>
				</div>
			</div>


		</span>
        // <div className="bg-black row">

        //     <div class="px-6 max-w-2xl mx-auto py-2 sm:py-2 lg:py2 lg:max-w-none">
        //         <div class="container mx-auto mt-1 my-1 lg:space-y-0 lg:grid lg:grid-cols-3">

        //             {products.map((product) => (<div key={product.id}>

        //                 <ProductItem product={product} />
        //             </div>))}

        //         </div>
        //     </div>

        // </div>
    )
}

export default TrendingShops