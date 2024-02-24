import { FC, useState } from 'react';
import * as leaflet from 'leaflet';
import { Marker, Popup } from 'react-leaflet';

interface defaultMarkerProps {
  center: leaflet.LatLngExpression;
}

const DefaultMarker: FC<defaultMarkerProps> = ({ center }) => {
  const LeafIcon = leaflet.Icon.extend({
    options: {},
  });

  const blueIcon: leaflet.Icon<leaflet.IconOptions> | leaflet.DivIcon = new LeafIcon({
      iconUrl: '../public/red-marker.svg',
      iconSize: [32, 32], // Размер иконки
    }),
    greenIcon = new LeafIcon({
      iconSize: [32, 32], // Размер иконки
      iconUrl: '../public/green-marker.svg',
    });
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
  const [icon, setIcon] = useState<leaflet.Icon<leaflet.IconOptions> | leaflet.DivIcon>(blueIcon);

  // This function will change the state's icon:

  const changeIconColor = (icon: leaflet.Icon<leaflet.IconOptions> | leaflet.DivIcon) => {
    if (icon.options.iconUrl === greenIcon.options.iconUrl) {
      setIcon(blueIcon);
    } else {
      setIcon(greenIcon);
    }
  };
  return (
    <Marker position={center} icon={icon}>
      <Popup>
        <button onClick={() => changeIconColor(icon)}>Change Marker Color</button>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  );
};

export default DefaultMarker;
