import { type WeightCheckRequest, type WeightResult } from "@shared/schema";

export interface IStorage {
  // No persistent storage needed for this simple calculator
}

export class MemStorage implements IStorage {
  constructor() {}
}

export const storage = new MemStorage();
