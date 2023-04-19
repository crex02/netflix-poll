class DataService {

    static getSerie() {
        return fetch('https://643d7c166afd66da6af8234e.mockapi.io/Series')
        .then(resp => resp.json());

    }

    static putSerie(serie) {
        console.log('put', serie);
        const jsonSerie = JSON.stringify(serie.toDbModel());
        return fetch('https://643d7c166afd66da6af8234e.mockapi.io/Series' + serie.id, { method: "put", body: jsonSerie, headers: { 'content-type': 'application/json' } })
        .then(resp => resp.json());
    }

}