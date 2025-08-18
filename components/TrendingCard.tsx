import { Link } from "expo-router";
import { Image, Text, TouchableOpacity } from "react-native";

const TrendingCard = ({ movie }: { movie: TrendingMovie }) => {
  return (
    <Link href={`/movies/${movie.movie_id}`} asChild>
      <TouchableOpacity className="relative w-32 pl-5">
        <Image
          source={{ uri: movie.poster_url }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        />
        <Text className="mt-1 text-xs font-bold text-white">{movie.title}</Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
