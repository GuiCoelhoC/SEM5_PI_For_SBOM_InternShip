import * as THREE from "three";

/*
 * parameters = {
 *  name: String,
 *  texturePath: String,
 *  texturePositiveXUrl: String,
 *  textureNegativeXUrl: String,
 *  texturePositiveYUrl: String,
 *  textureNegativeYUrl: String,
 *  texturePositiveZUrl: String,
 *  textureNegativeZUrl: String,
 *  credits: String
 * }
 */

export default class CubeTexture {
    constructor(parameters) {
        for (const [key, value] of Object.entries(parameters)) {
            this[key] = value;
        }

        if (this.name == "None") { // No visualization-3D texture selected
            this.textures = null;
        }
        else {
            // Create a visualization-3D texture file loader
            const loader = new THREE.CubeTextureLoader();

            // Load the textures
            loader.setPath(this.texturePath);
            this.textures = loader.load(
                //Resource URLs
                [
                    this.texturePositiveXUrl,
                    this.textureNegativeXUrl,
                    this.texturePositiveYUrl,
                    this.textureNegativeYUrl,
                    this.texturePositiveZUrl,
                    this.textureNegativeZUrl
                ],
            );
        }
    }
}
