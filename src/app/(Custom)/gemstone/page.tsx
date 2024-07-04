"use client"
import React,{useState} from "react";
import GemstoneForm from "./gemstone-form";
import { Jewelry } from "@/dbutils/customAPI/getAttribute";

export default function DiamondPage(){
    const [jewelry, setJewelry] = useState<Jewelry | null>(null);

    return (
        <GemstoneForm jewelry={jewelry} setJewelry={setJewelry}/>
    );
}