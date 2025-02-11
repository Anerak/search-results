import PageProps from '../models/PageProps';
import { Sailing } from '../models/Sailing';
import { ReadonlyURLSearchParams } from 'next/navigation';

function getShortDateFormat(departureDate: string, returnDate: string): string {
	const depDate = new Date(`${departureDate} 00:00:00`);
	const depDateOptions: Intl.DateTimeFormatOptions = {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	};

	const retDate = new Date(`${returnDate} 00:00:00`);
	const retDateOptions: Intl.DateTimeFormatOptions = {
		day: 'numeric',
	};

	// Do we need to show the return date month as well?
	if (depDate.getMonth() !== retDate.getMonth()) {
		retDateOptions.month = 'short';
	}

	// Now, what if the years are different?
	if (depDate.getFullYear() !== retDate.getFullYear()) {
		retDateOptions.year = 'numeric';
	}

	// Having the user's locale would help to output the right format.
	const locale = 'en-US';

	return `${depDate.toLocaleString(
		locale,
		depDateOptions
	)} - ${retDate.toLocaleString(locale, retDateOptions)}`;
}

function getLocationPort(port: string): string {
	if (port.indexOf(',') < 0) return port;
	const [city] = port.split(',');

	return city;
}

function shortItinerary(itinerary: string[]): string[] {
	if (itinerary.length <= 5) return itinerary;

	// Take two ports from the beginning and two from the end.
	const start = itinerary.slice(0, 2);
	const end = itinerary.slice(-2);

	// What number should be displayed between the start and the end?
	const skipped = itinerary.length - (start.length + end.length);
	const middle = `${skipped} locations`;

	// Shorten the number of items to 5
	return [...start, middle, ...end];
}

function processFilters(sailings: Sailing[], params: PageProps): Sailing[] {
	if (params === undefined) return sailings;
	let results = sailings;

	// TO-DO Find better way to check if params[key] exists
	// Ideally, instead of text inputs, we should have selects based on the original data.
	if (
		Object.hasOwn(params, 'departurePort') &&
		params.hasOwnProperty('departurePort')
	) {
		const search: string = params['departurePort'].toLowerCase();

		results = results.filter((sailing) => {
			if (sailing.itinerary.length > 0) {
				const port = sailing.itinerary[0].toLowerCase();
				return port.indexOf(search) > -1;
			}
			return false;
		});
	}

	if (
		Object.hasOwn(params, 'shipCruiseline') &&
		params.hasOwnProperty('shipCruiseline')
	) {
		const search: string = params['shipCruiseline'].toLowerCase();

		results = results.filter((sailing) => {
			if (sailing.itinerary.length > 0) {
				const shipCruiseline = sailing.ship.line.name.toLowerCase();
				return shipCruiseline.indexOf(search) > -1;
			}
			return false;
		});
	}

	if (
		Object.hasOwn(params, 'departureDate') &&
		params.hasOwnProperty('departureDate')
	) {
		const search: string = params['departureDate'];

		results = results.filter((sailing) => sailing.departureDate === search);
	}

	return results;
}

function modifySearchQuery(
	searchParams: ReadonlyURLSearchParams,
	name: string,
	value: string | boolean
) {
	const params = new URLSearchParams(searchParams.toString());
	if (value && value.toString().length > 0) {
		params.set(name, value.toString());
	} else {
		params.delete(name);
	}

	if (name !== 'page') {
		// Always reset the page when applying filters.
		params.delete('page');
	}

	return params.toString();
}

function sortDate(a: Sailing, b: Sailing): number {
	const dateA = new Date(a.departureDate);
	const dateB = new Date(b.departureDate);

	return dateA.getTime() - dateB.getTime();
}

function sortNumber(a: Sailing, b: Sailing, key: string): number {
	const numberA = Number(a[key]);
	const numberB = Number(b[key]);

	return numberA - numberB;
}

function sortSailings(sailings: Sailing[], key: string, asc: string) {
	const results = sailings.slice();

	if (key === 'departureDate') {
		results.sort(sortDate);
	} else {
		results.sort((a, b) => sortNumber(a, b, key));
	}

	if (asc === 'desc') {
		results.reverse();
	}

	return results;
}

export {
	getShortDateFormat,
	getLocationPort,
	shortItinerary,
	processFilters,
	modifySearchQuery,
	sortSailings,
};
