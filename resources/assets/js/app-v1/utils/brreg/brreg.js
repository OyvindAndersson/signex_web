import axios from 'axios'

const brregFilters = {
    filterPrefix: "$filter=",
    startsWith: "startswith({prop}, '{value}')"
}
const brregOptions = {
    url: "http://data.brreg.no/enhetsregisteret/enhet.json?",
    page: 0,
    size: 1,
    
}

/**
 * @todo Make this class more flexible, and implement the proper API
 * This works for now.
 */
export default class Brreg {

    constructor(onResultsCallback) {
        this.state = {
            lastResult: []
        }
        this.onResultsCallback = onResultsCallback;
        this.isFetching = false
    }

    getLastResult() {
        return this.state.lastResult;
    }

    searchByName(value, size = 3) {
        if(value.length < 3){
            return;
        }

        let url = "http://data.brreg.no/enhetsregisteret/enhet.{format}?page={side}&size={antall}&$filter={filter}";
        url = url.replace('{format}', "json");
        url = url.replace('{side}', "0");
        url = url.replace('{antall}', size);
        url = url.replace('{filter}', "startswith(navn, '"+value+"')");

        // BRREG api does not accept this header...
        delete window.axios.defaults.headers.common['X-CSRF-TOKEN']
        
        // Not used, atm...
        this.state.isFetching = true

        axios.get(url)
        .then((response) => {
            this.isFetching = false
            this.state.lastResult = response.data.data;
            // Callback if any are set,
            if(this.onResultsCallback){
                this.onResultsCallback(response.data.data);
            }
        })
        .catch((thrown) => {
            if(axios.isCancel(thrown)) {
                console.log("REQUEST CANCELLED")
            } else {
                console.log("BRREG: Some error occured")
            }
        })
    }
}