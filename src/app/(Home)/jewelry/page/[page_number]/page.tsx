import Jewelry from "./jewelry-form";
import NavbarPage from "@/app/(Home)/navbar/page";
export default async function JewelryPage() {
  return (
    <div className="bg-white">
      <NavbarPage />
      <Jewelry />;
    </div>
  );
}
