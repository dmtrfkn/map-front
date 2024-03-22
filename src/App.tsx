/* eslint-disable @typescript-eslint/no-unused-vars */
// import styles from './App.module.scss';
import { Cities } from "../cities";
import { MapContainer, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import RegionCreator from "./components/RegionCreator";
import "leaflet/dist/leaflet.css";
import { createRequest } from "./api/index";

const App = () => {
  const center = [55.0380614307295, 82.97708847157797] as LatLngExpression;
  const [globalRegion, setGlobalRegion] = useState<string>("");

  const setGlobalRegionHandler = (region: string) => {
    setGlobalRegion(region);
  };

  // Функция при вызове (клике по карте) отправляет курсор на установленные координаты

  // const LocationMarker = () => {
  //   const map = useMapEvents({
  //     click() {
  //       map.locate();
  //     },
  //     locationfound(e) {
  //       map.flyTo(e.latlng, map.getZoom());
  //       // map.setZoom(10);
  //     },
  //   });
  // };

  useEffect(() => {
    console.log(createRequest());
  }, []);
  return (
    <div>
      <MapContainer
        key="map"
        minZoom={10}
        maxBounds={[
          [55.34680418080934, 82.64418239421884],
          [54.63198917914636, 83.3743184766522],
        ]}
        center={center}
        zoom={10}
        scrollWheelZoom={true}
        zoomControl={true}
      >
        {/* <button onClick={() => LocationMarker()} className={styles.button}>
          вернуться к началу
          {/* <LocationMarker /> */}
        {/* </button> */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {Cities.map((city) =>
          city.regions.map((region) => (
            <RegionCreator
              coords={region.coordinates}
              region={region.name}
              currentRegion={globalRegion}
              setCurrentRegion={setGlobalRegionHandler}
              key={Math.random() * 100 + Math.random()}
            />
          ))
        )}
        {/* чтобы посмотреть зону ограничения карты
        /* <Polygon
          positions={[
            [55.34680418080934, 82.64418239421884],
            [54.63198917914636, 83.3743184766522],
          ]}
        /> */}
      </MapContainer>
    </div>
  );
};

export default App;
