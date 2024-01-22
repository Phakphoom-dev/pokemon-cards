import PokemonCardDisplay from "@/components/cards/pokemonCard/pokemonCardDisplay";
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
import { DEFAULT_PAGE_SIZE } from "@/constants/pokemonCard";
import {
  IPokemonCard,
  IPokemonCardQuery,
  IPokemonCardResponse,
} from "@/interfaces/pokemonCard";
import { cn } from "@/lib/utils";
import instance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function Index() {
  const [pokemonCardFilters, setPokemonCardFilters] =
    useState<IPokemonCardQuery>({
      q: "",
      page: 1,
      pageSize: DEFAULT_PAGE_SIZE,
    });
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
      instance.get("", { params: pokemonCardFilters }).then((res) => res.data),
  });

  if (error) return "An error has occurred: " + error.message;

  useEffect(() => {
    if (pokemonCardResponse) {
      setLastPage(
        Math.ceil(pokemonCardResponse.totalCount / pokemonCardFilters.pageSize)
      );
    }
  }, [pokemonCardResponse]);

  useEffect(() => {
    refetch();
    scrollToTop();
  }, [pokemonCardFilters]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const displayLoading = (): JSX.Element[] => {
    return Array.from(Array(18).keys()).map((v: number) => (
      <CardSkeleton key={v} />
    ));
  };

  const handlePageChange = (page: number): void => {
    setPokemonCardFilters((prev) => {
      return {
        ...prev,
        page,
      };
    });
  };

  return (
    <div>
      <h4 className="scroll-m-20 text-[18px] font-semibold tracking-tight">
        Choose Card
      </h4>

      <div
        className={cn(
          "mb-6 grid grid-cols-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6 gap-4",
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

      <Pagination className="mb-10 flex justify-center items-center">
        <div className={cn(pokemonCardFilters.page > 1 ? "mr-1" : "mr-4")}>
          <PerPageDropdown
            handleOnChange={(perPage: number) => {
              if (pokemonCardFilters.pageSize !== perPage) {
                setPokemonCardFilters((prev) => {
                  return {
                    ...prev,
                    page: 1,
                    pageSize: perPage,
                  };
                });
              }
            }}
          />
        </div>

        <PaginationContent>
          {pokemonCardFilters.page !== 1 && (
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
                    handlePageChange(pokemonCardFilters.page - 1);
                  }}
                />
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            {pokemonCardFilters.page} of {isFetching ? "..." : lastPage}
          </PaginationItem>

          {pokemonCardFilters.page !== lastPage && (
            <>
              <PaginationItem>
                <PaginationNext
                  size="icon"
                  onClick={() => {
                    handlePageChange(pokemonCardFilters.page + 1);
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
