import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Jewelry } from "@/dbutils/customAPI/getAttribute";
import { Card, CardBody } from "@nextui-org/react";
import { ScrollArea } from "@/components/ui/scroll-area";
interface NoteFormProps {
  jewelry: Jewelry | null;
  onBack: () => void; // Add onBack prop
  onSubmitNote: (note: string) => void; // Add onSubmitNote prop
}

export default function NoteForm({ jewelry, onBack, onSubmitNote }: NoteFormProps) {
  const [note, setNote] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Pass the note to the parent component
    onSubmitNote(note);
  };

  return (
    <>
     <button className="bg-white hover:bg-gray-300 transition duration-300 text-black font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline" onClick={onBack}>←</button>
      <ol className="flex items-center w-full mb-4 sm:mb-5">
        <li className="flex w-full items-center text-green-600 dark:text-green-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-green-100 after:border-4 after:inline-block dark:after:border-green-800">
          <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
            <svg
              className="w-4 h-4 text-green-600 lg:w-6 lg:h-6 dark:text-green-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 16"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
            </svg>
          </div>
        </li>
        <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-green-100 after:border-4 after:inline-block dark:after:border-green-700">
          <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-green-700 shrink-0">
            <svg
              className="w-4 h-4 text-green-600 lg:w-6 lg:h-6 dark:text-green-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 14"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM2 12V6h16v6H2Z" />
              <path d="M6 8H4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2Zm8 0H9a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2Z" />
            </svg>
          </div>
        </li>
        <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-green-100 after:border-4 after:inline-block dark:after:border-green-700">
          <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-green-700 shrink-0">
            <svg
              className="w-4 h-4 text-green-600 lg:w-6 lg:h-6 dark:text-green-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 14"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM2 12V6h16v6H2Z" />
              <path d="M6 8H4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2Zm8 0H9a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2Z" />
            </svg>
          </div>
        </li>
        <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-green-100 after:border-4 after:inline-block dark:after:border-green-700">
          <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-green-700 shrink-0">
            <svg
              className="w-4 h-4 text-green-600 lg:w-6 lg:h-6 dark:text-green-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 14"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM2 12V6h16v6H2Z" />
              <path d="M6 8H4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2Zm8 0H9a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2Z" />
            </svg>
          </div>
        </li>
        <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-green-100 after:border-4 after:inline-block dark:after:border-green-700">
          <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-green-700 shrink-0">
            <svg
              className="w-4 h-4 text-green-600 lg:w-6 lg:h-6 dark:text-green-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 14"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM2 12V6h16v6H2Z" />
              <path d="M6 8H4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2Zm8 0H9a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2Z" />
            </svg>
          </div>
        </li>

        <li className="flex items-center w-full">
          <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
            <svg
              className="w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
            </svg>
          </div>
        </li>
      </ol>
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h1 className="font-bold text-center text-xl text-neutral-800 dark:text-neutral-200 mb-2">
          Contact us
        </h1>
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
      <ScrollArea className="max-h-[550px] lg:max-h-[620px] overflow-y-auto">
        <div className="flex flex-wrap justify-center gap-4">
          <Card className="w-full max-w-md mx-auto my-4 lg:my-8 bg-white rounded-lg shadow-md">
            <CardBody className="flex flex-col gap-2">
              <p className="text-md font-semibold">Category: "{jewelry?.category.categoryName}"</p>
              <p className="text-md font-semibold">Material: "{jewelry?.material.materialName}"</p>
              <p className="text-md font-semibold">Shape: "{jewelry?.shape.shapeDescription}"</p>
              <p className="text-md font-semibold">Gemstone: {jewelry?.diamond?.cut.cutDescription}</p>
              <p className="text-md font-semibold">
                Size: {jewelry?.size.sizeNumber} {jewelry?.size.unit} ({jewelry?.size.type})
              </p>
            </CardBody>
          </Card>
        </div>
      </ScrollArea>
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
