import React from 'react'
import {MapGL, Source, Layer, Hover} from '../'
import defaults from './defaults'

export default function ({storiesOf, action}) {
  storiesOf('Mapbox', module).addWithInfo('Readme Example',
    `
      A map with hoverable polygons (from the README).
    `,
    () => {
      return (
        <MapGL {...defaults}>
          {/* Source to be used by layers (U.S. state polygons) */}
          <Source
            id='states'
            type='geojson'
            data='https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_1_states_provinces.geojson'
          />

          {/* State fill layer */}
          <Layer
            id='states-fill'
            source='states'
            type='fill'
            paint={{
              'fill-color': '#627BC1',
              'fill-opacity': 0.5
            }}
          />

          {/* State borders layer */}
          <Layer
            id='states-borders'
            source='states'
            type='line'
            paint={{
              'line-color': '#627BC1',
              'line-width': 2
            }}
          />

          {/* Declarative handler for hovering a layer's features.

              This component optionally allows a function as the
              *children*, similar to how libraries like react-motion do. You can
              leverage that to filter layers or otherwise modify them.

              The *property* should be a member of `feature.properties` that
              uniquely identifies each feature. Used to track actively hovering
              features.
          */}
          <Hover layer='states-fill' property='name'>
            {({features}) => (
              <Layer
                id='states-hover'
                source='states'
                type='fill'
                paint={{
                  'fill-color': '#627BC1',
                  'fill-opacity': 1
                }}
                filter={[
                  '==',
                  'name',
                  features[0] ? features[0].properties.name : ''
                ]}
              />
            )}
          </Hover>
        </MapGL>
      )
    }
  )
}
