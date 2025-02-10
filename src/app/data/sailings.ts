import { Sailing } from '../models/Sailing';

async function getSailings(endpoint: string) {
	const results: Sailing[] = [];
	const res = await fetch(endpoint, { method: 'GET', mode: 'cors' });
	const data = await res.json();
	if (res.ok) {
		results.push(...data.results);
		return results;
	}

	throw Error(`[HTTP - ${res.status}] Unable to fetch data`);
}

export { getSailings };
