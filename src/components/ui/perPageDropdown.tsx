import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DEFAULT_PER_PAGE } from "@/constants/pokemonCard";

interface IPerPageDropdown {
  handleOnChange: (perPage: number) => void;
}

export function PerPageDropdown({ handleOnChange }: IPerPageDropdown) {
  return (
    <div className="flex justify-center items-center gap-4">
      <span className="min-w-28 text-nowrap">Items per page</span>
      <Select
        onValueChange={(page: string) => {
          handleOnChange(+page);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder={DEFAULT_PER_PAGE[0]} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {DEFAULT_PER_PAGE.map((perPage: number) => {
              return (
                <SelectItem value={perPage.toString()} key={perPage}>
                  {perPage}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
