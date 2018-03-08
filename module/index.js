 class Module {

    constructor(index, type, name, nextModule){

        this.index = index;
        this.type = type;
        this.name = name;
        this.nextModule = nextModule || index+1

    }

    validate(){

    }

    next()

}

exports.Question = class Question extends Module {

    constructor(index, type, name, nextModule){
        super(index, type, name, nextModule)
    }

    validate(){

    }

    takeAction(){

    }

    next(){

    }

}


exports.Module = Module
exports.Question = Question

