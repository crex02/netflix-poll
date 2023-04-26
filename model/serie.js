class Serie {

    constructor(title, seasons, isComplete, upVotes, downVotes, imageURL, id) {
        this.title = title;
        this.seasons = seasons;
        this.isComplete = isComplete;
        this.upVotes = upVotes;
        this.downVotes = downVotes;
        this.imageURL = imageURL;
        this.id = id;
    }

    compareByTitle(serie2) {
        return this.title.localeCompare(serie2.title);
    }

    compareByBestSerie(serie2) {
        return this.upVotes.localeCompare(serie2.upVotes);
    }

    compareByWorstSerie(serie2) {
        return this.downVotes.localeCompare(serie2.downVotes);
    }

    compareByRating(serie){
        const myUpPoints = this.upVotes * 2;
        const myDownPoints = this.downVotes;
        const myRating = myUpPoints - myDownPoints;

        const otherUpPoints = serie.upVotes * 2;
        const otherDownPoints = serie.downVotes;
        const otherRating = otherUpPoints - otherDownPoints;

        return otherRating - myRating;

    }

    static fromSerieObject(serieObject) {
        return new Serie(serieObject.title, serieObject.seasons, serieObject.isComplete, serieObject.upVotes, serieObject.downVotes, serieObject.imageURL, serieObject.id);
    }

    listModel() {
        const model = {
            title: this.title,
            seasons: this.seasons,
            isComplete: this.isComplete,
            upVotes: this.upVotes,
            downVotes: this.downVotes,
            imageURL: this.imageURL,
            id: this.id
        }
        return model;
    }
}