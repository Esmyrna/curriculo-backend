import AcademicExperienceDTO from "./AcademicExperienceDTO";
import ProfessionalExperienceDTO from "./ProfessionalExperienceDTO";

class PerfilDTO {
    name: string;
    age: number;
    email: string;
    city: string;
    public academicExperience: Array<AcademicExperienceDTO>;
    public ProfessionalExperience: Array<ProfessionalExperienceDTO>;

}

export default PerfilDTO