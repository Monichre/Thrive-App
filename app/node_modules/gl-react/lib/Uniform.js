"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});


/**
 * A set of Uniform symbols you can pass to a uniform. (recognized and interpreted by Node)
 */
var Uniform = {
  /**
   * Inject the texture of the previous framebuffer state
   */
  Backbuffer: "_Backbuffer_",

  /**
   * Inject the texture of the previous framebuffer state of another Node pointed by its reference.
   * @param  {Node | Bus} a Node or Bus instance of what you want the backbuffer from. the Node needs to have backbuffering enabled. (in case of Bus, it means its root Node)
   */
  backbufferFrom: function backbufferFrom(node) {
    return { type: "BackbufferFrom", node: node };
  },

  /**
   * the framebuffer size itself
   */
  Resolution: "_Resolution_",
  /**
   * Inject the size of a given Texture input
   * @param {any} obj the texture input object
   */
  textureSize: function textureSize(obj) {
    return { type: "TextureSize", obj: obj };
  },
  /**
   * Inject the width/height ratio of a given Texture input
   * @param {any} obj the texture input object
   */
  textureSizeRatio: function textureSizeRatio(obj) {
    return { type: "TextureSize", obj: obj, ratio: true };
  }
};

exports.default = Uniform;
//# sourceMappingURL=Uniform.js.map