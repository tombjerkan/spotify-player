import nock from "nock";
import { fetchPlaylists, fetchPlaylistTracks } from "./api";

const token = "<token>";

describe("fetch playlists", () => {
	const playlistsData = [
	{
						id: "00000000000",
						name: "Bossa Nova",
						images: [{ url: "http://spotify.com/images/00000000000" }],
						tracks: { href: "<url here>" }
					},
					{
						id: "1111111111",
						name: "Disco",
						images: [{ url: "http://spotify.com/images/1111111111" }],
						tracks: { href: "<url here>" }
					}
	];

	function setupNock(pages) {
		pages.forEach((page, index) => {
			const pagePart = index === 0
				? ""
				: `&page=${index}`;

			nock("https://api.spotify.com", {
				reqheaders: { authorization: `Bearer ${token}` }
			})
				.get(`/v1/me/playlists?limit=50${pagePart}`)
				.reply(200, {
					items: page,
					next: 
				})
		});
		for (const page of pages) {
			nock("https://api.spotify.com", {
				reqheaders: { authorization: `Bearer ${token}` }
			})
				.get("/v1/me/playlists?limit=50")
				.reply(200, {
					items: page,
					next: 
				})
		}
	}

	test("can fetch playlists", async () => {
		nock("https://api.spotify.com", {
		  reqheaders: {
		    authorization: `Bearer ${token}`
		  },
		})
			.get("/v1/me/playlists?limit=50")
			.reply(200, {
				items: playlistsData,
				next: null
			});

		const playlists = await fetchPlaylists(token);

		expect(playlists).toHaveLength(2);
		expect(playlists[0]).toEqual({
			id: "00000000000",
			name: "Bossa Nova",
			imageUrl: "http://spotify.com/images/00000000000",
			tracksHref: "<url here>"
		});
	});

	test("can fetch paged playlists", async () => {
		nock("https://api.spotify.com", {
		  reqheaders: {
		    authorization: `Bearer ${token}`
		  },
		})
			.get("/v1/me/playlists?limit=50")
			.reply(200, {
				items: [playlistsData[0]],
				next: "https://api.spotify.com/v1/me/playlists?limit=50&page=2"
			});

		nock("https://api.spotify.com", {
		  reqheaders: {
		    authorization: `Bearer ${token}`
		  },
		})
			.get("/v1/me/playlists?limit=50&page=2")
			.reply(200, {
				items: [playlistsData[1]],
				next: null
			});

		const playlists = await fetchPlaylists(token);

		expect(playlists).toHaveLength(2);
	})
});