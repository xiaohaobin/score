var Mesh = require('qtek/src/Mesh');
var Renderer = require('qtek/src/Renderer');
var Texture2D = require('qtek/src/Texture2D');
var Texture = require('qtek/src/Texture');
var Shader = require('qtek/src/Shader');
var Material = require('qtek/src/Material');
var Node3D = require('qtek/src/Node');
var StaticGeometry = require('qtek/src/StaticGeometry');
var echarts = require('echarts/lib/echarts');
var Scene = require('qtek/src/Scene');
var LRUCache = require('zrender/lib/core/LRU');
var textureUtil = require('qtek/src/util/texture');
var EChartsSurface = require('./EChartsSurface');
var AmbientCubemapLight = require('qtek/src/light/AmbientCubemap');
var AmbientSHLight = require('qtek/src/light/AmbientSH');
var shUtil = require('qtek/src/util/sh');
var retrieve = require('./retrieve');

var animatableMixin = require('./animatableMixin');
echarts.util.extend(Node3D.prototype, animatableMixin);

// Some common shaders
Shader.import(require('qtek/src/shader/source/util.glsl.js'));
Shader.import(require('qtek/src/shader/source/prez.glsl.js'));
Shader.import(require('./shader/common.glsl.js'));
Shader.import(require('./shader/color.glsl.js'));
Shader.import(require('./shader/lambert.glsl.js'));
Shader.import(require('./shader/realistic.glsl.js'));
Shader.import(require('./shader/hatching.glsl.js'));
Shader.import(require('./shader/shadow.glsl.js'));

function isValueNone(value) {
    return !value || value === 'none';
}

function isValueImage(value) {
    return value instanceof HTMLCanvasElement
        || value instanceof HTMLImageElement
        || value instanceof Image;
}

function isECharts(value) {
    return value.getZr && value.setOption;
}

// Overwrite addToScene and removeFromScene
var oldAddToScene = Scene.prototype.addToScene;
var oldRemoveFromScene = Scene.prototype.removeFromScene;

Scene.prototype.addToScene = function (node) {
    oldAddToScene.call(this, node);

    if (this.__zr) {
        var zr = this.__zr;
        node.traverse(function (child) {
            child.__zr = zr;
            if (child.addAnimatorsToZr) {
                child.addAnimatorsToZr(zr);
            }
        });
    }
};

Scene.prototype.removeFromScene = function (node) {
    oldRemoveFromScene.call(this, node);

    node.traverse(function (child) {
        var zr = child.__zr;
        child.__zr = null;
        if (zr && child.removeAnimatorsFromZr) {
            child.removeAnimatorsFromZr(zr);
        }
    });
};

/**
 * @param {string} textureName
 * @param {string|HTMLImageElement|HTMLCanvasElement} imgValue
 * @param {module:echarts/ExtensionAPI} api
 * @param {Object} [textureOpts]
 */
Material.prototype.setTextureImage = function (textureName, imgValue, api, textureOpts) {
    if (!this.shader) {
        return;
    }

    var zr = api.getZr();
    var material = this;
    var texture;
    // disableTexture first
    material.shader.disableTexture(textureName);
    if (!isValueNone(imgValue)) {
        texture = graphicGL.loadTexture(imgValue, api, textureOpts, function (texture) {
            material.shader.enableTexture(textureName);
            zr && zr.refresh();
        });
        // Set texture immediately for other code to verify if have this texture.
        material.set(textureName, texture);
    }

    return texture;
};

var graphicGL = {};

graphicGL.Renderer = Renderer;

graphicGL.Node = Node3D;

graphicGL.Mesh = Mesh;

graphicGL.Shader = Shader;

graphicGL.Material = Material;

graphicGL.Texture = Texture;

graphicGL.Texture2D = Texture2D;

// Geometries
graphicGL.Geometry = StaticGeometry;

graphicGL.SphereGeometry = require('qtek/src/geometry/Sphere');

graphicGL.PlaneGeometry = require('qtek/src/geometry/Plane');

graphicGL.CubeGeometry = require('qtek/src/geometry/Cube');

