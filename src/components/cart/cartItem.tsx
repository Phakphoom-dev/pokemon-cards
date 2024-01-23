import { ICartItem } from "@/interfaces/cart";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";
import CurrencyFormat from "react-currency-format";
import { FaTrash } from "react-icons/fa";

type CartItemProps = {
  cartItem: ICartItem;
};

export default function CartItem({ cartItem }: CartItemProps) {
  const { increaseCart, decreaseCart, removeCart } = useCartStore();

  const calPrice = (): string => {
    return (cartItem.price * cartItem.quantity).toFixed(2);
  };

  return (
    <div className="my-1">
      <div className="flex justify-between gap-4 mb-2">
        <div className="flex gap-2">
          <LazyLoadImage
            alt={cartItem.name}
            src={cartItem.image}
            className="h-16 hover:cursor-pointer bottom-3/4 
        hover:scale-110 transition duration-500 cursor-pointer object-cover"
          />

          <div>
            <div className="text-ellipsis">{cartItem.name}</div>

            <div className="text-light-gray">
              <CurrencyFormat
                value={cartItem.price}
                displayType={"text"}
                thousandSeparator={true}
                decimalScale={2}
                prefix={"$ "}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <span>$ {calPrice()}</span>
          <FaTrash
            onClick={() => {
              removeCart(cartItem.id);
            }}
            className="ml-auto mt-1 fill-light-red hover:cursor-pointer"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          className={cn("rounded-[8px]")}
          onClick={() => decreaseCart(cartItem.id)}
        >
          {"-"}
        </Button>
        <Button
          className={cn(
            "w-full rounded-[8px] hover:cursor-default hover:shadow-none hover:bg-underline/10"
          )}
        >
          {cartItem.quantity}
        </Button>
        <Button
          className={cn("rounded-[8px]")}
          onClick={() => increaseCart(cartItem.id)}
        >
          {"+"}
        </Button>
      </div>
    </div>
  );
}
