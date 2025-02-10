function getShortDateFormat(departureDate: string, returnDate: string): string {
	const depDate = new Date(departureDate);
	const depDateOptions: Intl.DateTimeFormatOptions = {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	};

	const retDate = new Date(returnDate);
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

export { getShortDateFormat, getLocationPort, shortItinerary };
