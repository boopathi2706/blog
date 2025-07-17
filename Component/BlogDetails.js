"use client"


import { useSearchParams } from "next/navigation";
import React from "react";
import BlogBox from "./BlogBox";


import { useEffect, useState } from "react";



const BlogDetails = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    import("@/public/dataSet.json")
      .then((mod) => {
        if (isMounted) {
          setData(Array.isArray(mod.default) ? mod.default : mod);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div className="details_area"><h2>Loading...</h2></div>;
  }

  let item = null;
  if (id && Array.isArray(data)) {
    item = data.find((item) => String(item.episode_id) === String(id));
  }

  return (
    <div className="details_area">
      {item ? (
        <BlogBox
          episode_id={item.episode_id}
          episode_name={item.episode_name}
          episode_image={item.episode_image}
          description={item.description}
          duration={item.duration}
          release_date={item.release_date}
          router=""
        />
      ) : (
        <h2>No episode found for ID {id}</h2>
      )}
    </div>
  );
};

export default BlogDetails;
