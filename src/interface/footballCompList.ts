export interface IRoot {
  competitions: Competition[];
}

export interface Competition {
  "generic-name": string;
  id: number;
  type: string;
  "full-name": string;
  rounds?: Round[];
}

export interface Round {
  name: string;
  id: number;
}
