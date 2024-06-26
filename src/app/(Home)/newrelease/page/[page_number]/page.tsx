import NewRelease from "./newrelease-form";
import NavbarPage from "@/app/(Home)/navbar/page";
export default async function JewelryPage() {
  return (
    <div className="bg-white">
      <NavbarPage />
      <NewRelease />;
    </div>
  );
}
