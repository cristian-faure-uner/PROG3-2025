import Salones from "../db/salones.js";


export default class SalonesServicio {

    constructor(){
        this.salones = new Salones();
    }

    buscarTodos = () => {
        return this.salones.buscarTodos();
    }

    buscarPorId = (salon_id) => {
        return this.salones.buscarPorId(salon_id);
    }

    modificar = (salon_id, datos) => {
        // verifico si el id de salon existe
        const existe = this.salones.buscarPorId(salon_id);
        if(!existe){
            return null;
        }
        return this.salones.modificar(salon_id, datos);
    }

    crear = (salon) => {
        return this.salones.crear(salon);
    }

}