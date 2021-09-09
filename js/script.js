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
    gsrlimit: 20,
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
    resultsContainer.innerHTML = '';
    results.forEach(result => {
        dataTable.row.add( [
            result.title,
            result.intro+`<a href="https://es.wikipedia.org/?curid=${result.pageId}" target="_blank">Leer mas..</a>`
         ]).draw();
    });
};

const loadDataTable = () =>{
    $.ajax({
        url: 'https://cdn.datatables.net/plug-ins/1.11.1/i18n/es_es.json',
        type: 'GET',
        success: function(res) {
            $('#resultsTable').DataTable({
                language: res   
            });
            $('.dataTables_filter input')
            .off()
            .on('keyup', function() {
                getData(this.value);
                return false;
            });
        }
    });
};

$(document).ready(function() {
    loadDataTable();
});