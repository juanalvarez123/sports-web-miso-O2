import { AuthenticatedUser } from "./authentication.model";

export class Athlete {
  id: number;
  trainer: Trainer = new Trainer();
  birth_place: string;
  sports: Sport[];
  participations: Participation[];
  first_name: string;
  last_name: string;
  height: number;
  weight: number;
  birth_date: Date;
  picture: string;
}

export class Trainer {
  id: number;
  first_name: string;
  last_name: string;
}

export class Sport {
  id: number;
  name: string;
  icon: string;
}

export class Participation {
  id: number;
  modality: Modality;
  datetime: Date;
  youtube_id: string;
  result: number;
  commentaries: Commentary[];
}

export class Commentary {
  datetime: Date;
  comment: string;
  user: AuthenticatedUser;
}

export class Modality {
  id: number;
  sport: Sport;
  name: string;
}
