import React, { useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import Follower from "./Follower";
function App() {
  const { loading, data } = useFetch();
  const [page, setPage] = useState(0);
  const [followers, setFollowers] = useState([]);
  const nextPage = () => {
    setPage((oldPage) => {
      let next = oldPage + 1;
      if (next > data.length - 1) {
        next = 0;
      }
      return next;
    });
  };
  const prevPage = () => {
    setPage((oldPage) => {
      let prev = oldPage - 1;
      if (prev < 0) {
        prev = data.length - 1;
      }
      return prev;
    });
  };
  useEffect(() => {
    if (loading) return;
    setFollowers(data[page]);
  }, [loading, page]);
  return (
    <main>
      <div className="section-title">
        <h1>{loading ? "...Loading" : "pagination"}</h1>
        <div className="underline"></div>
      </div>
      <section className="followers">
        <div className="container">
          {followers.map((follower) => {
            return <Follower key={follower.id} {...follower} />;
          })}
        </div>
        {!loading && (
          <div className="btn-container">
            <button className="prev-btn" onClick={prevPage}>
              Prev
            </button>
            {data.map((item, index) => {
              return (
                <button
                  key={index}
                  onClick={() => setPage(index)}
                  className={`page-btn ${index === page ? "active-btn" : null}`}
                >
                  {index + 1}
                </button>
              );
            })}
            <button className="next-btn" onClick={nextPage}>
              Next
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
