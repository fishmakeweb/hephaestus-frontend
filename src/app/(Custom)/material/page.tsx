"use client"
import React, {useState} from "react";
import MaterialForm from "./material-form";

import { Jewelry } from "@/dbutils/customAPI/getAttribute";
export default function MaterialPage(){
    const [jewelry, setJewelry] = useState<Jewelry | null>(null);

    return (
      <MaterialForm jewelry={jewelry} setJewelry={setJewelry} />
    );
}