export const networkCollections = {
	"0x89": [
		// Add Your Collections here
		{
			image:
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs4nVnKoJ8oF01AKCtfac-Ek8gtbgcom0Hsw&usqp=CAU",
			name: "Limeted Edition",
			addrs: "0x72339eAeEfDb6a570feFa79236B6910D5dcb80C4",
		},

		{
			image:
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs4nVnKoJ8oF01AKCtfac-Ek8gtbgcom0Hsw&usqp=CAU",
			name: "Sound",
			addrs: "0x72339eAeEfDb6a570feFa79236B6910D5dcb80C4",
		},

		{
			image:
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs4nVnKoJ8oF01AKCtfac-Ek8gtbgcom0Hsw&usqp=CAU",
			name: "Video",
			addrs: "0x72339eAeEfDb6a570feFa79236B6910D5dcb80C4",
		},

		{
			image:
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs4nVnKoJ8oF01AKCtfac-Ek8gtbgcom0Hsw&usqp=CAU",
			name: "Etc",
			addrs: "0x72339eAeEfDb6a570feFa79236B6910D5dcb80C4",
		},
	],

	"0x1": [
		{
			image:
				"https://image.edaily.co.kr/images/Photo/files/NP/S/2021/05/PS21050300573.jpg",
			name: "WindnWing  etherium",
			addrs: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
		},
	],
};

export const getCollectionsByChain = (chain) => networkCollections[chain];
