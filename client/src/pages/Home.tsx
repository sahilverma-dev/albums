import { useEffect, useState } from "react";
import { OrderField, Picture } from "../constants/interfaces";
import Grid from "../components/Grid";
import { pictures } from "../constants/images";
import Header from "../components/Header";
import Details from "../components/Detail";
import { AnimatePresence } from "framer-motion";
import Loader from "../components/Loader";

const Home = () => {
  const [images, setImages] = useState<Picture[]>(pictures);
  const [order, setOrder] = useState<OrderField>("rating");
  const [selected, setSelected] = useState<Picture | null>(null);

  const changeOrder = (order: OrderField) => {
    console.log(order);
    setOrder(order);
    if (order === "rating")
      setImages(pictures.sort((a, b) => a.rating - b.rating));
    else if (order === "views")
      setImages(pictures.sort((a, b) => a.views - b.views));
    else setImages(pictures);
  };

  return (
    <div className="home-screen">
      <Header order={order} changeOrder={changeOrder} />
      {/* <Loader /> */}
      <Grid pictures={images} onPictureClick={setSelected} />
      <AnimatePresence>
        {selected && (
          <Details onClose={() => setSelected(null)} picture={selected} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