// Lights
graphicGL.AmbientLight = require('qtek/src/light/Ambient');
graphicGL.DirectionalLight = require('qtek/src/light/Directional');
graphicGL.PointLight = require('qtek/src/light/Point');
graphicGL.SpotLight = require('qtek/src/light/Spot');

// Cameras
graphicGL.PerspectiveCamera = require('qtek/src/camera/Perspective');
graphicGL.OrthographicCamera = require('qtek/src/camera/Orthographic');

// Math
graphicGL.Vector2 = require('qtek/src/math/Vector2');
graphicGL.Vector3 = require('qtek/src/math/Vector3');
graphicGL.Vector4 = require('qtek/src/math/Vector4');

graphicGL.Quaternion = require('qtek/src/math/Quaternion');

graphicGL.Matrix2 = require('qtek/src/math/Matrix2');
graphicGL.Matrix2d = require('qtek/src/math/Matrix2d');
graphicGL.Matrix3 = require('qtek/src/math/Matrix3');
graphicGL.Matrix4 = require('qtek/src/math/Matrix4');

graphicGL.Plane = require('qtek/src/math/Plane');
graphicGL.Ray = require('qtek/src/math/Ray');
graphicGL.BoundingBox = require('qtek/src/math/BoundingBox');
graphicGL.Frustum = require('qtek/src/math/Frustum');

// Texture utilities

var blankImage = textureUtil.createBlank('rgba(255,255,255,0)').image;


function nearestPowerOfTwo(val) {
    return Math.pow(2, Math.round(Math.log(val) / Math.LN2));
}
function convertTextureToPowerOfTwo(texture) {
    if ((texture.wrapS === Texture.REPEAT || texture.wrapT === Texture.REPEAT)
     && texture.image
     ) {
        // var canvas = document.createElement('canvas');
        var width = nearestPowerOfTwo(texture.width);
        var height = nearestPowerOfTwo(texture.height);
        if (width !== texture.width || height !== texture.height) {
            var canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(texture.image, 0, 0, width, height);
            texture.image = canvas;
        }
    }
}
/**
 * @param {string|HTMLImageElement|HTMLCanvasElement} imgValue
 * @param {module:echarts/ExtensionAPI} api
 * @param {Object} [textureOpts]
 * @param {Function} cb
 */
