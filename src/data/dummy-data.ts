// Central dummy data store for TruthShield AI. No backend — everything is static.

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type ResultVerdict = "REAL" | "FAKE" | "SUSPICIOUS";
export type MediaType = "Video" | "Audio" | "Image";

export interface AnalysisRecord {
  id: string;
  fileName: string;
  mediaType: MediaType;
  date: string;
  risk: RiskLevel;
  verdict: ResultVerdict;
  authenticity: number;
  confidence: number;
  trustScore: number;
  deepfakeProbability: number;
  socialEngineeringRisk: number;
  thumbnail: string;
  duration: string;
  fileSize: string;
  reasons: string[];
}

export interface AlertItem {
  id: string;
  title: string;
  severity: RiskLevel;
  source: string;
  time: string;
  description: string;
}

export interface ReportItem {
  id: string;
  title: string;
  date: string;
  risk: RiskLevel;
  mediaType: MediaType;
  verdict: ResultVerdict;
  fileSize: string;
  pages: number;
  trustScore: number;
}

export interface UploadItem {
  id: string;
  fileName: string;
  mediaType: MediaType;
  status: "completed" | "processing" | "queued" | "failed";
  progress: number;
  date: string;
  fileSize: string;
}

export interface Recommendation {
  id: string;
  text: string;
  priority: "high" | "medium" | "low";
}

export interface AnalysisStep {
  id: string;
  label: string;
  description: string;
}

// ---- Dashboard stats ----
export const dashboardStats = {
  scansToday: 127,
  scansTodayTrend: 12.5,
  threatRate: 34.8,
  threatRateTrend: -3.2,
  deepfakeDetections: 42,
  deepfakeTrend: 8.1,
  trustScore: 61,
  trustScoreTrend: 4.6,
};

// 14-day scan trend
export const scanTrend = [
  { day: "Mon", scans: 84, threats: 28 },
  { day: "Tue", scans: 102, threats: 35 },
  { day: "Wed", scans: 91, threats: 31 },
  { day: "Thu", scans: 118, threats: 39 },
  { day: "Fri", scans: 134, threats: 47 },
  { day: "Sat", scans: 76, threats: 22 },
  { day: "Sun", scans: 58, threats: 18 },
  { day: "Mon", scans: 112, threats: 38 },
  { day: "Tue", scans: 128, threats: 44 },
  { day: "Wed", scans: 119, threats: 41 },
  { day: "Thu", scans: 142, threats: 51 },
  { day: "Fri", scans: 156, threats: 56 },
  { day: "Sat", scans: 98, threats: 33 },
  { day: "Sun", scans: 127, threats: 44 },
];

export const riskDistribution = [
  { name: "Low", value: 58, color: "#22c55e" },
  { name: "Medium", value: 22, color: "#eab308" },
  { name: "High", value: 13, color: "#f97316" },
  { name: "Critical", value: 7, color: "#ef4444" },
];

export const mediaTypeBreakdown = [
  { name: "Video", value: 48, color: "#38bdf8" },
  { name: "Audio", value: 31, color: "#22d3ee" },
  { name: "Image", value: 21, color: "#818cf8" },
];

export const weeklyComparison = [
  { week: "W1", real: 320, fake: 84, suspicious: 42 },
  { week: "W2", real: 358, fake: 96, suspicious: 51 },
  { week: "W3", real: 401, fake: 112, suspicious: 63 },
  { week: "W4", real: 438, fake: 128, suspicious: 71 },
];

