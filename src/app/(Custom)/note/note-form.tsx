import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Jewelry } from "@/dbutils/customAPI/getAttribute";
import axios from "@/dbutils/axios"; // Import axios for making API requests
import { update } from "lodash";

interface NoteFormProps {
  jewelry: Jewelry | null;
  setJewelry: React.Dispatch<React.SetStateAction<Jewelry | null>>;
}

export default function NoteForm({ jewelry, setJewelry }: NoteFormProps) {
  const router = useRouter();
  const [note, setNote] = useState<string>("");

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const updatedJewelry = {
      ...jewelry, // Ensure existing properties are maintained, if any
      note: note,
    };

    try {
      // Make a request to calculate the price
      
      const response = await axios.post("/calculate-price", updatedJewelry);
      console.log(response);
      const jewelryWithPrice = response.data;

      // Save the updated jewelry with the price to session storage
      sessionStorage.setItem('edittingJewelry', JSON.stringify(jewelryWithPrice));

      // Navigate to the price page
      router.push('/price');
    } catch (error) {
      console.error("Error calculating price:", error);
    }
  };

  useEffect(() => {
    const storedJewelry = sessionStorage.getItem('edittingJewelry');
    if (storedJewelry) {
      setJewelry(JSON.parse(storedJewelry));
    }
  }, []);

  return (
    <>
      <button onClick={handleBack}>Back</button>
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h1 className="font-bold text-center text-xl text-neutral-800 dark:text-neutral-200 mb-2">
          Contact us
        </h1>
        <p className="scroll-m-20 text-center text-xl font-bold tracking-tight lg:text-xl">
          Current Jewelry:
          category: {jewelry?.category.categoryName},
          material: {jewelry?.material.materialName},
          diamond: {jewelry?.diamond?.cut.cutDescription},
          size: {`${jewelry?.size.sizeNumber} ${jewelry?.size.unit} (${jewelry?.size.type})`}
        </p>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300 mb-4">
          Welcome to Hephaestus, if you have any descriptions about your custom jewelry, please fill out the form below.
        </p>
        <form onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="message">NOTE</Label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
              onChange={(e) => setNote(e.target.value)}
              required
            />
          </LabelInputContainer>
          <button
            type="submit" // Ensure the button type is submit for form submission
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          >
            Send &rarr;
            <BottomGradient />
          </button>
        </form>
      </div>
    </>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
