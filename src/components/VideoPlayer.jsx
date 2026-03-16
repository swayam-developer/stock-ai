export default function VideoPlayer({ videoUrl }) {

  return (

    <div className="bg-slate-800 p-6 rounded-xl shadow-lg">

      <h2 className="text-xl font-semibold mb-4">
        AI Generated 90-Second Video Brief
      </h2>

      {videoUrl ? (

        <video
          controls
          className="w-full rounded-lg"
        >

          <source
            src={videoUrl}
            type="video/mp4"
          />

        </video>

      ) : (

        <div className="text-gray-400">
          Generating AI video...
        </div>

      )}

    </div>

  );

}