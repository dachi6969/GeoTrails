
export type ImagesType = {
    card: string;
    intro: string;
    gallery: string[];
  }
  
  export interface ToursData {
    id: number;
    dayDuration: number;
    price: number;
    visitorsCount: number;
    title: string;
    category: string;
    shortDescription: string;
    description: string;
    images: ImagesType;
  }