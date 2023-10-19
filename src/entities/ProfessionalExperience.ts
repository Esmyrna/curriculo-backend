import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Perfil } from "./Perfil";
import ProfessionalExperienceDTO from "../dtos/ProfessionalExperienceDTO";

@Entity()

export class ProfessionalExperience {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    company: string;

    @Column('simple-array')
    skillsCompany: string[];

    @Column('int')
    companyTime: number;

    @ManyToOne(() => Perfil, (perfil) => perfil.professionalExperience, {onDelete: "CASCADE"})
    perfil: Perfil;

    public toEntityForDTO(): ProfessionalExperienceDTO {
        const professionalExperienceDTO = new  ProfessionalExperienceDTO();
       professionalExperienceDTO.company = this.company;
       professionalExperienceDTO.companyTime = this.companyTime
       professionalExperienceDTO.skillsCompany = this.skillsCompany;
 
        return professionalExperienceDTO;
    }

    public static fromDTOForEntity(dto: ProfessionalExperienceDTO): ProfessionalExperience {
        const professionalExperience = new ProfessionalExperience();
        professionalExperience.company = dto.company;
        professionalExperience.companyTime = dto.companyTime;
        professionalExperience.skillsCompany = dto.skillsCompany;

        return professionalExperience;
    }
}