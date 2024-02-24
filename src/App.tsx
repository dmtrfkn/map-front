/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  MapContainer,
  Marker,
  Popup,
  Rectangle,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngBoundsExpression, LatLngExpression } from 'leaflet';
import { useEffect, useMemo, useState } from 'react';
import { createRequest } from './api';
import { DataProps } from './types/data';
import * as leaflet from 'leaflet';
import DefaultMarker from './components/DefaultMarker';
// import { SetStateAction, useState } from 'react';
const App = () => {
  const center = [55.0380614307295, 82.97708847157797] as LatLngExpression;
  const [data, setData] = useState<DataProps[] | undefined>([]);
  data && console.log(data);

  const RequestHandler = async () => {
    const response = await createRequest();
    response && setData(response);
  };

  const isPointInsideRectangle = (
    x: number,
    y: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
  ) => {
    if (
      x >= Math.min(x1, x2) &&
      x <= Math.max(x1, x2) &&
      y >= Math.min(y1, y2) &&
      y <= Math.max(y1, y2)
    ) {
      return true;
    }
    return false;
  };

  // start test bounds
  // зоны которые по клику приближают или отдаляют и меняют цвет в зависимости от состояния
  const innerBounds = [
    [55.04222601982359, 82.97269415051329],
    [55.0393076136607, 82.97744210695956],
  ];
  const outerBounds = [
    [55.03341538964077, 82.96175270796851],
    [55.02970545565798, 82.96409805773816],
  ] as LatLngBoundsExpression;

  const redColor = { color: 'red' };
  const green = { color: 'green' };
  const whiteColor = { color: 'white' };
  const coords = [55.040807799032834, 82.97523681496241];

  function SetBoundsRectangles() {
    const [bounds, setBounds] = useState(outerBounds);
    const map = useMap();

    const innerHandlers = useMemo(
      () => ({
        click() {
          setBounds(innerBounds as LatLngBoundsExpression);
          map.fitBounds(innerBounds as LatLngBoundsExpression);
        },
      }),
      [map],
    );
    const outerHandlers = useMemo(
      () => ({
        click() {
          setBounds(outerBounds);
          map.fitBounds(outerBounds);
        },
      }),
      [map],
    );

    useEffect(() => {
      RequestHandler();
    }, []);

    return (
      <>
        <Rectangle
          bounds={outerBounds}
          eventHandlers={outerHandlers}
          pathOptions={bounds === outerBounds ? redColor : whiteColor}
        />
        {bounds === innerBounds &&
          isPointInsideRectangle(
            coords[0],
            coords[1],
            innerBounds[0][0],
            innerBounds[0][1],
            innerBounds[1][0],
            innerBounds[1][1],
          ) && <DefaultMarker center={coords as LatLngExpression} />}
        <Rectangle
          bounds={innerBounds as LatLngBoundsExpression}
          eventHandlers={innerHandlers}
          pathOptions={bounds === innerBounds ? green : whiteColor}
        />
      </>
    );
  }

  // end test bounds

  // start test change color marker

  //  Create the Icon
  // const LeafIcon = leaflet.Icon.extend({
  //   options: {},
  // });

  // const blueIcon: leaflet.Icon<leaflet.IconOptions> | leaflet.DivIcon = new LeafIcon({
  //     iconUrl: '../public/red-marker.svg',
  //     iconSize: [32, 32], // Размер иконки
  //   }),
  //   greenIcon = new LeafIcon({
  //     iconSize: [32, 32], // Размер иконки
  //     iconUrl: '../public/green-marker.svg',
  //   });
  // let myCustomColor = '#583470';

  // const markerHtmlStylesGreen = `
  // background-color: ${myCustomColor};
  // width: 3rem;
  // height: 3rem;
  // display: block;
  // left: -1.5rem;
  // top: -1.5rem;
  // position: relative;
  // border-radius: 3rem 3rem 0;
  // transform: rotate(45deg);
  // border: 1px solid #FFFFFF`;

  // const markerHtmlStylesRed = `
  // background-color: ${myCustomColor};
  // width: 3rem;
  // height: 3rem;
  // display: block;
  // left: -1.5rem;
  // top: -1.5rem;
  // position: relative;
  // border-radius: 3rem 3rem 0;
  // transform: rotate(45deg);
  // border: 1px solid #FFFFFF`;

  // const Icon = leaflet.divIcon({
  //   className: 'my-custom-pin',
  //   iconAnchor: [0, 24],
  //   popupAnchor: [0, -36],
  //   html: `<span style="${markerHtmlStylesGreen}" />`,
  // });

  //  Use the state hook:
  // const [icon, setIcon] = useState<leaflet.Icon<leaflet.IconOptions> | leaflet.DivIcon>(blueIcon);

  // This function will change the state's icon:

  // const changeIconColor = (icon: leaflet.Icon<leaflet.IconOptions> | leaflet.DivIcon) => {
  //   if (icon.options.iconUrl === greenIcon.options.iconUrl) {
  //     setIcon(blueIcon);
  //   } else {
  //     setIcon(greenIcon);
  //   }
  // };

  // setTimeout(() => {
  //   icon.options.html = `<span style="${markerHtmlStylesRed}" />`;
  //   myCustomColor = '#123asd';
  // }, 1);

  // const changeIconColor = (icon: leaflet.DivIcon) => {
  //   icon.options.html = `<span style="${markerHtmlStylesRed}" />`;
  //   myCustomColor = '#123asd';
  // };
  // end test change color marker

  // start test theme where u tap on marker and after u will go to the marker
  // условно ждет клик создает маркер на коорды заданые и переносит тебя туда
  // function LocationMarker() {
  //   const [position, setPosition] = useState(null);
  //   const map = useMapEvents({
  //     click() {
  //       map.locate();
  //     },
  //     locationfound(e) {
  //       // setPosition(e.latlng);
  //       map.flyTo(center, map.getZoom());
  //     },
  //   });

  //   return position === null ? null : (
  //     <Marker position={position}>
  //       <Popup>You are here</Popup>
  //     </Marker>
  //   );
  // }

  // end test theme where u tap on marker and after u will go to the marker

  return (
    <div>
      <MapContainer key="syeta" center={center} zoom={20} scrollWheelZoom={true} zoomControl={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={center} icon={icon}>
          <Popup>
            <button onClick={() => changeIconColor(icon)}>Change Marker Color</button>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
        <DefaultMarker center={center} />
        {/* <LocationMarker /> */}
        <SetBoundsRectangles />
      </MapContainer>
    </div>
  );
};

export default App;