// ---- Recent analysis ----
export const recentAnalysis: AnalysisRecord[] = [
  {
    id: "TS-2401",
    fileName: "ceo_announcement_q3.mp4",
    mediaType: "Video",
    date: "2026-08-07T09:14:00",
    risk: "HIGH",
    verdict: "FAKE",
    authenticity: 12,
    confidence: 94,
    trustScore: 18,
    deepfakeProbability: 88,
    socialEngineeringRisk: 76,
    thumbnail: "video",
    duration: "2:34",
    fileSize: "48.2 MB",
    reasons: ["Lip sync mismatch detected", "Voice clone signature found", "Facial artifacts around eyes"],
  },
  {
    id: "TS-2400",
    fileName: "investor_call_recording.wav",
    mediaType: "Audio",
    date: "2026-08-07T08:42:00",
    risk: "CRITICAL",
    verdict: "FAKE",
    authenticity: 4,
    confidence: 98,
    trustScore: 9,
    deepfakeProbability: 96,
    socialEngineeringRisk: 91,
    thumbnail: "audio",
    duration: "1:12",
    fileSize: "12.4 MB",
    reasons: ["Synthetic voice pattern", "Unnatural pitch variance", "Background noise injection"],
  },
  {
    id: "TS-2399",
    fileName: "press_briefing_photo.jpg",
    mediaType: "Image",
    date: "2026-08-07T07:55:00",
    risk: "LOW",
    verdict: "REAL",
    authenticity: 97,
    confidence: 99,
    trustScore: 94,
    deepfakeProbability: 2,
    socialEngineeringRisk: 6,
    thumbnail: "image",
    duration: "—",
    fileSize: "3.1 MB",
    reasons: ["Consistent lighting", "No AI-generated artifacts", "Metadata verified"],
  },
  {
    id: "TS-2398",
    fileName: "warehouse_security_cam.mp4",
    mediaType: "Video",
    date: "2026-08-06T18:21:00",
    risk: "MEDIUM",
    verdict: "SUSPICIOUS",
    authenticity: 54,
    confidence: 72,
    trustScore: 49,
    deepfakeProbability: 38,
    socialEngineeringRisk: 44,
    thumbnail: "video",
    duration: "0:48",
    fileSize: "21.7 MB",
    reasons: ["Minor frame inconsistencies", "Audio-video desync", "Low resolution artifacts"],
  },
  {
    id: "TS-2397",
    fileName: "support_call_urgent.wav",
    mediaType: "Audio",
    date: "2026-08-06T15:03:00",
    risk: "HIGH",
    verdict: "FAKE",
    authenticity: 8,
    confidence: 95,
    trustScore: 14,
    deepfakeProbability: 91,
    socialEngineeringRisk: 88,
    thumbnail: "audio",
    duration: "0:34",
    fileSize: "5.8 MB",
    reasons: ["Cloned executive voice", "Manipulated urgency cues", "Synthetic breathing pattern"],
  },
  {
    id: "TS-2396",
    fileName: "product_launch_keynote.mp4",
    mediaType: "Video",
    date: "2026-08-06T11:47:00",
    risk: "LOW",
    verdict: "REAL",
    authenticity: 91,
    confidence: 96,
    trustScore: 88,
    deepfakeProbability: 5,
    socialEngineeringRisk: 11,
    thumbnail: "video",
    duration: "18:22",
    fileSize: "142.6 MB",
    reasons: ["Natural micro-expressions", "Consistent voice biometrics", "Verified source metadata"],
  },
];

// ---- Alerts ----
export const latestAlerts: AlertItem[] = [
  {
    id: "AL-901",
    title: "Critical deepfake detected — CEO impersonation",
    severity: "CRITICAL",
    source: "investor_call_recording.wav",
    time: "8 min ago",
    description: "A 96% deepfake probability audio file mimicking executive voice was flagged.",
  },
  {
    id: "AL-900",
    title: "High-risk synthetic video uploaded",
    severity: "HIGH",
    source: "ceo_announcement_q3.mp4",
    time: "23 min ago",
    description: "Lip sync mismatch and facial artifacts indicate a generated video.",
  },
  {
    id: "AL-899",
    title: "Suspicious media requires review",
    severity: "MEDIUM",
    source: "warehouse_security_cam.mp4",
    time: "1 hr ago",
    description: "Frame inconsistencies detected. Manual verification recommended.",
  },
  {
    id: "AL-898",
    title: "Voice clone signature matched known threat actor",
    severity: "HIGH",
    source: "support_call_urgent.wav",
    time: "2 hr ago",
    description: "Audio fingerprint matches a previously identified social engineering campaign.",
  },
];

