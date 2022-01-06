import axios from "axios";
import useSWR from "swr";
import airtableAuth from "../airtableAuth";
import ProductCard from "./ProductCard";
export default function Users({ count, setCount }) {
  const address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?maxRecords=15&filterByFormula=AND({status}='approved',{propertyType}='shop',{isTrending}='yes')`;
  const fetcher = async (url) => await axios.get(url, {
    headers: {
      'Authorization': airtableAuth.token
    }
  }).then((res) => res.data);
  const { data, error } = useSWR(address, fetcher);
 
  return (
    <div>
      <ProductCard data={data}/>

    </div>
  );
}