import "./styles.css";
import { useEffect, useState } from "react";
export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProductData = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const data = await res.json();
    setProducts(data.products);
    setTotalPages(data.total);
  };

  const setPageNumber = (pageNumber) => {
    if (pageNumber <= 0 || pageNumber > totalPages / 10) return;
    setPage(pageNumber);
  };
  console.log(products);

  useEffect(() => {
    fetchProductData();
  }, [page]);

  return (
    <div className="App">
      <div className="products__list">
        {products.length > 0 &&
          products.map((product) => (
            <div className="product__single" key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <span> {product.title} </span>
            </div>
          ))}
      </div>

      <div className="pagination">
        <span
          className={
            ("pagination__prev", page === 1 ? "pagination__hidden" : "")
          }
          onClick={() => setPageNumber(page - 1)}
        >
          {" "}
          ◀️{" "}
        </span>
        {Array(totalPages / 10)
          .fill(1)
          .map((_, idx) => (
            <span
              key={idx + 1}
              className={
                ("pagination__page",
                page === idx + 1 ? "pagination__page--selected" : "")
              }
              onClick={() => {
                setPageNumber(idx + 1);
              }}
            >
              {idx + 1}
            </span>
          ))}
        <span
          className={
            ("pagination__prev",
            page === totalPages / 10 ? "pagination__hidden" : "")
          }
          onClick={() => setPageNumber(page + 1)}
        >
          {" "}
          ▶️
        </span>
      </div>
    </div>
  );
}
