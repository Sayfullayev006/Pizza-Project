import logo from "../assets/icons/logo.svg";
import line from "../assets/icons/line.svg";
import { FiShoppingCart } from "react-icons/fi";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PizzaComponent from "./Pizza";

const Menu = () => {
  const OrderProducList = useSelector((state: Array<CategoryType>) => state);
  const [category, setCategory] = useState<Array<CategoryType>>([]);
  const [sortValue, setSortValue] = useState<string>("");
  const [_pizzas, setPizzas] = useState<Array<getDataType>>([]);
  const navigate = useNavigate();

  interface CategoryType {
    id: string;
    title: string;
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

  useEffect(() => {
    axios.get("http://localhost:3000/category").then((res) => {
      setCategory(res.data);
    });
  }, []);

  const handleChangeSort = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    setSortValue(evt.target.value);
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

  return (
    <div className="container">
      <div className="flex items-center justify-between">
        <div className="flex space-x-5">
          <img src={logo} alt="logo" />
          <span>
            <h3 className="font-extrabold text-[24px] leading-[29px] text-[#181818]">
              REACT PIZZA
            </h3>
            <p className="font-normal text-[16px] leading-[19px] text-[#7B7B7B]">
              самая вкусная пицца во вселенной
            </p>
          </span>
        </div>
        <div
          onClick={() => navigate("/korzinka")}
          className="bg-[#FE5F1E] p-5 rounded-[30px] flex items-center space-x-3 text-white"
        >
          <p>520 ₽</p>
          <img src={line} alt="line" />
          <FiShoppingCart />
          <p>{OrderProducList.length}</p>
        </div>
      </div>
      <div className="flex items-center justify-between p-5 rounded-md mt-[81px]">
        <div className="flex items-center space-x-5">
          {category.length > 0 &&
            category.map((item: CategoryType) => (
              <button
                className="px-8 py-4 bg-[#F9F9F9] text-black focus:bg-black focus:text-white rounded-[30px] font-bold text-[16px] leading-[19px]"
                key={item.id}
              >
                {item.title}
              </button>
            ))}
        </div>
        <select
          onChange={handleChangeSort}
          className="bg-[#F9F9F9] p-2 w-[200px]"
        >
          <option value="rating">популярности</option>
          <option value="price">по цене</option>
          <option value="title">по алфавиту</option>
        </select>
      </div>
      <PizzaComponent sortValue={sortValue} />
    </div>
  );
};

export default Menu;
