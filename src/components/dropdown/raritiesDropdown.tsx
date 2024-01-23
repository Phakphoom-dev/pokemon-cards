import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { usePokemonCardStore } from "@/stores/pokemonCardStore";
import { convertObjectToParams } from "@/utils/helper";
import React from "react";

interface IRaritiesDropdown {
  rarities: string[];
}

export default function RaritiesDropdown({ rarities }: IRaritiesDropdown) {
  const { pokemonCardQuery, setQuery } = usePokemonCardStore();

  return (
    <Select
      onValueChange={(rarity: string) => {
        let { queryObject } = pokemonCardQuery;

        const newQueryObject = Object.assign(queryObject, {
          rarity,
        });

        setQuery({
          ...pokemonCardQuery,
          queryObject: newQueryObject,
          page: 1,
          q: convertObjectToParams(newQueryObject),
        });
      }}
    >
      <SelectTrigger className={cn("rounded-[8px] min-w-24 max-w-24")}>
        <SelectValue placeholder="Rarity" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {React.Children.toArray(
            rarities.map((rarity: string) => {
              return <SelectItem value={rarity}>{rarity}</SelectItem>;
            })
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
