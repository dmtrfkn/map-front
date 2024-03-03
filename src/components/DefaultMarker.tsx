import { FC, useState } from 'react';
import * as leaflet from 'leaflet';
import { Marker, Popup } from 'react-leaflet';

type State = 'online' | 'offline' | 'disable';

interface defaultMarkerProps {
  center: leaflet.LatLngExpression;
  state: State;
}

const DefaultMarker: FC<defaultMarkerProps> = ({ center, state }) => {
  // Задание трех иконок (ошибка типов еще не пофиксили, но функционал рабочий)
  const blueIcon = new leaflet.Icon({
    iconUrl: '../blue-marker.svg',
    iconSize: [32, 32], // Размер иконки
  });
  const redIcon = new leaflet.Icon({
    iconSize: [32, 32], // Размер иконки
    iconUrl: './red-marker.svg',
  });
  const whiteIcon = new leaflet.Icon({
    iconSize: [32, 32], // Размер иконки
    iconUrl: './white-marker.svg',
  });

  const startState = state === 'online' ? blueIcon : state === 'offline' ? redIcon : whiteIcon;
  const [icon, setIcon] = useState<leaflet.Icon<leaflet.IconOptions> | leaflet.DivIcon>(startState);

  // По клику смена цвета (можно будет переделать под условие статуса)
  const changeIconColor = (state: State) => {
    state === 'offline' && setIcon(redIcon);
    state === 'online' && setIcon(blueIcon);
    state === 'disable' && setIcon(whiteIcon);
  };

  return (
    <Marker position={center} icon={icon}>
      <Popup>
        <button onClick={() => changeIconColor('online')}>Set online</button>
        <button onClick={() => changeIconColor('offline')}>Set offline</button>
        <button onClick={() => changeIconColor('disable')}>Set disable</button>
      </Popup>
    </Marker>
  );
};

export default DefaultMarker;
