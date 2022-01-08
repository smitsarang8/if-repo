import axios from "axios";
import useSWR from "swr";
import airtableAuth from "../airtableAuth";
import ProductItem from "./ProductItem";
export default function Users({ count, setCount }) {
  const address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?maxRecords=15&filterByFormula=AND({status}='approved',{propertyType}='shop',{isTrending}='yes')`;
  const fetcher = async (url) => await axios.get(url, {
    headers: {
      'Authorization': airtableAuth.token
    }
  }).then((res) => res.data);
  const { data, error } = useSWR(address, fetcher);
 
  return (
    <div class="px-6 max-w-2xl mx-auto py-2 sm:py-2 lg:py2 lg:max-w-none">
    <div class="lg:w-1/2 w-full py-6 lg:mb-0">
        <h1 class="px-4 sm:text-3xl text-2xl sm-title text-gray-900">
            Trending shops
        </h1>
    </div>
    <div class="mt-1 my-1 lg:space-y-0 lg:grid lg:grid-cols-3">

        {data.records.map((product) => (<div key={product.id}>

            <ProductItem product={product} />
        </div>))}

    </div>
</div>

  );
}