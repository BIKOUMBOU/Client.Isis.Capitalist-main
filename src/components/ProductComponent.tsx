import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Produit } from '../Produit'
import '../style/Product.css';
import { Product } from '../world';
import './Main';
import MyProgressbar from "./MyProgressbar";

export enum Orientation {
    horizontal = "horizontal",
    vertical = "vertical"
}

type ProductProps = {

    prod: Product
    onProductionDone: (product: Product, quantite: number) => void
}


function ProductComponent({ prod, onProductionDone }: ProductProps) {

    let [run, setRun] = useState(prod.timeleft > 0);
    const [timeleft, setTimeleft] = useState(0);
    let imgProd = undefined;

    if (prod) {
        imgProd = 'http://localhost:4000/' + prod.logo; //'http://localhost:4000/'
    } else {
        imgProd = "error";
    }

    function calcScore(): void {
        let elapsedTime: number = Date.now() - prod.lastupdate;
        let quantite = 0;
        prod.lastupdate = Date.now();

        if (prod.managerUnlocked || prod.timeleft > 0) {
            let time: number = elapsedTime - prod.timeleft
            if (time >= 0) {
                quantite = 1
                if (prod.managerUnlocked) {
                    quantite += Math.floor(time / prod.vitesse)
                    prod.timeleft = prod.vitesse - (time % prod.vitesse)
                    setTimeleft(prod.timeleft);
                } else {
                    prod.timeleft = 0;
                    setTimeleft(0);
                }

                onProductionDone(prod, quantite);
            } else {
                prod.timeleft = -time
                setTimeleft(prod.timeleft)
            }
        }
    }

    const savedCallback = useRef(calcScore)

    useEffect(() => savedCallback.current = calcScore);

    useEffect(() => {
        let timer = setInterval(() => savedCallback.current(), 100);
        return function cleanup() {
            if (timer) clearInterval(timer)
        }
    }, [])

    const startFabrication = () => {
        if (prod.timeleft === 0) {
            prod.timeleft = prod.vitesse;
            prod.lastupdate = Date.now()
        }
        setRun(true);
    }

    const onProgressbarCompleted = () => {
        setRun(false);
    }

    return (
        <div className="Product">
            <div className="labelProduit">
                <h3>{prod.name}</h3>
            </div>
            <div className="img-bar">
                <img className="imgProduit" src={imgProd} alt="logo du produit" onClick={startFabrication} />

                <MyProgressbar className="barstyle"
                               vitesse={prod.vitesse}
                               initialvalue={prod.vitesse - prod.timeleft}
                               run={run} frontcolor="#65DEF1" backcolor="#E4CA73"
                               auto={prod.managerUnlocked}
                               orientation={Orientation.horizontal}
                               onCompleted={onProgressbarCompleted} />
            </div>
        </div>
    );
}
export default ProductComponent;