// TODO Promise, test
graphicGL.loadTexture = function (imgValue, api, textureOpts, cb) {
    if (typeof textureOpts === 'function') {
        cb = textureOpts;
        textureOpts = {};
    }
    textureOpts = textureOpts || {};

    var keys = Object.keys(textureOpts).sort();
    var prefix = '';
    for (var i = 0; i < keys.length; i++) {
        prefix += keys[i] + '_' + textureOpts[keys[i]] + '_';
    }

    var textureCache = api.__textureCache = api.__textureCache || new LRUCache(20);

    if (isECharts(imgValue)) {
        var id = imgValue.__textureid__;
        var textureObj = textureCache.get(prefix + id);
        if (!textureObj) {
            var surface = new EChartsSurface(imgValue);
            surface.onupdate = function () {
                api.getZr().refresh();
            };
            textureObj = {
                texture: surface.getTexture()
            };
            for (var i = 0; i < keys.length; i++) {
                textureObj.texture[keys[i]] = textureOpts[keys[i]];
            }
            id = imgValue.__textureid__ || '__ecgl_ec__' + textureObj.texture.__GUID__;
            imgValue.__textureid__ = id;
            textureCache.put(prefix + id, textureObj);
            cb && cb(textureObj.texture);
        }
        else {
            textureObj.texture.surface.setECharts(imgValue);

            cb && cb(textureObj.texture);
        }
        return textureObj.texture;
    }
    else if (isValueImage(imgValue)) {
        var id = imgValue.__textureid__;
        var textureObj = textureCache.get(prefix + id);
        if (!textureObj) {
            textureObj = {
                texture: new graphicGL.Texture2D({
                    image: imgValue
                })
            };
            for (var i = 0; i < keys.length; i++) {
                textureObj.texture[keys[i]] = textureOpts[keys[i]];
            }
            id = imgValue.__textureid__ || '__ecgl_image__' + textureObj.texture.__GUID__;
            imgValue.__textureid__ = id;
            textureCache.put(prefix + id, textureObj);

            convertTextureToPowerOfTwo(textureObj.texture);
            // TODO Next tick?
            cb && cb(textureObj.texture);
        }
        return textureObj.texture;
    }
    else {
        var textureObj = textureCache.get(prefix + imgValue);
        if (textureObj) {
            if (textureObj.callbacks) {
                // Add to pending callbacks
                textureObj.callbacks.push(cb);
            }
            else {
                // TODO Next tick?
                cb && cb(textureObj.texture);
            }
        }
        else {
            // Maybe base64
            if (imgValue.match(/.hdr$|^data:application\/octet-stream/)) {
                textureObj = {
                    callbacks: [cb]
                };
                var texture = textureUtil.loadTexture(imgValue, {
                    exposure: textureOpts.exposure,
                    fileType: 'hdr'
                }, function () {
                    texture.dirty();
                    textureObj.callbacks.forEach(function (cb) {
                        cb && cb(texture);
                    });
                    textureObj.callbacks = null;
                });
                textureObj.texture = texture;
                textureCache.put(prefix + imgValue, textureObj);
            }
            else {
                var texture = new graphicGL.Texture2D({
                    image: new Image()
                });
                for (var i = 0; i < keys.length; i++) {
                    texture[keys[i]] = textureOpts[keys[i]];
                }

                textureObj = {
                    texture: texture,
                    callbacks: [cb]
                };
                var originalImage = texture.image;
                originalImage.onload = function () {
                    texture.image = originalImage;
                    convertTextureToPowerOfTwo(texture);

                    texture.dirty();
                    textureObj.callbacks.forEach(function (cb) {
                        cb && cb(texture);
                    });
                    textureObj.callbacks = null;
                };
                originalImage.src = imgValue;
                // Use blank image as place holder.
                texture.image = blankImage;

                textureCache.put(prefix + imgValue, textureObj);
            }
        }

        return textureObj.texture;
    }
};

/**
 * Create ambientCubemap and ambientSH light. respectively to have specular and diffuse light
 * @return {Object} { specular, diffuse }
 */
graphicGL.createAmbientCubemap = function (opt, renderer, api, cb) {
    opt = opt || {};
    var textureUrl = opt.texture;
    var exposure = retrieve.firstNotNull(opt.exposure, 1.0);

    var ambientCubemap = new AmbientCubemapLight({
        intensity: retrieve.firstNotNull(opt.specularIntensity, 1.0)
    });
    var ambientSH = new AmbientSHLight({
        intensity: retrieve.firstNotNull(opt.diffuseIntensity, 1.0),
        coefficients: [0.844, 0.712, 0.691, -0.037, 0.083, 0.167, 0.343, 0.288, 0.299, -0.041, -0.021, -0.009, -0.003, -0.041, -0.064, -0.011, -0.007, -0.004, -0.031, 0.034, 0.081, -0.060, -0.049, -0.060, 0.046, 0.056, 0.050]
    });


    ambientCubemap.cubemap = graphicGL.loadTexture(textureUrl, api, {
        exposure: exposure
    }, function () {
        // TODO Performance when multiple view
        ambientCubemap.cubemap.flipY = false;
        ambientCubemap.prefilter(renderer, 32);
        ambientSH.coefficients = shUtil.projectEnvironmentMap(renderer, ambientCubemap.cubemap, {
            lod: 1
        });

        cb && cb();

        // TODO Refresh ?
    });

    return {
        specular: ambientCubemap,
        diffuse: ambientSH
    };
};

/**
 * Create a blank texture for placeholder
 */
graphicGL.createBlankTexture = textureUtil.createBlank;

/**
 * If value is image
 * @param {*}
 * @return {boolean}
 */
graphicGL.isImage = isValueImage;

graphicGL.additiveBlend = function (gl) {
    gl.blendEquation(gl.FUNC_ADD);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
};

/**
 * @param {string|Array.<number>} colorStr
 * @param {Array.<number>} [rgba]
 * @return {Array.<number>} rgba
 */
