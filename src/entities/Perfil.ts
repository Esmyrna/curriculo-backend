import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { AcademicExperience } from "./AcademicExperience";
import PerfilDTO from "../dtos/PerfilDTO";
import { ProfessionalExperience } from "./ProfessionalExperience";

@Entity()

export class Perfil {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column('text')
    public name: string;

    @Column('int')
    public age: number;

    @Column('text')
    email: string;

    @Column('text')
    city: string;

    @OneToMany(() => AcademicExperience, (academicExperience) => academicExperience.perfil, {cascade: true})
    public academicExperience: Array<AcademicExperience>

    @OneToMany(() => ProfessionalExperience, (professionalExperience) => professionalExperience.perfil, {cascade: true})
    public professionalExperience: Array<ProfessionalExperience>;

    public toEntityForDTO(): PerfilDTO {
        const perfilDTO = new PerfilDTO();
        perfilDTO.name = this.name;
        perfilDTO.name= this.name;
        perfilDTO.city = this.city;
        perfilDTO.email = this.email;
        perfilDTO.age = this.age;
        perfilDTO.academicExperience = this.academicExperience.map((academic) => academic.toEntityForDTO());
 
        return perfilDTO;
      }
    
    public static fromDTOForEntity(dto: PerfilDTO): Perfil {
        const perfil = new Perfil();
        perfil.name = dto.name;
        perfil.age = dto.age;
        perfil.city = dto.city;
        perfil.email = dto.email;
        perfil.academicExperience = dto.academicExperience.map((AcademicExperienceDTO) => AcademicExperience.fromDTOForEntity(AcademicExperienceDTO));
        
        return perfil;
    }
}