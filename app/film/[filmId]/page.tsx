interface FilmProps {
  params: {
    filmId: string;
  };
}

const Film: React.FC<FilmProps> = ({ params }) => {
  return <div>Film {params.filmId}</div>;
};

export default Film;