graphicGL.parseColor = function (colorStr, rgba) {
    if (colorStr instanceof Array) {
        if (!rgba) {
            rgba = [];
        }
        // Color has been parsed.
        rgba[0] = colorStr[0];
        rgba[1] = colorStr[1];
        rgba[2] = colorStr[2];
        if (colorStr.length > 3) {
            rgba[3] = colorStr[3];
        }
        else {
            rgba[3] = 1;
        }
        return rgba;
    }

    rgba = echarts.color.parse(colorStr || '#000', rgba) || [0, 0, 0, 0];
    rgba[0] /= 255;
    rgba[1] /= 255;
    rgba[2] /= 255;
    return rgba;
};

/**
 * Convert alpha beta rotation to direction.
 * @param {number} alpha
 * @param {number} beta
 * @return {Array.<number>}
 */
graphicGL.directionFromAlphaBeta = function (alpha, beta) {
    var theta = alpha / 180 * Math.PI + Math.PI / 2;
    var phi = -beta / 180 * Math.PI + Math.PI / 2;

    var dir = [];
    var r = Math.sin(theta);
    dir[0] = r * Math.cos(phi);
    dir[1] = -Math.cos(theta);
    dir[2] = r * Math.sin(phi);

    return dir;
};
/**
 * Get shadow resolution from shadowQuality configuration
 */
graphicGL.getShadowResolution = function (shadowQuality) {
    var shadowResolution = 1024;
    switch (shadowQuality) {
        case 'low':
            shadowResolution = 512;
            break;
        case 'medium':
            break;
        case 'high':
            shadowResolution = 2048;
            break;
        case 'ultra':
            shadowResolution = 4096;
            break;
    }
    return shadowResolution;
};

/**
 * Shading utilities
 */
graphicGL.COMMON_SHADERS = ['lambert', 'color', 'realistic', 'hatching'];

/**
 * Create shader including vertex and fragment
 * @param {string} prefix.
 */
graphicGL.createShader = function (prefix) {
    var vertexShaderStr = Shader.source(prefix + '.vertex');
    var fragmentShaderStr = Shader.source(prefix + '.fragment');
    if (!vertexShaderStr) {
        console.error('Vertex shader of \'%s\' not exits', prefix);
    }
    if (!fragmentShaderStr) {
        console.error('Fragment shader of \'%s\' not exits', prefix);
    }
    return new Shader({
        name: prefix,
        vertex: vertexShaderStr,
        fragment: fragmentShaderStr
    });
};
/**
 * Set material from model.
 * @param {qtek.Material} material
 * @param {module:echarts/model/Model} model
 * @param {module:echarts/ExtensionAPI} api
 */
