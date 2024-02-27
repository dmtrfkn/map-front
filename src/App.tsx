/* eslint-disable @typescript-eslint/no-unused-vars */
// import styles from './App.module.scss';
import { Cities } from '../cities';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { useState } from 'react';
import RegionCreator from './components/RegionCreator';
import 'leaflet/dist/leaflet.css';

const App = () => {
  const center = [55.0380614307295, 82.97708847157797] as LatLngExpression;
  const [globalRegion, setGlobalRegion] = useState<string>('');

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
  return (
    <div>
      <MapContainer key="map" center={center} zoom={10} scrollWheelZoom={true} zoomControl={true}>
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
          )),
        )}
      </MapContainer>
    </div>
  );
};

export default App;
