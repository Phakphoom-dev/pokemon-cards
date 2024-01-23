import { CartDrawer } from "@/components/drawer/cartDrawer";
import { Input } from "@/components/ui/input";
import { usePokemonCardStore } from "@/stores/pokemonCardStore";
import { convertObjectToParams } from "@/utils/helper";
import { useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { useDebounce } from "use-debounce";

export default function Navbar() {
  const { pokemonCardQuery, setQuery } = usePokemonCardStore();
  const [search, setSearch] = useState<string>("");
  const [debounceValue] = useDebounce(search, 1000);

  useEffect(() => {
    let { queryObject } = pokemonCardQuery;

    const newQueryObject = Object.assign(queryObject, {
      name: debounceValue,
    });

    setQuery({
      ...pokemonCardQuery,
      queryObject: newQueryObject,
      page: 1,
      q: convertObjectToParams(newQueryObject),
    });
  }, [debounceValue]);

  return (
    <>
      <div className="xs:block md:flex flex-wrap items-center justify-between py-6">
        <h3 className="xs:flex xs:justify-between scroll-m-20 text-[26px] font-semibold tracking-tight">
          Pokemon market
          <div className="xs:block md:hidden space-x-2">
            <CartDrawer />
          </div>
        </h3>

        <div className="xs:my-2 xs:block md:flex justify-center items-center gap-2">
          <div className="relative text-gray-400 focus-within:text-gray-600 block sm:w-full">
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

          <div className="xs:hidden md:block space-x-2">
            <CartDrawer />
          </div>
        </div>
      </div>
      <hr className="border-1 border-underline" />
    </>
  );
}
