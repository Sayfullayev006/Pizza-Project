import { useDispatch, useSelector } from "react-redux";
import { SlBasket } from "react-icons/sl";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { decOrder, incOrder } from "../store/reducer";

import logo from "../assets/icons/logo.svg";
import shop from "../assets/images/shopping-cart-colour.png";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

const KorzinkaPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  interface getDataType {
    id: string;
    imgUrl: string;
    title: string;
    type: string;
    size: string;
    count: number;
    price: number;
  }

  const orderList: Array<getDataType> = useSelector(
    (state: getDataType[]) => state
  );

  function getTotalPrice() {
    return orderList.reduce((sum: number, value: getDataType) => {
      return (sum += value.price * value.count);
    }, 0);
  }
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
              Самая реактивная пицца
            </p>
          </span>
        </div>
      </div>
      <div className="max-w-[820px] w-full m-auto">
        <div>
          <div className="flex items-center justify-between gap-x-[482px] mt-[135px]">
            <span className="flex items-center space-x-[17px]">
              <SlBasket className="text-[30px]" />
              <p className="font-bold text-[32px] leading=[38px]">Корзина</p>
            </span>
            <span className="flex items-center space-x-2 opacity-40">
              <RiDeleteBinLine className="text-[18px]" />
              <p className="font-normal text-[16px] leading-[19px]">
                Очистить корзину
              </p>
            </span>
          </div>
          {orderList.length > 0 ? (
            orderList.map((item: getDataType) => (
              <div key={item.id}>
                <div
                  className="flex items-center justify-between mt-[60px]"
                  key={item.id}
                >
                  <div className="flex items-center space-x-[15px]">
                    <img
                      src={item.imgUrl}
                      alt={item.title}
                      width={80}
                      height={80}
                    />
                    <span className="">
                      <h2 className="font-bold text-[22px] leading-[26px]">
                        {item.title}
                      </h2>
                      <p className="font-normal text-[18px] leading-[21px] text-[#8D8D8D] pt-1">
                        {item.type} - {item.size}
                      </p>
                    </span>
                  </div>
                  <span className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        item.count != 1 && dispatch(decOrder(item.id))
                      }
                      className="flex items-center justify-center w-[32px] h-[32px] rounded-[50%] border-[3px] border-[#FE5F1E]"
                    >
                      <MinusOutlined />
                    </button>
                    <p>{item.count}</p>
                    <button
                      onClick={() => dispatch(incOrder(item.id))}
                      className="flex items-center justify-center w-[32px] h-[32px] rounded-[50%] border-[3px] border-[#FE5F1E]"
                    >
                      <PlusOutlined />
                    </button>
                  </span>
                  <p>{item.price * item.count} ₽</p>
                  <IoCloseCircleOutline className="w-[32px] h-[32px] opacity-20" />
                </div>
              </div>
            ))
          ) : (
            <div className="w-[547px] h-[523px] m-auto text-center mt-[100px]">
              <h2 className="font-bold text-[32px] leading-[38px]">
                Корзина пустая{" "}
              </h2>
              <p className="font-normal text-[18px] leading-[28px] text-[#777777] pt-[10px] pb-[47px]">
                Вероятней всего, вы не заказывали ещё пиццу. Для того, чтобы
                заказать пиццу, перейди на главную страницу.
              </p>
              <img
                src={shop}
                alt="shop"
                className="w-[300px] h-[255px] m-auto"
              />
              <button
                onClick={() => navigate(-1)}
                className="w-[210px] h-[46px] bg-black text-white font-bold text-[16px] mt-[74px] rounded-[30px]"
              >
                Вернуться назад
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between mt-[60px]">
          <p>Всего пицц: {orderList.length} шт.</p>
          <p>Сумма заказа: {getTotalPrice()} ₽</p>
        </div>
        <div className="flex items-center justify-between mt-[60px]">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center p-4 w-[211px] h-[55px] rounded-[30px] border-[2px] border-[#CACACA] opacity-40 font-normal text-[16px] leading-[19px]"
          >
            <MdOutlineKeyboardArrowLeft className="w-[32px] h-[24px]" />
            Вернуться назад
          </button>
          <button className="w-[211px] h-[55px] rounded-[30px] font-bold text-[16px] leading-[19px] bg-[#FE5F1E] text-white">
            Оплатить сейчас
          </button>
        </div>
      </div>
    </div>
  );
};

export default KorzinkaPage;
