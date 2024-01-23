import PokemonCardDisplay from "@/components/cards/pokemonCard/pokemonCardDisplay";
import RaritiesDropdown from "@/components/dropdown/raritiesDropdown";
import SetDropdown from "@/components/dropdown/setDropdown";
import TypeDropdown from "@/components/dropdown/typeDropdown";
import { CardSkeleton } from "@/components/skeletons/cardSkeleton";
import {
  Pagination,
  PaginationContent,
  PaginationFirstPage,
  PaginationItem,
  PaginationLastPage,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PerPageDropdown } from "@/components/ui/perPageDropdown";
import { useMasterData } from "@/hooks/useMasterData";
import { IPokemonCard, IPokemonCardResponse } from "@/interfaces/pokemonCard";
import { cn } from "@/lib/utils";
import { usePokemonCardStore } from "@/stores/pokemonCardStore";
import instance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function Index() {
  const { masterData } = useMasterData();
  const { pokemonCardQuery, setQuery } = usePokemonCardStore();
  const [lastPage, setLastPage] = useState<number>(0);

  const {
    isPending,
    error,
    data: pokemonCardResponse,
    isFetching,
    refetch,
  } = useQuery<IPokemonCardResponse>({
    queryKey: ["pokemonCards"],
    queryFn: () =>
      instance
        .get("/cards", { params: pokemonCardQuery })
        .then((res) => res.data),
  });

  if (error) return "An error has occurred: " + error.message;

  useEffect(() => {
    if (pokemonCardResponse) {
      setLastPage(
        Math.ceil(pokemonCardResponse.totalCount / pokemonCardQuery.pageSize)
      );
    }
  }, [pokemonCardResponse]);

  useEffect(() => {
    refetch();
    scrollToTop();
  }, [pokemonCardQuery]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const displayLoading = (): JSX.Element[] => {
    return Array.from(Array(18).keys()).map((v: number) => (
      <CardSkeleton key={v} />
    ));
  };

  const handlePageChange = (page: number): void => {
    setQuery({ ...pokemonCardQuery, page });
  };

  return (
    <div>
      <div className="flex flex-wrap gap-y-4 justify-between items-center">
        <h4 className="scroll-m-20 text-[18px] font-semibold tracking-tight">
          Choose Card
        </h4>

        <div className="flex flex-wrap gap-2">
          {masterData?.rarities && (
            <RaritiesDropdown rarities={masterData.rarities} />
          )}

          {masterData?.sets && <SetDropdown sets={masterData.sets} />}
          {masterData?.types && <TypeDropdown types={masterData.types} />}
        </div>
      </div>

      <div
        className={cn(
          "mb-6 grid grid-cols-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4",
          !isFetching ? "mt-44" : "mt-6",
          !isFetching ? "gap-y-52" : "gap-y-6"
        )}
      >
        {isFetching || isPending ? (
          displayLoading()
        ) : (
          <>
            {pokemonCardResponse.data.map((card: IPokemonCard) => {
              return <PokemonCardDisplay card={card} key={card.id} />;
            })}
          </>
        )}
      </div>

      <Pagination className="mb-10 flex justify-center items-center flex-wrap">
        <div className={cn(pokemonCardQuery.page > 1 ? "mr-1" : "mr-4")}>
          <PerPageDropdown
            handleOnChange={(pageSize: number) => {
              if (pokemonCardQuery.pageSize !== pageSize) {
                setQuery({ ...pokemonCardQuery, page: 1, pageSize });
              }
            }}
          />
        </div>

        <PaginationContent>
          {pokemonCardQuery.page !== 1 && (
            <>
              <PaginationItem>
                <PaginationFirstPage
                  size="icon"
                  onClick={() => {
                    handlePageChange(1);
                  }}
                />
              </PaginationItem>

              <PaginationItem>
                <PaginationPrevious
                  size="icon"
                  onClick={() => {
                    handlePageChange(pokemonCardQuery.page - 1);
                  }}
                />
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            {pokemonCardQuery.page} of {isFetching ? "..." : lastPage}
          </PaginationItem>

          {pokemonCardQuery.page !== lastPage && (
            <>
              <PaginationItem>
                <PaginationNext
                  size="icon"
                  onClick={() => {
                    handlePageChange(pokemonCardQuery.page + 1);
                  }}
                />
              </PaginationItem>

              <PaginationItem>
                <PaginationLastPage
                  size="icon"
                  onClick={() => {
                    handlePageChange(lastPage);
                  }}
                />
              </PaginationItem>
            </>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
