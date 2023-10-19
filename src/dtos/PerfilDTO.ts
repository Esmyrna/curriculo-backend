import AcademicExperienceDTO from "./AcademicExperienceDTO";
import ProfessionalExperienceDTO from "./ProfessionalExperienceDTO";

class PerfilDTO {
   public name: string;
   public age: number;
   public email: string;
   public  city: string;
   public academicExperience: Array<AcademicExperienceDTO>;
   public ProfessionalExperience: Array<ProfessionalExperienceDTO>;

}

export default PerfilDTO