import PerfilDTO from "../dtos/PerfilDTO";
import { Perfil } from "../entities/Perfil";

interface IPerfilService {
    getAll(): Promise<Array<Perfil> | any>;
    getById(id: number): Promise<Perfil | any>;
    addPerfil(perfilDTO: PerfilDTO): Promise<Perfil>;
    updatePerfil(id: number, perfilDTO: PerfilDTO): Promise<Perfil | any>;
    deletePerfil(id: number): Promise<void>

}

export default IPerfilService;