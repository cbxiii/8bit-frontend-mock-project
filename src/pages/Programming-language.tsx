import * as React from "react";
import { createRoot } from "react-dom/client";
import LoadingImage from "../components/LoadingImage";
import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";

interface MiscImage {
    image: string;
}

interface LanguageItem {
    name: string;
    short_description: string;
    images: MiscImage[];
}

const ProgrammingLanguages = () => {
    const [languageData, setLanguageData] = useState([]); 
    const [pageReady, setPageReady] = useState(false); 
    const [canMap, setCanMap] = useState(false);

    useEffect(() => { 

        const fetchData = async () => { 
        
        try { 
            const username = "apiUser"; 
            const password = "apiPassword"; 
            const encodedCredentials = btoa(`${username}:${password}`); 
            const headers = new Headers(); headers.append("Authorization", `Basic ${encodedCredentials}`); 
            
            const res = await fetch( `https://8bit-backend-mock-project.vercel.app/api/programming-languages`, { method: "GET", headers: headers }); 
        
            if (res.ok) { 
                const data = await res.json();
                
                console.log(data); 
                setLanguageData(data); 
                setCanMap(true); 
            } 
        } catch (e: any) { 
            console.log(e); 
        } finally { 
            setPageReady(true); 
        } 
        }; 
        fetchData(); 
    }, []);

    const mapData = () => {
        return languageData.map((item: LanguageItem, index: number) => (
            <div key={index} className="card mb=3">
                <div className="card-body">
                    <h3 className="card-subtitle">{item.name}</h3> 
                    <p className="card-subtitle py-1" style={{ color: "grey" }}> {item.short_description} </p> 

                    <hr></hr>

                    <div className="row justify-content-start pt-2">
                        {item.images.map((image: MiscImage, index: number) => (
                            <div key={index} className="col-12 col-md-6">
                                <LoadingImage imageUri={image.image} className="img-fluid shadow-lg mb-5 bg-body rounded w-100" /> 
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ))
    };

    return pageReady ? (
        <>
            <NavBar />
            <div className="container text-left my-5" style={{paddingTop:100}}>
                {canMap ? (
                    mapData()
                ) : (
                    <div>Uh oh! Something went wrong our request for data. Please refresh and try again!</div>
                )}
            </div>
        </>
    ) : (
        <>
            <NavBar />
            <div className="d-flex justify-content-center" style={{ paddingTop: 100 }} > 
                <div className="spinner-border my-5"></div> 
            </div>
        </>
    );
};

export default ProgrammingLanguages;
const root = document.getElementById("root");
createRoot(root).render(<ProgrammingLanguages />);