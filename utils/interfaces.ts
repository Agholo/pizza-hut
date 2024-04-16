export interface IProduct {
	name: string,
	price: string,
	image: string,
	type: string,
	_id?: string
}



export interface IOrder {
	_id: string;
	user: string;
	location: { location: string, description: string};
	name: string;
	phone: string;
	mail: string;
	price: number;
	payed: boolean;
	products: {product: string, count: number}[];
	description: string;
	createdAt: Date
}