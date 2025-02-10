type Line = {
	logo: string;
	name: string;
};

type Ship = {
	name: string;
	rating: number;
	reviews: number;
	image: string;
	line: Line;
};

export type Sailing = {
	departureDate: string;
	duration: number;
	itinerary: string[];
	name: string;
	price: number;
	region: string;
	returnDate: string;
	ship: Ship;
};

export type SailingsProps = {
	sailings: Sailing[];
};

export type SailingProps = {
	sailing: Sailing;
};
