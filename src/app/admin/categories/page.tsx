"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import { ImageDown, LoaderCircle } from "lucide-react";
import styles from "../admin.module.css";
import ComponentCategory from "../../../../components/ComponentCategory";

interface ICategory {
  name: string;
  image: string;
	_id?: string
}

export default function PageProduct() {
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
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
      await axios.post("/api/category", { name, image });
			setCategories((prevProducts: ICategory[]) => {
				return [
					...prevProducts,
					{ name, image }
				];
			});
      setName("");
      setImage("");
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
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />
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
			<div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", marginInline: "auto", marginBlock: "50px", gap: "25px"}}>
				{categories.map(category => (
					<ComponentCategory height="250" width="200" image={category.image} name={category.name}/>
				))}
			</div>
    </div>
  );
}
