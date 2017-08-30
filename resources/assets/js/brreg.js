
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
        
    }

    getLastResult() {
        return this.state.lastResult;
    }

    searchByName(value, size = 3) {
        if(value.length < 3 || this.state.lat){
            console.log("Name must be > 2 chars.")
            return;
        }

        let url = "http://data.brreg.no/enhetsregisteret/enhet.{format}?page={side}&size={antall}&$filter={filter}";
        url = url.replace('{format}', "json");
        url = url.replace('{side}', "0");
        url = url.replace('{antall}', size);
        url = url.replace('{filter}', "startswith(navn, '"+value+"')");

        fetch(url)
        .then( response => {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +  
                response.status);  
                return;  
            }
            return response.json();
        })
        .then(response => {
            this.state.lastResult = response.data;

            // Callback if any are set,
            if(this.onResultsCallback){
                this.onResultsCallback(response.data);
            }
        })
        .catch(error => {
            console.log("Brreg fetch Error!: " + error);
        });
    }
}