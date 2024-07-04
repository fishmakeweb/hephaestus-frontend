"use client"
import React, {useState} from "react";
import ShapeForm from "./shape-form";

import { Jewelry } from "@/dbutils/customAPI/getAttribute";
export default function MaterialPage(){
    const [jewelry, setJewelry] = useState<Jewelry | null>(null);

    return (
      <ShapeForm jewelry={jewelry} setJewelry={setJewelry} />
    );
}