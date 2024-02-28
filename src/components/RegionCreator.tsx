import { FC, useMemo } from 'react';
import { LatLngBoundsExpression, LatLngExpression } from 'leaflet';
import { Polygon, useMap } from 'react-leaflet';
import DefaultMarker from './DefaultMarker';

interface RegionCreatorProps {
  coords: number[][];
  currentRegion: string;
  region: string;
  setCurrentRegion: (region: string) => void;
}

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

const RegionCreator: FC<RegionCreatorProps> = ({
  coords,
  region,
  currentRegion,
  setCurrentRegion,
}) => {
  // Обьявление цветов
  const defaultColor = 'red';
  const currentColor = 'white';
  // Условие использования цвета: если текущее название региона === выделенному
  let color = currentRegion === region ? currentColor : defaultColor;
  const map = useMap();

  // Условно здесь будет запрос и запись в переменную points координаты точек

  const poins = [
    [55.03464916508405, 82.97315397256799],
    [55.03533095406177, 82.96875143854301],
  ];

  // Установка текущего региона выделенным, зумм
  const innerHandlers = useMemo(
    () => ({
      click() {
        setCurrentRegion(region);
        map.fitBounds(coords as LatLngBoundsExpression);
        map.getZoom();
        // map.zoomIn(100);
      },
    }),
    [map],
  );

  return (
    <div key={Math.random() * 199 + Math.random()}>
      {/* Отрисовка зоны района */}
      <Polygon
        eventHandlers={innerHandlers}
        positions={coords as LatLngExpression[]}
        pathOptions={{ color: color }}
      />
      {/* Отрисовка всех точек с камерами в выделенной пользоветелем зоне */}
      {poins.map(
        (point) =>
          currentRegion === region &&
          isPointInsideRectangle(
            point[0], // координата x точки
            point[1], // координата y точки
            coords[0][0], // координата x начала зоны
            coords[Math.round(coords.length / 2)][0], // координата x середины зоны
            coords[0][1], // координата y начала зоны
            coords[Math.round(coords.length / 2)][1], // координата y середины зоны
          ) && <DefaultMarker center={[point[0], point[1]] as LatLngExpression} />,
      )}
    </div>
  );
};

export default RegionCreator;
