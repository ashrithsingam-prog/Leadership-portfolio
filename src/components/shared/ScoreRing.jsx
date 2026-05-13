import { useEffect, useState, useRef } from 'react';

export default function ScoreRing({ score, previousScore, size = 180, strokeWidth = 6 }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (animatedScore / 100) * circumference;
  const offset = circumference - progress;
  const delta = score - previousScore;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(eased * score));
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }, [isVisible, score]);

  return (
    <div ref={ref} className="relative flex flex-col items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#f5f5f4"
          strokeWidth={strokeWidth}
        />
        {/* Previous month ghost arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e7e5e4"
          strokeWidth={strokeWidth - 2}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (previousScore / 100) * circumference}
          strokeLinecap="round"
          className="transition-all duration-1000"
          style={{ opacity: isVisible ? 0.5 : 0 }}
        />
        {/* Current score arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={isVisible ? offset : circumference}
          strokeLinecap="round"
          className="transition-all duration-[1200ms] ease-out"
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4a6741" />
            <stop offset="100%" stopColor="#6b8f61" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl md:text-5xl font-semibold text-stone-900 tracking-tight tabular-nums">
          {animatedScore}
        </span>
        <span className="text-xs text-stone-400 font-medium mt-0.5">Composite</span>
        {delta > 0 && (
          <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-accent">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M5 2L8 6H2L5 2Z" fill="currentColor" />
            </svg>
            +{delta} from {previousScore}
          </span>
        )}
      </div>
    </div>
  );
}
