import { QueryClientProvider, QueryClient } from 'react-query'
import Select from 'react-select'
import useSWR from 'swr'
import axios from 'axios'
import airtableAuth from '../airtableAuth'
import React from 'react'
const queryClient = new QueryClient()

const SearchCitiesComponent = () => {
	const [cityId,setCity] = React.useState()

	const handleCities = (values) =>{
		console.log(values)
	}
	const address = "https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='shop')";
	const fetcher = async (url) => await axios.get(url, {
		headers: {
			'Authorization': airtableAuth.token
		}
	}).then((res) => res.data);
	const { data, error } = useSWR(address, fetcher);
	const cities = data.records[0]
	return (
		<>

			<Select
				getOptionLabel={option => `${cities.fields.name}`}
				getOptionValue={option => cities.fields.name}
				options={data.records}
				instanceId="cities"
				isMulti
				placeholder="Filter by cities"
				onChange={values => handleCities(values.map(city =>city.fields.name))}
			>
			</Select>
		</>
	)
}

export default SearchCitiesComponent