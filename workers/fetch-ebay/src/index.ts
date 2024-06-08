import { load } from 'cheerio';

const ids = [395452818334, 395452826148];
const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
	'Access-Control-Max-Age': '86400',
};
function handleOptions(request: Request) {
	// Make sure the necessary headers are present
	// for this to be a valid pre-flight request
	let headers = request.headers;
	if (
		headers.get('Origin') !== null &&
		headers.get('Access-Control-Request-Method') !== null &&
		headers.get('Access-Control-Request-Headers') !== null
	) {
		// Handle CORS pre-flight request.
		// If you want to check or reject the requested method + headers
		// you can do that here.
		let respHeaders = {
			...corsHeaders,
			// Allow all future content Request headers to go back to browser
			// such as Authorization (Bearer) or X-Client-Name-Version
			'Access-Control-Allow-Headers': request.headers.get('Access-Control-Request-Headers'),
		};
		return new Response(null, {
			headers: respHeaders,
		});
	} else {
		// Handle standard OPTIONS request.
		// If you want to allow other HTTP Methods, you can do that here.
		return new Response(null, {
			headers: {
				Allow: 'GET, HEAD, POST, OPTIONS',
			},
		});
	}
}
async function handleRequest(request: Request) {
	let response;
	if (request.method === 'OPTIONS') {
		response = handleOptions(request);
	} else {
		response = await fetch(request);
		response = new Response(response.body, response);
		response.headers.set('Access-Control-Allow-Origin', '*');
		response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	}
	return response.headers;
}

export default {
	async fetch(request: Request): Promise<Response> {
		const headers = await handleRequest(request);
		const info = await Promise.all(
			ids.map(async (id) => {
				const html = await fetch(`https://www.ebay.co.uk/itm/${id}/`).then((rsp) => rsp.text());
				const $ = load(html);
				const descLink = $('#desc_ifr').attr('src');
				let description = null;
				if (descLink) {
					const descriptionHTML = await fetch(descLink).then((rsp) => rsp.text());
					description = load(descriptionHTML)('body p')
						.map(function () {
							return $(this).text();
						})
						.get()
						.join(' ');
				}

				const data = {
					url: `https://www.ebay.co.uk/itm/${id}/`,
					title: $('.x-item-title__mainTitle span').text(),
					currentPrice: parseFloat($('.x-price-primary > span').text().replace('£', '')),
					bids: parseInt($('.x-bid-count span').text().replace('bids', '').trim()),
					ends: $('.ux-timer__text').text(),
					description,
					images: $('.ux-image-carousel-item')
						.map(function () {
							return $(this).find('img').attr('data-zoom-src');
						})
						.get(),
				};
				return data;
			})
		);
		return Response.json(info, { headers });
	},
};
