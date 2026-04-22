import ModeSelector from '@/components/ModeSelector';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mode Selection Component - Left Aligned */}
      <div className="flex justify-start">
        <ModeSelector />
      </div>
    </div>
  );
}
