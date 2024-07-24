"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Category,
  Jewelry,
  Material,
  Shape,
  Size,
} from "@/dbutils/customAPI/getAttribute";
import axios from "@/dbutils/axios";
import CategoryForm from "./category-form";
import MaterialForm from "./material-form";
import GemstoneForm from "./gemstone-form";
import ShapeForm from "./shape-form";
import CenterStoneForm from "./center-stone-form";
import SizeForm from "./size-form";
import NoteForm from "./note-form"; // Import NoteForm
import PriceForm from "./price"; // Import PriceForm
import { Diamond } from "../diamond/diamond-table";
import AuthService from "@/dbutils/userAPI/authservice";
export default function JewelryForm() {
  const [jewelry, setJewelry] = useState<Jewelry | null>(null);
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8>(1);
  const [selectedGemstoneOption, setSelectedGemstoneOption] = useState<
    string | null
  >(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const router = useRouter();
  useEffect(() => {
    if (!AuthService.isAuthenticated()) {
      setShowLoginPrompt(true); // Show the login prompt instead of alert
      setTimeout(() => {
        router.push("/login"); // Redirect after showing the message
      }, 3000); // Adjust the time as necessary
    }
  }, [router]);
  const handleCategorySelect = (cat: Category) => {
    const updatedJewelry: Jewelry = {
      ...jewelry,
      category: cat,
    } as Jewelry;
    setJewelry(updatedJewelry);
    setStep(2); // Move to material selection step
  };

  const handleMaterialSelect = (mat: Material) => {
    const updatedJewelry: Jewelry = {
      ...jewelry,
      material: mat,
    } as Jewelry;
    setJewelry(updatedJewelry);
    setStep(3); // Move to shape selection step
  };

  const handleShapeSelect = (shape: Shape) => {
    const updatedJewelry: Jewelry = {
      ...jewelry,
      shape: shape,
    } as Jewelry;
    setJewelry(updatedJewelry);
    setStep(4); // Move to gemstone selection step
  };

  const handleGemstoneSelect = (option: any) => {
    const updatedJewelry = {
      ...jewelry,
      diamond: null,
    } as Jewelry;
    setJewelry(updatedJewelry);
    setSelectedGemstoneOption(option.path);
    if (option.path === "/size") {
      setStep(6); // Move to size selection step
    } else {
      setStep(5); // Move to center stone selection step
    }
  };

  const handleDiamondSelect = (diamond: Diamond) => {
    const updatedJewelry: Jewelry = {
      ...jewelry,
      diamond: diamond,
    } as Jewelry;
    setJewelry(updatedJewelry);
    setStep(6); // Move to size selection step
  };

  const handleSizeSelect = (size: Size) => {
    const updatedJewelry: Jewelry = {
      ...jewelry,
      size: size,
    } as Jewelry;
    setJewelry(updatedJewelry);
    setStep(7); // Move to note step
  };

  const handleNoteSubmit = async (note: string) => {
    const updatedJewelry: Jewelry = {
      ...jewelry,
      note: note,
    } as Jewelry;

    try {
      // Make a request to calculate the price
      const response = await axios.post(
        "/public/calculate-price",
        updatedJewelry
      );
      console.log(response);
      const jewelryWithPrice = response.data;

      setJewelry(jewelryWithPrice);
      setStep(8); // Move to price step
    } catch (error) {
      console.error("Error calculating price:", error);
    }
  };

  const handleBack = () => {
    if (step === 8) {
      setStep(7); // Go back to note step
    } else if (step === 7) {
      setStep(6); // Go back to size selection step
    } else if (step === 6) {
      if (selectedGemstoneOption === "/size") {
        setStep(4); // Go back to gemstone selection step
      } else {
        setStep(5); // Go back to center stone selection step
      }
    } else if (step === 5) {
      setStep(4); // Go back to gemstone selection step
    } else if (step === 4) {
      setStep(3); // Go back to shape selection step
    } else if (step === 3) {
      setStep(2); // Go back to material selection step
    } else if (step === 2) {
      setStep(1); // Go back to category selection step
    } else {
      router.back();
    }
  };

  return (
    <div>
      {showLoginPrompt && (
        <div
          style={{
            padding: "20px",
            backgroundColor: "#f8d7da",
            color: "#721c24",
            border: "1px solid #f5c6cb",
            borderRadius: "5px",
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          Vui lòng đăng nhập để tiếp tục.
        </div>
      )}
      {step === 1 && <CategoryForm onSelectCategory={handleCategorySelect} />}
      {step === 2 && (
        <MaterialForm
          jewelry={jewelry}
          onSelectMaterial={handleMaterialSelect}
          onBack={handleBack}
        />
      )}
      {step === 3 && (
        <ShapeForm
          jewelry={jewelry}
          onBack={handleBack}
          onSelectShape={handleShapeSelect}
        />
      )}
      {step === 4 && (
        <GemstoneForm
          jewelry={jewelry}
          setJewelry={setJewelry}
          onBack={handleBack}
          onSelectGemstone={handleGemstoneSelect}
        />
      )}
      {step === 5 && (
        <CenterStoneForm
          jewelry={jewelry}
          setJewelry={setJewelry}
          onBack={handleBack}
          onSelectDiamond={handleDiamondSelect}
        />
      )}
      {step === 6 && (
        <SizeForm
          jewelry={jewelry}
          onBack={handleBack}
          onSelectSize={handleSizeSelect}
        />
      )}
      {step === 7 && (
        <NoteForm
          jewelry={jewelry}
          onBack={handleBack}
          onSubmitNote={handleNoteSubmit} // Pass the note submit handler
        />
      )}
      {step === 8 && <PriceForm jewelry={jewelry} onBack={handleBack} />}
    </div>
  );
}