graphicGL.setMaterialFromModel = function (shading, material, model, api) {
    var materialModel = model.getModel(shading + 'Material');
    var detailTexture = materialModel.get('detailTexture');
    var uvRepeat = retrieve.firstNotNull(materialModel.get('textureTiling'), 1.0);
    var uvOffset = retrieve.firstNotNull(materialModel.get('textureOffset'), 0.0);
    if (typeof uvRepeat === 'number') {
        uvRepeat = [uvRepeat, uvRepeat];
    }
    if (typeof uvOffset === 'number') {
        uvOffset = [uvOffset, uvOffset];
    }
    var repeatParam = (uvRepeat[0] > 1 || uvRepeat[1] > 1) ? graphicGL.Texture.REPEAT : graphicGL.Texture.CLAMP_TO_EDGE;
    var textureOpt = {
        anisotropic: 8,
        wrapS: repeatParam,
        wrapT: repeatParam
    };
    if (shading === 'realistic') {
        var roughness = materialModel.get('roughness');
        var metalness = materialModel.get('metalness');
        if (metalness != null) {
            // Try to treat as a texture, TODO More check
            if (isNaN(metalness)) {
                material.setTextureImage('metalnessMap', metalness, api, textureOpt);
                metalness = retrieve.firstNotNull(materialModel.get('metalnessAdjust'), 0.5);
            }
        }
        else {
            // Default metalness.
            metalness = 0;
        }
        if (roughness != null) {
            // Try to treat as a texture, TODO More check
            if (isNaN(roughness)) {
                material.setTextureImage('roughnessMap', roughness, api, textureOpt);
                roughness = retrieve.firstNotNull(materialModel.get('roughnessAdjust'), 0.5);
            }
        }
        else {
            // Default roughness.
            roughness = 0.5;
        }
        var normalTextureVal = materialModel.get('normalTexture');
        material.setTextureImage('detailMap', detailTexture, api, textureOpt);
        material.setTextureImage('normalMap', normalTextureVal, api, textureOpt);
        material.set({
            roughness: roughness,
            metalness: metalness,
            detailUvRepeat: uvRepeat,
            detailUvOffset: uvOffset
        });
        // var normalTexture = material.get('normalMap');
        // if (normalTexture) {
            // PENDING
            // normalTexture.format = Texture.SRGB;
        // }
    }
    else if (shading === 'lambert') {
        material.setTextureImage('detailMap', detailTexture, api, textureOpt);
        material.set({
            detailUvRepeat: uvRepeat,
            detailUvOffset: uvOffset
        });
    }
    else if (shading === 'color') {
        material.setTextureImage('detailMap', detailTexture, api, textureOpt);
        material.set({
            detailUvRepeat: uvRepeat,
            detailUvOffset: uvOffset
        });
    }
    else if (shading === 'hatching') {
        var tams = materialModel.get('hatchingTextures') || [];
        if (tams.length < 6) {
            if (__DEV__) {
                console.error('Invalid hatchingTextures.');
            }
        }
        for (var i = 0; i < 6; i++) {
            material.setTextureImage('hatch' + (i + 1), tams[i], api, {
                anisotropic: 8,
                wrapS: graphicGL.Texture.REPEAT,
                wrapT: graphicGL.Texture.REPEAT
            });
        }
        material.set({
            detailUvRepeat: uvRepeat,
            detailUvOffset: uvOffset
        });
    }
};

graphicGL.updateVertexAnimation = function (
    mappingAttributes, previousMesh, currentMesh, seriesModel
) {
    var enableAnimation = seriesModel.get('animation');
    var duration = seriesModel.get('animationDurationUpdate');
    var easing = seriesModel.get('animationEasingUpdate');
    var shadowDepthMaterial = currentMesh.shadowDepthMaterial;

    if (enableAnimation && previousMesh && duration > 0
    // Only animate when bar count are not changed
    && previousMesh.geometry.vertexCount === currentMesh.geometry.vertexCount
    ) {
        currentMesh.material.shader.define('vertex', 'VERTEX_ANIMATION');
        currentMesh.ignorePreZ = true;
        if (shadowDepthMaterial) {
            shadowDepthMaterial.shader.define('vertex', 'VERTEX_ANIMATION');
        }
        for (var i = 0; i < mappingAttributes.length; i++) {
            currentMesh.geometry.attributes[mappingAttributes[i][0]].value =
            previousMesh.geometry.attributes[mappingAttributes[i][1]].value;
        }
        currentMesh.geometry.dirty();
        currentMesh.__percent = 0;
        currentMesh.material.set('percent', 0);
        currentMesh.stopAnimation();
        currentMesh.animate()
            .when(duration, {
                __percent: 1
            })
            .during(function () {
                currentMesh.material.set('percent', currentMesh.__percent);
                if (shadowDepthMaterial) {
                    shadowDepthMaterial.set('percent', currentMesh.__percent);
                }
            })
            .done(function () {
                currentMesh.ignorePreZ = false;
                currentMesh.material.shader.undefine('vertex', 'VERTEX_ANIMATION');
                if (shadowDepthMaterial) {
                    shadowDepthMaterial.shader.undefine('vertex', 'VERTEX_ANIMATION');
                }
            })
            .start(easing);
    }
    else {
        currentMesh.material.shader.undefine('vertex', 'VERTEX_ANIMATION');
        if (shadowDepthMaterial) {
            shadowDepthMaterial.shader.undefine('vertex', 'VERTEX_ANIMATION');
        }
    }
};

module.exports = graphicGL;