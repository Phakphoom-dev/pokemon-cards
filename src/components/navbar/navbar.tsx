import { ModeToggle } from "@/components/theme/modeToggle";
import { CartDrawer } from "@/components/drawer/cartDrawer";
import { Input } from "@/components/ui/input";
import { RiSearchLine } from "react-icons/ri";
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";
import { usePokemonCardStore } from "@/stores/pokemonCardStore";

export default function Navbar() {
  const { pokemonCardQuery, setQuery } = usePokemonCardStore();
  const [search, setSearch] = useState<string>("");
  const [debounceValue] = useDebounce(search, 1000);

  useEffect(() => {
    setQuery({
      ...pokemonCardQuery,
      q: debounceValue ? `name:${debounceValue}` : "",
    });
  }, [debounceValue]);

  return (
    <>
      <div className="py-6">
        <div className="flex items-center justify-between">
          <h3 className="scroll-m-20 text-[26px] font-semibold tracking-tight">
            Pokemon market
          </h3>

          <div className="flex justify-center items-center gap-2">
            <div className="relative text-gray-400 focus-within:text-gray-600 block">
              <RiSearchLine className="pointer-events-none fill-white w-4 h-4 absolute top-1/2 transform -translate-y-1/2 left-3" />
              <Input
                name="searchInput"
                id="searchInput"
                placeholder="Search by Name"
                className="pl-8"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </div>
            <CartDrawer />
            <ModeToggle />
          </div>
        </div>
      </div>
      <hr className="border-1 border-underline" />
    </>
  );
}
