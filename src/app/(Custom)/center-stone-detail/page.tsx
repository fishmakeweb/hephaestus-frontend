
"use client"
import React,{useState} from "react";
import CenterStoneForm from "./center-stone-form";
import { Jewelry } from "@/dbutils/customAPI/getAttribute";

export default function CenterStonePage(){
    const [jewelry, setJewelry] = useState<Jewelry | null>(null);
    return (
        <CenterStoneForm jewelry={jewelry} setJewelry={setJewelry} />
    );
}