export class Developer {
  id: number;
  nome: string;
  nivelId: number;
  sexo: string;
  datadenascimento: Date;
  hobby: string;

  constructor(developer: Partial<Developer>) {
    Object.assign(this, developer);
  }
}
