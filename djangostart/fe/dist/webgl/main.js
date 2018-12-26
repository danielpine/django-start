/* 配套教程请阅读：
http://techbrood.com/zh/news/webgl/webgl%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B3---canvas%E3%80%81context%E3%80%81api%E5%92%8C%E7%BB%98%E5%88%B6%E4%B8%80%E4%B8%AA%E7%9F%A9%E5%BD%A2_2.html */

var shaderProgram, shaderVertexPositionAttribute, shaderProjectionMatrixUniform, shaderModelViewMatrixUniform;

function initWebGL(canvas) {
    var gl;
    try {
        gl = canvas.getContext("webgl");
    } catch (e) {
        var msg = "Error creating WebGL Context!: " + e.toString();
        alert(msg);
        throw Error(msg);
    }

    return gl;
}

function initViewport(gl, canvas) {
    gl.viewport(0, 0, canvas.width, canvas.height);
}
// Create the vertex data for a square to be drawn
function createSquare(gl) {
    var vertexBuffer;
    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    var verts = [
        .5, .5, 0.0, -.5, .5, 0.0,
        .5, -.5, 0.0, -.5, -.5, 0.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts),
        gl.STATIC_DRAW);
    var square = {
        buffer: vertexBuffer,
        vertSize: 3,
        nVerts: 4,
        primtype: gl.TRIANGLE_STRIP
    };
    return square;
}

function initMatrices() {
    // The transform matrix for the square - translate back in Z
    // for the camera
    modelViewMatrix = new Float32Array(
        [1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, -3.333, 1
        ]);

    // The projection matrix (for a 45 degree field of view)
    projectionMatrix = new Float32Array(
        [2.41421, 0, 0, 0,
            0, 2.41421, 0, 0,
            0, 0, -1.002002, -1,
            0, 0, -0.2002002, 0
        ]);

}

function createShader(gl, source, type) {
    var shader;
    shader = gl.createShader(type);

    var str = document.getElementById(source).text;
    gl.shaderSource(shader, str);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }
    return shader;
}

function initShader(gl) {
    // set the shader to use
    var vertexShader = createShader(gl, 'vert-shader', gl.VERTEX_SHADER);
    var fragmentShader = createShader(gl, 'frag-shader', gl.FRAGMENT_SHADER);

    // link them together into a new program
    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    // set the shader to use
    gl.useProgram(shaderProgram);

    // get pointers to the shader params
    shaderVertexPositionAttribute = gl.getAttribLocation(shaderProgram, "vertexPos");
    gl.enableVertexAttribArray(shaderVertexPositionAttribute);

    shaderProjectionMatrixUniform = gl.getUniformLocation(shaderProgram, "projectionMatrix");
    shaderModelViewMatrixUniform = gl.getUniformLocation(shaderProgram, "modelViewMatrix");

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }
}

function draw(gl, obj) {

    // clear the background (with black)
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // connect up the shader parameters: vertex position and projection/model matrices
    // look up where the attribute is in the vertex code, we essentially get an index number
    var positionLocation = gl.getAttribLocation(shaderProgram, "vertexPos");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(shaderVertexPositionAttribute, obj.vertSize, gl.FLOAT, false, 0, 0);
    gl.uniformMatrix4fv(shaderProjectionMatrixUniform, false, projectionMatrix);
    gl.uniformMatrix4fv(shaderModelViewMatrixUniform, false, modelViewMatrix);

    // draw it  - drawArrays(Mode,first,count)
    // start at index 0 with nVerts expected points
    gl.drawArrays(obj.primtype, 0, obj.nVerts);
}

window.onload = function() {
    var canvas = document.getElementById("container");
    var gl = initWebGL(canvas);
    initViewport(gl, canvas);
    initMatrices();
    var obj = createSquare(gl);
    initShader(gl);
    draw(gl, obj);
};