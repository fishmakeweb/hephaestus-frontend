// getAllAttributes.ts
import axios from "@/dbutils/axios";

export interface Category {
  categoryId: number;
  categoryName: string;
  categoryImg: string;
}

export interface Material {
  materialId: number;
  materialName: string;
  materialImg: string;
}

export interface Size {
  sizeId: number;
  type: string;
  sizeNumber: number;
  unit: string;
}

export interface Shape {
  shapeId: number;
  shapeDescription: string;
  shapeImg: string;
}

export interface Attributes {
  categories: Category[];
  materials: Material[];
  sizes: Size[];
  shapes: Shape[];
}

export interface AttributeSelections {
    categories: number[];
    materials: number[];
    sizes: number[];
    shapes: number[];
  }

export const fetchAllAttributes = async (): Promise<Attributes> => {
    try {
      const response = await axios.get<Attributes>('/public/attributes/all');
      return response.data; // Assuming the API response directly matches the Attributes interface structure
    } catch (error) {
      console.error("Error fetching all attributes:", error);
      throw error;
    }
  };
  