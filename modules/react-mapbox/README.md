@terraeclipse/react-mapbox
==========================

Note: This is a brand-new work-in-progress and so Docs and tests are sparse. The
API likely **will** change so please lock down your version and monitor updates
carefully.

About
-----

Inspired greatly by [react-mapbox-gl](https://github.com/alex3165/react-mapbox-gl), this
aims to be as close of a 1-to-1 mapping of the `mapbox-gl-js` API to react as possible. It
takes the largely imperative `mapbox-gl-js` codebase and wraps it in declarative
react components. A few goals:

- Declarative way to create mapbox-gl maps.
- Leverage the `mapbox-gl-js` way of doing things wherever possible.
  - Unlinke Uber's mapbox lib (which is great), this means using the mapbox
    api to handle map position, movement, etc. (but with a prop-based API).
  - Doesn't provide too many high-level abstractions for things like 'Features'
    or 'Markers' (yet), rather provide the building blocks to do that using
    idiomatic mapbox-gl methods.
  - This means we get to rely on mapbox's performance improvements wherever
    possible, rather than having to engineer our own.
- "Everything is a component"
  - You should be able to do thinks like render layers, bind click handlers,
    respond to hovering over layers, ect. by merely rendering components.
  - Many maps will only need a render method, no state to juggle.

Quick Example
-------------

This renders a map, adds a source and layer to the map, and changes the fill
of polygon features when they are hovered. See it in action [in the storybook](https://terraeclipse.github.io/react-stack/?selectedKind=Mapbox&selectedStory=Readme%20Example).

```js
import React from 'react'
import {MapGL, Source, Layer, Hover} from '@terraeclipse/react-mapbox'

// Map default options.
const mapOptions = {
  accessToken: '[your token]',
  style: 'mapbox://styles/mapbox/streets-v9',
  bbox: [[-123.881836, 25.063209], [-65.170898, 48.848451]],
  padding: 30
}

// Functional component, our example.
const Example = (props) => (
  <MapGL {...mapOptions}>
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

```

- - -

#### Developed by [TerraEclipse](https://github.com/TerraEclipse)

Terra Eclipse, Inc. is a nationally recognized political technology and
strategy firm located in Santa Cruz, CA and Washington, D.C.
