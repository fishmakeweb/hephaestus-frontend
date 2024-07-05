"use client"
import React, {useState} from "react";
import NoteForm from "./note-form";
import { Jewelry } from "@/dbutils/customAPI/getAttribute";
export default function NotePage () {
    const [jewelry, setJewelry] = useState<Jewelry | null>(null);

    return (
            <NoteForm jewelry={jewelry} setJewelry={setJewelry}/>
    );
}