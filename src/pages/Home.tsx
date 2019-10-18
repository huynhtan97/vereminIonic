import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import React, { useState } from 'react';
import { Plugins } from "@capacitor/core"

import * as posenet from '@tensorflow-models/posenet';
import testImage from '../static_assets/testImage.jpeg';
import "./Home.css";
// import * as Tone from 'tone';

// const playTone = () => {
//   const synth = new Tone.Synth().toMaster();
//   synth.triggerAttackRelease("C4", "8n");
// }

const { CameraPreview } = Plugins


const predict = async () => {
  const image = new Image();
  image.src = testImage;
  const model = await posenet.load();
  const pose = await model.estimateSinglePose(image, { flipHorizontal: false });
  return pose
}

const Home: React.FC = () => {
  const [poseData, setPoseData] = useState({});
  const [error, setError] = useState("");
  const startCamera = async () => {
    await CameraPreview.start({ parent: "bigboi", position: "rear", className: "camera" });
  }
  console.log("here");
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Veremin</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonContent style={{backgroundColor: "transparent"}} id="bigboi" />
        {JSON.stringify(poseData)}
        <IonTitle>{error}</IonTitle>
        <IonButton onClick={async () => {
          try {
            await startCamera()
            setPoseData(await predict())
          } catch (err) {
            setError(JSON.stringify(err));
            console.error(err);
          }
        }}>Play music</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
