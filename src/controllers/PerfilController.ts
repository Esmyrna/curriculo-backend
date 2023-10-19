import { Request, Response, Router } from 'express'; // Importe os tipos corretos de acordo com o seu framework
import PerfilDTO from "../dtos/PerfilDTO";
import { Perfil } from "../entities/Perfil";
import IPerfilService from '../services/IPerfilService';
import PerfilService from '../services/PerfilService';


class PerfilController {
    private readonly perfilService: IPerfilService;

    constructor() {
        this.perfilService = new PerfilService();
    }

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const perfis = await this.perfilService.getAll();
            res.json(perfis);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar perfis' });
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id, 10);
        try {
            const perfil = await this.perfilService.getById(id);
            if (perfil) {
                res.json(perfil);
            } else {
                res.status(404).json({ error: 'Perfil não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar perfil' });
        }
    }

    async addPerfil(req: Request, res: Response): Promise<void> {
        const perfilDTO: PerfilDTO = req.body;

        try {
            const perfil = await this.perfilService.addPerfil(perfilDTO);
            res.status(201).json(perfil);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao adicionar perfil' });
        }
    }

    async updatePerfil(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id, 10);
        const perfilDTO: PerfilDTO = req.body;

        try {
            const perfil = await this.perfilService.updatePerfil(id, perfilDTO);
            if (perfil) {
                res.json(perfil);
            } else {
                res.status(404).json({ error: 'Perfil não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar perfil' });
        }
    }

    async deletePerfil(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id, 10);

        try {
            await this.perfilService.deletePerfil(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Erro ao excluir perfil' });
        }
    }

    public router(): Router {
        const router = Router();

        router.get('/perfis', this.getAll.bind(this));
        router.get('/perfis/:id', this.getById.bind(this));
        router.post('/perfis', this.addPerfil.bind(this));
        router.put('/perfis/:id', this.updatePerfil.bind(this));
        router.delete('/perfis/:id', this.deletePerfil.bind(this));

        return router;
    }
}

export default PerfilController;
