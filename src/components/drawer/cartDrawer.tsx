import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useCartStore } from "@/stores/cartStore";
import CartItem from "@/components/cart/cartItem";
import { ICartItem } from "@/interfaces/cart";
import { cn } from "@/lib/utils";
import * as CurrencyFormat from "react-currency-format";
import { FiShoppingBag } from "react-icons/fi";
import { HiOutlineXMark } from "react-icons/hi2";

export function CartDrawer() {
  const { cartItems, clearCart } = useCartStore();

  const calTotal = (type: "totalPrice" | "totalCard"): JSX.Element => {
    const total = cartItems.reduce((acc, cartItem) => {
      if (type === "totalPrice") {
        acc += cartItem.price * cartItem.quantity;
      } else if (type === "totalCard") {
        acc += cartItem.quantity;
      }

      return acc;
    }, 0);

    return (
      <CurrencyFormat
        value={total}
        displayType={"text"}
        thousandSeparator={true}
        decimalScale={2}
        prefix={type === "totalPrice" ? "$ " : ""}
      />
    );
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="neon" size="icon">
          <FiShoppingBag className="w-4 h-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto md:w-96 xs:w-screen">
          <DrawerHeader>
            <DrawerTitle className="flex justify-between items-center my-1">
              <div>
                <div className="scroll-m-20 text-[26px] font-semibold tracking-tight">
                  Cart
                </div>

                <div
                  className="text-[12px] font-normal underline mt-4 text-light-gray hover:cursor-pointer"
                  onClick={() => clearCart()}
                >
                  Clear all
                </div>
              </div>

              <DrawerClose asChild>
                <Button variant="neon" size="icon">
                  <HiOutlineXMark className="w-5 h-5" />
                </Button>
              </DrawerClose>
            </DrawerTitle>
          </DrawerHeader>

          <div className="px-4 flex gap-4 justify-between mr-2">
            <div className="flex gap-4">
              <div>Item</div>
              <div>Qty</div>
            </div>

            <div>Price</div>
          </div>

          <div className="px-4 py-2">
            <hr className="border-1 border-underline" />
          </div>

          <div className="p-4 pb-0 max-h-[70vh] overflow-y-scroll">
            <div className="flex flex-col gap-2 justify-start">
              {cartItems.map((cartItem: ICartItem) => {
                return <CartItem cartItem={cartItem} key={cartItem.id} />;
              })}
            </div>
          </div>

          <DrawerFooter>
            <div className="flex justify-between">
              <span>Total card amount</span>
              <span>{calTotal("totalCard")}</span>
            </div>

            <div className="flex justify-between">
              <span>Total price</span>
              <span>{calTotal("totalPrice")}</span>
            </div>

            <Button variant="neon">Continue to Payment</Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
