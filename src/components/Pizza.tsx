import { Segmented } from "antd";
import { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { getOrderProducts } from "../store/reducer";
import axios from "axios";

interface Pizza {
  id: string;
  imageUrl: string;
  title: string;
  types?: string[];
  sizes?: number[];
  price: number;
  sortValue: string;
  setTypeValue: (value: string) => void;
  setSizeValue: (value: string) => void;
  onClickBtnOrder: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

interface getDataType {
  id: string;
  imgUrl: string;
  title: string;
  type: string;
  size: string;
  count: number;
  price: number;
}

// interface RootState {
//   orderList: Pizza[];
// }

interface PizzaComponentProps {
  sortValue: string;
}

const PizzaComponent: React.FC<PizzaComponentProps> = ({ sortValue }) => {
  // const orderProductList = useSelector((state: RootState) => state.orderList);
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [error, _setError] = useState<string | null>(null);
  const [typeValue, setTypeValue] = useState("тонкое");
  const [sizeValue, setSizeValue] = useState("26 см.");
  const dispatch = useDispatch();

  const onClickBtnOrder = (evt: React.MouseEvent<HTMLButtonElement>) => {
    const clickedId = (evt.target as HTMLButtonElement).id;
    const orderClickData = pizzas.find((item) => item.id === clickedId);

    if (orderClickData) {
      const data: getDataType = {
        id: orderClickData.id,
        imgUrl: orderClickData.imageUrl,
        title: orderClickData.title,
        type: typeValue,
        size: sizeValue,
        count: 1,
        price: orderClickData.price,
      };
      dispatch(getOrderProducts(data));
    }
  };
  useEffect(() => {
    axios
      .get(`http://localhost:3000/pizza?_sort=${sortValue}`)
      .then((res) => {
        setPizzas(res.data);
      })
      .catch((error) => {
        console.error("Error fetching sorted pizzas:", error);
      });
  }, [sortValue]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Все пиццы</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pizzas.map(({ id, imageUrl, price, title }) => (
          <div
            key={id}
            className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <img
              src={imageUrl}
              alt={title}
              className="w-full object-cover mb-4 rounded-lg "
            />
            <h2 className="mb-2 text-center font-extrabold text-[20px] pt-[11px]">
              {title}
            </h2>
            <Segmented<string>
              options={["тонкое", "традиционное"]}
              onChange={(value) => {
                setTypeValue(value);
              }}
              className="w-full mt-[22px]"
            />

            <Segmented<string>
              options={["26 см.", "30 см.", "40 см."]}
              onChange={(value) => {
                setSizeValue(value);
              }}
              className="w-full mt-[7px]"
            />

            <div className="flex justify-between items-center mt-[24px]">
              <p className="font-bold text-[22px] leading-[26px] text-black">
                от {price} ₽
              </p>
              <button
                id={id}
                onClick={onClickBtnOrder}
                className="dabavit font-bold text-[16px] leading-[19px] rounded-[30px] text-[#EB5A1E] transition-colors duration-200 hover:bg-[#FE5F1E] hover:text-white"
              >
                + Добавить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PizzaComponent;