// ---- Reports ----
export const reports: ReportItem[] = Array.from({ length: 24 }).map((_, i) => {
  const verdicts: ResultVerdict[] = ["FAKE", "REAL", "SUSPICIOUS"];
  const risks: RiskLevel[] = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
  const types: MediaType[] = ["Video", "Audio", "Image"];
  const v = verdicts[i % 3];
  const r = v === "FAKE" ? risks[2 + (i % 2)] : v === "SUSPICIOUS" ? "MEDIUM" : "LOW";
  const t = types[i % 3];
  const names = [
    "ceo_announcement_q3.mp4", "investor_call_recording.wav", "press_briefing_photo.jpg",
    "warehouse_security_cam.mp4", "support_call_urgent.wav", "product_launch_keynote.mp4",
    "board_meeting_clip.mp4", "voicemail_cfo.wav", "id_verification.jpg",
    "training_video_internal.mp4", "customer_testimonial.wav", "facility_photo.jpg",
  ];
  const trust = v === "FAKE" ? 8 + (i % 20) : v === "SUSPICIOUS" ? 40 + (i % 20) : 85 + (i % 12);
  const d = new Date(2026, 7, 7 - Math.floor(i / 3), 9 + (i % 10), (i * 7) % 60);
  return {
    id: `RPT-${2401 - i}`,
    title: names[i % names.length],
    date: d.toISOString(),
    risk: r,
    mediaType: t,
    verdict: v,
    fileSize: `${(3 + (i * 7) % 140).toFixed(1)} MB`,
    pages: 4 + (i % 6),
    trustScore: trust,
  };
});

export const reportsDaily = [
  { day: "Mon", count: 18 },
  { day: "Tue", count: 24 },
  { day: "Wed", count: 21 },
  { day: "Thu", count: 29 },
  { day: "Fri", count: 33 },
  { day: "Sat", count: 14 },
  { day: "Sun", count: 11 },
];

export const reportsWeekly = [
  { week: "Week 1", count: 84 },
  { week: "Week 2", count: 102 },
  { week: "Week 3", count: 119 },
  { week: "Week 4", count: 134 },
];

export const reportsMonthly = [
  { month: "Mar", count: 312 },
  { month: "Apr", count: 348 },
  { month: "May", count: 391 },
  { month: "Jun", count: 428 },
  { month: "Jul", count: 475 },
  { month: "Aug", count: 239 },
];

// ---- Uploads (recent) ----
export const recentUploads: UploadItem[] = [
  { id: "UP-01", fileName: "board_meeting_clip.mp4", mediaType: "Video", status: "completed", progress: 100, date: "2026-08-07T09:30", fileSize: "62.4 MB" },
  { id: "UP-02", fileName: "voicemail_cfo.wav", mediaType: "Audio", status: "processing", progress: 64, date: "2026-08-07T09:28", fileSize: "8.2 MB" },
  { id: "UP-03", fileName: "id_verification.jpg", mediaType: "Image", status: "completed", progress: 100, date: "2026-08-07T09:15", fileSize: "2.4 MB" },
  { id: "UP-04", fileName: "training_video_internal.mp4", mediaType: "Video", status: "queued", progress: 0, date: "2026-08-07T09:05", fileSize: "118.7 MB" },
];

export const supportedFormats = [
  { type: "Video", formats: ["MP4", "MOV", "AVI", "MKV", "WebM"], maxSize: "500 MB", icon: "video" },
  { type: "Audio", formats: ["WAV", "MP3", "AAC", "FLAC", "OGG"], maxSize: "100 MB", icon: "audio" },
  { type: "Image", formats: ["JPG", "PNG", "WEBP", "BMP", "TIFF"], maxSize: "50 MB", icon: "image" },
];

// ---- Analysis pipeline steps ----
export const analysisSteps: AnalysisStep[] = [
  { id: "s1", label: "Uploading", description: "Securely transferring media to encrypted sandbox" },
  { id: "s2", label: "Extracting Frames", description: "Decoding and sampling key frames from the media" },
  { id: "s3", label: "Analyzing Face", description: "Mapping 468 facial landmarks and micro-expressions" },
  { id: "s4", label: "Analyzing Voice", description: "Running spectral analysis and voice biometric matching" },
  { id: "s5", label: "Detecting Artifacts", description: "Scanning for generative model signatures and glitches" },
  { id: "s6", label: "Calculating Confidence", description: "Aggregating multi-model confidence scores" },
  { id: "s7", label: "Generating Report", description: "Compiling explainable analysis and recommendations" },
];

