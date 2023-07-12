export const api_base_url = import.meta.env.VITE_SERVER_URL;
export const PHPPrice = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "PHP",
});
export const drawerWidth = 240;

// For Admin
export const generateCustomerData = (num) => ({
	id: num,
	username: `sample${num}`,

	first_name: `first_name-${num}`,
	last_name: `last_name-${num}`,
	barangay: `barangay-${num}`,
	municipality: `municipality-${num}`,
	city: `${num} city`,
	postal: `12342`,
	phone_number: `092134567`,
	email: `sample.${num}@gmail.com`,
	address: `sample ${num} address`,
	img_url: `/images/sample/customer.jpg`,
});

export const generateProductData = (num) => ({
	id: num,
	name: `Prouct Sample ${num}`,
	description: `Product sample description ${num}`,
	img_url: `/images/sample/product.png`,
	price: num % 2 ? 123 : 222,
	category: num % 2 ? "plant" : "pot",
	stocks: num % 2 ? 3 : 12,
	num_sold: num % 2 ? 123 : 54,
	status: num % 2 ? "in stocks" : "out of stocks",
});

export const generateOrderData = (num) => ({
	id: num,
	customer: {
		id: `user-${num}`,
		username: `username-${num}`,
		img_url: "/images/sample/customer.jpg",
	},
	checkout_items: [
		{
			id: `order-${num}`,
			product: { id: `product-${num}`, name: `product-name-${num}` },
		},
	],
	status: num % 2 ? "On Its Way" : "Delivered",
	total_price: num % 2 ? 1234.23 : 4423.32,
	total_quantity: num % 2 ? 3 : 13,
});
