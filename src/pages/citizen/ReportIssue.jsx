import { useState, useCallback, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useIssues from "../../hooks/useIssues";
import useCommunity from "../../hooks/useCommunity";
import { ISSUE_CATEGORIES, PRIORITY_LEVELS } from "../../data/mockData";

const ReportIssue = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createIssue, loading } = useIssues();
  const { shareIssueToCommuity } = useCommunity();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "medium",
    location: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [images, setImages] = useState([]);
  const [mapCoords, setMapCoords] = useState({ lat: 40.7128, lng: -74.006 }); // Default NYC
  const [isLocating, setIsLocating] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  }, []);

  const handleCategorySelect = useCallback((category) => {
    setFormData((prev) => ({ ...prev, category }));
    setError("");
  }, []);

  const handlePrioritySelect = useCallback((priority) => {
    setFormData((prev) => ({ ...prev, priority }));
  }, []);

  // Image handling
  const handleImageUpload = useCallback((e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 5) {
      setError("Maximum 5 images allowed");
      return;
    }
    
    files.forEach((file) => {
      if (file.size > 10 * 1024 * 1024) {
        setError("Each image must be less than 10MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages((prev) => [...prev, { 
          id: Date.now() + Math.random(), 
          url: event.target.result,
          name: file.name 
        }]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  }, [images.length]);

  const removeImage = useCallback((id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  }, []);

  // Camera functions
  const openCamera = useCallback(async () => {
    if (images.length >= 5) {
      setError("Maximum 5 images allowed");
      return;
    }
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      setCameraStream(stream);
      setShowCamera(true);
      
      // Wait for video element to be available
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (err) {
      setError("Unable to access camera: " + err.message);
    }
  }, [images.length]);

  const closeCamera = useCallback(() => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
    setShowCamera(false);
  }, [cameraStream]);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);
    
    const imageUrl = canvas.toDataURL("image/jpeg", 0.8);
    setImages((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        url: imageUrl,
        name: `photo_${Date.now()}.jpg`,
      },
    ]);
    
    closeCamera();
  }, [closeCamera]);

  // Geolocation
  const handleUseCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }
    
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setMapCoords({ lat: latitude, lng: longitude });
        
        // Reverse geocoding (simplified mock)
        const address = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
        setFormData((prev) => ({ ...prev, location: address }));
        setIsLocating(false);
      },
      (err) => {
        setError("Unable to retrieve your location: " + err.message);
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  const handleMapClick = useCallback((e) => {
    // Simulate map click - in production would use actual map library
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert click position to coordinates (simplified)
    const lat = mapCoords.lat + ((rect.height / 2 - y) / rect.height) * 0.01;
    const lng = mapCoords.lng + ((x - rect.width / 2) / rect.width) * 0.01;
    
    setMapCoords({ lat, lng });
    setFormData((prev) => ({ 
      ...prev, 
      location: `${lat.toFixed(4)}, ${lng.toFixed(4)}` 
    }));
  }, [mapCoords]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.title.trim()) {
      setError("Please enter a title for the issue");
      return;
    }
    if (!formData.category) {
      setError("Please select a category");
      return;
    }
    if (!formData.location.trim()) {
      setError("Please enter the location");
      return;
    }
    if (!formData.description.trim()) {
      setError("Please provide a description");
      return;
    }

    try {
      const newIssue = await createIssue({
        ...formData,
        reportedBy: user?.name || "Anonymous",
        userId: user?.id,
      });
      
      // Automatically share the issue to community (with images)
      shareIssueToCommuity(newIssue, user, images);
      
      setSuccess(true);
      // Redirect after short delay
      setTimeout(() => {
        navigate("/citizen/my-issues");
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to submit issue");
    }
  };

  if (success) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <span className="material-symbols-outlined text-4xl text-green-600">
            check_circle
          </span>
        </div>
        <h2 className="text-2xl font-bold text-green-800">Issue Submitted!</h2>
        <p className="mt-2 text-green-700">
          Thank you for reporting. You&apos;ll receive updates as we process your issue.
        </p>
        <p className="mt-4 text-sm text-green-600">Redirecting to your issues...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center md:text-left">
        <h1 className="mb-3 text-3xl font-extrabold tracking-tight">
          Report a Neighborhood Issue
        </h1>
        <p className="text-lg text-slate-600">
          Help us maintain our city by sharing your concerns. It takes less than 2 minutes.
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-4 text-red-700">
          <span className="material-symbols-outlined">error</span>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <span className="material-symbols-outlined text-blue-600">edit_note</span>
            <h3 className="text-lg font-bold">Issue Title</h3>
          </div>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Brief description of the issue (e.g., 'Pothole on Main Street')"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </section>

        {/* Category Selection */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <span className="material-symbols-outlined text-blue-600">category</span>
            <h3 className="text-lg font-bold">Select Issue Category</h3>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {ISSUE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategorySelect(cat.id)}
                className={`flex flex-col items-center rounded-xl border-2 p-4 transition-all ${
                  formData.category === cat.id
                    ? "border-blue-500 bg-blue-50 text-blue-600"
                    : "border-slate-100 hover:border-blue-200"
                }`}
              >
                <span className="material-symbols-outlined mb-2 text-2xl">
                  {cat.icon}
                </span>
                <span className="text-xs font-bold text-center">{cat.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Location with Map */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <span className="material-symbols-outlined text-blue-600">location_on</span>
            <h3 className="text-lg font-bold">Location</h3>
          </div>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter address, landmark, or intersection"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
          <button
            type="button"
            onClick={handleUseCurrentLocation}
            disabled={isLocating}
            className="mt-3 flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline disabled:opacity-50"
          >
            {isLocating ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                Getting location...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-lg">my_location</span>
                Use Current Location
              </>
            )}
          </button>
          
          {/* Interactive Map */}
          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
            <div 
              className="relative h-64 cursor-crosshair bg-gradient-to-br from-green-100 via-green-50 to-blue-50"
              onClick={handleMapClick}
            >
              {/* Map Grid Lines */}
              <div className="absolute inset-0 opacity-20">
                {[...Array(10)].map((_, i) => (
                  <div key={`h-${i}`} className="absolute h-px w-full bg-slate-400" style={{ top: `${i * 10}%` }} />
                ))}
                {[...Array(10)].map((_, i) => (
                  <div key={`v-${i}`} className="absolute h-full w-px bg-slate-400" style={{ left: `${i * 10}%` }} />
                ))}
              </div>
              
              {/* Map Features (decorative) */}
              <div className="absolute left-1/4 top-1/3 h-16 w-24 rounded-sm bg-slate-300/50" />
              <div className="absolute right-1/4 top-1/4 h-12 w-16 rounded-sm bg-slate-300/50" />
              <div className="absolute bottom-1/4 left-1/3 h-20 w-32 rounded-sm bg-slate-300/50" />
              <div className="absolute left-0 right-0 top-1/2 h-2 bg-amber-200/60" /> {/* Road */}
              <div className="absolute bottom-0 top-0 left-1/2 w-2 bg-amber-200/60" /> {/* Road */}
              <div className="absolute right-1/4 bottom-1/3 h-8 w-8 rounded-full bg-green-300/60" /> {/* Park */}
              <div className="absolute left-1/6 bottom-1/4 h-6 w-6 rounded-full bg-blue-300/60" /> {/* Water */}
              
              {/* Pin Marker */}
              <div 
                className="absolute -translate-x-1/2 -translate-y-full"
                style={{ left: "50%", top: "50%" }}
              >
                <div className="relative">
                  <span className="material-symbols-outlined text-4xl text-red-500 drop-shadow-lg">location_on</span>
                  <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-red-500/30" />
                </div>
              </div>
              
              {/* Coordinates Display */}
              <div className="absolute bottom-2 left-2 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-mono text-slate-600 shadow-sm backdrop-blur-sm">
                {mapCoords.lat.toFixed(4)}, {mapCoords.lng.toFixed(4)}
              </div>
              
              {/* Zoom Controls (decorative) */}
              <div className="absolute right-2 top-2 flex flex-col gap-1">
                <button type="button" className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-slate-600 shadow-sm backdrop-blur-sm hover:bg-white">
                  <span className="material-symbols-outlined text-lg">add</span>
                </button>
                <button type="button" className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-slate-600 shadow-sm backdrop-blur-sm hover:bg-white">
                  <span className="material-symbols-outlined text-lg">remove</span>
                </button>
              </div>
            </div>
            <p className="bg-slate-50 px-4 py-2 text-center text-xs text-slate-500">
              Click on the map to pinpoint the exact location
            </p>
          </div>
        </section>

        {/* Photo Upload */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <span className="material-symbols-outlined text-blue-600">photo_camera</span>
            <h3 className="text-lg font-bold">Add Photos</h3>
            <span className="ml-auto text-sm text-slate-500">{images.length}/5</span>
          </div>
          <p className="mb-4 text-sm text-slate-500">
            Photos help us understand the issue better. Add up to 5 images.
          </p>
          
          {/* Upload Buttons */}
          <div className="mb-4 flex flex-wrap gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 rounded-xl border-2 border-dashed border-slate-300 px-5 py-3 text-sm font-medium text-slate-600 transition-all hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
            >
              <span className="material-symbols-outlined">upload</span>
              Upload Photos
            </button>
            <button
              type="button"
              onClick={openCamera}
              className="flex items-center gap-2 rounded-xl border-2 border-dashed border-slate-300 px-5 py-3 text-sm font-medium text-slate-600 transition-all hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 md:flex"
            >
              <span className="material-symbols-outlined">photo_camera</span>
              Take Photo
            </button>
          </div>

          {/* Image Preview Grid */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
                >
                  <img
                    src={img.url}
                    alt={img.name}
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(img.id)}
                    className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                    <p className="truncate text-xs text-white">{img.name}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {images.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 py-8">
              <span className="material-symbols-outlined mb-2 text-4xl text-slate-300">add_photo_alternate</span>
              <p className="text-sm text-slate-400">No photos added yet</p>
            </div>
          )}
        </section>

        {/* Description */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <span className="material-symbols-outlined text-blue-600">description</span>
            <h3 className="text-lg font-bold">Description</h3>
          </div>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Tell us more about the issue. Be as descriptive as possible..."
            rows="4"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </section>

        {/* Priority */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <span className="material-symbols-outlined text-blue-600">priority_high</span>
            <h3 className="text-lg font-bold">Priority Level</h3>
          </div>
          <p className="mb-4 text-sm text-slate-500">
            How urgent is this issue? This helps our team prioritize effectively.
          </p>
          <div className="flex gap-2 rounded-xl bg-slate-100 p-1">
            {PRIORITY_LEVELS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => handlePrioritySelect(p.id)}
                className={`flex-1 rounded-lg py-3 text-sm font-bold transition-all ${
                  formData.priority === p.id
                    ? "border border-slate-200 bg-white shadow-sm text-blue-600"
                    : "text-slate-600 hover:bg-white/50"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
            <span className="material-symbols-outlined text-blue-600">info</span>
            <p className="text-xs leading-relaxed text-slate-600">
              Priority levels help our maintenance crews schedule repairs based on safety
              impact and service disruption.
            </p>
          </div>
        </section>

        {/* Actions */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row">
          <Link
            to="/citizen"
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-slate-200 px-6 py-3 font-bold text-slate-600 transition-all hover:bg-slate-50 sm:w-auto"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-3 text-lg font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-700 disabled:opacity-50 sm:w-auto"
          >
            {loading ? (
              <>
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Submitting...
              </>
            ) : (
              <>
                Submit Report
                <span className="material-symbols-outlined">arrow_forward</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Footer Note */}
      <div className="text-center">
        <p className="text-xs text-slate-400">
          By submitting this report, you agree to our{" "}
          <a className="underline hover:text-blue-600" href="#">
            Terms of Service
          </a>{" "}
          and{" "}
          <a className="underline hover:text-blue-600" href="#">
            Privacy Policy
          </a>
          . All reports are public but your personal details remain private.
        </p>
      </div>

      {/* Camera Modal */}
      {showCamera && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-black">
            {/* Camera Header */}
            <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between bg-gradient-to-b from-black/70 to-transparent p-4">
              <h3 className="text-lg font-bold text-white">Take Photo</h3>
              <button
                type="button"
                onClick={closeCamera}
                className="rounded-full bg-white/20 p-2 text-white transition-colors hover:bg-white/30"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            {/* Video Preview */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="aspect-video w-full bg-slate-900 object-cover"
            />
            
            {/* Hidden Canvas for Capture */}
            <canvas ref={canvasRef} className="hidden" />
            
            {/* Camera Controls */}
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center bg-gradient-to-t from-black/70 to-transparent p-6">
              <button
                type="button"
                onClick={capturePhoto}
                className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-white/20 transition-all hover:scale-105 hover:bg-white/30 active:scale-95"
              >
                <div className="h-12 w-12 rounded-full bg-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportIssue;

