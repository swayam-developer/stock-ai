export default function NewsList({ news }) {

  return (

    <div className="bg-slate-800 p-6 rounded-xl mt-6">

      <h2 className="text-xl mb-4">
        Latest News
      </h2>

      {news.map((item, i) => (

        <div key={i} className="mb-3">

          <a
            href={item.url}
            target="_blank"
            className="text-blue-400"
          >
            {item.title}
          </a>

        </div>

      ))}

    </div>

  );

}