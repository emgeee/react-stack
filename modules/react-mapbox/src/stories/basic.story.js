import React from 'react'
import {MapGL, Layer} from '../'
import defaults from './defaults'

export default function ({storiesOf, action}) {
  storiesOf('Mapbox', module).addWithInfo('Basic',
    `
      Basic map with a geojson layer.
    `,
    () => (
      <MapGL {...defaults}>
        <Layer
          id='points-markers'
          type='symbol'
          source={{
            id: 'points',
            type: 'geojson',
            data: {
              'type': 'FeatureCollection',
              'features': [{
                'type': 'Feature',
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-77.03238901390978, 38.913188059745586]
                },
                'properties': {
                  'title': 'Mapbox DC',
                  'icon': 'monument'
                }
              }, {
                'type': 'Feature',
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-122.414, 37.776]
                },
                'properties': {
                  'title': 'Mapbox SF',
                  'icon': 'harbor'
                }
              }]
            }
          }}
          layout={{
            'icon-image': '{icon}-15',
            'text-field': '{title}',
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-offset': [0, 0.6],
            'text-anchor': 'top'
          }}
        />
      </MapGL>
    )
  )
}
