import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import WorldMesh from 'Assets/negative-map-small-opac.png';
// var {MeshLine, MeshLineMaterial} = require( 'three.meshline' );
// var OrbitControls = require('three-orbit-controls')(THREE);
// import VertexShader from '../glsl/vertex-shader.glsl';
// import FragmentShader from '../glsl/fragment-shader.glsl';

class Globe extends Component {
    constructor(props) {
        super(props);

        this.step = 0;
        this.globeStepX = 0;
        this.globeStepY = 0;
        this.animateFuncs = [];
        this.glowStep = {
            direction: 1,
            value: 0
        };

        this.initInternalParticles = this.initInternalParticles.bind(this);
        this.generateGlobe = this.generateGlobe.bind(this);
        this.initStars = this.initStars.bind(this);
        this.initParticleField = this.initParticleField.bind(this);
        this.initGlobe = this.initGlobe.bind(this);
        this.globeRenderer = this.globeRenderer.bind(this);
        this.animateGlobe = this.animateGlobe.bind(this);
        this.initSphereParticles = this.initSphereParticles.bind(this);
    }

    componentDidMount() {
        this.initGlobe();
    }

    initParticleField() {
        var distance = 130;
        var geometry = new THREE.Geometry();

        for (var i = 0; i < 5000; i++) {
            var vertex = new THREE.Vector3();

            var theta = THREE.Math.randFloatSpread(360);
            var phi = THREE.Math.randFloatSpread(360);

            vertex.x = distance * Math.sin(theta) * Math.cos(phi);
            vertex.y = distance * Math.sin(theta) * Math.sin(phi);
            vertex.z = distance * Math.cos(theta);

            geometry.vertices.push(vertex);
        }

        var particles = new THREE.Points(geometry, new THREE.PointsMaterial({
            color: 0xfff,
            size: 2,
            blending: THREE.AdditiveBlending,
            transparent: true,
            sizeAttenuation: false
        }));
        // particles.boundingSphere = 50;
        this.particleField = particles;
    }

