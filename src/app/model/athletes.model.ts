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
  commentaries: Comment[];
}

export class Comment {
  datetime: Date;
  comment: string;
  participation: number;
}

export class Modality {
  id: number;
  sport: Sport;
  name: string;
}
