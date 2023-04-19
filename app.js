let collectionSeries = new Collection('NETFLIX');

displaySeries();


DataService.getSerie().then(data => {
    fillSerieArrayFromServer(data);
    displaySeries();
})

function fillSerieArrayFromServer(data) {
    for (let i = 0; i < data.length; i++) {
        const object = data[i];
        const serie = new Serie(object.title, object.seasons, object.isComplete, object.upVotes, object.downVotes, object.imageURL, object.id);
        collectionSeries.addSerie(serie);
    }
}


function displaySeries() {
    console.log(collectionSeries);

    const collectioSeriesTitle = document.getElementById('collection-name');
    const collectionSeriesUl = document.getElementById('collection-listUl');
    collectionSeriesUl.classList.add('class-collectioUl');

    const titleNode = document.createTextNode(collectionSeries.title);
    collectioSeriesTitle.innerHTML = '';
    collectioSeriesTitle.appendChild(titleNode);

    collectionSeriesUl.innerHTML = '';

    for (let i = 0; i < collectionSeries.serieArray.length; i++) {

        const serie = collectionSeries.serieArray[i];

        const newLi = document.createElement('li');
        newLi.classList.add('serie-li');

        createIMGOfSerie(serie);
        createTitleOfSerie(serie);
        createSeasonsOfSerie(serie);
        createIsCompleteOfSerie(serie);
        createUpVotesOfSerie(serie);
        createDownVotesOfSerie(serie);
        createDivForVotes(serie);

        newLi.append(createIMGOfSerie(serie));
        newLi.append(createTitleOfSerie(serie));
        newLi.append(createSeasonsOfSerie(serie));
        newLi.append(createIsCompleteOfSerie(serie));
        newLi.append(createUpVotesOfSerie(serie));
        newLi.append(createDownVotesOfSerie(serie));

        collectionSeriesUl.appendChild(newLi);

    }
}

function createIMGOfSerie(serie) {
    const imgTagIMG = document.createElement('img');
    imgTagIMG.classList.add('serie-img');
    imgTagIMG.src = serie.imageURL;

    return imgTagIMG;
}

function createTitleOfSerie(serie) {

    const titleSpan = document.createElement('span');
    titleSpan.classList.add('serie-title');

    const titleNode = document.createTextNode(serie.title);
    titleSpan.appendChild(titleNode);

    return titleSpan;
}

function createSeasonsOfSerie(serie) {
    const seasonsSpan = document.createElement('span');
    seasonsSpan.classList.add('serie-seasons');

    const seasonsNode = document.createTextNode('Seasons: ' + serie.seasons);
    seasonsSpan.appendChild(seasonsNode);

    return seasonsSpan;
}

function createIsCompleteOfSerie(serie) {

    const isCompleteSpan = document.createElement('span');
    isCompleteSpan.classList.add('serie-isComplete');

    
    let status;
    if (serie.isComplete === true) {
        status = 'Completed';
    } else {
        status = 'Developing';
    }
    const isCompleteNode = document.createTextNode('Status: ' + status);
    isCompleteSpan.appendChild(isCompleteNode);

    return isCompleteSpan;
}

function createUpVotesOfSerie(serie) {
    const upVotesButton = document.createElement('button');
    upVotesButton.classList.add('serie-upVotes-btn');
    const upVotesNode = document.createTextNode('👍');

    upVotesButton.addEventListener('click', (event) => counterUpVotesClicks(serie))
    upVotesButton.appendChild(upVotesNode);
    
    return upVotesButton;
}

function createDownVotesOfSerie(serie) {
    const downVotesButton = document.createElement('button');
    downVotesButton.classList.add('serie-downVotes-btn');
    const downVotesNode = document.createTextNode('👎');

    downVotesButton.addEventListener('click', (event) => counterDownVotesClicks(serie))
    downVotesButton.appendChild(downVotesNode);

    return downVotesButton;
}

function createDivForVotes(serie) {
    const divForVotes = document.createElement('div');
    divForVotes.classList.add('div-ForVotes');

    divForVotes.appendChild(createUpVotesOfSerie(serie));
    divForVotes.appendChild(createDownVotesOfSerie(serie));

    return divForVotes;
}

function orderByTitle() {
    collectionSeries.sortByTitle();
    displaySeries();
}

function orderByUpVotes() {
    collectionSeries.sortByUpVotes();
    displaySeries();
};

function orderByDownVotes() {
    collectionSeries.sortByDownVotes();
    displaySeries();
};
