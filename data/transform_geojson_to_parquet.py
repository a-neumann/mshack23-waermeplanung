import geopandas as gpd


"""
Please commit your data as parquet and not geojson files in git.
"""
if __name__ == "__main__":
    for file in ["buildings", "building_blocks", "heat_lines"]:
        print(f"Saving {file}.geojson as parquet")
        gdf = gpd.read_file(f"{file}.geojson")
        gdf.to_file(f"{file}.parquet", driver="GeoJSON")
