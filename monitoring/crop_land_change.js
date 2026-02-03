// define you own geometry to see crop similarity

var geometry = ee.Geometry.MultiPoint([
    [89.33693449856897, 24.617600307650267],
    [89.33934848668237, 24.617649076004508],
    [89.33938067319055, 24.61467417159032],
    [89.33633368374963, 24.614664417688953],
    [89.33683793904443, 24.616459122731385],
    [89.33836143376489, 24.61686878005437],
    [89.33902662160058, 24.615552019597576],
    [89.33787863614221, 24.615093588629207]
  ]);
  

// Load collection.
var dataset = ee.ImageCollection('GOOGLE/SATELLITE_EMBEDDING/V1/ANNUAL');

var year1 = 2023;
var year2 = 2024;

// Get embedding images for two years.
var image1 = dataset
      .filterDate(year1 + '-01-01',  (year1 + 1) + '-01-01')
      .filterBounds(geometry)
      .first();

var image2 = dataset
      .filterDate(year2 + '-01-01',  (year2 + 1) + '-01-01')
      .filterBounds(geometry)
      .first();

// Visualize three axes of the embedding space as an RGB.
var visParams = {min: -0.3, max: 0.3, bands: ['A01', 'A16', 'A09']};

Map.addLayer(image1, visParams, 'embeddings ' + year1);
Map.addLayer(image2, visParams, 'embeddings ' + year2);

// Calculate dot product as a measure of similarity between embedding vectors.
// Note for vectors with a magnitude of 1, this simplifies to the cosine of the
// angle between embedding vectors.
var dotProd = image1
    .multiply(image2)
    .reduce(ee.Reducer.sum());

// Add dot product to the map.
Map.addLayer(
  dotProd,
  {min: 0, max: 1, palette: ['white', 'black']},
  'Similarity between years (brighter = less similar)'
);

Map.centerObject(image1, 9);
Map.setOptions('HYBRID');