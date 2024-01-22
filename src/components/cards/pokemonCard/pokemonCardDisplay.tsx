import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IPokemonCard, IViewer } from "@/interfaces/pokemonCard";
import { useLockedBody } from "usehooks-ts";
import { FiShoppingBag } from "react-icons/fi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useCartStore } from "@/stores/cartStore";

interface IPokemonCardDisplay {
  card: IPokemonCard;
}

export default function PokemonCardDisplay({ card }: IPokemonCardDisplay) {
  const { addCart } = useCartStore();
  const [locked, setLocked] = useLockedBody(false, "root");
  const [imageUrl, setImageUrl] = useState<string>("");

  const clearViewer = (): void => {
    setLocked(false);
    setImageUrl("");
  };

  return (
    <>
      <div className="flex flex-col items-center relative">
        <LazyLoadImage
          alt={card.name}
          src={card.images.small}
          className="h-48 hover:cursor-pointer absolute bottom-3/4 
        hover:scale-110 transition duration-500 cursor-pointer object-cover"
          onClick={() => {
            setLocked(true);
            setImageUrl(card.images.large);
          }}
        />
        <Card className="w-full h-48 p-4 flex flex-col justify-end items-center gap-2">
          <div className="flex flex-col justify-center items-center text-center min-h-12 mt-6">
            {card.name}
          </div>
          <div className="text-light-gray truncate">
            <span className="flex items-center gap-2">
              $ {card.cardmarket?.prices.averageSellPrice ?? 0}{" "}
              <div className="w-1 h-1 bg-underline rounded-full"></div>{" "}
              {card.set.total > 0 ? `${card.set.total} Cards` : "Out of stock"}
            </span>
          </div>

          <Button
            className="w-full rounded-[0.5rem] flex gap-2"
            disabled={card.set.total <= 0}
            onClick={() => {
              addCart(card);
            }}
          >
            <FiShoppingBag />
            <span>Add to cart</span>
          </Button>
        </Card>
      </div>

      {imageUrl && locked ? (
        <Viewer url={imageUrl} onClose={clearViewer} />
      ) : null}
    </>
  );
}

export function Viewer({ url, onClose }: IViewer) {
  const keydown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", keydown);

    return () => {
      window.removeEventListener("keydown", keydown);
    };
  }, []);

  return (
    <div
      className="absolute z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-overlay bg-opacity-70 overscroll-none transition-opacity"></div>

      <div
        className="fixed inset-0 z-10 w-screen overflow-y-auto"
        onClick={() => {
          onClose();
        }}
      >
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <img className="z-10" src={url} />
          </div>
        </div>
      </div>
    </div>
  );
}
