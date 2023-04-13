import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "../home/Home.css";

const Home = () => {
    const [data, setData] = useState(null);
    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/products").then((res) => {
            setData(res.data)
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    return (
        <>
            <h1 style={{color:"red",backgroundColor:"black"}}>See All Uploaded Products Here</h1>
            {
                data ? (
                    data.map((sdata, i) => {
                        return (
                            <div key={i} style={{backgroundColor:"#f8f8", padding:"0% 5%", margin:"1% 20%",border:"1px solid black"}}>
                                <h2 style={{color:'black',fontSize:"1.8rem"}}>{sdata.name}</h2>
                                <details style={{color:'blue',fontSize:"1.1rem"}}>
                                    <p>
                                        {sdata.description}
                                    </p>
                                </details>
                                {
                                    sdata.images?.map((ssdata, i) => {
                                        return (
                                            <>
                                                <img src={ssdata} alt={`${sdata.name}${i}`} />
                                            </>
                                        )
                                    })
                                }
                                <h3 style={{color:'black',fontSize:"1.8rem", backgroundColor:"white", display:"block", textAlign:"center"}}>{sdata.price} {sdata.currency}</h3>
                            </div>
                        )
                    })
                )
                    :
                    (
                        <h1 style={{color:"blue", textAlign:"center", fontSize:"10rem"}}>
                            Loading....
                        </h1>
                    )
            }
        </>
    )
}

export default Home
