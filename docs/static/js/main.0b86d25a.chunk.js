(this.webpackJsonpupwords=this.webpackJsonpupwords||[]).push([[0],[,,,,,function(module,exports){this.awesome=function(n){var e={};function t(a){if(e[a])return e[a].exports;var i=e[a]={i:a,l:!1,exports:{}};return n[a].call(i.exports,i,i.exports,t),i.l=!0,i.exports}return t.m=n,t.c=e,t.d=function(n,e,a){t.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:a})},t.r=function(n){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},t.t=function(n,e){if(1&e&&(n=t(n)),8&e)return n;if(4&e&&"object"===typeof n&&n&&n.__esModule)return n;var a=Object.create(null);if(t.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var i in n)t.d(a,i,function(e){return n[e]}.bind(null,i));return a},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="",t(t.s="./src/index.js")}({"./src/index.js":function srcIndexJs(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "poster", function() { return poster; });\nfunction poster() {\n  let width = 3000,\n    height = 150,\n    fontFamily = "Arial",\n    fontSize = 100,\n    canvas = null,\n    title = "Awesome Poster",\n    contents = [\n      "It is a Javascript library that you can create poster with awesome pictures and words"\n    ],\n    imageURL = "",\n    preImageURL = null,\n    preFontURL = null,\n    font = null,\n    fontURL = null,\n    img = new Image(),\n    textColor = "white",\n    listeners = {},\n    brush = {},\n    preWidth = 0,\n    preHeight = 0,\n    ctx = null,\n    layout = "middle",\n    contentFontSize = 40,\n    contentFontFamily = "Arial",\n    contentTextColor = "#f0f0f0";\n\n  const maxWidthRate = 0.8,\n    maxTitleHeightRate = 0.2,\n    maxContentTextWidthRate = 0.8,\n    maxFontSize = 150,\n    maxContentTextSize = 40;\n\n  brush.height = function(_) {\n    return arguments.length ? ((height = _), brush) : height;\n  };\n\n  brush.width = function(_) {\n    return arguments.length ? ((width = _), brush) : width;\n  };\n\n  brush.fontFamily = function(_) {\n    return arguments.length ? ((fontFamily = _), brush) : fontFamily;\n  };\n\n  brush.fontSize = function(_) {\n    return arguments.length ? ((fontSize = _), brush) : fontSize;\n  };\n\n  brush.fontURL = function(_) {\n    return arguments.length ? ((fontURL = _), brush) : fontURL;\n  };\n\n  brush.canvas = function(_) {\n    return arguments.length > 0 ? ((canvas = _), brush) : canvas;\n  };\n\n  brush.textColor = function(_) {\n    return arguments.length > 0 ? ((textColor = _), brush) : textColor;\n  };\n\n  brush.title = function(_) {\n    return arguments.length ? ((title = _), brush) : title;\n  };\n\n  brush.imageURL = function(_) {\n    return arguments.length ? ((imageURL = _), brush) : imageURL;\n  };\n\n  brush.contents = function(_) {\n    return arguments.length ? ((contents = _), brush) : contents;\n  };\n\n  brush.layout = function(_) {\n    return arguments.length ? ((layout = _), brush) : layout;\n  };\n\n  brush.contentFontSize = function(_) {\n    return arguments.length ? ((contentFontSize = _), brush) : contentFontSize;\n  };\n\n  brush.contentFontFamily = function(_){\n    return arguments.length ? ((contentFontFamily =_), brush) : contentFontFamily;\n  }\n\n  brush.contentTextColor = function(_){\n    return arguments.length ? ((contentTextColor = _), brush):  contentTextColor;\n  }\n\n  brush.on = function(event, callback) {\n    listeners[event] = callback;\n    return brush;\n  };\n\n  brush.canvasToPng = function(filename) {\n    canvas.toBlob(function(blob) {\n      const url = URL.createObjectURL(blob);\n      const a = document.createElement("a");\n      a.href = url;\n      a.download = filename;\n      a.click();\n    });\n  };\n\n  brush.draw = async function() {\n    dispatch("canvasWillDraw", "\u5f00\u59cb\u7ed8\u5236");\n    if (preWidth != width || preHeight != height) {\n      [preWidth, preHeight] = [width, height];\n      setupCanvas();\n    }\n    if (fontURL && preFontURL != fontURL) {\n      dispatch("canvasWillLoadFont", "\u5f00\u59cb\u52a0\u8f7d\u5b57\u4f53");\n      preFontURL = fontURL;\n      await loadFont();\n      dispatch("canvasDidLoadFont", "\u52a0\u8f7d\u5b57\u4f53\u7ed3\u675f");\n    }\n\n    if (preImageURL != imageURL) {\n      dispatch("canvasWillLoadImage", "\u5f00\u59cb\u52a0\u8f7d\u56fe\u7247");\n      preImageURL = imageURL;\n      await loadImage();\n      dispatch("canvasDidLoadImage", "\u52a0\u8f7d\u56fe\u7247\u7ed3\u675f");\n    }\n\n    draw();\n    dispatch("canvasDidDraw", "\u7ed8\u5236\u5b8c\u6210");\n  };\n\n  function dispatch(event, ...rest) {\n    if (listeners[event]) {\n      listeners[event](...rest);\n    }\n  }\n\n  function setupCanvas() {\n    // \u8bbe\u7f6e canvas\n    canvas.width = width * 2;\n    canvas.height = height * 2;\n\n    // \u8fd9\u91cc\u5fc5\u987b\u8981\u52a0 px\n    canvas.style.width = width + "px";\n    canvas.style.height = height + "px";\n\n    // \u83b7\u5f97\u4e0a\u4e0b\u6587\u5bf9\u8c61\n    ctx = canvas.getContext("2d");\n    ctx.scale(2, 2);\n  }\n\n  function loadFont() {\n    const name = "myFont";\n    font = new FontFace(name, `url(${fontURL})`);\n    return font.load().then(font => {\n      document.fonts.add(font);\n      fontFamily = name;\n    });\n  }\n\n  function loadImage() {\n    img.crossOrigin = "Anonymous";\n    return new Promise((resolve, reject) => {\n      img.src = imageURL;\n      img.onload = () => {\n        resolve();\n      };\n    });\n  }\n\n  function setTitleTextWidth() {\n    let textWidth, textHeight, textBox;\n    fontSize = Math.min(maxFontSize, fontSize);\n    do {\n      ctx.font = `bold ${fontSize}px ${fontFamily}`;\n      textBox = ctx.measureText(title);\n      textWidth = textBox.width;\n      textHeight =\n        textBox.actualBoundingBoxAscent + textBox.actualBoundingBoxDescent;\n      fontSize -= 1;\n    } while (\n      textWidth > maxWidthRate * width ||\n      textHeight > maxTitleHeightRate * height\n    );\n    return textHeight;\n  }\n\n  function setContentTextWidth() {\n    let contentTextWidth, textHeight, textBox;\n    contentFontSize = Math.min(maxContentTextSize, contentFontSize);\n\n    // \u627e\u5230\u6700\u957f\u7684\u53e5\u5b50\n    let content = "",\n      maxLength = -1,\n      len;\n    contents.forEach(item => {\n      if ((len = item.length > maxLength)) {\n        content = item;\n        maxLength = len;\n      }\n    });\n\n    do {\n      ctx.font = `${contentFontSize}px ${contentFontFamily}`;\n      textBox = ctx.measureText(content);\n      contentTextWidth = textBox.width;\n      textHeight =\n        textBox.actualBoundingBoxAscent + textBox.actualBoundingBoxDescent;\n      contentFontSize -= 1;\n    } while (contentTextWidth > maxContentTextWidthRate * width);\n    return textHeight;\n  }\n\n  function getImageSize() {\n    const imgRatio = img.width / img.height;\n    const windowRatio = width / height;\n    let imageWidth, imageHeight;\n    if (imgRatio > windowRatio) {\n      imageHeight = img.height;\n      imageWidth = imageHeight * windowRatio;\n    } else {\n      imageWidth = img.width;\n      imageHeight = imageWidth / windowRatio;\n    }\n\n    const imageX = img.width / 2 - imageWidth / 2,\n      imageY = img.height / 2 - imageHeight / 2;\n    return [imageX, imageY, imageWidth, imageHeight];\n  }\n\n  function getTextPostion() {\n    let x,\n      textAlign,\n      y = height / 2;\n\n    switch (layout) {\n      case "middle": {\n        x = width / 2;\n        textAlign = "center";\n        break;\n      }\n      case "right": {\n        x = width - width / 12;\n        textAlign = "end";\n        break;\n      }\n      case "left": {\n        x = width / 12;\n        textAlign = "start";\n        break;\n      }\n      default: {\n        x = width / 2;\n        textAlign = "center";\n      }\n    }\n    ctx.textAlign = textAlign;\n    return [x, y];\n  }\n\n  function draw() {\n    const [sx, sy, swidth, sheight] = getImageSize();\n    // \u7ed8\u5236\u56fe\u7247\n    ctx.drawImage(img, sx, sy, swidth, sheight, 0, 0, width, height);\n\n    // \u8bbe\u7f6e\u5b57\u4f53\u6837\u5f0f\n    \n\n    ctx.textBaseline = "middle";\n    ctx.shadowColor = "black";\n    ctx.shadowOffsetX = 1;\n    ctx.shadowOffsetY = 1;\n    ctx.shadowBlur = 3;\n\n    const [x, y] = getTextPostion();\n\n    // \u7ed8\u5236\u6807\u9898\n    const titleHeight = setTitleTextWidth();\n    ctx.fillStyle = textColor;\n    ctx.font = `bold ${fontSize}px ${fontFamily}`;\n    ctx.fillText(title, x, y);\n\n    // \u7ed8\u5236\u5185\u5bb9\n    const contentHeight = setContentTextWidth();\n    const offset = titleHeight * 1.5;\n\n    ctx.fillStyle = contentTextColor;\n    ctx.font = `${contentFontSize}px ${contentFontFamily}`;\n    contents.forEach((sentence, index) => {\n      ctx.fillText(sentence, x, y + offset + contentHeight * index * 1.5);\n    });\n  }\n  return brush;\n}\n\n\n//# sourceURL=webpack://awesome/./src/index.js?')}})},function(n,e,t){n.exports=t.p+"static/media/homepage.d54e0cee.jpg"},function(n,e,t){n.exports=t.p+"static/media/Lord_of_Rings.a6eae001.jpg"},function(n,e,t){n.exports=t(14)},,,,,function(n,e,t){},function(n,e,t){"use strict";t.r(e);var a=t(0),i=t.n(a),o=t(4),c=t.n(o),r=t(1),u=function(n){if("string"!=typeof n)return!1;var e="Arial";if(n.toLowerCase()==e.toLowerCase())return!0;var t=100,a=100,i=document.createElement("canvas"),o=i.getContext("2d");i.width=t,i.height=a,o.textAlign="center",o.fillStyle="black",o.textBaseline="middle";var c=function(n){o.clearRect(0,0,t,a),o.font="100px "+n+", "+e,o.fillText("a",50,50);var i=o.getImageData(0,0,t,a).data;return[].slice.call(i).filter((function(n){return 0!=n}))};return c(e).join("")!==c(n).join("")},l={windows:[{ch:"\u5b8b\u4f53",en:"SimSun"},{ch:"\u9ed1\u4f53",en:"SimHei"},{ch:"\u5fae\u8f6f\u96c5\u9ed1",en:"Microsoft Yahei"},{ch:"\u5fae\u8f6f\u6b63\u9ed1\u4f53",en:"Microsoft JhengHei"},{ch:"\u6977\u4f53",en:"KaiTi"},{ch:"\u65b0\u5b8b\u4f53",en:"NSimSun"},{ch:"\u4eff\u5b8b",en:"FangSong"}],"OS X":[{ch:"\u82f9\u65b9",en:"PingFang SC"},{ch:"\u534e\u6587\u9ed1\u4f53",en:"STHeiti"},{ch:"\u534e\u6587\u6977\u4f53",en:"STKaiti"},{ch:"\u534e\u6587\u5b8b\u4f53",en:"STSong"},{ch:"\u534e\u6587\u4eff\u5b8b",en:"STFangsong"},{ch:"\u534e\u6587\u4e2d\u5b8b",en:"STZhongsong"},{ch:"\u534e\u6587\u7425\u73c0",en:"STHupo"},{ch:"\u534e\u6587\u65b0\u9b4f",en:"STXinwei"},{ch:"\u534e\u6587\u96b6\u4e66",en:"STLiti"},{ch:"\u534e\u6587\u884c\u6977",en:"STXingkai"},{ch:"\u51ac\u9752\u9ed1\u4f53\u7b80",en:"Hiragino Sans GB"},{ch:"\u5170\u4ead\u9ed1-\u7b80",en:"Lantinghei SC"},{ch:"\u7fe9\u7fe9\u4f53-\u7b80",en:"Hanzipen SC"},{ch:"\u624b\u672d\u4f53-\u7b80",en:"Hannotate SC"},{ch:"\u5b8b\u4f53-\u7b80",en:"Songti SC"},{ch:"\u5a03\u5a03\u4f53-\u7b80",en:"Wawati SC"},{ch:"\u9b4f\u7891-\u7b80",en:"Weibei SC"},{ch:"\u884c\u6977-\u7b80",en:"Xingkai SC"},{ch:"\u96c5\u75de-\u7b80",en:"Yapi SC"},{ch:"\u5706\u4f53-\u7b80",en:"Yuanti SC"}],office:[{ch:"\u5e7c\u5706",en:"YouYuan"},{ch:"\u96b6\u4e66",en:"LiSu"},{ch:"\u534e\u6587\u7ec6\u9ed1",en:"STXihei"},{ch:"\u534e\u6587\u6977\u4f53",en:"STKaiti"},{ch:"\u534e\u6587\u5b8b\u4f53",en:"STSong"},{ch:"\u534e\u6587\u4eff\u5b8b",en:"STFangsong"},{ch:"\u534e\u6587\u4e2d\u5b8b",en:"STZhongsong"},{ch:"\u534e\u6587\u5f69\u4e91",en:"STCaiyun"},{ch:"\u534e\u6587\u7425\u73c0",en:"STHupo"},{ch:"\u534e\u6587\u65b0\u9b4f",en:"STXinwei"},{ch:"\u534e\u6587\u96b6\u4e66",en:"STLiti"},{ch:"\u534e\u6587\u884c\u6977",en:"STXingkai"},{ch:"\u65b9\u6b63\u8212\u4f53",en:"FZShuTi"},{ch:"\u65b9\u6b63\u59da\u4f53",en:"FZYaoti"}],open:[{ch:"\u601d\u6e90\u9ed1\u4f53",en:"Source Han Sans CN"},{ch:"\u601d\u6e90\u5b8b\u4f53",en:"Source Han Serif SC"},{ch:"\u6587\u6cc9\u9a7f\u5fae\u7c73\u9ed1",en:"WenQuanYi Micro Hei"}],hanyi:[{ch:"\u6c49\u4eea\u65d7\u9ed1 40S",en:"HYQihei 40S"},{ch:"\u6c49\u4eea\u65d7\u9ed1 50S",en:"HYQihei 50S"},{ch:"\u6c49\u4eea\u65d7\u9ed1 60S",en:"HYQihei 60S"},{ch:"\u6c49\u4eea\u5927\u5b8b\u7b80",en:"HYDaSongJ"},{ch:"\u6c49\u4eea\u6977\u4f53",en:"HYKaiti"},{ch:"\u6c49\u4eea\u5bb6\u4e66\u7b80",en:"HYJiaShuJ"},{ch:"\u6c49\u4eeaPP\u4f53\u7b80",en:"HYPPTiJ"},{ch:"\u6c49\u4eea\u4e50\u55b5\u4f53\u7b80",en:"HYLeMiaoTi"},{ch:"\u6c49\u4eea\u5c0f\u9ea6\u4f53",en:"HYXiaoMaiTiJ"},{ch:"\u6c49\u4eea\u7a0b\u884c\u4f53",en:"HYChengXingJ"},{ch:"\u6c49\u4eea\u9ed1\u8354\u679d",en:"HYHeiLiZhiTiJ"},{ch:"\u6c49\u4eea\u96c5\u9177\u9ed1W",en:"HYYaKuHeiW"},{ch:"\u6c49\u4eea\u5927\u9ed1\u7b80",en:"HYDaHeiJ"},{ch:"\u6c49\u4eea\u5c1a\u9b4f\u624b\u4e66W",en:"HYShangWeiShouShuW"}],fangzheng:[{ch:"\u65b9\u6b63\u7c97\u96c5\u5b8b\u7b80\u4f53",en:"FZYaSongS-B-GB"},{ch:"\u65b9\u6b63\u62a5\u5b8b\u7b80\u4f53",en:"FZBaoSong-Z04S"},{ch:"\u65b9\u6b63\u7c97\u5706\u7b80\u4f53",en:"FZCuYuan-M03S"},{ch:"\u65b9\u6b63\u5927\u6807\u5b8b\u7b80\u4f53",en:"FZDaBiaoSong-B06S"},{ch:"\u65b9\u6b63\u5927\u9ed1\u7b80\u4f53",en:"FZDaHei-B02S"},{ch:"\u65b9\u6b63\u4eff\u5b8b\u7b80\u4f53",en:"FZFangSong-Z02S"},{ch:"\u65b9\u6b63\u9ed1\u4f53\u7b80\u4f53",en:"FZHei-B01S"},{ch:"\u65b9\u6b63\u7425\u73c0\u7b80\u4f53",en:"FZHuPo-M04S"},{ch:"\u65b9\u6b63\u6977\u4f53\u7b80\u4f53",en:"FZKai-Z03S"},{ch:"\u65b9\u6b63\u96b6\u53d8\u7b80\u4f53",en:"FZLiBian-S02S"},{ch:"\u65b9\u6b63\u96b6\u4e66\u7b80\u4f53",en:"FZLiShu-S01S"},{ch:"\u65b9\u6b63\u7f8e\u9ed1\u7b80\u4f53",en:"FZMeiHei-M07S"},{ch:"\u65b9\u6b63\u4e66\u5b8b\u7b80\u4f53",en:"FZShuSong-Z01S"},{ch:"\u65b9\u6b63\u8212\u4f53\u7b80\u4f53",en:"FZShuTi-S05S"},{ch:"\u65b9\u6b63\u6c34\u67f1\u7b80\u4f53",en:"FZShuiZhu-M08S"},{ch:"\u65b9\u6b63\u5b8b\u9ed1\u7b80\u4f53",en:"FZSongHei-B07S"},{ch:"\u65b9\u6b63\u5b8b\u4e09\u7b80\u4f53",en:"FZSong"},{ch:"\u65b9\u6b63\u9b4f\u7891\u7b80\u4f53",en:"FZWeiBei-S03S"},{ch:"\u65b9\u6b63\u7ec6\u7b49\u7ebf\u7b80\u4f53",en:"FZXiDengXian-Z06S"},{ch:"\u65b9\u6b63\u7ec6\u9ed1\u4e00\u7b80\u4f53",en:"FZXiHei I-Z08S"},{ch:"\u65b9\u6b63\u7ec6\u5706\u7b80\u4f53",en:"FZXiYuan-M01S"},{ch:"\u65b9\u6b63\u5c0f\u6807\u5b8b\u7b80\u4f53",en:"FZXiaoBiaoSong-B05S"},{ch:"\u65b9\u6b63\u884c\u6977\u7b80\u4f53",en:"FZXingKai-S04S"},{ch:"\u65b9\u6b63\u59da\u4f53\u7b80\u4f53",en:"FZYaoTi-M06S"},{ch:"\u65b9\u6b63\u4e2d\u7b49\u7ebf\u7b80\u4f53",en:"FZZhongDengXian-Z07S"},{ch:"\u65b9\u6b63\u51c6\u5706\u7b80\u4f53",en:"FZZhunYuan-M02S"},{ch:"\u65b9\u6b63\u7efc\u827a\u7b80\u4f53",en:"FZZongYi-M05S"},{ch:"\u65b9\u6b63\u5f69\u4e91\u7b80\u4f53",en:"FZCaiYun-M09S"},{ch:"\u65b9\u6b63\u96b6\u4e8c\u7b80\u4f53",en:"FZLiShu II-S06S"},{ch:"\u65b9\u6b63\u5eb7\u4f53\u7b80\u4f53",en:"FZKangTi-S07S"},{ch:"\u65b9\u6b63\u8d85\u7c97\u9ed1\u7b80\u4f53",en:"FZChaoCuHei-M10S"},{ch:"\u65b9\u6b63\u65b0\u62a5\u5b8b\u7b80\u4f53",en:"FZNew BaoSong-Z12S"},{ch:"\u65b9\u6b63\u65b0\u8212\u4f53\u7b80\u4f53",en:"FZNew ShuTi-S08S"},{ch:"\u65b9\u6b63\u9ec4\u8349\u7b80\u4f53",en:"FZHuangCao-S09S"},{ch:"\u65b9\u6b63\u5c11\u513f\u7b80\u4f53",en:"FZShaoEr-M11S"},{ch:"\u65b9\u6b63\u7a1a\u827a\u7b80\u4f53",en:"FZZhiYi-M12S"},{ch:"\u65b9\u6b63\u7ec6\u73ca\u745a\u7b80\u4f53",en:"FZXiShanHu-M13S"},{ch:"\u65b9\u6b63\u7c97\u5b8b\u7b80\u4f53",en:"FZCuSong-B09S"},{ch:"\u65b9\u6b63\u5e73\u548c\u7b80\u4f53",en:"FZPingHe-S11S"},{ch:"\u65b9\u6b63\u534e\u96b6\u7b80\u4f53",en:"FZHuaLi-M14S"},{ch:"\u65b9\u6b63\u7626\u91d1\u4e66\u7b80\u4f53",en:"FZShouJinShu-S10S"},{ch:"\u65b9\u6b63\u7ec6\u5029\u7b80\u4f53",en:"FZXiQian-M15S"},{ch:"\u65b9\u6b63\u4e2d\u5029\u7b80\u4f53",en:"FZZhongQian-M16S"},{ch:"\u65b9\u6b63\u7c97\u5029\u7b80\u4f53",en:"FZCuQian-M17S"},{ch:"\u65b9\u6b63\u80d6\u5a03\u7b80\u4f53",en:"FZPangWa-M18S"},{ch:"\u65b9\u6b63\u5b8b\u4e00\u7b80\u4f53",en:"FZSongYi-Z13S"},{ch:"\u65b9\u6b63\u526a\u7eb8\u7b80\u4f53",en:"FZJianZhi-M23S"},{ch:"\u65b9\u6b63\u6d41\u884c\u4f53\u7b80\u4f53",en:"FZLiuXingTi-M26S"},{ch:"\u65b9\u6b63\u7965\u96b6\u7b80\u4f53",en:"FZXiangLi-S17S"},{ch:"\u65b9\u6b63\u7c97\u6d3b\u610f\u7b80\u4f53",en:"FZCuHuoYi-M25S"},{ch:"\u65b9\u6b63\u80d6\u5934\u9c7c\u7b80\u4f53",en:"FZPangTouYu-M24S"},{ch:"\u65b9\u6b63\u5361\u901a\u7b80\u4f53",en:"FZKaTong-M19S"},{ch:"\u65b9\u6b63\u827a\u9ed1\u7b80\u4f53",en:"FZYiHei-M20S"},{ch:"\u65b9\u6b63\u6c34\u9ed1\u7b80\u4f53",en:"FZShuiHei-M21S"},{ch:"\u65b9\u6b63\u53e4\u96b6\u7b80\u4f53",en:"FZGuLi-S12S"},{ch:"\u65b9\u6b63\u5e7c\u7ebf\u7b80\u4f53",en:"FZYouXian-Z09S"},{ch:"\u65b9\u6b63\u542f\u4f53\u7b80\u4f53",en:"FZQiTi-S14S"},{ch:"\u65b9\u6b63\u5c0f\u7bc6\u4f53",en:"FZXiaoZhuanTi-S13T"},{ch:"\u65b9\u6b63\u786c\u7b14\u6977\u4e66\u7b80\u4f53",en:"FZYingBiKaiShu-S15S"},{ch:"\u65b9\u6b63\u6be1\u7b14\u9ed1\u7b80\u4f53",en:"FZZhanBiHei-M22S"},{ch:"\u65b9\u6b63\u786c\u7b14\u884c\u4e66\u7b80\u4f53",en:"FZYingBiXingShu-S16S"}]},h=[];for(var s in l)l[s].forEach((function(n){u(n.en)&&h.push(n)}));var g=h;var d=function(n){var e=n.value,t=n.dispatch,a=e.map((function(n,e){return i.a.createElement("div",{key:e},i.a.createElement("input",{type:"text",value:n,onChange:function(n){return t({type:"changeContent",value:n.target.value,index:n.target.name})},name:e}),i.a.createElement("input",{type:"button",value:"\u5220\u9664",onClick:function(n){return t({type:"deleteContent",index:n.target.name})},name:e}),i.a.createElement("br",null))}));return i.a.createElement("div",null,i.a.createElement("input",{type:"text",placeholder:"\u6dfb\u52a0\u5185\u5bb9",onKeyDown:function(n){"Enter"===n.key&&(t({type:"addContent",value:n.target.value}),n.target.value="")}}),i.a.createElement("div",null,a))},f=function(n){var e=n.windowSize,t=n.editMode,a=n.canvasState,o=n.poster,c=n.dispatch,r={position:"absolute",width:e.width/4,height:e.height,background:"#f0f0f0"};var u=i.a.createElement("div",{style:r},i.a.createElement("h1",null,"DIY"),i.a.createElement("div",null,"\u6807\u9898\uff1a",i.a.createElement("input",{type:"text",value:a.title,onChange:function(n){return c({type:"change",key:"title",value:n.target.value})}}),i.a.createElement("br",null),"\u5185\u5bb9:",i.a.createElement(d,{value:a.contents,dispatch:c}),i.a.createElement("br",null),"\u6807\u9898\u5b57\u4f53\u989c\u8272\uff1a",i.a.createElement("input",{type:"color",value:a.textColor,onChange:function(n){return c({type:"change",key:"textColor",value:n.target.value})}}),i.a.createElement("br",null),"\u5185\u5bb9\u5b57\u4f53\u989c\u8272\uff1a",i.a.createElement("input",{type:"color",value:a.contentTextColor,onChange:function(n){return c({type:"change",key:"contentTextColor",value:n.target.value})}}),i.a.createElement("br",null),i.a.createElement("input",{type:"file",onChange:function(){var n=document.getElementById("imageInput").files[0],e=new FileReader;e.onload=function(n){var e=n.target.result;c({type:"changeImage",imageURL:e})},e.readAsDataURL(n)},accept:"image/*",id:"imageInput"}),i.a.createElement("br",null),"\u4f4d\u7f6e\uff1a",i.a.createElement("label",null,i.a.createElement("input",{type:"radio",value:"left",name:"layout",onChange:function(n){return c({type:"change",key:"layout",value:n.target.value})}}),"\u5de6\u8fb9"),i.a.createElement("label",null,i.a.createElement("input",{type:"radio",value:"middle",name:"layout",onChange:function(n){return c({type:"change",key:"layout",value:n.target.value})}}),"\u4e2d\u95f4"),i.a.createElement("label",null,i.a.createElement("input",{type:"radio",value:"right",name:"layout",onChange:function(n){return c({type:"change",key:"layout",value:n.target.value})}}),"\u53f3\u8fb9"),i.a.createElement("br",null),"\u4e3b\u6807\u9898\u5b57\u4f53",i.a.createElement("select",{value:a.fontFamily,onChange:function(n){return c({type:"change",key:"fontFamily",value:n.target.value})}},g.map((function(n,e){return i.a.createElement("option",{key:e},n.en)}))),i.a.createElement("br",null),"\u5185\u5bb9\u5b57\u4f53",i.a.createElement("select",{value:a.contentFontFamily,onChange:function(n){return c({type:"change",key:"contentFontFamily",value:n.target.value})}},g.map((function(n,e){return i.a.createElement("option",{key:e},n.en)})))),i.a.createElement("button",{onClick:function(n){o.canvasToPng("wallpaper.png")}},"\u4fdd\u5b58\u5230\u672c\u5730")),l=i.a.createElement("div",{style:{position:"absolute"}},i.a.createElement("button",{onClick:t.setTrue},"\u7f16\u8f91"));return i.a.createElement("div",null,t.value?u:l)},m=function(n){var e=n.canvasState,t=n.windowSize,o=n.editMode,c=n.poster;return Object(a.useEffect)((function(){var n=document.getElementById("app");c.canvas(n),c.imageURL(e.imageURL).title(e.title).contents(e.contents),c.fontSize(e.fontSize).contentFontSize(e.contentFontSize).fontFamily(e.fontFamily).contentFontFamily(e.contentFontFamily).textColor(e.textColor).contentTextColor(e.contentTextColor),c.width(t.width).height(t.height).layout(e.layout),c.on("canvasWillDraw",console.log).on("canvasDidDraw",console.log).on("canvasWillLoadFont",console.log).on("canvasDidLoadFont",console.log).on("canvasWillLoadImage",console.log).on("canvasDidLoadImage",console.log),c.draw()})),i.a.createElement("div",{onClick:o.setFalse},i.a.createElement("canvas",{id:"app"}))},S=function(n){var e=n.handleNext,t=n.handlePre;return i.a.createElement("div",null,i.a.createElement("button",{style:{position:"absolute",right:150,bottom:10,width:100},onClick:t},"Previous"),i.a.createElement("button",{style:{position:"absolute",bottom:10,right:10,width:100},onClick:e},"Next"))};var p=function(){var n=this,e=Object(a.useState)(window.innerWidth),t=Object(r.a)(e,2),i=t[0],o=t[1],c=Object(a.useState)(window.innerHeight),u=Object(r.a)(c,2),l=u[0],h=u[1];return Object(a.useEffect)((function(){return window.addEventListener("resize",(function(){o(window.innerWidth),h(window.innerHeight)})),function(){window.removeEventListener("resize",n)}})),[i,l]},x=function(n){var e=Object(a.useState)(n),t=Object(r.a)(e,2),i=t[0],o=t[1];return{value:i,setTrue:function(){return o(!0)},setFalse:function(){return o(!1)}}},v=t(2);function y(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(n);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,a)}return t}function F(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?y(t,!0).forEach((function(e){Object(v.a)(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):y(t).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}var w=function(n){return Object(a.useReducer)((function(n,e){switch(e.type){case"update":return e.canvas;case"change":return F({},n,Object(v.a)({},e.key,e.value));case"changeImage":return F({},n,{imageURL:e.imageURL});case"addContent":var t=n.contents,a=e.value;return t.push(a),F({},n,{contents:t});case"deleteContent":var i=n.contents,o=e.index;return i.splice(o,1),F({},n,{contents:i});case"changeContent":var c=n.contents,r=e.index,u=e.value;return c[r]=u,F({},n,{contents:c})}}),n)},b=function(n,e,t){var i={count:n};return Object(a.useReducer)((function(n,e){switch(e.type){case"increment":return{count:n.count+1};case"decrement":return{count:n.count-1}}}),i)},Z=t(5),C=t(6),T={title:"UpWords",contents:["It is a web tool to create awesome poster like this","You can edit your own poster by click the top-left button"],imageURL:t.n(C).a,layout:"middle",fontFamily:"Wawati SC",textColor:"#ffffff",fontSize:150,contentFontSize:40,contentFontFamily:"Hanzipen SC",contentTextColor:"#ffffff"},H=t(7),_=[T,{title:"The Lord of the Rings",contents:["There is always something good in the world, and it's worth fighting for."],imageURL:t.n(H).a,layout:"middle",fontFamily:"Wawati SC",textColor:"#ffffff",fontSize:150,contentFontSize:40,contentFontFamily:"Hanzipen SC",contentTextColor:"#ffffff"}],E=Z.awesome.poster();var L=function(n){var e=p(),t=Object(r.a)(e,2),a=t[0],o=t[1],c=x(!1),u=b(0),l=Object(r.a)(u,2),h=l[0],s=l[1],g=_[h.count],d=w(g),v=Object(r.a)(d,2),y=v[0],F=v[1];return i.a.createElement("div",null,i.a.createElement(f,{editMode:c,windowSize:{width:a,height:o},canvasState:y,dispatch:F,canvasToPng:E.saveToPng,poster:E}),i.a.createElement(m,{canvasState:y,windowSize:{width:a,height:o},editMode:c,poster:E}),i.a.createElement(S,{handleNext:function(){if(!(h.count+1>=_.length)){var n=_[h.count+1];s({type:"increment"}),F({type:"update",canvas:n})}},handlePre:function(){if(!(h.count-1<0)){var n=_[h.count-1];s({type:"decrement"}),F({type:"update",canvas:n})}}}))};t(13);c.a.render(i.a.createElement(L,null),document.getElementById("root"))}],[[8,1,2]]]);
//# sourceMappingURL=main.0b86d25a.chunk.js.map