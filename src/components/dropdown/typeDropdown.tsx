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

interface ITypeDropdown {
  types: string[];
}

export default function TypeDropdown({ types }: ITypeDropdown) {
  const { pokemonCardQuery, setQuery } = usePokemonCardStore();

  return (
    <Select
      onValueChange={(type: string) => {
        let { queryObject } = pokemonCardQuery;

        const newQueryObject = Object.assign(queryObject, {
          types: type,
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
        <SelectValue placeholder="Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {React.Children.toArray(
            types.map((type: string) => {
              return <SelectItem value={type}>{type}</SelectItem>;
            })
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