    generateGlobe(image, globeMeshAttached) {
        // Create the globe
        const RADIUS = 100;
        const SEGMENTS = 50;
        const RINGS = 50;

        //Our globe groupe we will add the sphere with the texture to.
        this.globe = new THREE.Group();

        //Texture loader
        var loader = new THREE.TextureLoader();
        loader.load(image, (texture) => {
            var sphere = new THREE.SphereGeometry( RADIUS, SEGMENTS, RINGS ); // Create the sphere
            var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } ); // Map the texture to the material.
            material.transparent = true;
            var globe = new THREE.Mesh( sphere, material ); // Create a new mesh with sphere geometry.
            this.globe.add(globe); // Add mesh to globe
            this.internalGlobe = new THREE.Mesh(sphere.clone(), new THREE.MeshBasicMaterial({color: 0x000}));
            this.internalGlobe.scale.multiplyScalar(0.99);
            this.scene.add(this.internalGlobe);

            // // create custom material from the shader code above
            // //   that is within specially labeled script tags
            // var attributes = {
            //     displacement: {
            //       type: 'f', // a float
            //       value: [] // an empty array
            //     }
            //   };
            //   this.uniforms = {
            //       'c':   { type: 'f', value: 0.7 },
            //       'p':   { type: 'f', value: 3.4 },
            //       glowColor: { type: 'c', value: new THREE.Color(0x00ff04) },
            //       viewVector: { type: 'v3', value: this.camera.position },
            //       amplitude: 0
            //   };
            // var customMaterial = new THREE.ShaderMaterial(
            //     {
            //         attributes: attributes,
            //         uniforms: this.uniforms,
            //         vertexShader:   VertexShader,
            //         fragmentShader: FragmentShader,
            //         side: THREE.FrontSide,
            //         blending: THREE.AdditiveBlending,
            //         transparent: true
            //     }   );


            // this.globeGlow = new THREE.Mesh( sphere.clone(), customMaterial.clone() );

            // // now populate the array of attributes
            // var verts =
            //     this.globeGlow.geometry.vertices;

            // var values =
            //     attributes.displacement.value;

            // for (var v = 0; v < verts.length; v++) {
            //     values.push(Math.random() * 30);
            // }

            // this.globeGlow.scale.multiplyScalar(1.1);
            // this.globeGlowScale = this.globeGlow.scale.clone();
            // this.scene.add(this.globeGlow);
            // globeGlow.position = globe.position;

            if (globeMeshAttached) globeMeshAttached(this.globe);
        });
    }

    initInternalParticles() {
        //Generates the stars
        var particles = new THREE.Geometry();
        const distance = 99;

        for ( var i = 0; i < 20000; i ++ ) {
            var particle = new THREE.Vector3();
            var theta = THREE.Math.randFloatSpread(360);
            var phi = THREE.Math.randFloatSpread(360);

            particle.x = distance * Math.sin(theta) * Math.cos(phi);
            particle.y = distance * Math.sin(theta) * Math.sin(phi);
            particle.z = distance * Math.cos(theta);

            particles.vertices.push(particle);
        }

        this.starsMaterial = new THREE.PointsMaterial({
            color: 0x00ff04,
            size: 1,
            blending: THREE.AdditiveBlending,
            transparent: true,
            sizeAttenuation: false});
        this.internalParticles = new THREE.Points(particles, this.starsMaterial);
    }

    initStars() {
        //Generates the stars
        var starsGeometry = new THREE.Geometry();
        const distance = 200;

        for ( var i = 0; i < 500; i ++ ) {
            var star = new THREE.Vector3();
            var theta = THREE.Math.randFloatSpread(100);

            star.x = THREE.Math.randFloatSpread(5000);
            star.y = THREE.Math.randFloatSpread(5000);
            star.z = (distance * Math.cos(theta)) - (distance * 6);

            starsGeometry.vertices.push( star );
        }

        var starsMaterial = new THREE.PointsMaterial( { color: 0xffffff, size: 10 } );

        this.starField = new THREE.Points( starsGeometry, starsMaterial );
    }

    initGlobe() {
        //Three.js needs three things: Renderer, Camera and a Scene
        //Scene attributes
        const container = document.querySelector('#container');
        const WIDTH = window.innerWidth;
        const HEIGHT = window.innerHeight;

        //Camera attributes
        const VIEW_ANGLE = 50;
        const ASPECT = WIDTH / HEIGHT; //Recommended by three.js documentation for aspect ratio.
        const NEAR = 0.1;
        const FAR = 10000;

        //Renderer
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(WIDTH, HEIGHT);
        container.appendChild(this.renderer.domElement); //Attach the renderer-supplied DOM element

        //Camera
        this.camera = new THREE.PerspectiveCamera(
            VIEW_ANGLE,
            ASPECT,
            NEAR,
            FAR
        );
        this.camera.position.set(0, 0, 325);

        //Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x070707);
        this.scene.add(this.camera);

        //Store the three graphics handlers
        this.initStars();
        if (this.starField) this.scene.add(this.starField);
        this.initInternalParticles();
        if (this.internalParticles) this.scene.add(this.internalParticles);
        this.initParticleField();
        if (this.particleField) this.scene.add(this.particleField);

        this.generateGlobe(WorldMesh, (globe) => {
            this.scene.add(globe);
            this.globeRenderer();
        });

        // create a point light
        const pointLight =
        new THREE.PointLight( 0xff0000, 100, 100 );

        // set its position
        pointLight.position.x = 125;
        pointLight.position.y = 400;
        pointLight.position.z = 400;

        // add to the scene
        this.scene.add(pointLight);

        this.globeRenderer();
        this.animateGlobe();
    }

    globeRenderer() {
        this.renderer.render(this.scene, this.camera);
    }

    animateGlobe() {
        this.step = (this.step >= 361) ? 0 : this.step + 0.05;
        this.globeStepY = (this.globeStepY >= 361) ? 0 : this.globeStepY + 0.1;
        this.globeStepX = (this.globeStepX >= 361) ? 0 : this.globeStepX + 0.2;
        this.particleField.rotation.x = (this.step * Math.PI)/180;
        this.particleField.rotation.y = (this.step * Math.PI)/180;

        const glowSteppingSize = 0.015;
        if (this.glowStep.direction === 1) {
            this.glowStep.value += glowSteppingSize;
        } else {
            this.glowStep.value += -glowSteppingSize;
        }

        if (this.glowStep.value <= 0) {
            this.glowStep.direction = 1;
        } else if (this.glowStep.value >= 0.3) {
            this.glowStep.direction = 0;
        }

        if (this.globeGlow){
            if (this.frame === undefined) this.frame = 0;
            let scale = this.globeGlowScale.clone().multiplyScalar(1 + this.glowStep.value);
            this.globeGlow.scale.set(scale.x, scale.y, scale.z);
            this.uniforms.amplitude = Math.sin(this.frame);
            this.frame += 0.1;
        }

        //Set the color of the internal sphere
        if (this.colorStep === undefined || this.colorStep >= 360) this.colorStep = 0;
        this.colorStep += 0.1;
        this.starsMaterial.color.setHSL(Math.round(this.colorStep) / 360, 0.90, 0.50);

        //Rotate the globe around the y axis.
        // this.internalParticles.rotation.x = (360 - this.globeStepX * Math.PI)/180;
        this.internalParticles.rotation.y = (360 - this.globeStepY * Math.PI)/180;
        // this.globe.rotation.x = (360 - this.globeStepX * Math.PI)/180;
        this.globe.rotation.y = (360 - this.globeStepY * Math.PI)/180;

        this.animateFuncs.forEach((func) => {
            func();
        });

        this.globeRenderer();
        requestAnimationFrame(this.animateGlobe);
    }

    initSphereParticles() {
        var particlesData = [];
        var positions, colors;
        var particles;
        var pointCloud;
        var particlePositions;
        var linesMesh;
        var maxParticleCount = 200;
        var particleCount = 200;
        var r = 130;
        var rHalf = r / 2;
        var effectController = {
            showDots: true,
            showLines: true,
            minDistance: 50,
            limitConnections: false,
            maxConnections: 200,
            particleCount: 200
        };

        this.particleGroup = new THREE.Group();

        var segments = maxParticleCount * maxParticleCount;
        positions = new Float32Array( segments * 2 );
        colors = new Float32Array( segments * 2 );
        var pMaterial = new THREE.PointsMaterial( {
            color: 0xFFFFFF,
            size: 1,
            blending: THREE.AdditiveBlending,
            transparent: true,
            sizeAttenuation: false
        });

        particles = new THREE.BufferGeometry();
        particlePositions = new Float32Array( maxParticleCount * 2 );
        for ( var i = 0; i < maxParticleCount; i++ ) {
            var x = Math.random() * r - r / 2;
            var y = Math.random() * r - r / 2;
            // var z = Math.random() * r - r / 2;
            var z = -r / 2;
            particlePositions[ i * 2     ] = x;
            particlePositions[ i * 2 + 1 ] = y;
            particlePositions[ i * 2 + 2 ] = z;
            // add it to the geometry
            particlesData.push( {
                velocity: new THREE.Vector3( -1 + Math.random() * 2, -1 + Math.random() * 2,  0 ),
                numConnections: 0
            } );
        }
        particles.setDrawRange( 0, particleCount );
        particles.addAttribute( 'position', new THREE.BufferAttribute( particlePositions, 3 ).setDynamic( true ) );

        // create the particle system
        pointCloud = new THREE.Points( particles, pMaterial );
        this.particleGroup.add( pointCloud );
        var geometry = new THREE.BufferGeometry();
        geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ).setDynamic( true ) );
        geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ).setDynamic( true ) );
        geometry.computeBoundingSphere();
        geometry.setDrawRange( 0, 0 );
        var material = new THREE.LineBasicMaterial( {
            vertexColors: THREE.VertexColors,
            blending: THREE.AdditiveBlending,
            transparent: true
        } );
        linesMesh = new THREE.LineSegments( geometry, material );
        this.particleGroup.add(linesMesh);

        const animateSphereParticles = () => {
            var vertexpos = 0;
            var colorpos = 0;
            var numConnected = 0;
            for ( var i = 0; i < particleCount; i++ )
                particlesData[ i ].numConnections = 0;
            for ( var i = 0; i < particleCount; i++ ) {
                // get the particle
                var particleData = particlesData[i];
                particlePositions[ i * 2     ] += particleData.velocity.x;
                particlePositions[ i * 2 + 1 ] += particleData.velocity.y;
                particlePositions[ i * 2 + 2 ] += particleData.velocity.z;
                if ( particlePositions[ i * 2 + 1 ] < -rHalf || particlePositions[ i * 2 + 1 ] > rHalf )
                    particleData.velocity.y = -particleData.velocity.y;
                if ( particlePositions[ i * 2 ] < -rHalf || particlePositions[ i * 2 ] > rHalf )
                    particleData.velocity.x = -particleData.velocity.x;
                if ( particlePositions[ i * 2 + 2 ] < -rHalf || particlePositions[ i * 2 + 2 ] > rHalf )
                    particleData.velocity.z = -particleData.velocity.z;
                if ( effectController.limitConnections && particleData.numConnections >= effectController.maxConnections )
                    continue;
                // Check collision
                for ( var j = i + 1; j < particleCount; j++ ) {
                    var particleDataB = particlesData[ j ];
                    if ( effectController.limitConnections && particleDataB.numConnections >= effectController.maxConnections )
                        continue;
                    var dx = particlePositions[ i * 2     ] - particlePositions[ j * 2     ];
                    var dy = particlePositions[ i * 2 + 1 ] - particlePositions[ j * 2 + 1 ];
                    var dz = particlePositions[ i * 2 + 2 ] - particlePositions[ j * 2 + 2 ];
                    var dist = Math.sqrt( dx * dx + dy * dy + dz * dz );
                    if ( dist < effectController.minDistance ) {
                        particleData.numConnections++;
                        particleDataB.numConnections++;
                        var alpha = 1.0 - dist / effectController.minDistance;
                        positions[ vertexpos++ ] = particlePositions[ i * 2     ];
                        positions[ vertexpos++ ] = particlePositions[ i * 2 + 1 ];
                        positions[ vertexpos++ ] = particlePositions[ i * 2 + 2 ];
                        positions[ vertexpos++ ] = particlePositions[ j * 2     ];
                        positions[ vertexpos++ ] = particlePositions[ j * 2 + 1 ];
                        positions[ vertexpos++ ] = particlePositions[ j * 2 + 2 ];
                        colors[ colorpos++ ] = alpha;
                        colors[ colorpos++ ] = alpha;
                        colors[ colorpos++ ] = alpha;
                        colors[ colorpos++ ] = alpha;
                        colors[ colorpos++ ] = alpha;
                        colors[ colorpos++ ] = alpha;
                        numConnected++;
                    }
                }
            }
            linesMesh.geometry.setDrawRange( 0, numConnected * 2 );
            linesMesh.geometry.attributes.position.needsUpdate = true;
            linesMesh.geometry.attributes.color.needsUpdate = true;
            pointCloud.geometry.attributes.position.needsUpdate = true;
        };

        return animateSphereParticles;
    }

    render() {
        return (
            <div id='container' className='container' style={{width: '100vw', height: '100vh'}}/>
        );
    }
}

Globe.propTypes = {

};

export default Globe;