import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IPokemonSet } from "@/interfaces/pokemonCard";
import { cn } from "@/lib/utils";
import { usePokemonCardStore } from "@/stores/pokemonCardStore";
import { convertObjectToParams } from "@/utils/helper";
import React from "react";

interface ISetDropdown {
  sets: IPokemonSet[];
}

export default function SetDropdown({ sets }: ISetDropdown) {
  const { pokemonCardQuery, setQuery } = usePokemonCardStore();

  return (
    <Select
      onValueChange={(setId: string) => {
        let { queryObject } = pokemonCardQuery;

        const newQueryObject = Object.assign(queryObject, {
          ["set.id"]: setId,
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
        <SelectValue placeholder="Set" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {React.Children.toArray(
            sets.map((set: IPokemonSet) => {
              return <SelectItem value={set.id}>{set.name}</SelectItem>;
            })
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
