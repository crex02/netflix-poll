let collectionSeries = new Collection('NETFLIX');

displaySeries();

startLoading()
DataService.getSerie()
.then(data => {
    fillSerieArrayFromServer(data);
    displaySeries();
    stopLoading();
}).catch ( err => {
    displayErrorMessage ('Attenction, there is an error here!');
    stopLoading();
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
    divForVotes.classList.add('div-forVotes');

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
}

function sortCollectionByRating(){
    collectionSeries.sortByRating();
    displaySeries();
}

function counterUpVotesClicks(serie) {
    serie.upVotes+=1;
    DataService.putSerie(serie).then(modifiedSerie => displaySeries());
}

function counterDownVotesClicks(serie) {
    serie.downVotes+=1;
    DataService.putSerie(serie).then(modifiedSerie => displaySeries())
}


function saveNewSerie(){
    const titleInput = document.getElementById('title-input');
    const newSerieTitle = titleInput.value;
    const newSerie = new Serie(newSerieTitle);
    console.log(newSerie);
   
    DataService.postSerie(newSerie).then(savedSerie => {
        newSerie.id = savedSerie.id;
        collectionSeries.addSerie(newSerie);
        displaySeries();
    })
}

function displayErrorMessage(message) {
        const errorMessage = document.getElementById('error-message');
        const errorNode = document.createTextNode (message);
        errorMessage.appendChild(errorNode);
}

function startLoading() {
    const loadingIcon = document.getElementById('loading-icon');
    loadingIcon.style.display = 'inline-block';
}

function stopLoading() {
    const loadingIcon = document.getElementById('loading-icon');
    loadingIcon.style.display = 'none';
}