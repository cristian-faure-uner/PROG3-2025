import Salones from "../db/salones.js";


export default class SalonesServicio {

    constructor(){
        this.salones = new Salones();
    }

    buscarTodos = () => {
        return this.salones.buscarTodos();
    }

}