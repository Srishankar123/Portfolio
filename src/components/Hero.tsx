import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-background.jpg";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import logo from "/SRL.jpg"
import { useLoader } from "@react-three/fiber";

// === Stylish Loading Component ===
const ModelLoader = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-20">
    <div className="flex flex-col items-center space-y-6 p-8 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-lg border border-gray-700 animate-fade-in">
       {/* Logo */}
      <img src={logo} alt="Logo" className="h-12 w-12 object-contain" />


      {/* Loader Spinner */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-gray-700"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-purple-500 animate-spin"></div>
      </div>

      {/* Loading Text */}
      <p className="text-white text-lg font-medium">Loading 3D Character...</p>

      {/* Social Icons (Optional) */}
      <div className="flex gap-4 mt-2">
        <a href="https://github.com/Srishankar123 " target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
          <Github className="h-6 w-6" />
        </a>
        <a href="https://www.linkedin.com/in/srishankar-lokanath-99a5b4252/ " target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
          <Linkedin className="h-6 w-6" />
        </a>
        <a href="mailto:srishankarloknath@gmail.com" className="text-gray-400 hover:text-white transition-colors">
          <Mail className="h-6 w-6" />
        </a>
      </div>
    </div>
  </div>
);

// === 3D Avatar Model ===
function AvatarModel() {
  const gltf = useLoader(GLTFLoader, "/models/avatar.glb");
  const modelRef = useRef();

  // Slow Y-axis auto-rotation
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group position={[0, 0.6, 0]} rotation={[0, Math.PI, 0]}>
      {/* Make the character look up */}
      <group rotation={[0.3, 3.1, 0]}>
        <primitive object={gltf.scene} ref={modelRef} scale={1.2} />
      </group>
    </group>
  );
}

// === Hero Section ===
const Hero = () => {
  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="pt-20 min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-0"></div>

      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-primary rounded-full opacity-20 animate-float z-0"></div>
      <div
        className="absolute bottom-20 right-10 w-16 h-16 bg-accent rounded-full opacity-20 animate-float z-0"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-20 w-12 h-12 bg-primary-glow rounded-full opacity-30 animate-float z-0"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Main Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Block */}
          <div className="space-y-8 animate-slide-in-left">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Hello, I'm
                </span>
                <br />
                <span className="text-foreground">Srishankar Lokanath</span>
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground">
                Data Analyst & Business Analyst
              </p>
              <p className="text-lg text-muted-foreground max-w-lg">
                I specialize in Python, SQL, Power BI, Excel, and data-driven decision
                making. I love transforming raw data into actionable insights to solve
                real-world problems.
              </p>
            </div>

            <div className="flex gap-4 flex-wrap">
              <Button variant="hero" className="group" onClick={scrollToProjects}>
                View My Projects
                <ArrowDown className="ml-2 group-hover:translate-y-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/Srishankar_Lokanath_Data_Analyst_Resume.pdf" download>
                  Download Resume
                </a>
              </Button>
            </div>

            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="hover:text-primary" asChild>
                <a
                  href="https://github.com/Srishankar123 "
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary" asChild>
                <a
                  href="https://www.linkedin.com/in/srishankar-lokanath-99a5b4252/ "
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary" asChild>
                <a href="mailto:srishankarloknath@gmail.com">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* 3D Avatar Viewer */}
          <div className="relative w-full h-[450px] animate-slide-in-right rounded-xl overflow-hidden shadow-elegant">
            {/* Glow background */}
            <div className="absolute inset-0 z-0 flex items-center justify-center">
              <div className="w-[380px] h-[380px] bg-[#e49eff]/30 blur-[90px] rounded-full" />
            </div>

            {/* 3D Scene with Stylish Loader */}
            <Suspense fallback={<ModelLoader />}>
              <Canvas
                shadows
                camera={{ position: [0, 2, 4], fov: 40 }}
                className="z-10"
              >
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1.2} />
                <spotLight
                  position={[2, 5, 2]}
                  angle={0.3}
                  penumbra={0.5}
                  intensity={1}
                  castShadow
                />

                <Stage
                  environment="city"
                  intensity={0.5}
                  shadows={{ type: "contact", opacity: 0.25 }}
                  adjustCamera={false}
                >
                  <AvatarModel />
                </Stage>

                <OrbitControls enableZoom={false} enablePan={false} />
              </Canvas>
            </Suspense>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <button onClick={scrollToProjects} aria-label="Scroll to Projects" className="p-2">
          <ArrowDown className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
        </button>
      </div>
    </section>
  );
};

export default Hero;