import React from "react";
import { phcartItems } from "../../Context/Context";
import { Stack } from "@mui/material";
import ProductCard from "../../Components/ProductCard/ProductCard.jsx";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import { GlobalStateContext } from "../../Context/Context";
import { useContext } from "react";
import { preworkoutArr } from "../../utils/DummyData.jsx";
import { useEffect } from "react";
import useFetch from "../../utils/useFetch.jsx";

//pretteir-ignore

const ProductsPage = () => {
  const [open, setOpen] = useState(false);

  const category = useParams();

  const { data, loading, error } = useFetch(
    "http://localhost:8800/api/product/"
  );

  useEffect(() => {
    window.scroll({
      top: 0,
    });
  }, [data]);

  return (
    <>
      <Stack alignItems="center" sx={{ fontSize: "20px", color: "#4c7abb" }}>
        <h1>{category.category.toUpperCase()}</h1>
      </Stack>
      {loading ? (
        "Loading..."
      ) : (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          useFlexGap
          spacing={7}
          sx={{ width: "100%", padding: "0px 50px" }}
        >
          {category.category === "preworkout" ||
          category.category === "whey-protein" ||
          category.category === "accessories" ||
          category.category === "kettlebells" ||
          category.category === "dumbells" ||
          category.category === "resistant-bands"
            ? data
                ?.filter((item) => item.category === category.category)
                .map((item) => <ProductCard key={item.id} props={item} />)
            : category.category === "Equipment"
            ? data
                ?.filter((item) => item.productType === "Equipment")
                .map((item) => <ProductCard key={item.id} props={item} />)
            : category.category === "Supplement"
            ? data
                ?.filter((item) => item.productType === "Supplement")
                .map((item) => <ProductCard key={item.id} props={item} />)
            : "data not found"}
        </Stack>
      )}
    </>
  );
};
export default ProductsPage;
