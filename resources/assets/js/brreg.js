
const brregFilters = {
    startsWith: "startsWith(navn, '{1}')"
}
const brregOptions = {
    url: "http://data.brreg.no/enhetsregisteret/enhet.json",
    page: 0,
    size: 1,
    filterPrefix: "$filter="
}

const defaultParams = {
    page: 0,
    size: 1
}

export default class Brreg {

    constructor() {
        const url = "http://data.brreg.no/enhetsregisteret/enhet.json";
    }

    searchByName(companyName) {
        if(!axios){
            console.log("brreg - AXIOS not found. Unable to retrieve data.");
            return null;
        }

        let queryFilter = brregFilters.startsWith.replace('{1}', companyName);

        let result = axios.get(brregOptions.url, {
            params: {
                page: defaultParams.page,
                size: defaultParams.size,
                $filter: queryFilter
            }
        })
        .then( results => {
            console.log('brreg - Results searching..:');
            console.log(results);
        })
        .catch(error => {
            console.log('brreg - Error searching..:');
            console.log(error);
        });
    }
}