// ---- Detailed result (sample fake detection) ----
export const sampleResult = {
  fileName: "ceo_announcement_q3.mp4",
  mediaType: "Video" as MediaType,
  date: "2026-08-07T09:14:00",
  verdict: "FAKE" as ResultVerdict,
  risk: "HIGH" as RiskLevel,
  authenticity: 12,
  confidence: 94,
  trustScore: 18,
  deepfakeProbability: 88,
  socialEngineeringRisk: 76,
  duration: "2:34",
  fileSize: "48.2 MB",
  analysisBreakdown: [
    { label: "Lip Sync Analysis", score: 14, status: "fail", detail: "Audio-to-mouth movement offset of 120ms detected. Phoneme alignment falls below natural variance thresholds." },
    { label: "Voice Analysis", score: 8, status: "fail", detail: "Spectral fingerprint matches known voice-cloning model output. Unnatural formant transitions present." },
    { label: "Face Consistency", score: 22, status: "fail", detail: "Facial landmark jitter around eyes and mouth. Blink frequency is 4x lower than human baseline." },
    { label: "Frame Artifacts", score: 19, status: "fail", detail: "Temporal inconsistency between frames. Blending artifacts detected along jawline in 31% of frames." },
    { label: "Speech Pattern Analysis", score: 27, status: "warn", detail: "Cadence shows synthetic uniformity. Missing natural disfluencies (ums, pauses) expected in impromptu speech." },
    { label: "Social Engineering Analysis", score: 24, status: "fail", detail: "Script contains urgency cues and authority claims typical of executive impersonation attacks." },
  ],
  reasons: [
    "Lip sync mismatch detected (120ms offset)",
    "Voice clone signature matches synthetic model",
    "Facial artifacts around eyes and jawline",
    "Frame inconsistency across 31% of samples",
    "Unnatural blink frequency and micro-expression gaps",
  ],
  recommendations: [
    { id: "r1", text: "Do NOT transfer money or share credentials based on this media.", priority: "high" as const },
    { id: "r2", text: "Verify the caller's identity through a known, separate channel.", priority: "high" as const },
    { id: "r3", text: "Contact the organization directly using an official phone number.", priority: "high" as const },
    { id: "r4", text: "Report this media to your security team and flag as a phishing attempt.", priority: "medium" as const },
    { id: "r5", text: "Preserve the original file as evidence for forensic review.", priority: "low" as const },
  ],
};

// ---- Landing page content ----
export const landingStats = [
  { label: "Media files analyzed", value: "2.4M+" },
  { label: "Deepfakes detected", value: "184K" },
  { label: "Avg. analysis time", value: "38s" },
  { label: "Detection accuracy", value: "99.2%" },
];

export const features = [
  {
    icon: "ScanFace",
    title: "Multi-Modal Deepfake Detection",
    description: "Analyze video, audio, and images with ensemble models that catch face swaps, voice clones, and synthetic media.",
  },
  {
    icon: "ShieldCheck",
    title: "Social Engineering Scoring",
    description: "Beyond pixels — we assess script patterns, urgency cues, and authority claims to flag manipulation tactics.",
  },
  {
    icon: "Gauge",
    title: "Explainable Trust Scores",
    description: "Every verdict comes with a transparent breakdown: lip sync, voice biometrics, frame artifacts, and confidence.",
  },
  {
    icon: "FileText",
    title: "Forensic-Grade Reports",
    description: "Download court-ready PDF reports with frame-level evidence, confidence intervals, and recommended actions.",
  },
  {
    icon: "Radar",
    title: "Real-Time Threat Alerts",
    description: "Get instant notifications when high-risk media is detected, with severity tiers and contextual guidance.",
  },
  {
    icon: "Lock",
    title: "Zero-Knowledge Processing",
    description: "Your media is processed in an encrypted sandbox and purged after analysis. Nothing is retained without consent.",
  },
];

