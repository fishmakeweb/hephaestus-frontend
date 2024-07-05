"use client"
import React, {useState} from "react";
import { Jewelry } from "@/dbutils/customAPI/getAttribute";
import SizeForm from "./size-form";

export default function SizePage() {
    const [jewelry, setJewelry] = useState<Jewelry | null>(null);
    return (
        <SizeForm jewelry={jewelry} setJewelry={setJewelry}/>
    );
}