import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Perfil } from "./Perfil";
import AcademicExperienceDTO from "../dtos/AcademicExperienceDTO";

@Entity()

export class AcademicExperience {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    highSchool: string;

    @Column('int')
    highSchoolCompletion: number;

    @Column('text')
    university: string;

    @Column('text')
    universityCompletion: string;

    @ManyToOne(() => Perfil, (perfil) => perfil.academicExperience, {onDelete: "CASCADE"})
    perfil: Perfil;
    
    public toEntityForDTO(): AcademicExperienceDTO {
        const academicExperienceDTO = new AcademicExperienceDTO();
        academicExperienceDTO.highSchool = this.highSchool;
        academicExperienceDTO.highSchoolCompletion = this.highSchoolCompletion;
        academicExperienceDTO.university = this.university;
        academicExperienceDTO.universityCompletion = this.universityCompletion;
 
        return academicExperienceDTO;
    }

    public static fromDTOForEntity(dto: AcademicExperienceDTO): AcademicExperience {
        const academicExperience = new AcademicExperience();
        academicExperience.highSchool = dto.highSchool;
        academicExperience.highSchoolCompletion = dto.highSchoolCompletion;
        academicExperience.university = dto.university;
        academicExperience.universityCompletion = dto.universityCompletion;
   
        return academicExperience;
    }
}