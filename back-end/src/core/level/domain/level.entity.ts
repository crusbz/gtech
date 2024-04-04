export class Level {
  id: number;
  nome: string;

  constructor(level: Partial<Level>) {
    Object.assign(this, level);
  }
}
