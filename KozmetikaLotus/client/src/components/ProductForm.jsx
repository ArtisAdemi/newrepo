import React, { useEffect, useState } from "react";
import CategoryService from "../services/Categories";
import ProductService from "../services/Products";
import Swal from "sweetalert2";

const ProductFormModal = ({ closeModal, product, handleReload }) => {
  const [formData, setFormData] = useState({
    title: product?.title || "",
    shortDescription: product?.shortDescription || "",
    longDescription: product?.longDescription || "",
    inStock: product?.inStock || false,
    price: product?.price || "",
    brandName: "",
    subCategoryId: 0, // Changed from subCategoryIds to subCategoryId
    images: [],
  });
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");

  useEffect(() => {
    const fetchBrands = async () => {
      await ProductService.getBrands().then((brands) => {
        setBrands(brands);
        setSelectedBrand(brands[0]?.name);
      });
    };
    const fetchCategories = async () => {
      const result = await CategoryService.getCategories();
      if (result) {
        setCategories(result);
        const subCategoriesData = await CategoryService.getSubcategories(
          result[0].id
        ).then((subCategories) => {
          setSubCategories(subCategories);
        });
      } else {
        console.error("Unexpected response structure:", result);
        setCategories([]); // Fallback to ensure state remains valid
      }
    };
    fetchBrands();
    fetchCategories();
  }, []);

  useEffect(() => {
    // Disable scroll on the body when the modal is open
    document.body.style.overflow = "hidden";

    return () => {
      // Re-enable scroll on the body when the modal is closed
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked }); // Use checked for checkboxes
    } else {
      setFormData({ ...formData, [name]: value }); // Use value for other inputs
    }
  };

  const handleCategorySelect = async (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    const subCategoriesData = await CategoryService.getSubcategories(
      categoryId
    );
    setSubCategories(subCategoriesData);
  };

  const handleBrandSelect = async (e) => {
    const brandName = e.target.value;
    setFormData({ ...formData, brandName: brandName });
    setSelectedBrand(brandName);
  };

  const handleSubCategoryChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, images: Array.from(e.target.files) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { images, ...productData } = formData;

    if (product) {
      await updateProduct(product.id, productData, images).then((res) => {
        Swal.fire({
          title: "Saved!",
          text: "Product was successfully updated.",
          icon: "success",
          confirmButtonText: "Ok",
        });
      });
    } else {
      await ProductService.registerProduct(productData, images).then((res) => {
        if (res) {
          Swal.fire({
            title: "Saved!",
            text: "Product was successfully saved.",
            icon: "success",
            confirmButtonText: "Ok",
          });
          handleReload(); // Trigger reload
        }
      });
    }
    closeModal();
  };

  const updateProduct = async (productId, productData, images) => {
    try {
      const updatedProduct = {
        ...productData,
        price: parseFloat(productData.price),
      };

      const res = await ProductService.updateProduct(
        productId,
        updatedProduct,
        images
      );
    } catch (err) {
      console.error("Error updating product", err);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex justify-center items-center bg-black bg-opacity-50 overflow-auto">
      <div className="bg-white p-5 rounded-lg max-w-lg w-full h-[90%] space-y-4 overflow-auto">
        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-900">Add New Product</h2>
        {/* Content */}
        <div className="md:h-auto md:max-h-[90%] overflow-auto">
          <form className="space-y-3">
            <div>
              <label htmlFor="title" className="text-gray-400 font-semibold">
                Title:
              </label>
              <input
                type="text"
                name="title"
                onChange={handleInputChange}
                placeholder="Write the title here..."
                required
                className="input input-bordered w-full  border-b-gray-500 border-t-0 border-r-0 border-l-0 border-[1px]"
                value={formData.title}
              />
            </div>
            <div>
              <label
                htmlFor="shortDescription"
                className="text-gray-400 font-semibold"
              >
                Short Description:
              </label>
              <textarea
                name="shortDescription"
                onChange={handleInputChange}
                placeholder="Write here..."
                required
                className="textarea textarea-bordered w-full border-b-gray-500 border-t-0 border-r-0 border-l-0 border-[1px]"
                value={formData.shortDescription}
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="longDescription"
                className="text-gray-400 font-semibold"
              >
                Long Description:
              </label>
              <textarea
                name="longDescription"
                onChange={handleInputChange}
                placeholder="Write here..."
                required
                className="textarea textarea-bordered w-full  border-b-gray-500 border-t-0 border-r-0 border-l-0 border-[1px]"
                value={formData.longDescription}
              ></textarea>
            </div>
            <div className="flex flex-col pt-4 ml-2 mt-4">
              <span className="mb-1 md:text-lg font-semibold border-0">
                In Stock
              </span>
              <label className="relative inline-flex items-center cursor-pointer mb-2">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleInputChange}
                />
                <div className="w-11 h-6 bg-gray-200 dark:bg-dark-input rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-0  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
            <div className="flex items-center border border-gray-300 rounded-lg input-bordered w-full">
              <input
                type="number"
                name="price"
                onChange={handleInputChange}
                placeholder="Price"
                required
                className="flex-grow p-2 focus:outline-none"
                value={formData.price} // Ensure only numeric value is in state
              />
              <span className="p-2">€</span>
            </div>
            <p className="text-sm text-center bg-yellow-500 rounded-md font-semibold">
              Warning!
              <br />
              It is important to pick brand, category, subcategory and images!
            </p>
            <div className="pt-3">
              <span className="text-gray-500">Brand</span>
              <select
                onChange={handleBrandSelect}
                name="brandName"
                value={selectedBrand}
                className="select select-bordered w-full"
              >
                {/* Brands */}
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.name}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Categories */}
            <div>
              <span className="text-gray-500">Kategori</span>
              <select
                onChange={handleCategorySelect}
                value={selectedCategory}
                className="select select-bordered w-full"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              {subCategories.length > 0 && (
                <span className="text-gray-500">Nen Kategorite</span>
              )}
              {/* Sub Categories */}
              {subCategories.map((subCategory, index) => (
                <div key={index}>
                  <input
                    type="radio"
                    name="subCategoryId"
                    id={`subCategory-${index}`}
                    value={subCategory.id}
                    onChange={handleSubCategoryChange}
                  />
                  <label htmlFor={`subCategory-${index}`}>
                    {subCategory.name}
                  </label>
                </div>
              ))}
            </div>
            <input
              type="file"
              multiple
              name="images"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer"
            />
            {/* More input fields and submission button */}
          </form>
        </div>
        {/* End Of form */}
        {/* Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={closeModal}
            className="btn btn-outline btn-accent border rounded-lg p-3 bg-[#A3A7FC] text-white hover:opacity-80"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary border rounded-lg py-3 px-6 bg-green-700 text-white hover:opacity-80"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFormModal;
