
class Chaters{

    constructor(){
        this.chaters = [];
    }

    addChater(chater){
        this.chaters.push(chater);
        return this.chaters
    }

    searchChaterById(id){
        const chater = this.chaters.filter( user => user.id == id)
        return chater[0]
    }

    getChaters(){
        return this.chaters
    }

    deleteChater(id){
        
        this.chaters = this.chaters.filter( user => user.id !== id)
        return this.chaters
    }


}

export default Chaters