import { AmenityChild } from "./amenities.interface";
import { Bought } from "./boughts.interface";
import { User } from "./user.interface";

type Status = "success" | "error";

export type AuthResponse = {
  status: Status;
  token: string;
  data: { user: User };
};

export type AmentiesChildResponse = {
  results: AmenityChild[];
};

export type BoughtGetResponse = {
  status: Status;
  data: { boughts: Bought[] };
};
