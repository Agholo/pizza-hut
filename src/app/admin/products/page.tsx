"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import { ImageDown, LoaderCircle } from "lucide-react";
import styles from "../admin.module.css";

interface Product {
  name: string;
  price: string;
  image?: string;
  _id?: string;
  category: string;
}

type Category = { name: string };

export default function PageProduct() {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const productsResponse = await axios.get("/api/product");
        setProducts(productsResponse.data);
        const categoriesResponse = await axios.get("/api/category");
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/product", { name, price, image, category });
      setProducts((prevProducts: Product[]) => [
        ...prevProducts,
        { name, price, image, category }
      ]);
      setName("");
      setPrice("");
      setImage("");
      setCategory("");
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.input}
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />
        <input
          type="number"
          className={styles.input}
          placeholder="Product Price"
          value={price}
          min="0"
          onChange={(e) => setPrice(e.target.value)}
          disabled={loading}
        />
        <select
          className={styles.input}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={loading}
        >
          <option value="" selected={true} unselectable={"on"}>Select Category</option>
          {categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <label className={styles.photo}>
          <input
            type="file"
            style={{ display: "none" }}
            accept=".jpg,.png,.jpeg"
            onChange={handleImageChange}
            disabled={loading}
          />
          {image ? (
            <img
              src={image}
              alt="Product"
              style={{ height: "125px", width: "125px" }}
            />
          ) : (
            <ImageDown />
          )}
        </label>
        <button type="submit" className={styles.button} disabled={loading}>
          {loading && <LoaderCircle className={styles.loader} />}
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
      <table
        style={{ marginTop: "45px", border: "1px solid black", borderCollapse: "collapse" }}
      >
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td style={{ border: "1px solid black" }}>
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                )}
              </td>
              <td style={{ paddingInline: "25px", border: "1px solid black" }}>
                {product.name}
              </td>
              <td style={{ paddingInline: "25px", border: "1px solid black" }}>
                {product.price}$
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
