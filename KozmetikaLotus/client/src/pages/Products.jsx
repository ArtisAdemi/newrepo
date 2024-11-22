import { useMemo } from "react";
import { Navbar } from "../components";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import ProductList from "../components/ProductList";

const Products = () => {
  const { subCategoryName } = useParams();
  const subCategory = useMemo(() =>
    subCategoryName ? subCategoryName.toLowerCase() : '',
    [subCategoryName]
  );

  return (
    <div>
      <div className="flex w-full justify-center">
        <Navbar />
      </div>
      <div className="w-full flex justify-center">
        <div className="w-[80%] md:flex justify-between p-10 md:ml-[-35px]">
          <div className="flex items-center justify-center">
            <div>
              <h2 className="text-2xl font-bold text-[#292929]">Produktet</h2>
            </div>
            <div className="mt-1 ml-2">
              <FontAwesomeIcon icon={faChevronRight} color="#292929" />
            </div>
            <div className="mt-1 ml-2 text-[#292929]">
              <span>{subCategory}</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <ProductList subCategory={subCategory} key={subCategory} />
      </div>
    </div>
  );
};

export default Products;
