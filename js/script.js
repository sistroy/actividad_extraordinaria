const endpoint = 'https://es.wikipedia.org/w/api.php?';
const params = {
    origin: '*',
    format: 'json',
    action: 'query',
    prop: 'extracts',
    exchars: 250,
    exintro: true,
    explaintext: true,
    generator: 'search',
    gsrlimit: 5,
    gsrsearch: ''
};

const getData = async (input) => {
    if(input != ''){
        const userInput = input;

        params.gsrsearch = userInput;
        try {
            const { data } = await axios.get(endpoint, { params });
    
            if (data.error) throw new Error(data.error.info);
            gatherData(data.query.pages);
        } catch (error) {
            console.log(error);
        }
    }
};

const gatherData = pages => {
    const results = Object.values(pages).map(page => ({
        pageId: page.pageid,
        title: page.title,
        intro: page.extract,
    }));

    showResults(results);
};

const showResults = results => {
    const resultsContainer = document.querySelector('#results');
    const dataTable = $('#resultsTable').DataTable();
    dataTable.clear();
    results.forEach(result => {
        console.log(result.title);
        dataTable.row.add( [
            (result.title == 'undefined')? '' : result.title,
            result.intro+`<a href="https://es.wikipedia.org/?curid=${result.pageId}" target="_blank">Leer mas..</a>`
         ]).draw();
    });
};

const loadDataTable = () =>{
    $('#resultsTable').DataTable({
        language: {
            "search": "Buscar:",
            "emptyTable": "Ningun dato disponible, escriba en \"Buscar\" y presione \"ENTER\""
        },
        ordering: false,
        lengthChange: false,
        paging: false,
        info:false
    });
    $('.dataTables_filter input')
    .off()
    .on('keyup', function(e) {
        var key = e.key;
        if(key==="Enter"){
            console.log(this.value);
            getData(this.value);
        }
        return false;
    });
};

$(document).ready(function() {
    loadDataTable();
});