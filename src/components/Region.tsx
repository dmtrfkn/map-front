import { FC } from 'react';
import { LatLngExpression } from 'leaflet';
import { Polygon } from 'react-leaflet';

interface NovosibirskRegionBorderProps {
  coords: number[][]
}

const NovosibirskRegionBorder:FC<NovosibirskRegionBorderProps> = ({coords}) => {
  const novosibirskRegionCoordinates = coords;
  for (let i =0;i < novosibirskRegionCoordinates.length;i++){
  const tmp = novosibirskRegionCoordinates[i][0]
  novosibirskRegionCoordinates[i][0] = novosibirskRegionCoordinates[i][1]
  novosibirskRegionCoordinates[i][1] = tmp
  }
  return (
      <Polygon positions={novosibirskRegionCoordinates as LatLngExpression[]} color="blue"/> 
  );
};

export default NovosibirskRegionBorder;
