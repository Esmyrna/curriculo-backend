import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { DataSource } from 'typeorm';
import PerfilController from './controllers/PerfilController';
import AuthController from './controllers/AuthController'
import { Perfil } from './entities/Perfil';
import { AcademicExperience } from './entities/AcademicExperience';
import { ProfessionalExperience } from './entities/ProfessionalExperience';
import { initializeApp } from 'firebase/app';
import { config } from './config';
dotenv.config();

export const firebase = initializeApp(config)

export const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  logging: true,
  synchronize: true,
  entities: [Perfil, AcademicExperience, ProfessionalExperience],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
});

dataSource.initialize().then(() => {
  const app = express()
  app.use(cors());
  app.use(express.json());
  app.use(new PerfilController().router());
  app.use(new AuthController().router());

  const port = Number(process.env.PORT) || 3000;

  app.listen(port, () => {
    console.log(`Server is running in port ${port}`);
  })
})
  .catch((error) => console.error("Erro ao conectar ao banco de dados:", error));