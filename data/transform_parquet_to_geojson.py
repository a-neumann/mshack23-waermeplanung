import geopandas as gpd


"""
Hello friend, if you are new to Python, here is what you must do to get your geojson data:

    brew install python3
    pip3 install -r requirements.txt
    python3 -m transform_parquet_to_geojson

If you are not new to Python, please use a virtualenv...
"""
if __name__ == "__main__":
    for file in ["buildings", "building_blocks", "heat_lines"]:
        print(f"Saving {file} as geojson")
        gdf = gpd.read_parquet(f"{file}.parquet")
        gdf.to_file(f"{file}.geojson", driver="GeoJSON")
