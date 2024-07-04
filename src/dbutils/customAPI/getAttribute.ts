
import axios from "@/dbutils/axios"
import { Diamond } from '@/app/(Home)/diamond/diamond-table';
export interface Category {
    categoryId:number;
    categoryName:string;
}

export interface Material {
    materialId:number;
    materialName:string;
}
export interface Size {
    sizeId:number;
    type:string;
    sizeNumber:number;
    unit:string;
}

export interface Shape {
    shapeId: number;
    shapeDescription: string;
}
export interface Jewelry {
    id: number;
    category: Category;
    material: Material;
    diamond: Diamond | null;
    shape: Shape;
    size: Size;
    price: number;
    note: string;
  }
export default class getAttribute {
    async getCategory () : Promise<Category[]>{
        try {
            const response = await axios.get<Category[]>('/categories');
            return response.data;
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            throw error;
        }
    }

    async getMaterial () : Promise<Material[]>{
        try {
            const response = await axios.get<Material[]>('/materials');
            return response.data;
        } catch (error) {
            console.error('Failed to fetch materials:', error);
            throw error;
        }
    }
    async getShape () : Promise<Shape[]>{
        try {
            const response = await axios.get<Shape[]>('/shapes');
            return response.data;
        } catch (error) {
            console.error('Failed to fetch materials:', error);
            throw error;
        }
    }
    async getDiamonds(): Promise<Diamond[]> {
        try {
            const response = await axios.get('/diamonds');
            return response.data;
        } catch (error) {
            console.error('Failed to fetch diamonds:', error);
                throw error; 
        }
    }

    async getSizes() : Promise<Size[]> {
        try {
            const response = await axios.get<Size[]>('/sizes');
            return response.data;
        } catch (error) {
            console.error('Failed to fetch sizes:', error);
            throw error;
        }
    }
}
