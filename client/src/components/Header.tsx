import { OrderField } from "../constants/interfaces";

interface Props {
  order: OrderField;
  changeOrder: (newOrder: OrderField) => void;
}

const Header = ({ changeOrder, order }: Props) => {
  return (
    <header className="px-2 bg-white">
      <img src="/logo-full.png" alt="logo" className="h-9 mx-auto my-4" />
      <div className="flex sticky top-0 z-20 items-center w-full justify-between">
        <button
          className={`w-full font-bold border-b-2 capitalize px-3 py-4 text-sm ${
            order === "rating" ? "border-black/30" : "border-black/0 opacity-50"
          } `}
          onClick={() => changeOrder("rating")}
        >
          <img src="/star.svg" alt="" /> most rated
        </button>
        <button
          className={`w-full font-bold border-b-2 capitalize px-3 py-4 text-sm ${
            order === "views" ? "border-black/30" : "border-black/0 opacity-50"
          } `}
          onClick={() => changeOrder("views")}
        >
          Views
        </button>
      </div>
    </header>
  );
};

export default Header;
