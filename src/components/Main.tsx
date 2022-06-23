import React from 'react';
import { useState } from 'react';
import '../world';
import { Product, World } from '../world';
import '../style/main.css';
import { transform } from '../untils';
import ProductComponent from './ProductComponent';
import { Produit } from '../Produit';

type MainProps = {
    loadworld: World
    username: string
}

function Main({ loadworld, username }: MainProps) {
    const [world, setWorld] = useState(JSON.parse(JSON.stringify(loadworld)) as World)

    let logo = undefined;
    let money = undefined;

    function onProductionDone(p: Product, quantite: number): void {
        // calcul de la somme obtenue par la production du produit
        let gain = quantite * p.revenu;
        // ajout de la somme à l’argent possédé
        addToScore(gain)
    }

    function addToScore(gain: number): void {
        // ajout de la somme à l’argent possédé
        //console.log(gain)
        setWorld({ ...world, score: world.score + gain })
    }

    if (loadworld) {
        logo = <img className='logo' src={'http://localhost:4000/'+ world.logo} alt="kisspng-food-vegetable.png (logoWorld)" /> //'http://localhost:4000/'
        money = <span dangerouslySetInnerHTML={{ __html: transform(loadworld?.money) }}></span>
    }
    else {
        logo = <div> logo monde </div>
        money = 0;
    }





    return (
        <div className="game">
            <div className="header">
                <div className="logoContainer"> {logo} </div>
                <div className="nameContainer"> {username} </div>
                <button className="test">Manager</button>
            </div>
            <div className="parent_corps">
                <div className="colonne-gauche">
                    <div> {money} </div>
                    <div> multiplicateur </div>
                </div>
                <div className="corps">
                    <div className="main">
                        <div className="product">
                            <ProductComponent prod={world.products[0]} onProductionDone={onProductionDone} />
                            <ProductComponent prod={world.products[1]} onProductionDone={onProductionDone} />
                            <ProductComponent prod={world.products[2]} onProductionDone={onProductionDone} />
                            <ProductComponent prod={world.products[3]} onProductionDone={onProductionDone} />
                            <ProductComponent prod={world.products[4]} onProductionDone={onProductionDone} />
                            <ProductComponent prod={world.products[5]} onProductionDone={onProductionDone} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
