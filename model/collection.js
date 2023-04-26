class Collection {

    constructor(title, serieArray = []) {
        this.title = title;
        this.serieArray = serieArray;
    }

    addSerie(serie) {
        this.serieArray.push(serie);
    }

    sortByTitle() {
        this.serieArray.sort((serie1,serie2) => serie1.title.localeCompare(serie2.title));
    }

    sortByUpVotes(){
        this.serieArray.sort((serie1,serie2) => serie2.upVotes - serie1.upVotes);
    }

    sortByDownVotes(){
        this.serieArray.sort((serie1,serie2) => serie2.downVotes - serie1.downVotes);
    }

    sortByRating(){
        this.serieArray.sort((serie1,serie2) => serie1.compareByRating(serie2));
    }


    static fromObjectArray(title, objectArray) {
        const newCollection = new Collection(title);
        for (let i = 0; i < objectArray.length; i++) {
            const serieObject = objectArray[i];
            const newSerie = Serie.fromTodoObject(serieObject);
            newCollection.addSerie(newSerie);
        }
        return newCollection;
    }
    static fromJSONArray(data){
        const newCollection = new Collection();
        for (let i = 0; i < data.length; i++) {
            const o = data[i];
            const newSerie = new Serie(o.title, o.creator, o.seasons, o.isCompleted, o.upVotes, o.downVotes, o.imageUrl, o.id)
            newCollection.addSerie(newSerie);
        }
        return newCollection;
    }
}