export const howItWorks = [
  { step: "01", title: "Upload Media", description: "Drag and drop a video, audio file, or image. Files are encrypted end-to-end on upload." },
  { step: "02", title: "AI Analysis", description: "Our multi-model pipeline extracts frames, analyzes faces and voices, and detects generative artifacts." },
  { step: "03", title: "Get Verdict", description: "Receive an authenticity score, deepfake probability, and explainable breakdown in seconds." },
  { step: "04", title: "Act & Report", description: "Follow recommended actions and download a forensic report to share with your security team." },
];

export const testimonials = [
  {
    name: "Sarah Chen",
    role: "CISO, Northwind Financial",
    quote: "TruthShield caught a voice-cloning attack targeting our CFO that our existing tools missed entirely. It paid for itself in one incident.",
    avatar: "SC",
  },
  {
    name: "Marcus Reed",
    role: "Director of Threat Intelligence, Helix Corp",
    quote: "The explainability is what sets it apart. When we flag something to executives, we can show exactly why it's fake — not just a score.",
    avatar: "MR",
  },
  {
    name: "Priya Nair",
    role: "Head of Fraud Prevention, Atlas Bank",
    quote: "We process thousands of verification videos a day. TruthShield's accuracy and speed let us scale trust without scaling headcount.",
    avatar: "PN",
  },
];

export const faqs = [
  {
    question: "What types of media can TruthShield analyze?",
    answer: "We support video (MP4, MOV, AVI, MKV, WebM), audio (WAV, MP3, AAC, FLAC, OGG), and images (JPG, PNG, WEBP, BMP, TIFF). Each media type is routed to specialized detection models.",
  },
  {
    question: "How accurate is the deepfake detection?",
    answer: "Our ensemble models achieve 99.2% accuracy on benchmark datasets, combining facial landmark analysis, voice biometric matching, and generative artifact detection. Every result includes a confidence score so you know how much to trust the verdict.",
  },
  {
    question: "How long does an analysis take?",
    answer: "Most analyses complete in 30–60 seconds depending on file size and media type. Larger videos can take a few minutes. You'll see a live pipeline view while it processes.",
  },
  {
    question: "Is my uploaded media stored?",
    answer: "No. Media is processed in an encrypted sandbox and automatically purged after analysis completes. You can download a report, but the original file is not retained.",
  },
  {
    question: "What is a social engineering risk score?",
    answer: "Beyond detecting synthetic media, we analyze the content for manipulation tactics — urgency cues, authority claims, impersonation patterns — and score the likelihood it's part of a social engineering attack.",
  },
  {
    question: "Can I integrate TruthShield into my existing security stack?",
    answer: "Yes. Enterprise plans include API access for automated scanning pipelines, SIEM integrations, and webhook alerts. Contact our team for documentation and sandbox keys.",
  },
];

export const aboutTimeline = [
  { year: "2024", title: "Founded", description: "TruthShield AI was founded by a team of ML researchers and cybersecurity veterans after a wave of executive impersonation attacks." },
  { year: "2025", title: "First Model", description: "Released our v1 detection ensemble, achieving 96.4% accuracy on the FaceForensics++ benchmark." },
  { year: "2025", title: "Social Engine", description: "Launched the social engineering risk engine, extending detection beyond pixels to manipulation tactics." },
  { year: "2026", title: "At Scale", description: "Now processing over 2.4 million media files with 99.2% accuracy for financial institutions and enterprises worldwide." },
];

export const aboutTech = [
  { icon: "BrainCircuit", title: "Ensemble ML Models", description: "We don't rely on a single detector. An ensemble of CNNs, transformers, and spectral analyzers votes on every frame." },
  { icon: "AudioWaveform", title: "Voice Biometric Fingerprinting", description: "Spectral analysis maps voice characteristics to known cloning-model signatures and legitimate speaker baselines." },
  { icon: "ScanFace", title: "468-Point Facial Landmark Tracking", description: "Sub-pixel facial landmark tracking detects micro-expression gaps and unnatural blink frequencies invisible to the eye." },
  { icon: "Fingerprint", title: "Generative Artifact Detection", description: "We scan for telltale signs of generative models: blending artifacts, temporal inconsistency, and noise patterns." },
];

