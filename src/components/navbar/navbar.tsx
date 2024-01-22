import { ModeToggle } from "@/components/theme/modeToggle";
import { CartDrawer } from "@/components/drawer/cartDrawer";

export default function Navbar() {
  return (
    <>
      <div className="py-6">
        <div className="flex items-center justify-between">
          <h3 className="scroll-m-20 text-[26px] font-semibold tracking-tight">
            Pokemon market
          </h3>

          <div className="flex justify-center items-center gap-2">
            <ModeToggle />
            <CartDrawer />
          </div>
        </div>
      </div>
      <hr className="border-1 border-underline" />
    </>
  );
}
