import { Document } from "mongoose";

// Interface for Item documents in MongoDB
export interface IItem extends Document {
  owner?: number;
  title: string;
  description?: string;
  tags?: string[];
  location?: string;
  imageUrl?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ItemType {
  _id: string;
  owner?: number;
  title: string;
  description?: string;
  location?: string;
  imageUrl?: string;
  tags?: string[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface LocationCoordinates {
  lat: number;
  lng: number;
}