export const aboutFeatures = [
  { icon: "Gauge", title: "Explainable Scores", description: "Every verdict is backed by a transparent breakdown of contributing factors." },
  { icon: "Zap", title: "Sub-Minute Analysis", description: "Most media is analyzed in under 60 seconds without sacrificing accuracy." },
  { icon: "Radar", title: "Continuous Monitoring", description: "Real-time alerts keep your team ahead of emerging impersonation campaigns." },
  { icon: "Lock", title: "Privacy First", description: "Encrypted, ephemeral processing. Your media is never retained without consent." },
  { icon: "FileText", title: "Forensic Reports", description: "Court-ready PDFs with frame-level evidence for legal and compliance teams." },
  { icon: "Network", title: "Threat Intelligence", description: "Detected threats feed a shared intelligence graph to protect all customers." },
];

// ---- History (full table dataset) ----
export const historyRecords: AnalysisRecord[] = Array.from({ length: 47 }).map((_, i) => {
  const verdicts: ResultVerdict[] = ["FAKE", "REAL", "SUSPICIOUS"];
  const risks: RiskLevel[] = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
  const types: MediaType[] = ["Video", "Audio", "Image"];
  const v = verdicts[i % 3];
  const r = v === "FAKE" ? risks[2 + (i % 2)] : v === "SUSPICIOUS" ? "MEDIUM" : i % 5 === 0 ? "MEDIUM" : "LOW";
  const t = types[i % 3];
  const names = [
    "ceo_announcement_q3.mp4", "investor_call_recording.wav", "press_briefing_photo.jpg",
    "warehouse_security_cam.mp4", "support_call_urgent.wav", "product_launch_keynote.mp4",
    "board_meeting_clip.mp4", "voicemail_cfo.wav", "id_verification.jpg",
    "training_video_internal.mp4", "customer_testimonial.wav", "facility_photo.jpg",
    "conference_keynote.mp4", "hr_orientation.wav", "office_security.jpg",
  ];
  const trust = v === "FAKE" ? 6 + (i % 24) : v === "SUSPICIOUS" ? 38 + (i % 22) : 82 + (i % 16);
  const auth = v === "FAKE" ? 4 + (i % 26) : v === "SUSPICIOUS" ? 44 + (i % 20) : 88 + (i % 12);
  const conf = 80 + (i % 19);
  const dk = v === "FAKE" ? 78 + (i % 20) : v === "SUSPICIOUS" ? 30 + (i % 20) : 2 + (i % 12);
  const se = v === "FAKE" ? 70 + (i % 25) : v === "SUSPICIOUS" ? 35 + (i % 20) : 4 + (i % 14);
  const reasonsPool = [
    "Lip sync mismatch detected", "Voice clone signature found", "Facial artifacts around eyes",
    "Frame inconsistency detected", "Synthetic voice pattern", "Metadata verified",
    "Consistent lighting", "Audio-video desync", "Unnatural blink frequency",
  ];
  const reasons = v === "REAL"
    ? ["Consistent lighting", "No AI-generated artifacts", "Metadata verified"]
    : [reasonsPool[i % reasonsPool.length], reasonsPool[(i + 2) % reasonsPool.length], reasonsPool[(i + 4) % reasonsPool.length]];
  const d = new Date(2026, 7, 7 - Math.floor(i / 4), 8 + (i % 12), (i * 11) % 60);
  return {
    id: `TS-${2400 - i}`,
    fileName: names[i % names.length],
    mediaType: t,
    date: d.toISOString(),
    risk: r,
    verdict: v,
    authenticity: auth,
    confidence: conf,
    trustScore: trust,
    deepfakeProbability: dk,
    socialEngineeringRisk: se,
    thumbnail: t.toLowerCase(),
    duration: t === "Image" ? "—" : `${(i % 3)}:${String((i * 13) % 60).padStart(2, "0")}`,
    fileSize: `${(2 + (i * 9) % 150).toFixed(1)} MB`,
    reasons,
  };
});
