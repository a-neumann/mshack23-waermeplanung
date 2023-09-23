#!/bin/bash


YOUR_MAPBOX_ACCESS_TOKEN="sk.eyJ1IjoibXVlbnN0ZXItaGVhdG1hcCIsImEiOiJjbG12c2htdGwwdXg2MmtxanNiOWwyNDdtIn0.LFQmi3gIVQ4CHeegCdsQJg"

# Define your tuples as strings with a delimiter
tuples=(
  "buildings.parquet,tileset.buildings.json,buildings", 
  "building_blocks.parquet,tileset.building_blocks.json,building_blocks" 
  )

# Iterate over each tuple
for tuple in "${tuples[@]}"; do
    # Split the tuple into its elements using the delimiter
    IFS=',' read -r -a elements <<< "$tuple"
    
    # Now you can access the elements of the tuple
    echo "First element: ${elements[0]}"
    echo "Second element: ${elements[1]}"
    echo "Third element: ${elements[2]}"
    INPUT_FILE="${elements[0]}"
    OUTPUT_FILE="${elements[0]}.ldgeojson.ld"
    TILE_SET_CONFIG_FILE="${elements[1]}"
    TILE_SOURCE_ID="${elements[2]}"
    TILE_ID="muenster-heatmap.${elements[2]}"

    echo "Preparing ${elements[0]}"
    ogr2ogr -f GeoJSONSeq $OUTPUT_FILE $INPUT_FILE

    #echo "Deleting Tileset Source $TILE_SOURCE_ID"
    #echo "https://api.mapbox.com/tilesets/v1/sources/muenster-heatmap/$TILE_SOURCE_ID?access_token=$YOUR_MAPBOX_ACCESS_TOKEN"
    #curl -X DELETE "https://api.mapbox.com/tilesets/v1/sources/muenster-heatmap/$TILE_SOURCE_ID?access_token=$YOUR_MAPBOX_ACCESS_TOKEN"

    echo "Uploading $INPUT_FILE ($OUTPUT_FILE) to Tileset Source $TILE_SOURCE_ID"
    curl -X POST "https://api.mapbox.com/tilesets/v1/sources/muenster-heatmap/$TILE_SOURCE_ID?access_token=$YOUR_MAPBOX_ACCESS_TOKEN" \
    -F file=@$OUTPUT_FILE \
    --header "Content-Type: multipart/form-data"
    rm $OUTPUT_FILE

    echo -e "\n"
    echo "Creating Tileset $TILE_ID with config file $TILE_SET_CONFIG_FILE"
    curl -X POST "https://api.mapbox.com/tilesets/v1/$TILE_ID?access_token=$YOUR_MAPBOX_ACCESS_TOKEN" \
      -d @$TILE_SET_CONFIG_FILE \
      --header "Content-Type:application/json"

    echo -e "\n"
    echo "Publishing tileset $TILE_ID"
    curl -X POST "https://api.mapbox.com/tilesets/v1/$TILE_ID/publish?access_token=$YOUR_MAPBOX_ACCESS_TOKEN"
    echo -e "\n"
done