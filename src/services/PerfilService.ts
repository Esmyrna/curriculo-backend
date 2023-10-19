import { Repository, RepositoryNotTreeError } from "typeorm";
import IPerfilService from "./IPerfilService";
import { Perfil } from "../entities/Perfil";
import { dataSource } from "../server";
import PerfilDTO from "../dtos/PerfilDTO";


class PerfilService implements IPerfilService {

    private readonly perfilRepository: Repository<Perfil>

    constructor() {
        this.perfilRepository = dataSource.getRepository(Perfil);
    }

    public async getAll(): Promise<Array<Perfil> | any> {
        return await this.perfilRepository.find({ relations: ["academicExperience", "professionalExperience"] });
    }

    public async getById(id: number): Promise<Perfil | undefined> {
        return await this.perfilRepository.findOne({
            where: { id },
            relations: ["academicExperience", "professionalExperience"]
        });
    }

    public async addPerfil(perfilDTO: PerfilDTO): Promise<Perfil> {
        const perfil = Perfil.fromDTOToEntity(perfilDTO);
        return await this.perfilRepository.save(perfil);
    }

    public async updatePerfil(id: number, perfilDTO: PerfilDTO): Promise<Perfil | undefined> {
        const idPerfil = await this.perfilRepository.findOne({
            where: { id },
            relations: ["academicExperience", "professionalExperience"]
        });

        if (!idPerfil) {
            console.log("Esse currículo não existe " + idPerfil)
            return undefined;
        } else {
            const updatePerfil = Perfil.fromDTOToEntity(perfilDTO);
            updatePerfil.id = id;

            return await this.perfilRepository.save(updatePerfil);
        }
    }

    public async deletePerfil(id: number): Promise<void> {
        await this.perfilRepository.delete(id);
    }
}

export default PerfilService