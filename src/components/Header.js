import React from 'react';
import { Container, Image, Button } from '@nextui-org/react';
import Accordeon from './Accordeon';
// src/components/Header.js

export default function Header() {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 60, fontSize: 17, height: '500px' }}>
            <div style={{ width: '50%', paddingRight: 20, paddingLeft: 80 }}>
                <h1 style={{ fontSize: '36px', marginBottom: '20px', fontWeight: "bolder" }}>
                    Comment voter en ligne et en toute sécurité ?
                </h1>
                <p style={{ fontSize: '15px', textAlign: "justify" }} >
                    Notre plateforme est conçue pour fournir une expérience de vote sécurisée et innovante pour les élections présidentielles au Sénégal. Grâce à une technologie de pointe, nous veillons à ce que votre vote soit comptabilisé avec précision et en toute sécurité. Découvrez l'avenir du vote grâce à notre interface conviviale et à nos solides mesures de sécurité.
                    <br />
                    <br />
                    Rejoignez-nous pour écrire l'histoire en participant à un processus de vote transparent et fiable. Votre voix compte !

                </p>
                <Button href="/vote/mon-vote" size="lg" shadow color="gradient" style={{ marginTop: '30px', backgroundColor: 'white', color: 'black' }}>
                    Je vote maintenant
                </Button>
            </div>
            <div style={{ width: '50%', textAlign: 'justify', paddingLeft: 20, paddingRight: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    isBlurred
                    width="100%"
                    height="100%"
                    src="https://prod.cdn-medias.jeuneafrique.com/cdn-cgi/image/q=auto,f=auto,metadata=none,width=1215,fit=cover,gravity=0.5000x0.5000/https://prod.cdn-medias.jeuneafrique.com/medias/2024/03/24/afp__20240324__34m92vm__v2__preview__topshotsenegalvote.jpg"
                    alt="NextUI Album Cover"
                    className="m-10"
                    style={{ objectFit: 'cover', borderRadius: '10px' }}
                />
            </div>
        </div>
    );
}
