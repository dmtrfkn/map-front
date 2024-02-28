import { FC, useState } from 'react';
import * as leaflet from 'leaflet';
import { Marker, Popup } from 'react-leaflet';

interface defaultMarkerProps {
  center: leaflet.LatLngExpression;
}

const DefaultMarker: FC<defaultMarkerProps> = ({ center }) => {
  // const LeafIcon = leaflet.Icon.extend({
  //   options: {},
  // });

  // Задание двух иконок (ошибка типов еще не пофиксили, но функционал рабочий)
  const blueIcon = new leaflet.Icon({
    iconUrl: '../public/red-marker.svg',
    iconSize: [32, 32], // Размер иконки
  });
  const greenIcon = new leaflet.Icon({
    iconSize: [32, 32], // Размер иконки
    iconUrl: '../public/green-marker.svg',
  });

  const [icon, setIcon] = useState<leaflet.Icon<leaflet.IconOptions> | leaflet.DivIcon>(blueIcon);

  // По клику смена цвета (можно будет переделать под условие статуса)
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
      </Popup>
    </Marker>
  );
};

export default DefaultMarker;
