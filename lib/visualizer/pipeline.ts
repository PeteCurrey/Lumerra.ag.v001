const gltfPipeline = require('gltf-pipeline');
const processGlbLib = gltfPipeline.processGlb;

interface ProcessOptions {
  dracoOptions?: {
    compressionLevel?: number;
  };
}

export async function processGlb(glbBuffer: Buffer, options: ProcessOptions = {}) {
  const dracoOptions = {
    compressionLevel: 7,
    ...options.dracoOptions
  };

  const processOptions = {
    dracoOptions: dracoOptions,
    saveBinary: true
  };

  try {
    const results = await processGlbLib(glbBuffer, processOptions);
    
    // Poly count extraction would ideally happen here by parsing the gltf
    // For now, we return the processed buffer and a placeholder poly count
    return {
      buffer: results.glb,
      polyCount: 0 // Placeholder
    };
  } catch (error) {
    throw new Error(`Failed to process GLB: ${error}`);
  }
}
