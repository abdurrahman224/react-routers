import React, { useEffect, useState } from "react";
import Category from "./Category";


const Hero = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/JSON/Dummy.json")
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>loading...</div>;

  return <div className="py-20">
  
 <Category data={data}/>
  
  
  
  </div>;
};

export default Hero;
