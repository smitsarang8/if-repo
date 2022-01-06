
const Categories = () => {
  return (

    <div class="row-span-2">
      <div class="flex flex-wrap w-full ">
        <div class="w-full">
          <h1
            class="text-center py-12 sm:text-3xl text-2xl sm-title text-gray-900"
          >
            Search With Categories
          </h1>
        </div>
      </div>
      <section class="text-gray-600 ">
        <div class="container px-5 mx-auto">
          <div class="flex flex-wrap">
            
          <a href="/search/shops/"  class="transition duration-300 p-4 md:w-1/5">
              <div class="h-full px-4 rounded-lg overflow-hidden">
              <img class="rounded-xl" src="https://images.unsplash.com/photo-1580554430120-94cfcb3adf25?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" />
                <div class="p-6">
                  <h1 class="title-font text-center text-lg font-medium text-gray-900 mb-3">Shops</h1>   
                </div>
              </div>
            </a>
            <a href="/search/offices"  class="transition duration-300 p-4 md:w-1/5">
            <div class="h-full px-4 rounded-lg overflow-hidden">
              <img class="rounded-xl" src="https://images.unsplash.com/photo-1571624436279-b272aff752b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80" alt="" />
                <div class="p-6">
                  <h1 class="title-font text-center text-lg font-medium text-gray-900 mb-3">Offices</h1>
                  
                </div>
              </div>
            </a>
            <a href="/search/land-plots"  class="transition duration-300 p-4 md:w-1/5">
            <div class="h-full px-4 rounded-lg overflow-hidden">
              <img class="rounded-xl" src="https://images.unsplash.com/photo-1587745890135-20db8c79b027?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" alt="" />
                <div class="p-6">
                  <h1 class="title-font text-center text-lg font-medium text-gray-900 mb-3">Land & plots</h1>
                
                </div>
              </div>
            </a>
            <a href="/search/storages"  class="transition duration-300 p-4 md:w-1/5">
            <div class="h-full px-4 rounded-lg overflow-hidden">
              <img class="rounded-xl" src="https://images.unsplash.com/photo-1551313158-73d016a829ae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1137&q=80" alt="" />
                <div class="p-6">
                  <h1 class="title-font text-center text-lg font-medium text-gray-900 mb-3">Godowns</h1>
                </div>
              </div>
            </a>
            <a href="/search/hospitalities" class="transition duration-300 p-4 md:w-1/5">
            <div class="h-full px-4 rounded-lg overflow-hidden">
              <img class="rounded-xl" src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" />
                <div class="p-6">
                  <h1 class="title-font text-center text-lg font-medium text-gray-900 mb-3">Hospitality </h1>
             
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>
      
    </div>
  )
}

export default Categories
