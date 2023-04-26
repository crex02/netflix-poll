class DataService {

    static getSerie() {
        return fetch('https://643d7c166afd66da6af8234e.mockapi.io/Series')
        .then(resp => resp.json());

    }

    static putSerie(serie) {
        console.log('put', serie);
        const jsonSerie = JSON.stringify(serie.listModel());
        return fetch('https://643d7c166afd66da6af8234e.mockapi.io/Series' + serie.id, { method: "PUT", body: jsonSerie, headers: { 'content-type': 'application/json'}, body:jsonSerie })
        .then(resp => resp.json());
    }

    static postSerie(serie){
        const jsonSerie = JSON.stringify(serie);
        return fetch('https://643d7c166afd66da6af8234e.mockapi.io/Series', { method: "POST", body: jsonSerie, headers: { 'content-type': 'application/json' }, body:jsonSerie })
        .then(resp => resp.json());
    }

}