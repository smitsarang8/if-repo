import Link from 'next/link'
import useSWR from 'swr'
import axios from 'axios'
import airtableAuth from '../airtableAuth'

export default function ProductCardOwner({ ucode }) {
	const address = "https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{ucode}='"+ucode+"')";
	const fetcher = async (url) => await axios.get(url, {
		headers: {
			'Authorization': airtableAuth.token
		}
	}).then((res) => res.data);
	const { data, error } = useSWR(address, fetcher);

  // const pricings = (index) => {
  //   if (data.records[index].fields.purpose == "sell") {
  //     return <div class="mt-1 text-lg">
  //       ₹ {data.records[index].fields.sellPrice}
  //     </div>
  //       ;
  //   } else if (data.records[index].fields.purpose == "rent") {
  //     return <div class="mt-1 text-lg">
  //       ₹ {data.records[index].fields.rentMonthly} (Monthly)
  //     </div>;
  //   }
  // }
  // const purpose = (index) => {
  //   if (data.records[index].fields.purpose == "sell") {
  //     return <span class="inline-block rounded-md text-black py-1 text-xs">SELL</span>
  //       ;
  //   } else if (data.records[index].fields.purpose == "rent") {
  //     return <span class="inline-block rounded-md text-black py-1 text-xs">RENT</span>
  //       ;
  //   }
  // }
  
  return (
    <>
    <div class="px-4 py-2">
      {typeof(data.records)}
    {/* {data.records.map((product,index) => (
          <Link
            href={`/p/${product.fields.slug}`}
            as={"/p/" + product.fields.slug}
            class="group relative"
          >
                  <h1>adfasf</h1>

            <div class="max-w-md w-full lg:flex">
              <div class="wrapper antialiased text-gray-900">
                <div>
  
                  <img src={product.fields.get_thumbnail_url[0].thumbnails.large.url}
                    alt=" random imgee" class="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300  w-full object-cover object-center rounded-lg shadow-md" />
  
                  <div class="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300 relative px-4 -mt-16  ">
                    <div class="bg-white p-6 rounded-lg shadow-lg">
                      <div class="flex items-baseline">
                        {purpose(index)} <span class="inline-block rounded-md text-black py-1 px-1 text-xs"> - In {product.fields.address_1}</span>
                        <div class="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
                        </div>
                      </div>
  
                      <h4 class="mt-1 text-xl font-semibold leading-tight truncate">{product.fields.name}</h4>
                      <div class="mt-1 text-gray-500">
                        {product.fields.shortAddress}
                      </div>
                      {pricings(index)}
                    </div>
                  </div>
  
                </div>
              </div>
            </div>
  
          </Link>
       
    ))} */}
  </div>
  </>
  );
}
