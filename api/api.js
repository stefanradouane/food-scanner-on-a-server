const endpoint = require("./endpoint")

class Api {
    get = async (type, query, page, pageSize) => {
        const response = fetch(endpoint(type, query, page, pageSize))
            .then((data) => {
                return data;
            })
            .catch((err) => {
                return err;
            });


        const res = await response;
        // let count;


        switch (res.status) {
            case 200:
                return await res.json()
                // count = `Remaining fetches: ${res.headers["x-ratelimit-remaining"]}`;
                // console.log(count);

                // const repositories = octokit()
                //     .request(endpoint(query, "repos"))
                //     .then((data) => {
                //         return data;
                //     })
                //     .catch((err) => {
                //         return err;
                //     });

                // return {
                // user: res.data, repos: [{}, ...(await repositories).data]
                // };
            case 404:
                // count = `Remaining fetches: ${res.response.headers["x-ratelimit-remaining"]}`;
                // console.log(count);
                return res.response.data;
        }
    };

    post = async (endpoint, body) => {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = response.json();
        return data;
    };
}
const api = new Api();

module.exports = api